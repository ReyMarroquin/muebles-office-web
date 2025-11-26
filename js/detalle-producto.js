// JavaScript para la página de detalles del producto
document.addEventListener('DOMContentLoaded', function() {
    // Galería de imágenes
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const miniaturas = document.querySelectorAll('.miniatura');
    const imagenPrincipal = document.getElementById('productoImagen');
    
    function cambiarImagen(nuevaImagen, elemento) {
        galeriaItems.forEach(i => i.classList.remove('active'));
        miniaturas.forEach(m => m.classList.remove('active'));
        
        if (elemento) elemento.classList.add('active');
        
        if (imagenPrincipal && nuevaImagen) {
            imagenPrincipal.style.opacity = '0';
            setTimeout(() => {
                imagenPrincipal.src = nuevaImagen;
                imagenPrincipal.style.opacity = '1';
            }, 300);
        }
    }
    
    galeriaItems.forEach(item => {
        item.addEventListener('click', function() {
            const nuevaImagen = this.getAttribute('data-image');
            cambiarImagen(nuevaImagen, this);
        });
    });
    
    miniaturas.forEach(miniatura => {
        miniatura.addEventListener('click', function() {
            const nuevaImagen = this.getAttribute('data-image');
            cambiarImagen(nuevaImagen, this);
            
            galeriaItems.forEach(item => {
                if (item.getAttribute('data-image') === nuevaImagen) {
                    item.classList.add('active');
                }
            });
        });
    });
    
    // Botón de ficha técnica
    const btnFichaTecnica = document.querySelector('.btn-secondary');
    
    if (btnFichaTecnica) {
        btnFichaTecnica.addEventListener('click', function() {
            // Simular descarga de ficha técnica
            alert('Descargando ficha técnica en formato PDF...');
        });
    }
    
    // Efectos de hover mejorados
    const especItems = document.querySelectorAll('.espec-item');
    const accesorioCards = document.querySelectorAll('.accesorio-card');
    
    especItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    accesorioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animaciones de entrada
    const elementosAnimados = document.querySelectorAll('.producto-info, .producto-visual, .espec-categoria, .accesorio-card');
    
    const observerAnimaciones = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elementosAnimados.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observerAnimaciones.observe(elemento);
    });
    
    // Preloader para imágenes
    const imagenes = document.querySelectorAll('img');
    imagenes.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('cargada');
        });
        
        // Fallback para imágenes que ya están cargadas
        if (img.complete) {
            img.classList.add('cargada');
        }
    });
    
    // Manejo de errores de imágenes
    imagenPrincipal.addEventListener('error', function() {
        this.src = 'Imagenes/placeholder-producto.jpg';
        this.alt = 'Imagen no disponible';
    });
    
    // Actualizar información del sistema en panel de accesibilidad
    function actualizarInfoSistema() {
        const browserInfo = document.getElementById('browserInfo');
        const deviceInfo = document.getElementById('deviceInfo');
        
        if (browserInfo) {
            browserInfo.textContent = navigator.userAgent.split(' ')[0];
        }
        
        if (deviceInfo) {
            const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            deviceInfo.textContent = esMovil ? 'Móvil' : 'Escritorio';
        }
    }
    
    actualizarInfoSistema();
    
    // Manejo de idioma
    function cambiarIdioma(idioma) {
        const elementosEs = document.querySelectorAll('.es-lang');
        const elementosEn = document.querySelectorAll('.en-lang');
        
        if (idioma === 'es') {
            elementosEs.forEach(el => el.style.display = 'block');
            elementosEn.forEach(el => el.style.display = 'none');
        } else {
            elementosEs.forEach(el => el.style.display = 'none');
            elementosEn.forEach(el => el.style.display = 'block');
        }
        
        // Guardar preferencia
        localStorage.setItem('idiomaPreferido', idioma);
    }
    
    // Aplicar idioma guardado
    const idiomaGuardado = localStorage.getItem('idiomaPreferido') || 'es';
    cambiarIdioma(idiomaGuardado);
    
    // Botones de idioma en panel de accesibilidad
    const botonesIdioma = document.querySelectorAll('.language-btn');
    botonesIdioma.forEach(boton => {
        boton.addEventListener('click', function() {
            const idioma = this.getAttribute('data-lang');
            cambiarIdioma(idioma);
            
            // Actualizar estado activo
            botonesIdioma.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Funciones globales para reutilizar
window.productoDetalle = {
    cambiarImagen: function(nuevaImagen, elemento) {
        const galeriaItems = document.querySelectorAll('.galeria-item');
        const miniaturas = document.querySelectorAll('.miniatura');
        const imagenPrincipal = document.getElementById('productoImagen');
        
        galeriaItems.forEach(i => i.classList.remove('active'));
        miniaturas.forEach(m => m.classList.remove('active'));
        
        if (elemento) elemento.classList.add('active');
        
        if (imagenPrincipal && nuevaImagen) {
            imagenPrincipal.style.opacity = '0';
            setTimeout(() => {
                imagenPrincipal.src = nuevaImagen;
                imagenPrincipal.style.opacity = '1';
            }, 300);
        }
    }
    
};

