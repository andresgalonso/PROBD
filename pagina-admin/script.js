// ===== CÓDIGO PARA LOS POPUPS =====
// Abrir popup de "Agregar"
document.querySelector(".opcion-agregar").addEventListener("click", () => {
    document.getElementById("add-popup").classList.add("active");
    document.querySelector("#add-popup .form-popup").classList.add("active");
});

// Abrir popup de "Eliminar" (ahora será de Consultas)
document.querySelector(".opcion-eliminar").addEventListener("click", () => {
    document.getElementById("consultas-popup").classList.add("active");
    document.querySelector("#consultas-popup .form-popup").classList.add("active");
    cargarEstadisticas(); // Cargar datos cuando se abre
});

// Abrir popup de "Consultas" (si decides añadir un tercer botón)
// document.querySelector(".opcion-consultas").addEventListener("click", () => {
//     document.getElementById("consultas-popup").classList.add("active");
//     document.querySelector("#consultas-popup .form-popup").classList.add("active");
//     cargarEstadisticas();
// });

// Cerrar popups
document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const popup = e.target.closest(".blur-bg-overlay");
        popup.classList.remove("active");
        popup.querySelector(".form-popup").classList.remove("active");
    });
});

// Cerrar al hacer clic fuera
document.querySelectorAll(".blur-bg-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.classList.remove("active");
            overlay.querySelector(".form-popup").classList.remove("active");
        }
    });
});

// ===== ANIMACIÓN PARA INPUTS =====
document.querySelectorAll(".input-field input").forEach(input => {
    input.addEventListener("focus", () => {
        input.parentNode.querySelector("label").classList.add("active");
    });
    input.addEventListener("blur", () => {
        if (input.value === "") {
            input.parentNode.querySelector("label").classList.remove("active");
        }
    });
    
    // Inicializar labels si hay valores precargados
    if (input.value !== "") {
        input.parentNode.querySelector("label").classList.add("active");
    }
});

// ===== INPUT FILE PERSONALIZADO =====
const fileInput = document.getElementById('ad-plant-image');
const customButton = document.querySelector('.custom-button');
const customText = document.querySelector('.custom-text');

if (fileInput && customButton && customText) {
    customButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            customText.textContent = fileInput.files[0].name;
        } else {
            customText.textContent = 'Ningún archivo seleccionado';
        }
    });
}

// ===== FUNCIONES PARA CONSULTAS =====
function cargarEstadisticas() {
    // Datos de ejemplo - reemplazar con llamadas reales a tu API
    actualizarContador('total-plantas', 127);
    actualizarContador('total-usuarios', 58);
    actualizarContador('plantas-primavera', 42);
    actualizarContador('plantas-verano', 35);
    actualizarContador('plantas-otono', 28);
    actualizarContador('plantas-invierno', 22);
    
    // Configurar el selector de regiones
    const selectorRegion = document.getElementById('selector-region');
    if (selectorRegion) {
        selectorRegion.addEventListener('change', function() {
            const region = this.value;
            const resultadoRegion = document.getElementById('resultado-region');
            
            if (region) {
                // Simulación de datos por región
                const datosUsuariosPorRegion = {
                    norte: 12,
                    centro: 20,
                    sur: 9,
                    este: 7,
                    oeste: 10,
                    oceania: 20
                };
                
                resultadoRegion.innerHTML = `
                    <strong>${this.options[this.selectedIndex].text}:</strong> 
                    ${datosUsuariosPorRegion[region]} usuarios registrados
                `;
                
            } else {
                resultadoRegion.textContent = 'Seleccione una región para ver resultados';
            }
        });
    }
}

// Función para animar los contadores
function actualizarContador(id, valorFinal) {
    const elemento = document.getElementById(id);
    if (!elemento) return;
    
    let valorActual = 0;
    const incremento = valorFinal / 20; // Ajusta la velocidad
    
    const intervalo = setInterval(() => {
        valorActual += incremento;
        if (valorActual >= valorFinal) {
            clearInterval(intervalo);
            valorActual = valorFinal;
        }
        elemento.textContent = Math.floor(valorActual);
    }, 50);
}

// Inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
    // Si hay algún elemento que necesite inicialización inmediata
});