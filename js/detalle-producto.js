// JavaScript para la página de detalle SENSILLA OHV-97
document.addEventListener('DOMContentLoaded', function() {
    
    // Animación de entrada para elementos
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

    // Aplicar animaciones a los elementos
    const animatedElements = document.querySelectorAll('.espec-card-lujo, .beneficio-card, .color-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efecto de contador para la capacidad
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Animar el contador de capacidad cuando sea visible
    const capacityObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const capacityElement = document.querySelector('.capacidad-numero');
                if (capacityElement) {
                    animateCounter(capacityElement, 130, 2000);
                }
                capacityObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const capacitySection = document.querySelector('.espec-card-lujo.destacada');
    if (capacitySection) {
        capacityObserver.observe(capacitySection);
    }

    // Interactividad para los colores
    document.querySelectorAll('.color-item').forEach(item => {
        item.addEventListener('click', function() {
            // Remover selección anterior
            document.querySelectorAll('.color-item').forEach(i => {
                i.classList.remove('selected');
            });
            
            // Agregar selección actual
            this.classList.add('selected');
            
            // Mostrar notificación
            const colorName = this.querySelector('.color-nombre').textContent;
            showNotification(`Color ${colorName} seleccionado`, 'success');
        });
    });

    // Efecto de parallax en la imagen principal
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.producto-imagen-container');
        if (heroImage) {
            const rate = scrolled * -0.3;
            heroImage.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(${rate}px)`;
        }
    });

    // Sistema de notificaciones elegante
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#0ea5e9'};
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            max-width: 400px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 400);
        }, 4000);
    }

    // Botones de acción
    document.querySelectorAll('.btn-lujo').forEach(btn => {
        btn.addEventListener('click', function() {
            const isPrimary = this.classList.contains('btn-primary');
            const message = isPrimary ? 
                '¡Muestras de color solicitadas! Te contactaremos pronto.' : 
                '¡Cotización solicitada! Nuestro equipo se pondrá en contacto contigo.';
            
            showNotification(message, 'success');
            
            // Efecto de pulso en el botón
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Efecto de hover mejorado para las cards
    document.querySelectorAll('.espec-card-lujo, .beneficio-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });

    console.log('Página de detalle SENSILLA OHV-97 cargada correctamente');
});

// Animaciones CSS adicionales
const style = document.createElement('style');
style.textContent = `
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
    
    .color-item.selected .color-muestra {
        border-color: #0ea5e9 !important;
        box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.3) !important;
        transform: scale(1.15);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .espec-card-lujo, .beneficio-card, .color-item {
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
`;
document.head.appendChild(style);