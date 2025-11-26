// contacto.js - Funcionalidades para página de contacto

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar mapa
    inicializarMapa();
    
    // Configurar formulario
    configurarFormulario();
    
    // Configurar FAQ
    configurarFAQ();
    
    // Configurar animaciones
    configurarAnimaciones();
});

function initMap() {
    const location = { lat: 31.6771103, lng: -106.3733022 }; // Coordenadas de JEMMSA
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: location,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [{ "weight": "2.00" }]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [{ "color": "#9c9c9c" }]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [{ "visibility": "on" }]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{ "color": "#f2f2f2" }]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [{ "color": "#ffffff" }]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{ "visibility": "off" }]
            }
        ]
    });

    // Marcador de ubicación
    new google.maps.Marker({
        position: location,
        map: map,
        title: 'Showroom Ley Silla'
    });
}

// Manejo de errores
function gm_authFailure() {
    console.error('Error de autenticación con Google Maps');
    document.getElementById('map').innerHTML = `
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


function configurarFormulario() {
    const formulario = document.getElementById('contactForm');
    const btnSubmit = formulario.querySelector('.btn-submit');
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar formulario
        if (!validarFormulario()) {
            return;
        }
        
        // Simular envío
        btnSubmit.classList.add('loading');
        
        setTimeout(() => {
            btnSubmit.classList.remove('loading');
            mostrarMensajeExito();
            formulario.reset();
        }, 2000);
    });
    
    // Validación en tiempo real
    const inputs = formulario.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validarCampo(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
            }
        });
    });
}

function validarFormulario() {
    let valido = true;
    const formulario = document.getElementById('contactForm');
    const camposRequeridos = formulario.querySelectorAll('[required]');
    
    camposRequeridos.forEach(campo => {
        if (!validarCampo(campo)) {
            valido = false;
        }
    });
    
    return valido;
}

function validarCampo(campo) {
    const valor = campo.value.trim();
    let valido = true;
    
    if (campo.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(valor)) {
            valido = false;
            mostrarError(campo, 'Por favor ingresa un email válido');
        }
    } else if (campo.type === 'tel') {
        const telefonoRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!telefonoRegex.test(valor)) {
            valido = false;
            mostrarError(campo, 'Por favor ingresa un teléfono válido');
        }
    } else if (campo.hasAttribute('required') && valor === '') {
        valido = false;
        mostrarError(campo, 'Este campo es requerido');
    }
    
    if (valido) {
        campo.classList.remove('error');
        campo.classList.add('success');
    } else {
        campo.classList.add('error');
        campo.classList.remove('success');
    }
    
    return valido;
}

function mostrarError(campo, mensaje) {
    // Remover mensaje anterior
    const errorAnterior = campo.parentNode.querySelector('.error-message');
    if (errorAnterior) {
        errorAnterior.remove();
    }
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = mensaje;
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 0.8rem;
        margin-top: 0.5rem;
    `;
    
    campo.parentNode.appendChild(errorElement);
}

function mostrarMensajeExito() {
    const notificacion = document.createElement('div');
    notificacion.className = 'success-notification';
    notificacion.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        ">
            <i class="fas fa-check-circle" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
            <h4 style="margin: 0 0 0.5rem 0;">¡Mensaje Enviado!</h4>
            <p style="margin: 0; opacity: 0.9;">Te contactaremos en menos de 2 horas</p>
        </div>
    `;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 5000);
}

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
        });
    });
}

function configurarAnimaciones() {
    // Animación de aparición para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    const elementosAnimar = document.querySelectorAll('.contact-card, .form-container, .faq-item');
    elementosAnimar.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(elemento);
    });
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
`;
document.head.appendChild(estilosAnimacion);