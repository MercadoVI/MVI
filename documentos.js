/* documentos.js */
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyCode = urlParams.get('code');
    const documentTitle = document.getElementById('document-title');
    const documentList = document.getElementById('document-list');
  
    if (propertyCode) {
      documentTitle.innerText = `Documentos de la Propiedad: ${propertyCode}`;
      const documentos = [
        { nombre: "Información de cotización", link: "docs/informacioncotizacion.pdf" }
        // Agrega más documentos si lo deseas
      ];
      documentos.forEach(doc => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${doc.link}" target="_blank">${doc.nombre}</a>`;
        documentList.appendChild(li);
      });
    } else {
      documentTitle.innerText = "No se ha proporcionado un código de propiedad válido.";
    }
  });
  