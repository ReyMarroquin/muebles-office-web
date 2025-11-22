// JavaScript para la página de detalles del producto
document.addEventListener('DOMContentLoaded', function() {
    // Datos de los productos
    const productos = {
        'ohi-46': {
            nombre: 'OHI-46 INDUSTRIAL',
            descripcion: 'Silla industrial pesada con estructura de acero reforzado y base cromada. Ideal para entornos de trabajo exigentes.',
            precio: '$4,500',
            imagen: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            caracteristicas: ['Acero Reforzado', 'Base Cromada', '140 kg Capacidad']
        },
        'ohi-46-aro-cromado': {
            nombre: 'OHI-46-ARO-CROMADO',
            descripcion: 'Versión premium con aro cromado de alta resistencia. Diseño ergonómico para jornadas prolongadas.',
            precio: '$5,200',
            imagen: 'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            caracteristicas: ['Aro Cromado', 'Ergonómico', '140 kg Capacidad', 'Mejor Soporte Lumbar']
        },
        'ohi-48': {
            nombre: 'OHI-48 INDUSTRIAL',
            descripcion: 'Modelo actualizado con mejoras en soporte lumbar y materiales de mayor durabilidad. Capacidad 150kg.',
            precio: '$4,800',
            imagen: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            caracteristicas: ['Soporte Lumbar', '150kg Capacidad', 'Materiales Mejorados']
        }
    };

    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productoParam = urlParams.get('producto') || 'ohi-46';
    
    // Cargar datos del producto
    cargarProducto(productoParam);

    // Galería de imágenes
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const imagenPrincipal = document.getElementById('productoImagen');
    
    galeriaItems.forEach(item => {
        item.addEventListener('click', function() {
            const nuevaImagen = this.getAttribute('data-image');
            
            // Remover clase active de todos los items
            galeriaItems.forEach(i => i.classList.remove('active'));
            
            // Agregar clase active al item clickeado
            this.classList.add('active');
            
            // Cambiar imagen principal con efecto de transición
            imagenPrincipal.style.opacity = '0';
            setTimeout(() => {
                imagenPrincipal.src = nuevaImagen;
                imagenPrincipal.style.opacity = '1';
            }, 300);
        });
    });

    // Botones de ver detalles en comparativa
    const verDetalleBtns = document.querySelectorAll('.ver-detalle-btn');
    
    verDetalleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const producto = this.getAttribute('data-producto');
            cargarProducto(producto);
            
            // Scroll suave al inicio
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Función para cargar datos del producto
    function cargarProducto(productoId) {
        const producto = productos[productoId];
        
        if (producto) {
            // Actualizar elementos de la página
            document.getElementById('productoNombre').textContent = producto.nombre.split(' ')[0];
            document.getElementById('productoTitulo').textContent = producto.nombre;
            document.getElementById('productoDescripcion').textContent = producto.descripcion;
            document.getElementById('productoPrecio').textContent = producto.precio;
            document.getElementById('productoImagen').src = producto.imagen;
            
            // Actualizar breadcrumb
            document.title = `${producto.nombre} - Ley Silla`;
            
            // Actualizar URL sin recargar la página
            const nuevaURL = `${window.location.pathname}?producto=${productoId}`;
            window.history.replaceState({}, '', nuevaURL);
            
            // Actualizar botones activos en comparativa
            verDetalleBtns.forEach(btn => {
                if (btn.getAttribute('data-producto') === productoId) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    }

    // Efectos de hover para cards
    const cards = document.querySelectorAll('.espec-card, .caracteristica-card, .modelo-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

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

    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.espec-card, .caracteristica-card, .modelo-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});