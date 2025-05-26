document.addEventListener("DOMContentLoaded", async () => {
    const idUsuario = sessionStorage.getItem("id_usuario"); 

    if (!idUsuario) {
        alert("Debes iniciar sesión para ver tu perfil."); 
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/informacion_usuario?id=${idUsuario}`);

        if (!response.ok) {
            alert("No se pudo cargar la información del usuario.");
            return;
        } 
        const datosUsuario = await response.json();

        document.getElementById("nombre-usuario").textContent = datosUsuario.nombre;
        document.getElementById("correo").textContent = datosUsuario.email;
        document.getElementById("region").textContent = datosUsuario.region;

    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        alert("Hubo un problema al cargar tu perfil.");
    }
});

async function obtenerProductos() {
    const idUsuario = sessionStorage.getItem("id_usuario");

  try {
    const response = await fetch(`http://127.0.0.1:5000/plantas_favoritas?id=${idUsuario}`);
    
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

document.addEventListener("DOMContentLoaded", renderizarProductos);

