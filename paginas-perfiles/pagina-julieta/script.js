async function cargarPlanta(id) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/obtener_planta?id=${id}`);
    
    if (!response.ok) {
      throw new Error("No se pudo obtener la planta");
    }

    const data = await response.json();

    return {
      nombre: data.nombre,
      nombre_cientifico: data.nombre_cientifico,
      descripcion: data.descripcion,
      cuidados: data.cuidados,
      imagen_url: data.imagen_url
    };


  } catch (error) {
    console.error("Error al cargar la planta:", error);
  }
}
  
  function renderComments() {
    const commentsContainer = document.getElementById("commentsList");
    commentsContainer.innerHTML = "";
  
    //const comments = JSON.parse(localStorage.getItem("comentarios") || "[]");
  
    comments.forEach(comentario => {
      const div = document.createElement("div");
      div.classList.add("comment");
      div.innerHTML = `<strong>${comentario.usuario}</strong><p>${comentario.texto}</p>`;
      commentsContainer.appendChild(div);
    });
  }
  
  function agregarComentario() {
    const usuario = document.getElementById("username").value.trim();
    const texto = document.getElementById("comment").value.trim();
  
    if (usuario && texto) {
      const nuevoComentario = { usuario, texto };
      const comentarios = JSON.parse(localStorage.getItem("comentarios") || "[]");
      comentarios.push(nuevoComentario);
      localStorage.setItem("comentarios", JSON.stringify(comentarios));
  
      document.getElementById("username").value = "";
      document.getElementById("comment").value = "";
  
      renderComments();
    } else {
      alert("Por favor, completa ambos campos.");
    }
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    console.log("Script cargado. Iniciando petición...");
    
  try {
    console.log("Iniciando solicitud a la API...");
    const planta = await cargarPlanta("3007");
    console.log("Planta obtenida:", planta);

    if (planta) {
      document.getElementById("plantName").textContent = planta.nombre;
      document.getElementById("scientificName").textContent = planta.nombre_cientifico;
      document.getElementById("plantDescription").textContent = planta.descripcion;
      document.getElementById("plantImage").src = planta.imagen_url;
      document.getElementById("plantImage").alt = planta.nombre;
      document.getElementById("plantCare").textContent = planta.cuidados;
    }

    // Configurar comentarios
    document.getElementById("commentBtn").addEventListener("click", agregarComentario);
    renderComments();

    } catch (error) {
    console.error("Error al cargar los datos de la planta:", error);
  }
});
