/* script.js */

document.addEventListener('DOMContentLoaded', () => {
  const userSection = document.getElementById("user-section");
  // Suponemos que el usuario se guarda en localStorage o sessionStorage
  const loggedUser = localStorage.getItem("loggedUser") || sessionStorage.getItem("loggedUser");

  if (loggedUser) {
    // Si hay usuario, mostramos "Bienvenido, [usuario]" y lo hacemos clickeable
    const username = loggedUser;
    userSection.innerHTML = `
      <button id="btn-profile" class="b">Bienvenido, ${username}</button>
      <button id="btn-logout" class="btn"><img src="25376.png"</button>
    `;
    // Al hacer clic en el botón de perfil redirigimos a perfil.html
    document.getElementById("btn-profile").addEventListener("click", () => {
      window.location.href = "perfil.html";
    });
    // Logout: borramos la sesión y recargamos la página
    document.getElementById("btn-logout").addEventListener("click", () => {
      localStorage.removeItem("loggedUser");
      sessionStorage.removeItem("loggedUser");
      window.location.reload();
    });
  } else {
    userSection.innerHTML = `<button id="btn-login" class="btn">Ingresar</button>`;
    document.getElementById("btn-login").addEventListener("click", () => {
      window.location.href = "entrar.html";
    });
  }
  
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      alert(`Gracias por suscribirte, ${email}`);
      newsletterForm.reset();
    });
  }
});




document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".lux-nav");
  const userSection = document.querySelector("#user-section");

  // ⬇️ AÑADIMOS el userSection dentro del nav solo si está en móvil
  function relocateUserSection() {
    if (window.innerWidth <= 768 && !nav.contains(userSection)) {
      nav.appendChild(userSection);
    }
  }

  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
  });

  // Reubicar también si se redimensiona la pantalla
  relocateUserSection();
  window.addEventListener("resize", relocateUserSection);
});



document.addEventListener("DOMContentLoaded", function () {
  const translateWidget = document.getElementById("google_translate_element");
  const nav = document.querySelector(".lux-nav");
  const mediaQuery = window.matchMedia("(max-width: 768px)");

  function moverTraductor() {
    if (mediaQuery.matches && translateWidget && nav) {
      // Solo si aún no está dentro del nav
      if (!nav.contains(translateWidget)) {
        nav.appendChild(translateWidget);
      }
    } else {
      // Si no es móvil, lo devolvemos a su sitio fijo original (por si hace falta)
      translateWidget.style.position = "fixed";
      translateWidget.style.top = "20px";
      translateWidget.style.left = "20px";
    }
  }

  moverTraductor(); // Llamada inicial

  // Llamar también cuando cambie el tamaño
  window.addEventListener("resize", moverTraductor);
});