// background-changer.js - JavaScript para el cambio automático de fondos
document.addEventListener('DOMContentLoaded', function() {
    const backgroundSlides = document.querySelectorAll('.background-slide');
    let currentSlide = 0;
    let changeTimer;
    const changeInterval = 5000; // Cambiar cada 5 segundos
    
    // Función para cambiar al siguiente fondo
    function changeBackground() {
        // Ocultar slide actual
        backgroundSlides[currentSlide].classList.remove('active');
        
        // Avanzar al siguiente slide
        currentSlide = (currentSlide + 1) % backgroundSlides.length;
        
        // Mostrar nuevo slide
        backgroundSlides[currentSlide].classList.add('active');
    }
    
    // Iniciar el cambio automático
    function startBackgroundChange() {
        changeTimer = setInterval(changeBackground, changeInterval);
    }
    
    // Pausar el cambio cuando el usuario interactúa
    function pauseBackgroundChange() {
        clearInterval(changeTimer);
    }
    
    // Reanudar el cambio automático
    function resumeBackgroundChange() {
        startBackgroundChange();
    }
    
    // Event listeners para pausar/reanudar
    const heroSection = document.querySelector('.hero-ley-silla');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', pauseBackgroundChange);
        heroSection.addEventListener('mouseleave', resumeBackgroundChange);
        
        // Para dispositivos táctiles
        heroSection.addEventListener('touchstart', pauseBackgroundChange);
        heroSection.addEventListener('touchend', resumeBackgroundChange);
    }
    
    // Iniciar el cambio automático
    startBackgroundChange();
    
    // Pausar cuando la pestaña no está visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            pauseBackgroundChange();
        } else {
            resumeBackgroundChange();
        }
    });
    
    // Efectos adicionales para el texto
    const heroTitle = document.querySelector('.hero-title.es-lang');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Iniciar efecto de escritura cuando la imagen esté cargada
        setTimeout(typeWriter, 1000);
    }
});