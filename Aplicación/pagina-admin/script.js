// ===== CÓDIGO PARA LOS POPUPS =====


// Abrir popup de  Consultas
document.querySelector(".opcion-eliminar").addEventListener("click", () => {
    document.getElementById("consultas-popup").classList.add("active");
    document.querySelector("#consultas-popup .form-popup").classList.add("active");
    cargarEstadisticas(); // Cargar datos cuando se abre
});


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



// ===== FUNCIONES PARA CONSULTAS =====
async function cargarEstadisticas() {
    const totales = await cargarTotales();
    const regiones = await cargarRegiones();
    actualizarContador('total-plantas', totales.plantas);
    actualizarContador('total-usuarios', totales.usuarios);
    actualizarContador('plantas-primavera', totales.primavera);
    actualizarContador('plantas-verano', totales.verano);
    actualizarContador('plantas-otono', totales.otoño);
    actualizarContador('plantas-invierno', totales.invierno);
    
    // Configurar el selector de regiones
    const selectorRegion = document.getElementById('selector-region');
    if (selectorRegion) {
        selectorRegion.addEventListener('change', function() {
            const region = this.value;
            const resultadoRegion = document.getElementById('resultado-region');
            
            if (region) {
                // Simulación de datos por región
                const datosUsuariosPorRegion = {
                    norte: regiones.AmericaNorte,
                    centro: regiones.AmericaSur,
                    sur: regiones.Africa,
                    este: regiones.Asia,
                    oeste: regiones.Europa,
                    oceania: regiones.Oceania
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

async function cargarTotales() {
  try {
    const response1 = await fetch(`http://127.0.0.1:5000/cantidadUsuarios`);
    const response2 = await fetch(`http://127.0.0.1:5000/cantidadPlantas`);
    const response3 = await fetch(`http://127.0.0.1:5000/cantidadEstacion?id=2000`);
    const response4 = await fetch(`http://127.0.0.1:5000/cantidadEstacion?id=2001`);
    const response5 = await fetch(`http://127.0.0.1:5000/cantidadEstacion?id=2002`);
    const response6 = await fetch(`http://127.0.0.1:5000/cantidadEstacion?id=2003`);
    
    if (!response1.ok) {
      throw new Error("No se pudo obtener el total de usuarios");
    }

    if (!response2.ok) {
      throw new Error("No se pudo obtener el total de plantas");
    }

    if (!response3.ok) {
      throw new Error("No se pudo obtener las plantas de primavera");
    }

    if (!response4.ok) {
      throw new Error("No se pudo obtener las plantas de verano");
    }

    if (!response5.ok) {
      throw new Error("No se pudo obtener las plantas de otoño");
    }

    if (!response6.ok) {
      throw new Error("No se pudo obtener las plantas de invierno");
    }

    const data1 = await response1.json();
    const data2 = await response2.json();
    const data3 = await response3.json();
    const data4 = await response4.json();
    const data5 = await response5.json();
    const data6 = await response6.json();

    return {
      usuarios: data1.total,
      plantas: data2.total,
      primavera: data3.total,
      verano: data4.total,
      otoño: data5.total,
      invierno: data6.total
    };


  } catch (error) {
    console.error("Error al cargar la planta:", error);
  }
}

async function cargarRegiones() {
  try {
    const response = await fetch(`http://127.0.0.1:5000/cantidadRegion`);
    
    if (!response.ok) {
      throw new Error("No se pudo obtener el total de usuarios");
    }

    const data = await response.json();

    return {
      AmericaNorte: data[4],
      AmericaSur: data[5],
      Africa: data[3],
      Asia: data[0],
      Europa: data[1],
      Oceania: data[2]
    };


  } catch (error) {
    console.error("Error al cargar la planta:", error);
  }
}