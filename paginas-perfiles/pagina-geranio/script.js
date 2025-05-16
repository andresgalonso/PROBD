const planta = {
    nombre: "Geranio",
    nombre_cientifico: "Geranium",
    descripcion: "El geranio es una planta ornamental perteneciente al género Pelargonium, muy apreciada por sus flores coloridas y su aroma agradable. Sus flores pueden ser de varios colores, como rojo, rosa, blanco o púrpura, y sus hojas son verdes, lobuladas y a veces con bordes dentados. Es común verlo en jardines, balcones y macetas, ya que se adapta bien a diferentes entornos y aporta un toque decorativo.",
    imagen_url: "/home/usuario/proyecto-bd/fotos/flores/Geranio.png", // Cambia esta ruta según la estructura de tu proyecto
    cuidados: "El geranio necesita estar en un lugar con buena exposición al sol para florecer adecuadamente. Requiere riegos moderados, permitiendo que el sustrato se seque ligeramente entre riegos, ya que no tolera el exceso de agua. El suelo debe tener buen drenaje para evitar la pudrición de las raíces. Se recomienda podar las flores marchitas para estimular nuevas floraciones y aplicar fertilizante cada dos o tres semanas durante la primavera y el verano. "
  };
  
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
  
  document.addEventListener("DOMContentLoaded", () => {
    // Mostrar datos de la planta
    document.getElementById("plantName").textContent = planta.nombre;
    document.getElementById("scientificName").textContent = planta.nombre_cientifico;
    document.getElementById("plantDescription").textContent = planta.descripcion;
    document.getElementById("plantImage").src = planta.imagen_url;
    document.getElementById("plantImage").alt = planta.nombre;
    document.getElementById("plantCare").textContent = planta.cuidados;
  
    // Configurar comentarios
    document.getElementById("commentBtn").addEventListener("click", agregarComentario);
    renderComments();
  });
  