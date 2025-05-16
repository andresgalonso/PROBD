const planta = {
    nombre: "Calatea Rosa",
    nombre_cientifico: "Calathea roseopicta",
    descripcion: "Es una planta tropical muy apreciada por su atractivo follaje. Sus hojas son grandes, ovaladas y muestran un hermoso contraste entre el verde oscuro del fondo y los patrones rosados o lilas que parecen estar “pintados” sobre ellas. El reverso de las hojas suele ser púrpura, lo que la hace aún más decorativa.",
    imagen_url: "/home/usuario/proyecto-bd/fotos/plantas/Calatea rosa.png", // Cambia esta ruta según la estructura de tu proyecto
    cuidados: "Debe colocarse en un sitio con luz indirecta, ya que el sol directo puede dañar el color y la textura de las hojas. Se necesita un ambiente cálido y con buena humedad ambiental, evitando corrientes de aire. Es recomendable pulverizar las hojas con agua regularmente. El riego debe ser frecuente pero moderado, manteniendo el sustrato húmedo sin encharcar. Lo mejor es usar agua sin cal para evitar manchas."
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
  