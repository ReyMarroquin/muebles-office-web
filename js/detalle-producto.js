// JavaScript para el carrusel automático
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del carrusel
    const carruselSlides = document.getElementById('carruselSlides');
    const slides = document.querySelectorAll('.carrusel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('carruselPrev');
    const nextBtn = document.getElementById('carruselNext');
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    // Función para mostrar slide específico
    function showSlide(index) {
        // Asegurar que el índice esté dentro del rango
        if (index < 0) {
            currentSlide = slides.length - 1;
        } else if (index >= slides.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        // Mover el carrusel
        carruselSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlide);
        });
        
        // Actualizar items de galería
        const galeriaItems = document.querySelectorAll('.galeria-item');
        galeriaItems.forEach((item, i) => {
            item.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Función para siguiente slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Función para slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Iniciar carrusel automático
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000); // Cambia cada 4 segundos
    }
    
    // Detener carrusel automático
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
    
    // Event listeners para items de galería
    const galeriaItems = document.querySelectorAll('.galeria-item');
    galeriaItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
    
    // Pausar carrusel al hacer hover
    const carruselContainer = document.querySelector('.carrusel-container');
    if (carruselContainer) {
        carruselContainer.addEventListener('mouseenter', stopAutoSlide);
        carruselContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Iniciar carrusel automático
    startAutoSlide();
    
    // JavaScript para la galería de imágenes
    const galeriaItemsStatic = document.querySelectorAll('.galeria-item');
    
    galeriaItemsStatic.forEach(item => {
        item.addEventListener('click', function() {
            const nuevaImagen = this.getAttribute('data-image');
            
            // Remover clase active de todos los items
            galeriaItemsStatic.forEach(i => i.classList.remove('active'));
            
            // Agregar clase active al item clickeado
            this.classList.add('active');
        });
    });

    // JavaScript para cambiar entre productos
    const verDetalleBtns = document.querySelectorAll('.ver-detalle-btn');
    
    verDetalleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const producto = this.getAttribute('data-producto');
            // Aquí puedes agregar lógica para cambiar entre productos
            console.log('Cambiar a producto:', producto);
        });
    });
});