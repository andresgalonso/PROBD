const showPopupBtn = document.querySelector(".login-btn");
const hidePopupBtn = document.querySelector(".form-popup .close-btn");
const formPopup = document.querySelector(".form-popup");
const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a");

//Mostrar el popup
showPopupBtn.addEventListener("click",() => {
    document.body.classList.toggle("show-popup");
});

// Esconder el popup
hidePopupBtn.addEventListener("click", () => {
    document.body.classList.remove("show-popup");
});

//Funcion para cambiar entre login y signup
loginSignupLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(link.id); // Verifica si el ID del enlace se imprime en la consola
        formPopup.classList[link.id === "signup-link" ? "add" : "remove"]("show-signup");
    });
});

//FUncion para abrir menu desplegable de la regiones
document.addEventListener('DOMContentLoaded', function () {
    const trigger = document.getElementById('region-trigger');
    const dropdown = document.getElementById('region-dropdown');
    const hiddenInput = document.getElementById('region-value');
  
    trigger.addEventListener('click', () => {
      dropdown.classList.toggle('open');
    });
  
    document.querySelectorAll('#region-dropdown .option').forEach(option => {
      option.addEventListener('click', () => {
        const value = option.getAttribute('data-value');
        const text = option.textContent;
  
        hiddenInput.value = value;
        trigger.textContent = text;
        dropdown.classList.remove('open');
      });
    });
  
    // Cierra el menú si se hace clic fuera
    document.addEventListener('click', (e) => {
      if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  });
  