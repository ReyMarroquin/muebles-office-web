// sidebar.js - Versión corregida y optimizada

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    // Verificar si los elementos existen
    if (!sidebar || !sidebarToggle) {
        console.error('Elementos del sidebar no encontrados');
        return;
    }
    
    // Estado inicial
    let isMobile = window.innerWidth <= 1024;
    
    // Función para verificar si estamos en móvil
    function checkMobile() {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 1024;
        
        // Si cambió de desktop a móvil o viceversa
        if (wasMobile !== isMobile) {
            resetSidebarState();
        }
        
        // Mostrar/ocultar overlay según sea móvil
        if (sidebarOverlay) {
            if (isMobile) {
                sidebarOverlay.style.display = 'block';
                // Asegurar que overlay esté oculto inicialmente
                sidebarOverlay.classList.remove('active');
            } else {
                sidebarOverlay.style.display = 'none';
                sidebarOverlay.classList.remove('active');
            }
        }
        
        // Asegurar que sidebar esté cerrado
        if (!isMobile && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Resetear estado del sidebar
    function resetSidebarState() {
        sidebar.classList.remove('active');
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
    
    // Toggle del sidebar
    function toggleSidebar() {
        // Solo funcionar en móvil
        if (!isMobile) return;
        
        sidebar.classList.toggle('active');
        if (sidebarOverlay) {
            sidebarOverlay.classList.toggle('active');
        }
        
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Cerrar sidebar
    function closeSidebar() {
        if (!isMobile) return;
        
        sidebar.classList.remove('active');
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
    
    // Setup inicial
    function setupSidebar() {
        // Configurar botón toggle
        sidebarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
        
        // Configurar overlay (si existe)
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', closeSidebar);
        }
        
        // Configurar enlaces del sidebar
        const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Solo cerrar si es enlace interno (no a otra página)
                if (this.getAttribute('href').startsWith('#') || 
                    this.getAttribute('href').includes(window.location.pathname)) {
                    e.preventDefault();
                    
                    // Si es ancla, hacer scroll suave
                    if (this.getAttribute('href').startsWith('#')) {
                        const targetId = this.getAttribute('href');
                        if (targetId !== '#') {
                            const targetElement = document.querySelector(targetId);
                            if (targetElement) {
                                const headerHeight = 70;
                                const targetPosition = targetElement.offsetTop - headerHeight;
                                
                                window.scrollTo({
                                    top: targetPosition,
                                    behavior: 'smooth'
                                });
                            }
                        }
                    }
                    
                    closeSidebar();
                }
                // Si es enlace a otra página, se navegará normalmente
            });
        });
        
        // Cerrar con tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        });
        
        // Cerrar al hacer clic fuera en móvil
        document.addEventListener('click', function(e) {
            if (isMobile && sidebar.classList.contains('active')) {
                // Si el clic no es en el sidebar ni en el botón toggle
                if (!sidebar.contains(e.target) && 
                    e.target !== sidebarToggle && 
                    !sidebarToggle.contains(e.target)) {
                    
                    // Si el overlay está visible, cerrar
                    if (sidebarOverlay && sidebarOverlay.classList.contains('active')) {
                        closeSidebar();
                    }
                }
            }
        });
    }
    
    // Inicializar
    checkMobile();
    setupSidebar();
    
    // Redimensionamiento con debounce
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            checkMobile();
        }, 250);
    });
    
    // Limpiar al salir de la página
    window.addEventListener('beforeunload', function() {
        resetSidebarState();
    });
});