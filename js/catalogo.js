// CATALOGO.JS - Funcionalidades del catálogo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Catálogo cargado - Implementando filtrado por categorías');
    
    // Variables globales
    let productos = [];
    let productosFiltrados = [];
    let categoriaSeleccionada = 'all';
    let terminoBusqueda = '';
    let paginaActual = 1;
    const productosPorPagina = 9;
    
    // Elementos del DOM
    const productosGrid = document.getElementById('productosGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInputEs = document.getElementById('searchInputEs');
    const searchInputEn = document.getElementById('searchInputEn');
    const searchBtn = document.getElementById('searchBtn');
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    const paginationContainer = document.getElementById('paginationContainer');
    
    // Inicializar catálogo
    inicializarCatalogo();
    
    // ======================
    // FUNCIONES PRINCIPALES
    // ======================
    
    function inicializarCatalogo() {
        // Obtener todos los productos
        productos = Array.from(document.querySelectorAll('.producto-card'));
        productosFiltrados = [...productos];
        
        console.log(`Total de productos cargados: ${productos.length}`);
        
        // Configurar eventos
        configurarEventos();
        
        // Mostrar primera página
        mostrarProductos();
        actualizarPaginacion();
        
        // Manejar parámetros de URL
        manejarParametrosURLCargar();
    }
    
    function configurarEventos() {
        // Filtro por categoría
        if (categoryFilter) {
            categoryFilter.addEventListener('change', function() {
                categoriaSeleccionada = this.value;
                console.log(`Categoría seleccionada: ${categoriaSeleccionada}`);
                paginaActual = 1; // Resetear a página 1
                filtrarProductos();
                // Actualizar URL con categoría
                actualizarURL();
            });
        }
        
        // Búsqueda
        if (searchInputEs) {
            searchInputEs.addEventListener('input', function() {
                terminoBusqueda = this.value.toLowerCase();
                paginaActual = 1; // Resetear a página 1
                filtrarProductos();
            });
        }
        
        if (searchInputEn) {
            searchInputEn.addEventListener('input', function() {
                terminoBusqueda = this.value.toLowerCase();
                paginaActual = 1; // Resetear a página 1
                filtrarProductos();
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                // Obtener el valor del input activo según el idioma
                const lang = document.body.classList.contains('lang-en') ? 'en' : 'es';
                if (lang === 'es' && searchInputEs) {
                    terminoBusqueda = searchInputEs.value.toLowerCase();
                } else if (lang === 'en' && searchInputEn) {
                    terminoBusqueda = searchInputEn.value.toLowerCase();
                }
                paginaActual = 1; // Resetear a página 1
                filtrarProductos();
            });
        }
        
        // Enter en búsqueda
        [searchInputEs, searchInputEn].forEach(input => {
            if (input) {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        terminoBusqueda = this.value.toLowerCase();
                        paginaActual = 1; // Resetear a página 1
                        filtrarProductos();
                    }
                });
            }
        });
        
        // Vista grid/list
        if (gridViewBtn) {
            gridViewBtn.addEventListener('click', function() {
                productosGrid.classList.remove('list-view');
                gridViewBtn.classList.add('active');
                listViewBtn.classList.remove('active');
            });
        }
        
        if (listViewBtn) {
            listViewBtn.addEventListener('click', function() {
                productosGrid.classList.add('list-view');
                listViewBtn.classList.add('active');
                gridViewBtn.classList.remove('active');
            });
        }
        
        // Resetear filtros
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', resetFiltros);
        }
        
        // Wishlist buttons
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = '#ef4444';
                    mostrarNotificacion('Producto agregado a favoritos');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                    mostrarNotificacion('Producto removido de favoritos');
                }
            });
        });
        
        // Zoom buttons
        document.querySelectorAll('.zoom-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.producto-card');
                const image = card.querySelector('img');
                const productName = card.querySelector('.producto-nombre').textContent;
                mostrarZoomModal(image.src, productName);
            });
        });
    }
    
    function filtrarProductos() {
        if (categoriaSeleccionada === 'all' && terminoBusqueda === '') {
            // Mostrar todos los productos
            productosFiltrados = [...productos];
        } else {
            // Filtrar por categoría y/o búsqueda
            productosFiltrados = productos.filter(producto => {
                const categoriaProducto = producto.getAttribute('data-category');
                const nombreProducto = producto.getAttribute('data-name') || '';
                const descripcion = producto.querySelector('.producto-descripcion')?.textContent || '';
                
                // Verificar categoría
                const coincideCategoria = categoriaSeleccionada === 'all' || categoriaProducto === categoriaSeleccionada;
                
                // Verificar búsqueda
                let coincideBusqueda = true;
                if (terminoBusqueda !== '') {
                    const textoBusqueda = (nombreProducto + ' ' + descripcion).toLowerCase();
                    coincideBusqueda = textoBusqueda.includes(terminoBusqueda);
                }
                
                return coincideCategoria && coincideBusqueda;
            });
        }
        
        console.log(`Productos filtrados: ${productosFiltrados.length}`);
        
        // Mostrar resultados
        mostrarProductos();
        actualizarPaginacion();
        actualizarMensajeSinResultados();
    }
    
    function mostrarProductos() {
        // Ocultar todos los productos primero
        productos.forEach(producto => {
            producto.style.display = 'none';
        });
        
        // Calcular índices de paginación
        const inicio = (paginaActual - 1) * productosPorPagina;
        const fin = inicio + productosPorPagina;
        const productosPagina = productosFiltrados.slice(inicio, fin);
        
        // Mostrar productos de la página actual
        productosPagina.forEach(producto => {
            producto.style.display = 'block';
        });
    }
    
    function actualizarPaginacion() {
        const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
        
        // Limpiar paginación existente
        paginationContainer.innerHTML = '';
        
        // No mostrar paginación si hay pocos productos
        if (totalPaginas <= 1) {
            return;
        }
        
        // Botón anterior
        const prevButton = document.createElement('button');
        prevButton.className = `page-nav ${paginaActual === 1 ? 'disabled' : ''}`;
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.setAttribute('data-action', 'prev');
        prevButton.disabled = paginaActual === 1;
        
        prevButton.addEventListener('click', function() {
            if (paginaActual > 1) {
                cambiarPagina(paginaActual - 1);
            }
        });
        
        paginationContainer.appendChild(prevButton);
        
        // Calcular qué números mostrar
        let inicioPagina = Math.max(1, paginaActual - 2);
        let finPagina = Math.min(totalPaginas, paginaActual + 2);
        
        // Ajustar si estamos cerca del inicio
        if (inicioPagina === 1) {
            finPagina = Math.min(5, totalPaginas);
        }
        
        // Ajustar si estamos cerca del final
        if (finPagina === totalPaginas) {
            inicioPagina = Math.max(1, totalPaginas - 4);
        }
        
        // Puntos suspensivos al inicio si es necesario
        if (inicioPagina > 1) {
            const dots = document.createElement('span');
            dots.className = 'page-separator';
            dots.textContent = '...';
            paginationContainer.appendChild(dots);
        }
        
        // Botones de números
        for (let i = inicioPagina; i <= finPagina; i++) {
            const button = document.createElement('button');
            button.className = `page-btn ${i === paginaActual ? 'active' : ''}`;
            button.textContent = i;
            button.setAttribute('data-page', i);
            
            button.addEventListener('click', function() {
                const nuevaPagina = parseInt(this.getAttribute('data-page'));
                cambiarPagina(nuevaPagina);
            });
            
            paginationContainer.appendChild(button);
        }
        
        // Puntos suspensivos al final si es necesario
        if (finPagina < totalPaginas) {
            const dots = document.createElement('span');
            dots.className = 'page-separator';
            dots.textContent = '...';
            paginationContainer.appendChild(dots);
        }
        
        // Botón siguiente
        const nextButton = document.createElement('button');
        nextButton.className = `page-nav ${paginaActual === totalPaginas ? 'disabled' : ''}`;
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.setAttribute('data-action', 'next');
        nextButton.disabled = paginaActual === totalPaginas;
        
        nextButton.addEventListener('click', function() {
            if (paginaActual < totalPaginas) {
                cambiarPagina(paginaActual + 1);
            }
        });
        
        paginationContainer.appendChild(nextButton);
    }
    
    function cambiarPagina(nuevaPagina) {
        paginaActual = nuevaPagina;
        mostrarProductos();
        actualizarPaginacion();
        
        // Actualizar URL con página
        actualizarURL();
        
        // Hacer scroll al inicio de los productos
        scrollToTopOfProducts();
    }
    
    function actualizarURL() {
        const params = new URLSearchParams();
        
        // Agregar categoría si no es 'all'
        if (categoriaSeleccionada !== 'all') {
            params.set('categoria', categoriaSeleccionada);
        }
        
        // Agregar página si no es 1
        if (paginaActual > 1) {
            params.set('pagina', paginaActual);
        }
        
        // Construir nueva URL
        const nuevaURL = params.toString() ? `catalogo.html?${params.toString()}` : 'catalogo.html';
        
        // Actualizar URL sin recargar la página
        window.history.replaceState({}, '', nuevaURL);
    }
    
    function scrollToTopOfProducts() {
        // Esperar un momento para que el DOM se actualice
        setTimeout(() => {
            // Buscar el título de los filtros o la sección de productos
            const filterGroup = document.querySelector('.filter-group');
            const catalogoSection = document.querySelector('.catalogo-section');
            
            let targetElement = filterGroup || catalogoSection;
            
            if (targetElement) {
                // Calcular posición exacta
                const elementTop = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementTop + window.pageYOffset - 120; // 120px de margen para el header
                
                // Hacer scroll inmediato
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                // Fallback: ir al inicio del catálogo
                const catalogContainer = document.querySelector('.container-sm');
                if (catalogContainer) {
                    const containerTop = catalogContainer.getBoundingClientRect().top + window.pageYOffset - 100;
                    window.scrollTo({
                        top: containerTop,
                        behavior: 'smooth'
                    });
                }
            }
        }, 100);
    }
    
    function actualizarMensajeSinResultados() {
        if (productosFiltrados.length === 0) {
            noResultsMessage.style.display = 'block';
            productosGrid.style.display = 'none';
            paginationContainer.style.display = 'none';
        } else {
            noResultsMessage.style.display = 'none';
            productosGrid.style.display = 'grid';
            paginationContainer.style.display = 'flex';
        }
    }
    
    function resetFiltros() {
        // Resetear categoría
        categoriaSeleccionada = 'all';
        if (categoryFilter) {
            categoryFilter.value = 'all';
        }
        
        // Resetear búsqueda
        terminoBusqueda = '';
        if (searchInputEs) searchInputEs.value = '';
        if (searchInputEn) searchInputEn.value = '';
        
        // Resetear paginación
        paginaActual = 1;
        
        // Restablecer productos
        productosFiltrados = [...productos];
        
        // Actualizar vista
        mostrarProductos();
        actualizarPaginacion();
        actualizarMensajeSinResultados();
        
        // Limpiar URL
        window.history.replaceState({}, '', 'catalogo.html');
        
        // Hacer scroll al inicio
        scrollToTopOfProducts();
        
        mostrarNotificacion('Filtros restablecidos');
    }
    
    // ======================
    // MANEJO DE URL AL CARGAR
    // ======================
    
    function manejarParametrosURLCargar() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Obtener categoría de la URL
        const categoriaParam = urlParams.get('categoria');
        if (categoriaParam) {
            // Mapear parámetro URL a valor del select
            const categoriaMapeada = mapearParametroURLaValorSelect(categoriaParam);
            
            if (categoriaMapeada && categoryFilter) {
                categoriaSeleccionada = categoriaMapeada;
                categoryFilter.value = categoriaMapeada;
                console.log(`Categoría cargada desde URL: ${categoriaParam} -> ${categoriaMapeada}`);
                
                // Actualizar título de la página
                actualizarTituloSegunCategoria(categoriaMapeada);
            }
        }
        
        // Obtener página de la URL
        const paginaParam = urlParams.get('pagina');
        if (paginaParam) {
            const pagina = parseInt(paginaParam);
            if (!isNaN(pagina) && pagina > 0) {
                paginaActual = pagina;
            }
        }
        
        // Aplicar filtros si hay parámetros
        if (categoriaParam || paginaParam) {
            setTimeout(() => {
                filtrarProductos();
                // Hacer scroll después de que los productos se muestren
                setTimeout(scrollToTopOfProducts, 150);
            }, 50);
        }
    }
    
    function mapearParametroURLaValorSelect(parametroURL) {
        // Convierte parámetros URL a valores del select
        // Ejemplos:
        // 'industrial' o 'industriales' -> 'industriales'
        // 'visitante-exterior' -> 'visitante-exterior'
        // etc.
        
        const mapaURL = {
            // INDUSTRIALES
            'industrial': 'industriales',
            'industriales': 'industriales',
            
            // VISITANTE EXTERIOR
            'visitante-exterior': 'visitante-exterior',
            'visitanteexterior': 'visitante-exterior',
            'exterior': 'visitante-exterior',
            'visitante-exterior': 'visitante-exterior',
            
            // VISITANTE INTERIOR
            'visitante-interior': 'visitante-interior',
            'visitanteinterior': 'visitante-interior',
            'interior': 'visitante-interior',
            'visitante-interior': 'visitante-interior',
            
            // BANCOS
            'bancos': 'bancos',
            'banco': 'bancos',
            'stools': 'bancos',
            
            // BANCAS
            'bancas': 'bancas',
            'banca': 'bancas',
            'benches': 'bancas',
            'banco-largo': 'bancas',
            
            // SILLAS CON RUEDAS
            'sillas-ruedas': 'sillas-ruedas',
            'sillas-con-ruedas': 'sillas-ruedas',
            'silla-con-ruedas': 'sillas-ruedas',
            'ruedas': 'sillas-ruedas',
            'con-ruedas': 'sillas-ruedas',
            'office-chairs': 'sillas-ruedas'
        };
        
        // Limpiar y normalizar el parámetro
        const parametroLimpio = parametroURL.toLowerCase().trim();
        
        // Buscar coincidencia
        if (mapaURL[parametroLimpio]) {
            return mapaURL[parametroLimpio];
        }
        
        // Si no encuentra coincidencia exacta, intentar coincidencia parcial
        for (const [key, value] of Object.entries(mapaURL)) {
            if (parametroLimpio.includes(key) || key.includes(parametroLimpio)) {
                return value;
            }
        }
        
        // Si no hay coincidencia, retornar null
        console.warn(`Parámetro de categoría no reconocido: ${parametroURL}`);
        return null;
    }
    
    function actualizarTituloSegunCategoria(categoria) {
        const titulo = document.querySelector('.catalogo-title');
        const subtitulo = document.querySelector('.catalogo-subtitle');
        
        if (!titulo || !subtitulo) return;
        
        const titulos = {
            'industriales': {
                es: 'Catálogo de Sillas Industriales',
                en: 'Industrial Chairs Catalog'
            },
            'visitante-exterior': {
                es: 'Sillas para Visitantes Exterior',
                en: 'Outdoor Visitor Chairs'
            },
            'visitante-interior': {
                es: 'Sillas para Visitantes Interior',
                en: 'Indoor Visitor Chairs'
            },
            'bancos': {
                es: 'Catálogo de Bancos Industriales',
                en: 'Industrial Stools Catalog'
            },
            'bancas': {
                es: 'Catálogo de Bancas Industriales',
                en: 'Industrial Benches Catalog'
            },
            'sillas-ruedas': {
                es: 'Sillas con Ruedas',
                en: 'Chairs with Wheels'
            }
        };
        
        const tituloInfo = titulos[categoria];
        
        if (tituloInfo) {
            // Actualizar título en español
            const tituloEs = titulo.querySelector('.es-lang') || titulo;
            if (tituloEs.classList.contains('es-lang')) {
                tituloEs.textContent = tituloInfo.es;
            } else {
                tituloEs.textContent = tituloInfo.es;
            }
            
            // Actualizar título en inglés
            const tituloEn = titulo.querySelector('.en-lang');
            if (tituloEn) {
                tituloEn.textContent = tituloInfo.en;
            }
            
            // Actualizar subtítulo
            const subtitulos = {
                'industriales': {
                    es: 'Descubre nuestra exclusiva colección de sillas industriales diseñadas para cumplir con la Ley Silla y garantizar la máxima durabilidad en entornos exigentes.',
                    en: 'Discover our exclusive collection of industrial chairs designed to comply with Chair Law and ensure maximum durability in demanding environments.'
                },
                'visitante-exterior': {
                    es: 'Explora nuestra gama de sillas para exterior resistentes a condiciones climáticas adversas. Perfectas para terrazas, jardines y áreas públicas.',
                    en: 'Explore our range of outdoor chairs resistant to adverse weather conditions. Perfect for terraces, gardens and public areas.'
                },
                'visitante-interior': {
                    es: 'Conoce nuestras sillas para visitantes de interior, ideales para recepciones, salas de espera y áreas corporativas.',
                    en: 'Discover our indoor visitor chairs, ideal for receptions, waiting rooms and corporate areas.'
                },
                'bancos': {
                    es: 'Descubre nuestra línea de bancos industriales, diseñados para áreas de trabajo, talleres y espacios de producción.',
                    en: 'Discover our line of industrial stools, designed for work areas, workshops and production spaces.'
                },
                'bancas': {
                    es: 'Explora nuestras bancas industriales, perfectas para áreas de descanso, comedores y espacios compartidos.',
                    en: 'Explore our industrial benches, perfect for rest areas, dining rooms and shared spaces.'
                },
                'sillas-ruedas': {
                    es: 'Conoce nuestras sillas con ruedas, ideales para oficinas, áreas administrativas y puestos de trabajo móviles.',
                    en: 'Discover our chairs with wheels, ideal for offices, administrative areas and mobile workstations.'
                }
            };
            
            const subtituloInfo = subtitulos[categoria];
            if (subtituloInfo) {
                const subtituloEs = subtitulo.querySelector('.es-lang');
                const subtituloEn = subtitulo.querySelector('.en-lang');
                
                if (subtituloEs) subtituloEs.textContent = subtituloInfo.es;
                if (subtituloEn) subtituloEn.textContent = subtituloInfo.en;
            }
        }
    }
    
    // ======================
    // FUNCIONES DE UTILIDAD
    // ======================
    
    function mostrarNotificacion(mensaje) {
        // Crear elemento de notificación
        const notificacion = document.createElement('div');
        notificacion.className = 'notification';
        notificacion.textContent = mensaje;
        notificacion.style.cssText = `
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
        
        document.body.appendChild(notificacion);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notificacion.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notificacion)) {
                    document.body.removeChild(notificacion);
                }
            }, 300);
        }, 3000);
    }
    
    function mostrarZoomModal(imageSrc, productName) {
        // Crear modal
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
        
        // Eventos para cerrar
        const closeBtn = modal.querySelector('.zoom-close');
        closeBtn.addEventListener('click', () => cerrarZoomModal(modal));
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                cerrarZoomModal(modal);
            }
        });
        
        // Cerrar con Escape
        document.addEventListener('keydown', function cerrarConEscape(e) {
            if (e.key === 'Escape') {
                cerrarZoomModal(modal);
                document.removeEventListener('keydown', cerrarConEscape);
            }
        });
    }
    
    function cerrarZoomModal(modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 300);
    }
    
    // ======================
    // INYECTAR ESTILOS CSS
    // ======================
    
    
    
    document.head.appendChild(styles);
    
    // ======================
    // EXPORTAR FUNCIONES GLOBALES
    // ======================
    
    window.filtrarPorCategoria = function(categoria) {
        if (categoryFilter) {
            categoryFilter.value = categoria;
            categoriaSeleccionada = categoria;
            paginaActual = 1;
            filtrarProductos();
        }
    };
    
    window.resetearFiltros = resetFiltros;
    
    window.irAPagina = function(pagina) {
        if (pagina >= 1 && pagina <= Math.ceil(productosFiltrados.length / productosPorPagina)) {
            cambiarPagina(pagina);
        }
    };
    
    console.log('Catálogo inicializado correctamente - Todas las categorías disponibles');
});