const planta = {
    nombre: "Gerbera",
    nombre_cientifico: "Gerbera jamesonii",
    descripcion: "La gerbera es una planta ornamental muy llamativa, conocida por sus grandes flores parecidas a las margaritas. Pertenece a la familia Asteraceae y sus flores pueden encontrarse en una amplia variedad de colores como rosa, rojo, naranja, amarillo y blanco. Su tallo es largo y sin hojas, mientras que el follaje en la base es verde y alargado",
    imagen_url: "/home/usuario/proyecto-bd/fotos/flores/Gerbera.png", // Cambia esta ruta según la estructura de tu proyecto
    cuidados: "La gerbera necesita mucha luz, preferiblemente sol directo por unas horas al día, pero también puede crecer en semisombra. El riego debe ser regular, manteniendo el suelo ligeramente húmedo pero sin encharcar, ya que el exceso de agua puede provocar hongos en las raíces. El sustrato debe ser ligero y bien drenado. "
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
  