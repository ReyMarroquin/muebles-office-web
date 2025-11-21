// Base de conocimiento del chatbot para Ley Silla - VERSIÓN MEJORADA
const chatbotKnowledge = {
    'es': {
        'hola': '¡Hola! Soy tu asistente virtual de Ley Silla. ¿En qué puedo ayudarte? Puedes preguntarme sobre la Ley Silla, empresas obligadas, multas, o nuestros servicios.',
        'qué es la ley silla': 'La Ley Silla es una normativa que obliga a los establecimientos comerciales y de servicios a proporcionar sillas o asientos a sus trabajadores que permanezcan de pie por largos periodos. Su objetivo es proteger la salud laboral y prevenir enfermedades relacionadas con estar de pie prolongadamente.',
        'qué empresas deben cumplir': 'Deben cumplir todas las empresas del sector servicios, comercio y centros de trabajo donde los empleados pasen largos periodos de pie. Ejemplos: tiendas departamentales, supermercados, bancos, restaurantes, farmacias, estaciones de transporte, y recepciones en oficinas u hospitales.',
        'cuáles son las multas': 'Las multas por incumplimiento van desde 250 hasta 2,500 UMAs, lo que equivale aproximadamente de $27,000 hasta $275,000 MXN. Además, puede haber suspensión temporal de actividades.',
        'cómo contactarlos': 'Puedes contactarnos al teléfono 656-687-78-54, por email a jemmsa@jemmsa.com.mx, o visitando nuestra sección de Contacto en la página web.',
        'qué servicios ofrecen': 'Ofrecemos asesoría legal sobre cumplimiento de la Ley Silla, venta de sillas ergonómicas adecuadas, diagnóstico de obligaciones, y acompañamiento en procesos de implementación.',
        'qué sillas recomiendan': 'Recomendamos sillas ergonómicas con ajuste de altura, respaldo lumbar, base estable y materiales duraderos. Tenemos un catálogo con diferentes modelos según las necesidades específicas de cada establecimiento.',
        'es obligatorio para todas las empresas': 'No, solo para establecimientos comerciales, de servicios y centros de trabajo donde los empleados permanezcan de pie por largos periodos en atención al público o realizando sus funciones.',
        'cuánto tiempo tienen para implementar': 'Una vez identificada la obligación, se recomienda implementar lo antes posible. El cumplimiento debe ser inmediato una vez conocida la obligación legal.',
        'hay sillas específicas requeridas': 'La ley no especifica marcas, pero las sillas deben ser ergonómicas, seguras y adecuadas para las actividades que realiza el trabajador.',
        'dónde están ubicados': 'Estamos ubicados en Satélite, 32540 Juárez, Chih. Puedes visitarnos o contactarnos por teléfono para más información.',
        'horarios de atención': 'Nuestro horario de atención es de lunes a viernes de 9:00 AM a 6:00 PM, y sábados de 9:00 AM a 2:00 PM.',
        'precios de sillas': 'Tenemos sillas desde $800 MXN hasta $3,500 MXN, dependiendo del modelo y características. Te recomendamos visitar nuestro catálogo o contactarnos para una cotización personalizada.',
        'cómo puedo comprar': 'Puedes comprar directamente en nuestro local, por teléfono al 656-687-78-54, o solicitando una cotización por email a jemmsa@jemmsa.com.mx',
        'hacen envíos a domicilio': 'Sí, realizamos envíos a domicilio en Juárez y áreas cercanas. El costo de envío depende de la ubicación y el tamaño del pedido.',
        'formas de pago': 'Aceptamos efectivo, tarjetas de crédito/débito, y transferencias bancarias.',
        'garantía de productos': 'Todas nuestras sillas incluyen garantía contra defectos de fabricación. La duración de la garantía varía según el modelo.',
        'default': 'Entiendo que tienes una pregunta sobre "$1". Como asistente especializado en Ley Silla, puedo ayudarte con información sobre: cumplimiento legal, empresas obligadas, multas, nuestros productos y servicios, o cómo contactarnos. ¿Podrías reformular tu pregunta o elegir alguna de estas opciones?'
    },
    'en': {
        'hello': 'Hello! I\'m your virtual assistant from Chair Law. How can I help you? You can ask me about Chair Law, obligated companies, fines, or our services.',
        'what is chair law': 'Chair Law is a regulation that requires commercial and service establishments to provide chairs or seats to their workers who remain standing for long periods. Its purpose is to protect occupational health and prevent diseases related to prolonged standing.',
        'which companies must comply': 'All companies in the service sector, commerce, and workplaces where employees spend long periods standing must comply. Examples: department stores, supermarkets, banks, restaurants, pharmacies, transport stations, and reception areas in offices or hospitals.',
        'what are the fines': 'Fines for non-compliance range from 250 to 2,500 UMAs, which is approximately $27,000 to $275,000 MXN. Additionally, there may be temporary suspension of activities.',
        'how to contact you': 'You can contact us at phone 656-687-78-54, by email at jemmsa@jemmsa.com.mx, or by visiting our Contact section on the website.',
        'what services do you offer': 'We offer legal advice on Chair Law compliance, sale of appropriate ergonomic chairs, obligation diagnosis, and implementation process support.',
        'what chairs do you recommend': 'We recommend ergonomic chairs with height adjustment, lumbar support, stable base, and durable materials. We have a catalog with different models according to the specific needs of each establishment.',
        'is it mandatory for all companies': 'No, only for commercial establishments, services, and workplaces where employees remain standing for long periods while serving customers or performing their duties.',
        'how long do they have to implement': 'Once the obligation is identified, implementation is recommended as soon as possible. Compliance should be immediate once the legal obligation is known.',
        'are specific chairs required': 'The law doesn\'t specify brands, but chairs must be ergonomic, safe, and suitable for the activities performed by the worker.',
        'where are you located': 'We are located in Satélite, 32540 Juárez, Chih. You can visit us or contact us by phone for more information.',
        'business hours': 'Our business hours are Monday to Friday from 9:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 2:00 PM.',
        'chair prices': 'We have chairs from $800 MXN to $3,500 MXN, depending on the model and features. We recommend visiting our catalog or contacting us for a personalized quote.',
        'how can i buy': 'You can buy directly at our store, by phone at 656-687-78-54, or by requesting a quote by email at jemmsa@jemmsa.com.mx',
        'do you offer home delivery': 'Yes, we offer home delivery in Juárez and nearby areas. The shipping cost depends on the location and order size.',
        'payment methods': 'We accept cash, credit/debit cards, and bank transfers.',
        'product warranty': 'All our chairs include warranty against manufacturing defects. The warranty duration varies by model.',
        'default': 'I understand you have a question about "$1". As a Chair Law specialist assistant, I can help you with information about: legal compliance, obligated companies, fines, our products and services, or how to contact us. Could you rephrase your question or choose one of these options?'
    }
};

// Palabras clave para mejor coincidencia
const keywordSynonyms = {
    'es': {
        'ley silla': ['ley silla', 'normativa sillas', 'ley de sillas', 'obligación sillas'],
        'empresas': ['empresas', 'negocios', 'establecimientos', 'comercios'],
        'multas': ['multas', 'sanciones', 'infracciones', 'penalizaciones'],
        'contacto': ['contacto', 'ubicación', 'teléfono', 'email', 'local'],
        'servicios': ['servicios', 'asesoría', 'consultoría', 'apoyo'],
        'sillas': ['sillas', 'asientos', 'muebles', 'productos'],
        'precios': ['precios', 'costos', 'cotización', 'valor'],
        'compra': ['comprar', 'adquirir', 'ordenar', 'pedido'],
        'envío': ['envío', 'entrega', 'domicilio', 'shipping'],
        'pago': ['pago', 'tarjeta', 'efectivo', 'transferencia'],
        'garantía': ['garantía', 'calidad', 'durabilidad']
    },
    'en': {
        'chair law': ['chair law', 'chair regulation', 'seat law'],
        'companies': ['companies', 'businesses', 'establishments'],
        'fines': ['fines', 'penalties', 'sanctions'],
        'contact': ['contact', 'location', 'phone', 'email', 'address'],
        'services': ['services', 'advice', 'consulting', 'support'],
        'chairs': ['chairs', 'seats', 'furniture', 'products'],
        'prices': ['prices', 'costs', 'quotation', 'value'],
        'buy': ['buy', 'purchase', 'order', 'acquire'],
        'delivery': ['delivery', 'shipping', 'home delivery'],
        'payment': ['payment', 'card', 'cash', 'transfer'],
        'warranty': ['warranty', 'guarantee', 'quality']
    }
};


// Funcionalidad del Chatbot
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const quickQuestions = document.querySelectorAll('.quick-question');
    
    let currentLanguage = 'es';
    
    // Toggle ventana del chatbot
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            chatbotWindow.classList.toggle('chatbot-hidden');
            if (!chatbotWindow.classList.contains('chatbot-hidden')) {
                chatbotInput.focus();
            }
        });
    }
    
    // Cerrar chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotWindow.classList.add('chatbot-hidden');
        });
    }
    
    // Enviar mensaje
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage(response, 'bot');
            }, 1000);
            chatbotInput.value = '';
        }
    }
    
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Preguntas rápidas
    quickQuestions.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            addMessage(question, 'user');
            setTimeout(() => {
                const response = getBotResponse(question);
                addMessage(response, 'bot');
            }, 1000);
        });
    });
    
    // Añadir mensaje al chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        
        const icon = document.createElement('i');
        icon.className = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
        avatar.appendChild(icon);
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        content.appendChild(paragraph);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Actualizar idioma basado en el mensaje del usuario
        if (sender === 'user') {
            updateLanguageBasedOnMessage(text);
        }
    }
    
    // Obtener respuesta del bot
    function getBotResponse(message) {
        const normalizedMessage = message.toLowerCase().trim();
        const knowledgeBase = chatbotKnowledge[currentLanguage];
        
        // Buscar coincidencia en el conocimiento
        for (const [key, response] of Object.entries(knowledgeBase)) {
            if (normalizedMessage.includes(key) && key !== 'default') {
                return response;
            }
        }
        
        // Respuesta por defecto
        return knowledgeBase.default;
    }
    
    // Actualizar idioma basado en el mensaje
    function updateLanguageBasedOnMessage(message) {
        const englishWords = ['hello', 'hi', 'what', 'how', 'when', 'where', 'why', 'chair law', 'comply', 'fines'];
        const hasEnglish = englishWords.some(word => message.toLowerCase().includes(word));
        
        if (hasEnglish && !message.toLowerCase().includes('hola') && !message.toLowerCase().includes('qué')) {
            currentLanguage = 'en';
        } else {
            currentLanguage = 'es';
        }
    }
});