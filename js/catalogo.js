// FUNCIONALIDADES ESPECÍFICAS DEL CATÁLOGO

// Variables globales para paginación
let productosPorPagina = 9;
let paginaActual = 1;
let todosLosProductos = [];
let productosFiltrados = [];

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar paginación
    inicializarPaginacion();
    
    // Filtros de vista
    const viewButtons = document.querySelectorAll('.view-btn');
    const productosGrid = document.getElementById('productosGrid');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            if (view === 'list') {
                productosGrid.classList.add('list-view');
            } else {
                productosGrid.classList.remove('list-view');
            }
        });
    });
    
    // Búsqueda en tiempo real
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(searchInput => {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filtrarProductos(searchTerm);
        });
    });
    
    // Botón de búsqueda
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInputs[0].value.toLowerCase() || searchInputs[1].value.toLowerCase();
        filtrarProductos(searchTerm);
    });
    
    // Filtro por orden
    const filterSelect = document.querySelector('.filter-select');
    filterSelect.addEventListener('change', function() {
        aplicarOrdenamiento(this.value);
    });
    
    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#ef4444';
                showNotification('Producto agregado a favoritos');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
                showNotification('Producto removido de favoritos');
            }
        });
    });
    
    // Zoom functionality
    const zoomButtons = document.querySelectorAll('.zoom-btn');
    
    zoomButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.producto-card');
            const image = card.querySelector('img');
            const productName = card.querySelector('.producto-nombre').textContent;
            
            showZoomModal(image.src, productName);
        });
    });
});

// INICIALIZACIÓN DE PAGINACIÓN
function inicializarPaginacion() {
    // Obtener todos los productos
    todosLosProductos = Array.from(document.querySelectorAll('.producto-card'));
    productosFiltrados = [...todosLosProductos];
    
    // Configurar eventos de paginación
    configurarEventosPaginacion();
    
    // Mostrar primera página
    mostrarPagina(1);
}

// CONFIGURAR EVENTOS DE PAGINACIÓN
function configurarEventosPaginacion() {
    const pageButtons = document.querySelectorAll('.page-btn');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            const pageNumber = this.getAttribute('data-page');
            const action = this.getAttribute('data-action');
            
            if (pageNumber) {
                // Click en número de página específico
                paginaActual = parseInt(pageNumber);
                mostrarPagina(paginaActual);
            } else if (action === 'next') {
                // Click en botón siguiente
                if (paginaActual < obtenerTotalPaginas()) {
                    paginaActual++;
                    mostrarPagina(paginaActual);
                }
            } else if (action === 'prev') {
                // Click en botón anterior
                if (paginaActual > 1) {
                    paginaActual--;
                    mostrarPagina(paginaActual);
                }
            }
        });
    });
}

// MOSTRAR PÁGINA ESPECÍFICA
function mostrarPagina(numeroPagina) {
    const inicio = (numeroPagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosFiltrados.slice(inicio, fin);
    
    // Ocultar todos los productos primero
    todosLosProductos.forEach(producto => {
        producto.style.display = 'none';
    });
    
    // Mostrar solo los productos de la página actual
    productosPagina.forEach(producto => {
        producto.style.display = 'block';
    });
    
    // Actualizar estado de la paginación
    actualizarEstadoPaginacion(numeroPagina);
    
    // Scroll suave al inicio del catálogo
    setTimeout(() => {
        document.querySelector('.catalogo-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
}

// ACTUALIZAR ESTADO DE PAGINACIÓN
function actualizarEstadoPaginacion(paginaActual) {
    const totalPaginas = obtenerTotalPaginas();
    const pageButtons = document.querySelectorAll('.page-btn[data-page]');
    const nextButton = document.querySelector('.page-btn[data-action="next"]');
    
    // Actualizar botones numéricos
    pageButtons.forEach(button => {
        button.classList.remove('active');
        if (parseInt(button.getAttribute('data-page')) === paginaActual) {
            button.classList.add('active');
        }
    });
    
    // Actualizar botones de navegación
    if (nextButton) {
        if (paginaActual >= totalPaginas) {
            nextButton.style.opacity = '0.5';
            nextButton.disabled = true;
        } else {
            nextButton.style.opacity = '1';
            nextButton.disabled = false;
        }
    }
    
    // Actualizar números de página si es necesario
    actualizarNumerosPaginacion(paginaActual, totalPaginas);
}

// ACTUALIZAR NÚMEROS DE PAGINACIÓN DINÁMICAMENTE
function actualizarNumerosPaginacion(paginaActual, totalPaginas) {
    const paginationContainer = document.querySelector('.pagination');
    const pageButtons = paginationContainer.querySelectorAll('.page-btn[data-page]');
    
    // Si hay más de 3 páginas, mostrar paginación dinámica
    if (totalPaginas > 3) {
        let paginasAMostrar = [];
        
        if (paginaActual <= 2) {
            // Mostrar primeras 3 páginas
            paginasAMostrar = [1, 2, 3];
        } else if (paginaActual >= totalPaginas - 1) {
            // Mostrar últimas 3 páginas
            paginasAMostrar = [totalPaginas - 2, totalPaginas - 1, totalPaginas];
        } else {
            // Mostrar página actual y adyacentes
            paginasAMostrar = [paginaActual - 1, paginaActual, paginaActual + 1];
        }
        
        // Actualizar botones existentes o crear nuevos
        pageButtons.forEach((button, index) => {
            if (paginasAMostrar[index]) {
                button.textContent = paginasAMostrar[index];
                button.setAttribute('data-page', paginasAMostrar[index]);
                button.style.display = 'inline-block';
                
                if (paginasAMostrar[index] === paginaActual) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            } else {
                button.style.display = 'none';
            }
        });
    }
}

// OBTENER TOTAL DE PÁGINAS
function obtenerTotalPaginas() {
    return Math.ceil(productosFiltrados.length / productosPorPagina);
}

// FILTRAR PRODUCTOS POR BÚSQUEDA
function filtrarProductos(termino) {
    if (termino.trim() === '') {
        // Si no hay término, mostrar todos los productos
        productosFiltrados = [...todosLosProductos];
    } else {
        // Filtrar productos según el término de búsqueda
        productosFiltrados = todosLosProductos.filter(producto => {
            const nombre = producto.querySelector('.producto-nombre').textContent.toLowerCase();
            const descripcion = producto.querySelector('.producto-descripcion').textContent.toLowerCase();
            const categoria = producto.querySelector('.producto-categoria').textContent.toLowerCase();
            const caracteristicas = Array.from(producto.querySelectorAll('.feature-tag'))
                .map(tag => tag.textContent.toLowerCase())
                .join(' ');
            
            return nombre.includes(termino) || 
                   descripcion.includes(termino) || 
                   categoria.includes(termino) ||
                   caracteristicas.includes(termino);
        });
    }
    
    // Volver a la primera página y mostrar resultados
    paginaActual = 1;
    mostrarPagina(1);
    
    // Mostrar mensaje si no hay resultados
    mostrarMensajeSinResultados(termino);
}

// APLICAR ORDENAMIENTO
function aplicarOrdenamiento(criterio) {
    switch(criterio) {
        case 'Más Populares':
        case 'Most Popular':
            productosFiltrados.sort((a, b) => {
                const ratingA = parseInt(a.querySelector('.rating-count').textContent.replace(/[()]/g, '') || '0');
                const ratingB = parseInt(b.querySelector('.rating-count').textContent.replace(/[()]/g, '') || '0');
                return ratingB - ratingA;
            });
            break;
            
        case 'Precio: Menor a Mayor':
        case 'Price: Low to High':
            productosFiltrados.sort((a, b) => {
                const precioA = parseInt(a.getAttribute('data-price')) || 0;
                const precioB = parseInt(b.getAttribute('data-price')) || 0;
                return precioA - precioB;
            });
            break;
            
        case 'Precio: Mayor a Menor':
        case 'Price: High to Low':
            productosFiltrados.sort((a, b) => {
                const precioA = parseInt(a.getAttribute('data-price')) || 0;
                const precioB = parseInt(b.getAttribute('data-price')) || 0;
                return precioB - precioA;
            });
            break;
            
        case 'Nombre: A-Z':
        case 'Name: A-Z':
            productosFiltrados.sort((a, b) => {
                const nombreA = a.querySelector('.producto-nombre').textContent.toLowerCase();
                const nombreB = b.querySelector('.producto-nombre').textContent.toLowerCase();
                return nombreA.localeCompare(nombreB);
            });
            break;
            
        case 'Nombre: Z-A':
        case 'Name: Z-A':
            productosFiltrados.sort((a, b) => {
                const nombreA = a.querySelector('.producto-nombre').textContent.toLowerCase();
                const nombreB = b.querySelector('.producto-nombre').textContent.toLowerCase();
                return nombreB.localeCompare(nombreA);
            });
            break;
    }
    
    // Volver a la primera página y mostrar resultados ordenados
    paginaActual = 1;
    mostrarPagina(1);
}

// MOSTRAR MENSAJE SIN RESULTADOS
function mostrarMensajeSinResultados(termino) {
    // Remover mensaje anterior si existe
    const mensajeAnterior = document.querySelector('.no-results-message');
    if (mensajeAnterior) {
        mensajeAnterior.remove();
    }
    
    // Si no hay resultados, mostrar mensaje
    if (productosFiltrados.length === 0 && termino.trim() !== '') {
        const productosGrid = document.getElementById('productosGrid');
        const mensaje = document.createElement('div');
        mensaje.className = 'no-results-message';
        mensaje.innerHTML = `
            <div class="no-results-content">
                <i class="fas fa-search"></i>
                <h3 class="es-lang">No se encontraron resultados para "${termino}"</h3>
                <h3 class="en-lang">No results found for "${termino}"</h3>
                <p class="es-lang">Intenta con otros términos de búsqueda o revisa nuestro catálogo completo.</p>
                <p class="en-lang">Try other search terms or check our complete catalog.</p>
                <button class="btn btn-primary" onclick="limpiarBusqueda()">
                    <span class="es-lang">Ver Todo el Catálogo</span>
                    <span class="en-lang">View Full Catalog</span>
                </button>
            </div>
        `;
        
        productosGrid.appendChild(mensaje);
    }
}

// LIMPIAR BÚSQUEDA
function limpiarBusqueda() {
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => input.value = '');
    
    const mensaje = document.querySelector('.no-results-message');
    if (mensaje) {
        mensaje.remove();
    }
    
    // Restablecer filtros
    productosFiltrados = [...todosLosProductos];
    paginaActual = 1;
    mostrarPagina(1);
}

// FUNCIONES DE UTILIDAD
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function showZoomModal(imageSrc, productName) {
    // Crear modal de zoom
    const modal = document.createElement('div');
    modal.className = 'zoom-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="zoom-content" style="position: relative; max-width: 90%; max-height: 90%;">
            <button class="zoom-close" style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">×</button>
            <img src="${imageSrc}" alt="${productName}" style="max-width: 100%; max-height: 80vh; border-radius: 8px;">
            <p style="color: white; text-align: center; margin-top: 1rem; font-size: 1.2rem;">${productName}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Cerrar modal al hacer click
    const closeBtn = modal.querySelector('.zoom-close');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }, 300);
        }
    });
}

// Añadir estilos CSS para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    /* Vista de lista para productos */
    .productos-grid.list-view {
        grid-template-columns: 1fr !important;
    }
    
    .productos-grid.list-view .producto-card {
        display: flex;
        height: 200px;
        gap: 2rem;
    }
    
    .productos-grid.list-view .producto-image {
        width: 200px;
        height: 100%;
        flex-shrink: 0;
    }
    
    .productos-grid.list-view .producto-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    /* Mensaje sin resultados */
    .no-results-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem 2rem;
        background: var(--light-gray);
        border-radius: 12px;
        margin: 2rem 0;
    }
    
    .no-results-content i {
        font-size: 4rem;
        color: var(--primary-color);
        margin-bottom: 1.5rem;
    }
    
    .no-results-content h3 {
        color: var(--primary-color);
        margin-bottom: 1rem;
    }
    
    .no-results-content p {
        color: var(--dark-gray);
        margin-bottom: 2rem;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
    }
    
    /* Estados de paginación */
    .page-btn:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
    
    .page-btn.active {
        background: var(--primary-color);
        color: white;
    }
`;
document.head.appendChild(style);

// Hacer funciones disponibles globalmente
window.limpiarBusqueda = limpiarBusqueda;

