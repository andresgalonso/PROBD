const planta = {
    nombre: "Dalia",
    nombre_cientifico: "Dahlia",
    descripcion: "La dalia es una planta perenne y tuberosa originaria de México y América Central. Destaca por sus flores vistosas y coloridas, con gran variedad de formas y tonos, desde blanco hasta rojo intenso, incluyendo púrpura, naranja y mezclas bicolores. Puede medir entre 30 cm y 1.5 m de altura, y su follaje verde y dividido sigue siendo atractivo incluso fuera de floración.",
    imagen_url: "/home/usuario/proyecto-bd/fotos/flores/Dalia.png", // Cambia esta ruta según la estructura de tu proyecto
    cuidados: "Las dalias necesitan luz solar directa, aunque en climas muy calurosos se benefician de algo de sombra parcial. Prefieren suelos bien drenados y ricos en nutrientes. Durante su crecimiento, riega con regularidad, manteniendo la tierra húmeda pero sin encharcar. Aplica fertilizante equilibrado en primavera para estimular la floración."
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
  