function toggleLista(id) {
    const lista = document.getElementById(id);
    const otrasListas = document.querySelectorAll('.lista-oculta');
  
    // Cierra otras listas abiertas
    otrasListas.forEach(l => {
      if (l.id !== id) l.style.display = 'none';
    });
  
    // Alterna visibilidad
    lista.style.display = (lista.style.display === 'block') ? 'none' : 'block';
  }
  