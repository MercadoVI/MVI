document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');
  const propertyGrid = document.getElementById('property-grid');

  const propiedades = {
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
        labels: ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'],        datasets: [{
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
