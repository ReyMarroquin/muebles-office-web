// DETECCIÓN DEL NAVEGADOR Y DISPOSITIVO
function detectBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Chrome") > -1) return "Chrome";
    if (userAgent.indexOf("Firefox") > -1) return "Firefox";
    if (userAgent.indexOf("Safari") > -1) return "Safari";
    if (userAgent.indexOf("Edge") > -1) return "Edge";
    return "Otro navegador";
}

function detectDevice() {
    const width = window.innerWidth;
    if (width < 768) return "Móvil";
    if (width < 1024) return "Tablet";
    return "Escritorio";
}

// ACTUALIZAR INFORMACIÓN DEL SISTEMA
function updateSystemInfo() {
    document.getElementById('browserInfo').textContent = detectBrowser();
    document.getElementById('deviceInfo').textContent = detectDevice();
}

// TOGGLE DEL PANEL DE ACCESIBILIDAD
function initAccessibilityToggle() {
    const toggle = document.getElementById('accessibilityToggle');
    const panel = document.getElementById('accessibilityPanel');
    
    toggle.addEventListener('click', function() {
        panel.classList.toggle('open');
    });
    
    // Cerrar panel al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        if (!panel.contains(event.target) && !toggle.contains(event.target)) {
            panel.classList.remove('open');
        }
    });
}

// GESTIÓN DE TEMAS
function initThemeManager() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            themeButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase activa al botón clickeado
            this.classList.add('active');
            
            const theme = this.getAttribute('data-theme');
            applyTheme(theme);
        });
    });
}

function applyTheme(theme) {
    // Remover clases de tema existentes
    document.body.classList.remove('dark-mode', 'light-mode');
    
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        // Modo automático - usar preferencia del sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.add('light-mode');
        }
        localStorage.setItem('theme', 'auto');
    }
}

// GESTIÓN DE IDIOMAS
function initLanguageManager() {
    const languageButtons = document.querySelectorAll('.language-btn');
    
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            languageButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase activa al botón clickeado
            this.classList.add('active');
            
            const lang = this.getAttribute('data-lang');
            applyLanguage(lang);
            
            // Actualizar la clase "active" en los enlaces del header
            updateActiveNavLinks(lang);
        });
    });
}

function applyLanguage(lang) {
    // Cambiar idioma - usando CSS para mostrar/ocultar
    if (lang === 'en') {
        document.body.classList.add('english');
    } else {
        document.body.classList.remove('english');
    }
    
    localStorage.setItem('language', lang);
    
    // También actualizar el atributo lang del html
    document.documentElement.lang = lang;
}

function updateActiveNavLinks(lang) {
    // Remover clase active de todos los enlaces de navegación
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Agregar clase active solo al enlace del idioma actual
    if (lang === 'en') {
        // Encontrar el enlace inglés que corresponda a la página actual
        const currentPage = window.location.pathname.split('/').pop();
        const englishLink = document.querySelector(`.nav-links a.en-lang[href="${currentPage}"]`);
        if (englishLink) {
            englishLink.classList.add('active');
        }
    } else {
        // Encontrar el enlace español que corresponda a la página actual
        const currentPage = window.location.pathname.split('/').pop();
        const spanishLink = document.querySelector(`.nav-links a.es-lang[href="${currentPage}"]`);
        if (spanishLink) {
            spanishLink.classList.add('active');
        }
    }
}

// GESTIÓN DE TAMAÑOS DE TEXTO
function initTextSizeManager() {
    const textSizeButtons = document.querySelectorAll('.text-size-btn');
    
    textSizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            textSizeButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase activa al botón clickeado
            this.classList.add('active');
            
            const size = this.getAttribute('data-size');
            applyTextSize(size);
        });
    });
}

function applyTextSize(size) {
    // Remover clases de tamaño existentes
    document.body.classList.remove('text-large', 'text-very-large');
    
    if (size === 'large') {
        document.body.classList.add('text-large');
    } else if (size === 'very-large') {
        document.body.classList.add('text-very-large');
    }
    
    localStorage.setItem('textSize', size);
}

// CARGAR PREFERENCIAS GUARDADAS AL INICIAR
function loadSavedPreferences() {
    // Cargar tema
    const savedTheme = localStorage.getItem('theme') || 'light';
    const themeButton = document.querySelector(`.theme-btn[data-theme="${savedTheme}"]`);
    if (themeButton) {
        themeButton.click();
    }
    
    // Cargar idioma
    const savedLanguage = localStorage.getItem('language') || 'es';
    const languageButton = document.querySelector(`.language-btn[data-lang="${savedLanguage}"]`);
    if (languageButton) {
        languageButton.click();
    }
    
    // Cargar tamaño de texto
    const savedTextSize = localStorage.getItem('textSize') || 'normal';
    const textSizeButton = document.querySelector(`.text-size-btn[data-size="${savedTextSize}"]`);
    if (textSizeButton) {
        textSizeButton.click();
    }
}

// DETECTAR CAMBIOS EN LA PREFERENCIA DEL SISTEMA (solo para modo auto)
function initSystemPreferenceListener() {
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (localStorage.getItem('theme') === 'auto') {
                if (e.matches) {
                    document.body.classList.add('dark-mode');
                    document.body.classList.remove('light-mode');
                } else {
                    document.body.classList.add('light-mode');
                    document.body.classList.remove('dark-mode');
                }
            }
        });
    }
}

// INICIALIZAR TODAS LAS FUNCIONALIDADES
document.addEventListener('DOMContentLoaded', function() {
    updateSystemInfo();
    initAccessibilityToggle();
    initThemeManager();
    initLanguageManager();
    initTextSizeManager();
    loadSavedPreferences();
    initSystemPreferenceListener();
    
    // Actualizar información del sistema al redimensionar
    window.addEventListener('resize', updateSystemInfo);
    
    // Inicializar los enlaces activos según el idioma
    const savedLanguage = localStorage.getItem('language') || 'es';
    updateActiveNavLinks(savedLanguage);
});