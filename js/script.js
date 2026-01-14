// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

// Navegación responsive
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Dropdown móvil
const dropdown = document.querySelector('.dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');

if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
        // Solo en móvil (menos de 768px)
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
}

// Cerrar menú al hacer click en un enlace
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Permitir que los enlaces del dropdown funcionen
        if (!link.classList.contains('dropdown-toggle')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            if (dropdown) dropdown.classList.remove('active');
        }
    });
});

// Cerrar menú al hacer click fuera de él
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Actualizar sección activa
    updateActiveSection();
});

// Función para actualizar la sección activa en el navbar
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150; // Offset para mejor detección
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Verificar si estamos en esta sección
        if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
            currentSection = sectionId;
        }
    });
    
    // Remover clase active de todos los enlaces
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Agregar clase active al enlace correspondiente
    if (currentSection) {
        const activeLink = document.querySelector(`.nav-links a[href="#${currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Llamar al cargar la página para marcar la sección inicial
updateActiveSection();

// Smooth scroll con offset para la navegación fija
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animación de elementos al hacer scroll - MEJORADO
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Agregar clase animated cuando entra
            entry.target.classList.add('animated');
        } else {
            // Remover clase cuando sale para que se pueda reiniciar
            entry.target.classList.remove('animated');
        }
    });
}, observerOptions);

// Observar títulos de sección
document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Observar tarjetas de servicios con efecto escalonado
document.querySelectorAll('.service-card').forEach((el, index) => {
    el.classList.add('scale-in', `stagger-${(index % 3) + 1}`);
    observer.observe(el);
});

// Observar items de portafolio con diferentes direcciones
document.querySelectorAll('.portfolio-item').forEach((el, index) => {
    const animClass = index % 2 === 0 ? 'slide-in-left' : 'slide-in-right';
    el.classList.add(animClass, `stagger-${index + 1}`);
    observer.observe(el);
});

// Observar stats con efecto escalonado
document.querySelectorAll('.stat').forEach((el, index) => {
    el.classList.add('scale-in', `stagger-${index + 1}`);
    observer.observe(el);
});

// Observar feature boxes
document.querySelectorAll('.feature-box').forEach((el, index) => {
    el.classList.add('slide-in-left', `stagger-${(index % 4) + 1}`);
    observer.observe(el);
});

// Observar about text
const aboutText = document.querySelector('.about-text');
if (aboutText) {
    aboutText.classList.add('slide-in-left');
    observer.observe(aboutText);
}

// Observar about features
const aboutFeatures = document.querySelector('.about-features');
if (aboutFeatures) {
    aboutFeatures.classList.add('slide-in-right');
    observer.observe(aboutFeatures);
}

// Observar formulario de contacto
const contactFormElement = document.querySelector('.contact-form');
if (contactFormElement) {
    contactFormElement.classList.add('slide-in-left');
    observer.observe(contactFormElement);
}

// Observar info boxes de contacto
document.querySelectorAll('.info-box').forEach((el, index) => {
    el.classList.add('slide-in-right', `stagger-${index + 1}`);
    observer.observe(el);
});

// Efecto parallax sutil en hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animación de números en las estadísticas
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isPercent = target.includes('%');
        const isPlus = target.includes('+');
        const hasSlash = target.includes('/');
        
        // Extraer todos los números del texto
        const numbers = target.match(/\d+/g);
        if (!numbers) return;
        
        // Si tiene barra (24/7), no animar, solo mostrar
        if (hasSlash) {
            return;
        }
        
        const number = parseInt(numbers[0]);
        
        let current = 0;
        const increment = number / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPercent) displayValue += '%';
            if (isPlus) displayValue = '+' + displayValue;
            
            stat.textContent = displayValue;
        }, stepTime);
    });
};

// Ejecutar animación de estadísticas cuando sean visibles
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Primero animar la aparición de los stats
            entry.target.querySelectorAll('.stat').forEach(stat => {
                stat.classList.add('animated');
            });
            // Luego animar los números
            setTimeout(() => {
                animateStats();
            }, 300);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Efecto de escritura en el código
const codeContent = document.querySelector('.code-content code');
if (codeContent) {
    const originalText = codeContent.innerHTML;
    codeContent.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            codeContent.innerHTML = originalText.substring(0, i + 1);
            i++;
            setTimeout(typeWriter, 20);
        }
    };
    
    // Iniciar después de un pequeño delay
    setTimeout(typeWriter, 300);
}

// Añadir clase active al link de navegación actual
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Agregar efecto hover 3D a las tarjetas (solo en dispositivos no táctiles)
if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.service-card, .portfolio-item').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Prevenir comportamiento por defecto en links sociales sin URL real
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        // Solo mostrar alerta si no hay un link real
        if (!href || href === '#' || href === '') {
            e.preventDefault();
            alert('Esta red social aún no está disponible. Estamos trabajando en nuestra presencia digital. ¡Pronto estaremos conectados!');
        }
        // Si hay un link real (http, https, etc), permitir que funcione normalmente
    });
});

// Manejo del formulario de contacto con Formspree
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoader = submitBtn.querySelector('.btn-loader');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Mostrar loader
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';
        submitBtn.disabled = true;
        formStatus.style.display = 'none';
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        
        try {
            // Enviar a Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Éxito
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '✓ ¡Mensaje enviado exitosamente! Te contactaremos pronto.';
                formStatus.style.display = 'flex';
                contactForm.reset();
            } else {
                // Error del servidor
                const data = await response.json();
                formStatus.className = 'form-status error';
                formStatus.innerHTML = '✕ Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.';
                formStatus.style.display = 'flex';
            }
        } catch (error) {
            // Error de red
            formStatus.className = 'form-status error';
            formStatus.innerHTML = '✕ Error de conexión. Por favor, verifica tu internet e intenta de nuevo.';
            formStatus.style.display = 'flex';
        } finally {
            // Restaurar botón
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Manejo del formulario de Newsletter
const newsletterForm = document.getElementById('newsletterForm');
const newsletterStatus = document.getElementById('newsletter-status');
const newsletterBtn = document.getElementById('newsletter-btn');
const newsletterIcon = newsletterBtn?.querySelector('.newsletter-icon');
const newsletterSpinner = newsletterBtn?.querySelector('.newsletter-spinner');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Mostrar loader
        if (newsletterIcon && newsletterSpinner) {
            newsletterIcon.style.display = 'none';
            newsletterSpinner.style.display = 'block';
        }
        newsletterBtn.disabled = true;
        newsletterStatus.style.display = 'none';
        
        // Obtener datos del formulario
        const formData = new FormData(newsletterForm);
        
        try {
            // Enviar a Formspree
            const response = await fetch(newsletterForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Éxito
                newsletterStatus.className = 'newsletter-status success';
                newsletterStatus.innerHTML = '✓ ¡Suscripción exitosa!';
                newsletterStatus.style.display = 'flex';
                newsletterForm.reset();
            } else {
                // Error del servidor
                newsletterStatus.className = 'newsletter-status error';
                newsletterStatus.innerHTML = '✕ Error al suscribirse. Intenta de nuevo.';
                newsletterStatus.style.display = 'flex';
            }
        } catch (error) {
            // Error de red
            newsletterStatus.className = 'newsletter-status error';
            newsletterStatus.innerHTML = '✕ Error de conexión. Intenta más tarde.';
            newsletterStatus.style.display = 'flex';
        } finally {
            // Restaurar botón
            if (newsletterIcon && newsletterSpinner) {
                newsletterIcon.style.display = 'block';
                newsletterSpinner.style.display = 'none';
            }
            newsletterBtn.disabled = false;
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                if (newsletterStatus) {
                    newsletterStatus.style.display = 'none';
                }
            }, 5000);
        }
    });
}

// WhatsApp Form Handler
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;

        // Número de WhatsApp con código de país (República Dominicana = 1809)
        const numeroWhatsApp = '18096297596';

        const texto = `Hola, mi nombre es ${nombre}.
        Teléfono: ${telefono}
        Mensaje: ${mensaje}`;

        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

        window.open(url, '_blank');
        
        // Limpiar formulario después de enviar
        whatsappForm.reset();
    });
}

}); // Fin del DOMContentLoaded

console.log('%c¡Bienvenido a NexusTech Solutions! ', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cSitio desarrollado con HTML, CSS y JavaScript', 'color: #60a5fa; font-size: 14px;');
