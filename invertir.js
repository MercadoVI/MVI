document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');
  const propertyGrid = document.getElementById('property-grid');

  const propiedades = {
    "HM-ESP": {
      titulo: "HM-ESP",
      descripcion: "Hotel Nômade Madrid.",
      img: "https://static.hosteltur.com/app/public/uploads/img/articles/2024/01/11/L_082303_el-futuro-hotel-nomade-madrid-abrira-en-el-iberostar-las-letras.jpg",
      descripciondet: "El Hotel Nômade Madrid es un próximo hotel de lujo que abrirá sus puertas a finales de 2025 en la Gran Vía de Madrid, ocupando el edificio del antiguo Iberostar Las Letras. Contará con 93 habitaciones, incluyendo 16 suites, y ofrecerá una experiencia exclusiva con restaurantes, un speakeasy, spa y una piscina en la azotea. Este proyecto marca la entrada del grupo Nômade People en España, aportando un nuevo enfoque al turismo de lujo en la capital.",
      ubicacion: "Madrid, España",
      precio: "$85",
      cantidad: "30.000.000",
      año: "2025",
      rendimiento: "12.5%",
      ocupacion: "80%",
      mercado: "$2,500,000,000",
      tipo: "Hotel",
      renovacion: "Cada 10 años",
      crecimiento: "8%",
      link: "https://nomade.com/welcome"
    },
    "HAB-ESP": {
      titulo: "HAB-ESP",
      descripcion: "Axel Hotel Barcelona.",
      img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/ee/b4/79/axel-hotel-barcelona.jpg?w=700&h=-1&s=1",
      descripciondet: "El Axel Hotel Barcelona es un hotel de 4 estrellas ubicado en el barrio del Eixample, conocido como el 'Gayxample'. Con 101 habitaciones, este hotel heterofriendly ofrece una experiencia urbana y moderna, destacando por su ambiente inclusivo y servicios como spa, gimnasio, restaurante y una terraza con piscina. Es un referente en la comunidad LGBTQ+ y atrae a viajeros de todo el mundo.",
      ubicacion: "Barcelona, España",
      precio: "$70",
      cantidad: "20.000.000",
      año: "2003",
      rendimiento: "10%",
      ocupacion: "85%",
      mercado: "$1,400,000,000",
      tipo: "Hotel",
      renovacion: "Cada 7 años",
      crecimiento: "7%",
      link: "https://www.axelhotels.com/en/axel-hotel-barcelona/hotel"
    },
    "SH-FRA": {
      titulo: "SH-FRA",
      descripcion: "Solly Hôtel Paris.",
      img: "https://cdn.prod.website-files.com/648205ffac44866ca93101c4/65dde3860e13a6ab08da22b3_SOLLY%20FAC%CC%A7ADE%20HD.webp",
      descripciondet: "El Solly Hôtel Paris es un encantador hotel boutique de 4 estrellas situado en el distrito 3 de París, cerca de la plaza Arts et Métiers. Cuenta con 51 habitaciones distribuidas en 8 plantas, algunas con balcones que ofrecen vistas a los tejados parisinos. El hotel destaca por su diseño Art Déco y espacios comunes acogedores, incluyendo una cocina abierta y una sala de desayunos con techo de cristal estilo Art Nouveau.",
      ubicacion: "París, Francia",
      precio: "$60",
      cantidad: "15.000.000",
      año: "2010",
      rendimiento: "9%",
      ocupacion: "78%",
      mercado: "$900,000,000",
      tipo: "Hotel",
      renovacion: "Cada 8 años",
      crecimiento: "6%",
      link: "https://en.sollyhotel.com/"
    },
    "RR-ITA": {
      titulo: "RR-ITA",
      descripcion: "Corviale Roma.",
      img: "https://storage.googleapis.com/www-paredro-com/uploads/2015/06/rom5.jpg",
      descripciondet: "El Corviale es un complejo residencial ubicado en la periferia suroeste de Roma, diseñado en los años 70 como solución al crecimiento poblacional. Con una longitud de un kilómetro, es uno de los ejemplos más emblemáticos de la arquitectura brutalista en Italia. Aunque inicialmente concebido para incluir servicios comunitarios, muchos de ellos no se completaron, y algunas áreas fueron ocupadas ilegalmente. En años recientes, se han llevado a cabo proyectos de rehabilitación para mejorar las condiciones de vida en el Corviale.",
      ubicacion: "Roma, Italia",
      precio: "$40",
      cantidad: "10.000.000",
      año: "1984",
      rendimiento: "6%",
      ocupacion: "70%",
      mercado: "$400,000,000",
      tipo: "Residencial",
      renovacion: "Cada 15 años",
      crecimiento: "4%",
      link: "https://www.archdaily.com/956906/corviale-a-one-kilometer-residential-complex-in-rome"
    },
    "CB-DEU": {
      titulo: "CB-DEU",
      descripcion: "The Cube Berlin.",
      img: "https://www.omnicon.de/wp-content/uploads/2020/06/2020-02-17-CAImmo-Berlin-cube-113-H-1-1024x683.jpg",
      descripciondet: "The Cube Berlin es un edificio de oficinas inteligente ubicado en la plaza Washingtonplatz, frente a la estación central de Berlín. Diseñado por 3XN Architects, cuenta con 10 plantas y una fachada de vidrio plegada que refleja el entorno urbano. Equipado con tecnología de inteligencia artificial, gestiona de manera eficiente la energía y los recursos, ofreciendo espacios de trabajo flexibles y sostenibles.",
      ubicacion: "Berlín, Alemania",
      precio: "$90",
      cantidad: "25.000.000",
      año: "2020",
      rendimiento: "11%",
      ocupacion: "88%",
      mercado: "$2,250,000,000",
      tipo: "Oficinas",
      renovacion: "Cada 10 años",
      crecimiento: "9%",
      link: "https://3xn.com/project/cube-berlin"
    },
    "TB-GBR": {
      titulo: "TB-GBR",
      descripcion: "Tower Bridge London.",
      img: "https://www.amarlondres.com/images/entrada-tower-bridge/tower-bridge-londres.jpg",
      descripciondet: "El Tower Bridge es un icónico puente basculante y colgante de estilo victoriano que cruza el río Támesis en Londres. Construido entre 1886 y 1894, combina funcionalidad y estética, permitiendo el paso de embarcaciones mediante un sistema de elevación hidráulico. Con una longitud de 244 metros y torres de 65 metros de altura, se ha convertido en uno de los símbolos más reconocibles de la ciudad.",
      ubicacion: "Londres, Reino Unido",
      precio: "$120",
      cantidad: "60.000.000",
      año: "1894",
      rendimiento: "5%",
      ocupacion: "N/A",
      mercado: "$3,000,000,000",
      tipo: "Infraestructura",
      renovacion: "Cada 25 años",
      crecimiento: "3%",
      link: "https://www.towerbridge.org.uk/"
    },
    "TT-USA": {
      titulo: "TT-USA",
      descripcion: "Trump Tower New York.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Trump-Tower-3.jpg/1200px-Trump-Tower-3.jpg",
      descripciondet: "La Trump Tower es un rascacielos de uso mixto ubicado en la Quinta Avenida de Manhattan, Nueva York. Inaugurado en 1983, cuenta con 58 pisos que albergan oficinas, residencias y locales comerciales. Diseñado por Der Scutt, destaca por su fachada de vidrio y acero, y su lujoso atrio interior con una cascada de 18 metros. Es sede de la Trump Organization y fue residencia de Donald Trump.",
      ubicacion: "Nueva York, EE. UU.",
      precio: "$150",
      cantidad: "80.000.000",
      año: "1983",
      rendimiento: "9%",
      ocupacion: "78%",
      mercado: "$6,000,000,000",
      tipo: "Mixto",
      renovacion: "Cada 15 años",
      crecimiento: "6%",
      link: "https://www.trumptowerny.com/"
    },
    "MG-JPN": {
      titulo: "MG-JPN",
      descripcion: "Matsuya Ginza Tokio.",
      img: "https://www.japonalternativo.com/wp-content/uploads/2019/05/centro-comercial-de-lujo-tokio-japon-matsuya-ginza-768x537.jpg",
      descripciondet: "Matsuya Ginza es un prestigioso centro comercial ubicado en el distrito de Ginza, Tokio. Fundado en 1925 y renovado en 2012, ofrece una amplia gama de productos de lujo, desde moda hasta gastronomía. Su fachada moderna y luminosa es un referente arquitectónico en la zona, atrayendo tanto a locales como a turistas.",
      ubicacion: "Tokio, Japón",
      precio: "$95",
      cantidad: "45.000.000",
      año: "1925",
      rendimiento: "8.5%",
      ocupacion: "92%",
      mercado: "$4,275,000,000",
      tipo: "Comercial",
      renovacion: "Cada 10 años",
      crecimiento: "7%",
      link: "https://www.matsuya.com/ginza/"
    },
    "SKSA-AUS": {
      titulo: "SKSA-AUS",
      descripcion: "Sydney Kingsford Smith Airport Australia",
      img: "https://a21.com.mx/sites/default/files/styles/normal_size/public/field/image/syd-aeropuerto.jpeg?itok=FGQQ_SPj",
      descripciondet: "El Aeropuerto Internacional Kingsford Smith de Sídney es el principal aeropuerto de Australia y uno de los más antiguos en operación continua del mundo. Inaugurado en 1920, maneja más de 40 millones de pasajeros al año. Cuenta con tres terminales y es un importante hub para vuelos nacionales e internacionales en la región de Asia-Pacífico.",
      ubicacion: "Sídney, Australia",
      precio: "$200",
      cantidad: "100.000.000",
      año: "1920",
      rendimiento: "11%",
      ocupacion: "N/A",
      mercado: "$20,000,000,000",
      tipo: "Infraestructura",
      renovacion: "Cada 20 años",
      crecimiento: "9%",
      link: "https://www.sydneyairport.com.au/"
    },
    "HMBS-SGP": {
      titulo: "HMBS-SGP",
      descripcion: "Hotel Marina Bay Sands en Singapur.",
      img: "https://fotografias.lasexta.com/clipping/cmsimages01/2022/09/06/AE4555E2-693E-434D-A2CE-632EAAE98BB8/hotel-marina-bay-sands-singapur_69.jpg?crop=2000,1125,x0,y139&width=1280&height=720",
      descripciondet: "El Marina Bay Sands es un complejo de lujo icónico situado en Singapur, reconocido como uno de los destinos más prestigiosos del mundo para turismo, negocios y entretenimiento. Con una inversión inicial de 8.000 millones de dólares y una reciente ampliación de otros 8.000 millones, este activo combina innovación arquitectónica y rendimiento financiero excepcional. Su infraestructura incluye tres torres hoteleras de 55 pisos, el impresionante Sands SkyPark con una piscina infinita, un casino de clase mundial, un centro comercial de lujo, un museo ArtScience y múltiples espacios para eventos y conferencias. Generando ingresos anuales superiores a los 3.000 millones de dólares y con márgenes operativos competitivos, el Marina Bay Sands destaca como un activo de alta rentabilidad. Su reciente expansión incrementará aún más su atractivo como destino global. Ideal para inversores que buscan exposición a activos de lujo en Asia, el Marina Bay Sands ofrece oportunidades únicas de diversificación y retorno sostenible en el sector inmobiliario y de entretenimiento.",
      ubicacion: "Singapur, Singapur",
      precio: "$100",
      cantidad: "50.000.000",
      año: "2010",
      rendimiento: "17.5%",
      ocupacion: "90%",
      mercado: "$5,000,000,000",
      tipo: "Hotel",
      renovacion: "Cada 10 años",
      crecimiento: "10%",
      link: "https://www.marinabaysands.com/"
    }
  };

  // 🔧 Función para normalizar texto (elimina tildes y pasa a minúsculas)
  function normalizarTexto(texto) {
    return texto
      .normalize("NFD")                   // separa letras y tildes
      .replace(/[\u0300-\u036f]/g, "")   // elimina las tildes
      .toLowerCase();                    // pasa a minúsculas
  }

  function renderPropertyBlocks(filter = "") {
    propertyGrid.innerHTML = "";
    const normalizadoFiltro = normalizarTexto(filter);

    const filtered = Object.entries(propiedades).filter(([code, prop]) => {
      const texto = `${code} ${prop.titulo} ${prop.descripcion || ""}`;
      return normalizarTexto(texto).includes(normalizadoFiltro);
    });

    filtered.forEach(([code, property]) => {
      const block = document.createElement('div');
      block.classList.add('property-block');
      block.innerHTML = `
        <img src="${property.img}" alt="${property.titulo}">
        <div class="property-info">
          <h3>${property.titulo}</h3>
          <p>${property.descripcion}</p>
          <p><strong>Ubicación:</strong> ${property.ubicacion || "N/A"}</p>
          <p><strong>Precio:</strong> ${property.precio || "N/A"}</p>
        </div>
      `;
      block.addEventListener('click', () => {
        searchInput.value = code;
        searchButton.click();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      propertyGrid.appendChild(block);
    });

    if (filtered.length === 0) {
      propertyGrid.innerHTML = `<p>No se encontraron propiedades que coincidan con "${filter}".</p>`;
    }
  }

  renderPropertyBlocks(); // Mostrar todos al inicio

  searchInput.addEventListener('input', () => {
    const value = searchInput.value.trim();
    if (!value) {
      showElement('property-grid');
      hideElement('property-results');
      hideElement('property-analysis');
      hideElement('property-main-details');
      hideElement('property-description-section');
    }
    renderPropertyBlocks(value);
  });

  searchButton.addEventListener('click', () => {
    const propertyCode = searchInput.value.trim().toUpperCase();
    if (propiedades[propertyCode]) {
      const property = propiedades[propertyCode];
      document.getElementById('property-title-main').innerText = property.titulo || "N/A";
      document.getElementById('property-market-value').innerText = property.mercado || "N/A";
      showElement('property-main-details');

      document.getElementById('property-title').innerText = property.titulo || "N/A";
      document.getElementById('property-description').innerText = property.descripcion || "N/A";
      document.getElementById('property-image').src = property.img || "";
      document.getElementById('property-location').innerText = property.ubicacion || "N/A";
      document.getElementById('property-price').innerText = property.precio || "N/A";
      document.getElementById('property-size').innerText = property.cantidad || "N/A";
      document.getElementById('property-type').innerText = property.tipo || "N/A";
      showElement('property-results');

      cargarEstadisticas(property);

      document.getElementById('property-detailed-description').innerText = property.descripciondet || "Sin descripción detallada.";
      document.getElementById('property-link').href = property.link;
      document.getElementById('property-documents-link').href = `documentos.html?code=${propertyCode}`;
      showElement('property-description-section');
      showElement('property-analysis');

      hideElement('property-grid'); // ocultar los bloques
    } else {
      alert('No se encontró ninguna propiedad con ese código exacto.');
    }
  });

  function showElement(id) {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = 'block';
      setTimeout(() => el.style.opacity = 1, 50);
    }
  }

  function hideElement(id) {
    const el = document.getElementById(id);
    if (el) {
      el.style.opacity = 0;
      setTimeout(() => el.style.display = 'none', 500);
    }
  }

  function cargarEstadisticas(property) {
    const keysToUpdate = ['ubicacion', 'año', 'precio', 'mercado', 'rendimiento', 'crecimiento', 'tipo', 'ocupacion'];
    keysToUpdate.forEach(key => {
      const el = document.getElementById(`property-${key}`);
      if (el && property[key]) el.innerText = property[key];
    });

    const ctx = document.getElementById('propertyChart').getContext('2d');
    if (window.propertyChartInstance) window.propertyChartInstance.destroy();

    window.propertyChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'], datasets: [{
          label: 'Crecimiento Anual (%)',
          data: [
            Math.random() * 5 + 2,
            Math.random() * 6 + 3,
            Math.random() * 7 + 4,
            Math.random() * 8 + 5,
            Math.random() * 9 + 6,
            Math.random() * 10 + 7,
            parseFloat(property.crecimiento) || 5,
            parseFloat(property.rendimiento) || 10,
            Math.random() * 15 + 5,
            Math.random() * 20 + 10
          ],
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: '#388E3C',
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.3, // suaviza las curvas
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Crecimiento (%)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Año'
            }
          }
        }
      }
    });

  }

  document.getElementById("manage-operation-button").addEventListener("click", function () {
    const assetCode = searchInput.value.trim().toUpperCase();
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      window.location.href = "gestion.html?code=" + assetCode;
    } else {
      window.location.href = "entrar.html?code=" + assetCode;
    }
  });
});
