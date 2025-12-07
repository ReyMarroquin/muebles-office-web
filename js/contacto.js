// contacto.js - Funcionalidades para página de contacto

document.addEventListener('DOMContentLoaded', function() {
    // Configurar FAQ específicos de Ley Silla
    configurarFAQ();
    
    // Configurar animaciones para los nuevos elementos
    configurarAnimaciones();
});

function configurarFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const pregunta = item.querySelector('.faq-question');
        
        pregunta.addEventListener('click', function() {
            // Cerrar otros items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle item actual
            item.classList.toggle('active');
            
            // Animación suave para el contenido
            const respuesta = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                respuesta.style.maxHeight = respuesta.scrollHeight + 'px';
            } else {
                respuesta.style.maxHeight = '0';
            }
        });
    });
}

function configurarAnimaciones() {
    // Animación de aparición para elementos de Ley Silla FAQ
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Iniciar animación de entrada para los items FAQ
                if (entry.target.classList.contains('faq-item')) {
                    entry.target.style.animationPlayState = 'running';
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    const elementosAnimar = document.querySelectorAll('.contact-card, .form-container, .ley-silla-faq .faq-item');
    elementosAnimar.forEach(elemento => {
        if (elemento.classList.contains('faq-item')) {
            // Para FAQ items, usar animación CSS en lugar de transform/opacity
            elemento.style.opacity = '1';
            elemento.style.transform = 'none';
        } else {
            elemento.style.opacity = '0';
            elemento.style.transform = 'translateY(30px)';
            elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(elemento);
    });
}

// Función para inicializar mapa (si existe)
function inicializarMapa() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Código para inicializar mapa de Google
        console.log('Mapa listo para inicializar');
    }
}

// Manejo de errores de Google Maps
function gm_authFailure() {
    console.error('Error de autenticación con Google Maps');
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = `
            <div style="height:100%; display:flex; align-items:center; justify-content:center; background:#f5f5f5;">
                <div style="text-align:center;">
                    <i class="fas fa-map-marker-alt" style="font-size:48px; color:#ccc; margin-bottom:10px;"></i>
                    <p>Mapa no disponible temporalmente</p>
                    <a href="https://www.google.com/maps/place/JEMMSA/@31.6771011,-106.3734515,20z/data=!4m6!3m5!1s0x86e75d94b851cdb7:0x201492b5c0030859!8m2!3d31.6771103!4d-106.3733022!16s%2Fg%2F11fjtzw3zq?entry=ttu" 
                       target="_blank" class="btn btn-outline">
                        <i class="fas fa-external-link-alt"></i>
                        Ver en Google Maps
                    </a>
                </div>
            </div>
        `;
    }
}

// Añadir estilos para animaciones
const estilosAnimacion = document.createElement('style');
estilosAnimacion.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .form-group.success input,
    .form-group.success select,
    .form-group.success textarea {
        border-color: #28a745;
        box-shadow: 0 0 0 3px rgba(40,167,69,0.1);
    }
    
    .form-group.error input,
    .form-group.error select,
    .form-group.error textarea {
        border-color: #dc3545;
        box-shadow: 0 0 0 3px rgba(220,53,69,0.1);
    }
    
    .ley-silla-faq .faq-item {
        animation: fadeInUp 0.5s ease forwards;
        animation-play-state: paused;
        opacity: 0;
    }
    
    .ley-silla-faq .faq-item:nth-child(1) { animation-delay: 0.1s; }
    .ley-silla-faq .faq-item:nth-child(2) { animation-delay: 0.2s; }
    .ley-silla-faq .faq-item:nth-child(3) { animation-delay: 0.3s; }
    .ley-silla-faq .faq-item:nth-child(4) { animation-delay: 0.4s; }
    .ley-silla-faq .faq-item:nth-child(5) { animation-delay: 0.5s; }
    .ley-silla-faq .faq-item:nth-child(6) { animation-delay: 0.6s; }
    .ley-silla-faq .faq-item:nth-child(7) { animation-delay: 0.7s; }
    .ley-silla-faq .faq-item:nth-child(8) { animation-delay: 0.8s; }
    .ley-silla-faq .faq-item:nth-child(9) { animation-delay: 0.9s; }
`;
document.head.appendChild(estilosAnimacion);

// Función para expandir/colapsar todas las FAQs
function expandirTodasFAQs() {
    const faqItems = document.querySelectorAll('.ley-silla-faq .faq-item');
    const expandir = !faqItems[0].classList.contains('active');
    
    faqItems.forEach(item => {
        if (expandir) {
            item.classList.add('active');
            const respuesta = item.querySelector('.faq-answer');
            respuesta.style.maxHeight = respuesta.scrollHeight + 'px';
        } else {
            item.classList.remove('active');
            const respuesta = item.querySelector('.faq-answer');
            respuesta.style.maxHeight = '0';
        }
    });
}

// Agregar funcionalidad para el botón "Expandir/Cerrar todas"
document.addEventListener('DOMContentLoaded', function() {
    const faqSection = document.querySelector('.ley-silla-faq');
    if (faqSection) {
        const header = faqSection.querySelector('.section-header');
        const toggleButton = document.createElement('button');
        toggleButton.className = 'btn btn-outline btn-small';
        toggleButton.innerHTML = '<i class="fas fa-expand-alt"></i> <span class="es-lang">Expandir/Cerrar todas</span><span class="en-lang">Expand/Collapse all</span>';
        toggleButton.style.marginLeft = '1rem';
        toggleButton.style.marginTop = '0.5rem';
        
        toggleButton.addEventListener('click', expandirTodasFAQs);
        header.appendChild(toggleButton);
    }
});