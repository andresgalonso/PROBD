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


  
  //logica de pruba del inicio sesion como admin que reedirige a la pagina de admin
  document.querySelector('.form-box.login form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
  
    const adminEmail = "admin@plantados.com";
    const adminPassword = "admin123";
  
    if (email === adminEmail && password === adminPassword) {
      sessionStorage.setItem('role', 'admin');
      alert('Bienvenido administrador...');
      window.location.href = '../pagina-admin/index.html';
    } else {
      sessionStorage.setItem('role', 'user');
      alert('Bienvenido usuario...');
      window.location.href = '../pagina-inicio/index.html';
    }
  });

  async function obtenerProductos() {
  try {
    const response = await fetch("http://127.0.0.1:5000/obtener_plantas");
    
    if (!response.ok) {
      throw new Error("No se pudo obtener los productos");
    }

    const productos = await response.json();
    return productos;

  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

async function renderizarProductos() {
  const container = document.getElementById("productosContainer");
  container.innerHTML = ""; // Limpiar contenido previo

  const productos = await obtenerProductos(); // Obtener productos de la API
  console.log("Productos obtenidos:", productos);

  productos.forEach(producto => {
    const divProduct = document.createElement("div");
    divProduct.classList.add("product");

    divProduct.innerHTML = `
      <img src="${producto.imagen_url}" alt="Imagen de ${producto.nombre}">
      <div class="product-txt">
        <h3>${producto.nombre}</h3>
        <p class="precio">${producto.nombre_cientifico}</p>
        <a href="${producto.pagina_url}" class="aprender-mas-btn">Leer más</a>
      </div>
    `;

    container.appendChild(divProduct);
  });
}

// Ejecutar la función cuando la página cargue
document.addEventListener("DOMContentLoaded", renderizarProductos);

  
  