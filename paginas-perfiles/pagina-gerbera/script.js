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

  fetch("http://localhost:5000/obtener_comentarios?id=3003") 
      .then(response => response.json()) 
      .then(comments => {
          comments.forEach(comentario => {
              const div = document.createElement("div");
            div.classList.add("comment");
            div.setAttribute("data-id", comentario.id_comentario);

            div.innerHTML = `
                <strong>${comentario.usuario}</strong>
                <p>${comentario.descripcion}</p>
            `;

            const replyButton = document.createElement("button");
            replyButton.classList.add("reply-btn");

            replyButton.addEventListener("click", () => {
                mostrarCajaRespuesta(comentario.id_comentario);
            });

            div.appendChild(replyButton); // Agregar el botón al comentario
            commentsContainer.appendChild(div);

              fetch(`http://localhost:5000/obtener_respuestas?id=${comentario.id_comentario}`) 
                  .then(response => response.json()) 
                  .then(comments => {
                    comments.forEach(comentario => {
                        const div = document.createElement("div");
                        div.classList.add("comment");
                        div.innerHTML = `<strong>Respuesta de ${comentario.usuario}</strong><p>${comentario.descripcion}</p>`; 
                        commentsContainer.appendChild(div);
          });
      })
      .catch(error => console.error("Error al obtener comentarios:", error));
          });
      })
      .catch(error => console.error("Error al obtener comentarios:", error));
}

function mostrarCajaRespuesta(idComentario) {
    const comentarioDiv = document.querySelector(`[data-id="${idComentario}"]`);

    if (comentarioDiv.querySelector(".respuesta-form")) return;

    const respuestaDiv = document.createElement("div");
    respuestaDiv.classList.add("respuesta-form");

    const textarea = document.createElement("textarea");
    textarea.id = `respuesta-${idComentario}`;
    textarea.placeholder = "Escribe tu respuesta...";

    const enviarBtn = document.createElement("button");
    enviarBtn.classList.add("enviar-btn");

    enviarBtn.addEventListener("click", () => agregarRespuesta(idComentario));

    respuestaDiv.appendChild(textarea);
    respuestaDiv.appendChild(enviarBtn);
    comentarioDiv.appendChild(respuestaDiv);
}

document.addEventListener("DOMContentLoaded", () => {
    const comentarioForm = document.getElementById("commentForm");
    const idUsuario = sessionStorage.getItem("id_usuario"); 

    if (!idUsuario) {
        comentarioForm.style.display = "none"; 
    }

    document.getElementById("commentBtn").addEventListener("click", () => {
        agregarComentario(3003); 
    });
});

async function agregarComentario(idPlanta) {
    const idUsuario = sessionStorage.getItem("id_usuario");
    const descripcion = document.getElementById("comment").value.trim();

    if (!idUsuario) {
        alert("Debes iniciar sesión para comentar.");
        return;
    }

    if (!descripcion) {
        alert("Por favor, escribe un comentario.");
        return;
    }

    const comentarioData = {
        id_planta: idPlanta,
        id_usuario: idUsuario,
        descripcion: descripcion
    };

    try {
        const response = await fetch("http://127.0.0.1:5000/comentar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comentarioData)
        });

        const resultado = await response.json();

        if (response.ok) {
            window.location.reload();
            document.getElementById("comment").value = ""; 
        } else {
            alert(`Error: ${resultado.error || "No se pudo registrar el comentario"}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function agregarRespuesta(idComentario) {
    const idUsuario = sessionStorage.getItem("id_usuario");
    const descripcion = document.getElementById(`respuesta-${idComentario}`).value.trim();


    if (!idUsuario) {
        alert("Debes iniciar sesión para responder.");
        return;
    }

    if (!descripcion) {
        alert("Por favor, escribe una respuesta.");
        return;
    }

    const respuestaData = {
        id_comentario: idComentario,
        id_usuario: idUsuario,
        descripcion: descripcion
    };

    try {
        const response = await fetch("http://127.0.0.1:5000/responder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(respuestaData)
        });

        const resultado = await response.json();

        if (response.ok) {
            window.location.reload();
            document.getElementById("comment").value = ""; 
        } else {
            alert(`Error: ${resultado.error || "No se pudo registrar la respuesta"}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const idUsuario = sessionStorage.getItem("id_usuario"); 

    document.getElementById("favoriteBtn").addEventListener("click", () => {
        agregarFavorito(3003); 
    });
});

async function agregarFavorito(idPlanta) {
    const idUsuario = sessionStorage.getItem("id_usuario");

    if (!idUsuario) {
        alert("Debes iniciar sesión para agregar un favorito");
        return;
    }

    const favoritoData = {
        id_planta: idPlanta,
        id_usuario: idUsuario
    };

    try {
        const response = await fetch("http://127.0.0.1:5000/agregar_favorito", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(favoritoData)
        });

        const resultado = await response.json();

        if (response.ok) {
          alert("Agregado a favoritos")
        } else {
            alert(`Error: ${resultado.error || "No se pudo registrar el comentario"}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
  
  document.addEventListener("DOMContentLoaded", async () => {
    console.log("Script cargado. Iniciando petición...");
    
  try {
    console.log("Iniciando solicitud a la API...");
    const planta = await cargarPlanta("3003");
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
