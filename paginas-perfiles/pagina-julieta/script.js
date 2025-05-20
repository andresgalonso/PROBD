const planta = {
    nombre: "Julieta",
    nombre_cientifico: "Epipremnum aureum",
    descripcion: "es una planta trepadora o colgante muy popular como planta de interior por su resistencia y fácil cuidado. Sus hojas son en forma de corazón y pueden presentar una combinación de colores verde con manchas o vetas amarillas o blancas. Esta planta es ideal para decorar espacios interiores, ya que crece bien en macetas colgantes o como planta de escritorio, y ayuda a purificar el aire.",
    imagen_url: "../../fotos/plantas/Julieta.png", // Cambia esta ruta según la estructura de tu proyecto
    cuidados: "Debe ubicarse en un lugar con luz indirecta, ya que puede adaptarse a poca luz, pero el color de las hojas se reduce. El riego debe ser moderado, permitiendo que la capa superficial del sustrato se seque entre riegos para evitar encharcamientos. Requiere un suelo con buen drenaje y un ambiente con humedad moderada. Es aconsejable limpiar las hojas para eliminar el polvo."
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
  