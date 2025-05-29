const showPopupBtn = document.querySelector(".login-btn");
const hidePopupBtn = document.querySelector(".form-popup .close-btn");
const formPopup = document.querySelector(".form-popup");
const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a");

// Mostrar el popup
showPopupBtn.addEventListener("click", () => {
  document.body.classList.toggle("show-popup");
});

// Esconder el popup
hidePopupBtn.addEventListener("click", () => {
  document.body.classList.remove("show-popup");
});

// Cambiar entre login y signup
loginSignupLink.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    formPopup.classList[link.id === "signup-link" ? "add" : "remove"]("show-signup");
  });
});

// Abrir menú desplegable de regiones
document.addEventListener('DOMContentLoaded', function () {
  const trigger = document.getElementById('region-trigger');
  const dropdown = document.getElementById('region-dropdown');
  const hiddenInput = document.getElementById('region-value');

  if (trigger && dropdown && hiddenInput) {
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

    // Cerrar menú si se hace clic fuera
    document.addEventListener('click', (e) => {
      if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }
});

// Función para actualizar UI según sesión
function actualizarUI() {
  const loginBtn = document.querySelector(".login-btn");
  const adminPanel = document.getElementById("admin-panel");
  const idUsuario = sessionStorage.getItem("id_usuario");
  const esAdmin = sessionStorage.getItem("es_admin");

  if (loginBtn) {
    loginBtn.style.display = idUsuario ? "none" : "block";
  }

  if (adminPanel) {
    adminPanel.style.display = (idUsuario && esAdmin && esAdmin.toUpperCase() === "Y") ? "block" : "none";
  }
}

// Ejecutar actualización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  actualizarUI();
  renderizarProductos();
});

// Lógica de inicio de sesión
document.querySelector('.form-box.login form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value.trim();

  console.log("Datos capturados del formulario:", { email, password });

  const usuario = { email, password };

  try {
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    });

    const resultado = await response.json();
    console.log("Respuesta del servidor:", { status: response.status, resultado });

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
      console.log("es_admin recibido:", resultado.es_admin);
      sessionStorage.setItem("id_usuario", resultado.id_usuario);
      sessionStorage.setItem("es_admin", resultado.es_admin || "N");
      document.body.classList.remove("show-popup");
      actualizarUI();
    } else {
      alert("Error: No se recibió el ID de usuario.");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un problema en el inicio de sesión.");
  }
});

// Función para obtener productos
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

// Función para renderizar productos
async function renderizarProductos() {
  const container = document.getElementById("productosContainer");
  if (!container) return;

  container.innerHTML = "";

  const productos = await obtenerProductos();
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

// Manejo del menú de región (por si lo quieres mantener igual)
document.querySelectorAll(".option").forEach(option => {
  option.addEventListener("click", () => {
    const regionId = option.getAttribute("data-value");
    document.getElementById("region-value").value = regionId;
  });
});

// Registro de nuevo usuario
document.getElementById("registro-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const regionId = document.getElementById("region-value").value;

  const datosUsuario = { nombre, email, password, region_id: regionId };

  try {
    const response = await fetch("http://127.0.0.1:5000/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
