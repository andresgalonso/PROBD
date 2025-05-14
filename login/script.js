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
