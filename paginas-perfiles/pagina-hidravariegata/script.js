const planta = {
    nombre: "Hidra Variegata",
    nombre_cientifico: "Marginata Elegantissima",
    descripcion: "La Hidra Variegata es una variedad de hiedra común que se distingue por sus hojas con bordes blancos o amarillos, lo que le da un aspecto decorativo muy atractivo. Es una planta trepadora o colgante que pertenece a la familia Araliaceae. Sus hojas son lobuladas y de textura algo coriácea. Se utiliza frecuentemente en interiores",
    imagen_url: "/home/usuario/proyecto-bd/fotos/plantas/Hidra Variegata.png", // Cambia esta ruta según la estructura de tu proyecto
    cuidados: "Prefiere lugares con luz indirecta, ya que la luz solar directa puede quemar las hojas, aunque necesita buena iluminación para conservar el color variegado. El riego debe ser moderado, permitiendo que la capa superior del sustrato se seque antes de volver a regar. Requiere un sustrato bien drenado y un ambiente húmedo, por lo que es recomendable pulverizar las hojas si el entorno es muy seco. No tolera bien las temperaturas extremas ni las corrientes de aire."
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
  