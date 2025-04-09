const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const { ethers } = require("ethers");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'web')));

// Configuración de multer para almacenar archivos en memoria (para el endpoint de verificación)
const upload = multer({ storage: multer.memoryStorage() });

// Archivo de base de datos persistente para la parte general y verificación
const DB_FILE = 'db.json';
const VERIFICACION_FILE = 'verificacion.json';

// Función para leer la base de datos desde db.json
function readDB() {
  const dbPath = path.join(__dirname, 'db.json');
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

// Función para escribir la base de datos en db.json
function writeDB(data) {
  const dbPath = path.join(__dirname, 'db.json');
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

// Funciones para leer y escribir en verificacion.json
function readVerificationDB() {
  if (!fs.existsSync(VERIFICACION_FILE)) {
    fs.writeFileSync(VERIFICACION_FILE, JSON.stringify({ nftCertificates: {} }, null, 2), 'utf8');
  }
  return JSON.parse(fs.readFileSync(VERIFICACION_FILE, 'utf8'));
}

function writeVerificationDB(data) {
  fs.writeFileSync(VERIFICACION_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ======== Endpoints API =========

// Obtener la base de datos completa (GET /db)
app.get('/db', (req, res) => {
  const db = readDB();
  res.json(db);
});

// Actualizar la base de datos completa (PUT /db)
app.put('/db', (req, res) => {
  try {
    const newDb = req.body;
    writeDB(newDb);
    res.json({ success: true, message: "Database updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verificar login del usuario (POST /login)
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  const db = readDB();
  const user = db.usuarios.find(u => u.usuario === usuario && u.password === password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
  }
});

// Obtener tokens de un usuario (GET /tokens/:usuario)
app.get('/tokens/:usuario', (req, res) => {
  const usuario = req.params.usuario;
  const db = readDB();
  const user = db.usuarios.find(u => u.usuario === usuario);
  if (user) {
    res.json({ success: true, tokens: user.tokens });
  } else {
    res.status(404).json({ success: false, message: "Usuario no encontrado" });
  }
});

// Publicar una oferta (POST /publish-offer)
// Únicamente se modifica la forma de asignar la ID para que sea única y nunca se reinicie.
app.post('/publish-offer', (req, res) => {
  const { user, code, image, tokens, price } = req.body; // 'user' es el vendedor; 'code' es el código de la propiedad
  const db = readDB();
  const seller = db.usuarios.find(u => u.usuario === user);

  if (!seller || !seller.tokens[code] || seller.tokens[code] < tokens) {
    return res.status(400).json({ success: false, message: "No tienes suficientes tokens para publicar esta oferta" });
  }

  // Descontar tokens del vendedor
  seller.tokens[code] -= tokens;
  if (seller.tokens[code] < 0) seller.tokens[code] = 0;

  // Si no existe un contador global de ofertas, lo inicializamos
  if (!db.offerCounter) {
    db.offerCounter = 1;
  }
  // Asignar la ID única usando el contador global y luego incrementarlo
  const newOffer = { id: db.offerCounter.toString(), code, image, tokens, price, user, active: true };
  db.offerCounter += 1;

  db.offers.push(newOffer);

  writeDB(db);
  res.json({ success: true, message: "Oferta publicada exitosamente", offer: newOffer });
});

// Comprar tokens de una oferta (POST /buy)
// Se espera que se compre 1 token.
app.post('/buy', (req, res) => {
  const { buyer, seller, propertyCode, amount, offerId } = req.body;  // amount se espera que sea 1
  const db = readDB();

  const buyerUser = db.usuarios.find(u => u.usuario === buyer);
  const sellerUser = db.usuarios.find(u => u.usuario === seller);
  // Buscar la oferta específica por offerId
  const offerIndex = db.offers.findIndex(o => o.id === offerId);
  
  if (!buyerUser || !sellerUser || offerIndex === -1) {
    return res.status(404).json({ success: false, message: "Oferta o usuario no encontrados" });
  }

  let offer = db.offers[offerIndex];

  if (offer.tokens < amount) {
    return res.status(400).json({ success: false, message: "No hay suficientes tokens en la oferta" });
  }

  // Sumar tokens al comprador para ese activo
  buyerUser.tokens[propertyCode] = (buyerUser.tokens[propertyCode] || 0) + amount;
  // Restar tokens de la oferta
  offer.tokens -= amount;

  // Si se agotan los tokens de la oferta, eliminarla del array
  if (offer.tokens === 0) {
    db.offers.splice(offerIndex, 1);
  }

  // Registrar la transacción en el array "transactions"
  if (!db.transactions) {
    db.transactions = [];
  }
  // Agregar la nueva transacción al inicio (más reciente a la izquierda)
  db.transactions.unshift({
    propertyCode: propertyCode,
    saleValue: offer.price, // Precio por token
    timestamp: new Date().toISOString()
  });
  // Si hay más de 100 transacciones, eliminar la última
  if (db.transactions.length > 100) {
    db.transactions.pop();
  }

  writeDB(db);
  res.json({ success: true, message: "Compra realizada exitosamente", tokens: buyerUser.tokens });
});

// GET /transactions - Obtener transacciones
app.get('/transactions', (req, res) => {
  const db = readDB();
  res.json({ success: true, transactions: db.transactions || [] });
});

// Obtener todas las ofertas (GET /offers)
app.get('/offers', (req, res) => {
  const db = readDB();
  res.json({ success: true, offers: db.offers });
});
app.get('/offers.json', (req, res) => {
  const db = readDB();
  res.json({ success: true, offers: db.offers });
});

// Endpoint para la verificación de NFT (POST /getCertificates)
app.post('/getCertificates', upload.single('nftImage'), (req, res) => {
  const tokenId = req.body.tokenId;
  if (!tokenId) {
    return res.status(400).json({ error: "Falta el ID del NFT" });
  }

  if (!req.file) {
    return res.status(400).json({ error: "No se ha subido la imagen del NFT" });
  }

  const fileBuffer = req.file.buffer;
  const imageHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
  console.log(`Hash de la imagen para token ${tokenId}: ${imageHash}`);

  const verifDB = readVerificationDB();
  if (!verifDB.nftCertificates || !verifDB.nftCertificates[tokenId]) {
    return res.status(404).json({ error: `No se encontraron certificados para el token ID ${tokenId}` });
  }

  const storedCert = verifDB.nftCertificates[tokenId];
  if (imageHash === storedCert.imageHash) {
    return res.json({
      certEmisor: storedCert.certEmisor,
      certActivo: storedCert.certActivo,
      similarity: 1.0
    });
  } else {
    return res.json({
      result: "La imagen no coincide con el NFT verificado",
      similarity: 0
    });
  }
});

// ======== Fin Endpoints API =========

// --- Listener para el evento NFTMinted ---
(async function connectNFTListener() {
  try {
    const wsProviderNFT = new ethers.providers.WebSocketProvider("ws://localhost:8546");
    wsProviderNFT._websocket?.on("open", () => {
      console.log("✅ Conexión WebSocket establecida para NFTMinted.");
    });
    const nftABI = [
      "event NFTMinted(uint256 indexed tokenId, string tokenURI, bytes32 issuerCertificate, bytes32 assetCertificate, string imageHash)"
    ];
    const nftContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const nftContract = new ethers.Contract(nftContractAddress, nftABI, wsProviderNFT);
    
    nftContract.on("NFTMinted", (tokenId, tokenURI, issuerCertificate, assetCertificate, imageHash, event) => {
      console.log(`🪙 NFTMinted recibido: tokenId ${tokenId.toString()}, tokenURI ${tokenURI}, imageHash ${imageHash}`);
      let verifDB = readVerificationDB();
      if (!verifDB.nftCertificates) {
        verifDB.nftCertificates = {};
      }
      verifDB.nftCertificates[tokenId.toString()] = {
        certEmisor: issuerCertificate.toString(),
        certActivo: assetCertificate.toString(),
        imageHash: imageHash
      };
      writeVerificationDB(verifDB);
      console.log(`✅ verificacion.json actualizado para tokenId: ${tokenId.toString()}`);
    });
  } catch (error) {
    console.error("Error conectando listener NFTMinted:", error.message);
  }
})();

// --- Listener para sincronizar ofertas (OfferPublished y OfferBought) ---
(async function listenOfferEvents() {
  try {
    const wsProviderOffers = new ethers.providers.WebSocketProvider("ws://127.0.0.1:8546");
    const offerABI = [
      "event OfferPublished(uint256 indexed offerId, address indexed seller, uint256 amount, uint256 pricePerToken)",
      "event OfferBought(uint256 indexed offerId, address indexed buyer, uint256 amount, uint256 totalPrice)"
    ];
    const offerContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const offerContract = new ethers.Contract(offerContractAddress, offerABI, wsProviderOffers);
    
    // Listener para OfferPublished
    offerContract.on("OfferPublished", (offerId, seller, amount, pricePerToken, event) => {
      console.log("OfferPublished recibido:", {
        offerId: offerId.toString(),
        seller,
        amount: amount.toString(),
        pricePerToken: pricePerToken.toString()
      });
      
      let db = readDB();
      // Construir la oferta con datos del evento
      const newOffer = {
        id: offerId.toString(),
        code: "N/A",  // Puedes asignar el código de propiedad si tienes esa información
        tokens: amount.toString(),
        price: ethers.utils.formatEther(pricePerToken),
        user: seller,
        active: true,
        image: ""
      };
      
      // Evitar duplicados: actualizar si existe, o agregar si no
      const index = db.offers.findIndex(o => o.id === newOffer.id);
      if (index >= 0) {
        db.offers[index] = newOffer;
      } else {
        db.offers.push(newOffer);
      }
      writeDB(db);
      console.log("Oferta sincronizada en db.json:", newOffer);
    });
    
    // Listener para OfferBought
    offerContract.on("OfferBought", (offerId, buyer, amount, totalPrice, event) => {
      console.log("OfferBought recibido:", {
        offerId: offerId.toString(),
        buyer,
        amount: amount.toString(),
        totalPrice: ethers.utils.formatEther(totalPrice)
      });
      
      let db = readDB();
      const index = db.offers.findIndex(o => o.id === offerId.toString());
      if (index >= 0) {
        let currentTokens = parseInt(db.offers[index].tokens);
        currentTokens -= parseInt(amount.toString());
        db.offers[index].tokens = currentTokens.toString();
        if (currentTokens === 0) {
          db.offers.splice(index, 1);
        }
        writeDB(db);
        console.log("Oferta actualizada tras compra en db.json:", db.offers[index]);
      } else {
        console.warn("No se encontró la oferta con ID", offerId.toString(), "en db.json para actualizarla.");
      }
    });
    
    wsProviderOffers._websocket.on("error", (err) => {
      console.error("Error en WebSocket (OfferEvents):", err);
    });
    wsProviderOffers._websocket.on("close", (code, reason) => {
      console.warn(`WebSocket (OfferEvents) cerrado: ${code} ${reason}`);
    });
  } catch (error) {
    console.error("Error en el listener de OfferEvents:", error);
  }
});

// Servir archivos estáticos (HTML, CSS, JS, imágenes, etc.)
app.use(express.static(path.join(__dirname)));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
