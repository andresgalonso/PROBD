const planta = {
    nombre: "Albahaca",
    nombre_cientifico: "Ocimum basilicum",
    descripcion: "La albahaca es una planta aromática muy apreciada en la cocina por su fragancia y sabor. Pertenece a la familia de las Lamiáceas y se caracteriza por sus hojas verdes, ovaladas y suaves, que desprenden un aroma intenso. Puede producir pequeñas flores blancas o lilas, y su altura varía entre 30 y 60 centímetros",
    imagen_url: "/home/usuario/proyecto-bd/fotos/plantas/Albahaca.png", // Cambia esta ruta según la estructura de tu proyecto
    cuidados: "Necesita estar en un lugar soleado, recibiendo al menos 4 a 6 horas de luz directa al día. El riego debe ser frecuente pero moderado, manteniendo el sustrato húmedo sin encharcar. Es importante plantarla en un suelo fértil, bien drenado y aireado. No tolera bien las temperaturas bajas, por lo que debe protegerse del frío."
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
  