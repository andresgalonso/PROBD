const planta = {
    nombre: "Peonía",
    nombre_cientifico: "Paeonia officinalis",
    descripcion: "La peonía es una planta perenne que destaca por sus grandes flores globosas, densamente llenas de pétalos suaves y sedosos, que pueden ser de colores variados como rosa, blanco, rojo o púrpura. Sus hojas son anchas, verdes y divididas en folíolos, y la planta suele alcanzar entre 60 y 90 cm de altura.",
    imagen_url: "/home/usuario/proyecto-bd/fotos/flores/Peonia.png", // Cambia esta ruta según la estructura de tu proyecto
    cuidados: "Las peonías son plantas que requieren cuidados específicos para prosperar y lucir sus hermosas flores. Prefieren ubicaciones con buena exposición al sol, aunque en climas muy cálidos agradecen algo de sombra parcial durante las horas más intensas. Es importante plantarlas en suelos bien drenados y ricos en materia orgánica para evitar encharcamientos que puedan pudrir las raíces. Durante la temporada de crecimiento, deben regarse regularmente, manteniendo la tierra húmeda pero sin exceso. Además, es recomendable aplicar un fertilizante equilibrado al inicio de la primavera para estimular un buen desarrollo. En invierno, las peonías toleran el frío, pero es útil cubrir la base con una capa de mantillo para protegerlas de las heladas intensas. Por último, se deben podar las partes secas o dañadas después de la floración para mantener la planta saludable."
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
  