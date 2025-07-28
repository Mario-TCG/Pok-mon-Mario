// Función para inicializar el sitio
document.addEventListener('DOMContentLoaded', function() {
    // Activar tooltips
    $('[data-toggle="tooltip"]').tooltip();
    
    // Activar popovers
    $('[data-toggle="popover"]').popover();
    
    // Control de carrusel
    $('.carousel').carousel({
        interval: 6000,
        pause: "hover"
    });
    
    // Animación al hacer scroll
    $(window).scroll(function() {
        animateOnScroll();
    });
    
    // Manejo de formularios
    handleForms();
    
    // Contador para ofertas especiales
    initCountdown();
    
    // Efectos hover para tarjetas de producto
    productCardHover();
});

// Animación al hacer scroll
function animateOnScroll() {
    $('.animate-on-scroll').each(function() {
        var elementPosition = $(this).offset().top;
        var scrollPosition = $(window).scrollTop() + $(window).height();
        
        if (scrollPosition > elementPosition) {
            $(this).addClass('animated fadeInUp');
        }
    });
}

// Manejo de formularios
function handleForms() {
    // Formulario de contacto
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        
        // Simulación de envío
        $.ajax({
            type: 'POST',
            url: 'https://api.pokemontcgelite.com/contact',
            data: formData,
            success: function(response) {
                $('#contactForm').hide();
                $('#formSuccess').fadeIn();
            },
            error: function() {
                $('#formError').fadeIn();
            }
        });
    });
    
    // Formulario de newsletter
    $('#newsletterForm').submit(function(e) {
        e.preventDefault();
        var email = $('#newsletterEmail').val();
        
        if (validateEmail(email)) {
            // Simulación de suscripción
            $.ajax({
                type: 'POST',
                url: 'https://api.pokemontcgelite.com/newsletter',
                data: { email: email },
                success: function(response) {
                    $('#newsletterForm').hide();
                    $('#newsletterSuccess').fadeIn();
                }
            });
        } else {
            $('#newsletterError').text('Por favor ingresa un correo válido').fadeIn();
        }
    });
}

// Validación de email
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Contador para ofertas especiales
function initCountdown() {
    // Fecha de finalización de la oferta (24 horas desde ahora)
    var countDownDate = new Date();
    countDownDate.setHours(countDownDate.getHours() + 24);
    
    // Actualizar el contador cada segundo
    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        
        // Cálculos de tiempo
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Mostrar el resultado
        $('#countdown').html(hours + "h " + minutes + "m " + seconds + "s ");
        
        // Si el contador termina
        if (distance < 0) {
            clearInterval(x);
            $('#countdown').html("¡Oferta expirada!");
            $('#specialOffer').addClass('expired');
        }
    }, 1000);
}

// Efectos hover para tarjetas de producto
function productCardHover() {
    $('.product-card').hover(
        function() {
            $(this).find('.card-img-top').css('transform', 'scale(1.05)');
            $(this).find('.btn-primary').addClass('btn-warning').removeClass('btn-primary');
        },
        function() {
            $(this).find('.card-img-top').css('transform', 'scale(1)');
            $(this).find('.btn-warning').addClass('btn-primary').removeClass('btn-warning');
        }
    );
}

// Google Analytics (simulado)
function trackEvent(category, action, label) {
    console.log('Event tracked:', category, action, label);
    // En producción, aquí iría el código real de Google Analytics
}

// Trackear clicks importantes
$(document).on('click', '.cta-button', function() {
    trackEvent('CTA', 'Click', $(this).text());
});

// Trackear interacción con productos
$(document).on('click', '.product-card', function() {
    var productName = $(this).find('.card-title').text();
    trackEvent('Product', 'View', productName);
});