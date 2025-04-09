document.addEventListener('DOMContentLoaded', () => {
    // Extraer el parámetro "code" de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const propertyCode = urlParams.get('code');
    const operationTitle = document.getElementById('operation-title');
    const registroForm = document.getElementById('registro-form');
  
    if (propertyCode) {
      operationTitle.innerText = `Operación para la Propiedad: ${propertyCode}`;
    } else {
      operationTitle.innerText = "No se ha proporcionado un código de propiedad válido.";
    }
  
    // Lista de usuarios predefinidos
    const usuarios = [
      { usuario: "admin1", password: "pass123" },
      { usuario: "gestor1", password: "gestion2024" },
      { usuario: "user2", password: "clave456" },
      { usuario: "inversor3", password: "invertir789" },
      { usuario: "analista5", password: "analisis321" }
    ];
  
    registroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('name').value.trim();
      const password = document.getElementById('password').value.trim();
  
      // Validar contra la lista de usuarios predefinidos
      const usuarioValido = usuarios.find(user => user.usuario === username && user.password === password);
  
      if (usuarioValido) {
        // Guardar en sessionStorage (para la sesión) y en localStorage (para persistir el nombre)
        sessionStorage.setItem('loggedUser', JSON.stringify({ username, password }));
        localStorage.setItem('loggedUser', username);
        alert('¡Inicio de sesión exitoso! Redirigiendo...');
        // Redirige a gestion.html si se proporcionó el parámetro "code", de lo contrario a index.html
        if (propertyCode) {
          window.location.href = `gestion.html?code=${propertyCode}`;
        } else {
          window.location.href = 'index.html';
        }
      } else {
        alert('Nombre de usuario o contraseña incorrectos. Inténtalo de nuevo.');
        window.location.href = 'index.html';
      }
    });
  });
  