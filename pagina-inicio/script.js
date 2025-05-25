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

  //Boton de inicio de sesion
  document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.querySelector(".login-btn"); // Seleccionar el botón
    const idUsuario = sessionStorage.getItem("id_usuario"); // Obtener el ID del usuario

    if (idUsuario) {
        loginBtn.style.display = "none"; // Ocultar el botón si el usuario inició sesión
    }
});

  //logica de pruba del inicio sesion 
  document.querySelector('.form-box.login form').addEventListener('submit', async (event) =>{
    event.preventDefault();
  
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    const usuario = { email, password };

  try {
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    });

    const resultado = await response.json();

    if (response.status === 401) {
            alert("Contraseña incorrecta, intenta de nuevo.");
            return;
        }
    if (response.status === 404) {
        alert("Usuario no encontrado. ¿Registraste tu cuenta?");
        return;
    }
    if (!response.ok) throw new Error("Error en el inicio de sesión");

    if (resultado.id_usuario) {
            sessionStorage.setItem("id_usuario", resultado.id_usuario);
            window.location.reload(); 
        } 
    else {
        alert("Error: No se recibió el ID de usuario.");
    }
    

  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un problema en el inicio de sesion.");
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

document.querySelectorAll(".option").forEach(option => {
  option.addEventListener("click", () => {
    const regionId = option.getAttribute("data-value"); // Obtener el ID de la región
    document.getElementById("region-value").value = regionId; // Guardarlo en el input oculto
  });
});

document.getElementById("registro-form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Evitar recargar la página

  const nombre = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const regionId = document.getElementById("region-value").value;

  const datosUsuario = { nombre, email, password, region_id: regionId };

  try {
    const response = await fetch("http://127.0.0.1:5000/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosUsuario)
    });

    if (!response.ok) throw new Error("Error en el registro");

    const resultado = await response.json();
    alert("¡Cuenta creada con éxito!");
    console.log("Registro exitoso:", resultado);
    window.location.reload(); 

  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un problema en el registro.");
  }
});


// Ejecutar la función cuando la página cargue
document.addEventListener("DOMContentLoaded", renderizarProductos);

  
  