// JavaScript específico para la página de procesos

document.addEventListener('DOMContentLoaded', function() {

    // Animación de entrada para los items de la timeline
    const observeTimeline = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Añadir delay escalonado
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                        
                        // Animar el icono adicional
                        const icon = entry.target.querySelector('.timeline-icon');
                        if (icon) {
                            setTimeout(() => {
                                icon.style.transform = 'scale(1.2) rotate(5deg)';
                                icon.style.transition = 'transform 0.3s ease';
                                setTimeout(() => {
                                    icon.style.transform = 'scale(1) rotate(0deg)';
                                }, 300);
                            }, 400);
                        }
                    }, Array.from(timelineItems).indexOf(entry.target) * 100);
                } else {
                    // Resetear animación cuando sale del viewport
                    entry.target.classList.remove('animate');
                }
            });
        }, observerOptions);

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    };

    // Contador animado para la duración
    const animateCounters = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const circle = entry.target.querySelector('.marker-circle');
                if (circle) {
                    if (entry.isIntersecting) {
                        // Agregar efecto de pulso al círculo
                        circle.style.animation = 'pulse-circle 0.6s ease-out';
                    } else {
                        // Resetear animación
                        circle.style.animation = 'none';
                    }
                }
            });
        }, { threshold: 0.5 });

        timelineItems.forEach(item => observer.observe(item));
    };

    // Efecto parallax en el hero
    const heroParallax = () => {
        const hero = document.querySelector('.process-hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.8;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        });
    };

    // Animación de entrada para los beneficios
    const observeBenefits = () => {
        const benefitCards = document.querySelectorAll('.benefit-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    // Resetear cuando sale del viewport
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                }
            });
        }, { threshold: 0.2 });

        benefitCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease-out';
            observer.observe(card);
        });
    };

    // Hover effect para las tarjetas de beneficios
    const benefitHoverEffect = () => {
        const benefitCards = document.querySelectorAll('.benefit-card');
        
        benefitCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.benefit-icon');
                if (icon) {
                    icon.style.transform = 'rotate(360deg) scale(1.3)';
                    icon.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                }
                
                // Agregar efecto de shake
                this.style.animation = 'shake 0.5s ease-in-out';
            });

            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.benefit-icon');
                if (icon) {
                    icon.style.transform = 'rotate(0deg) scale(1)';
                }
                this.style.animation = 'none';
            });
        });
    };

    // Scroll suave para los CTAs
    const smoothScrollCTAs = () => {
        const ctaButtons = document.querySelectorAll('a[href*="#"]');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Solo aplicar smooth scroll si es un ancla en la misma página
                if (href.includes('#') && !href.includes('index.html')) {
                    e.preventDefault();
                    const targetId = href.split('#')[1];
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    };

    // Efecto de progreso en la línea de tiempo
    const timelineProgress = () => {
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;

        window.addEventListener('scroll', () => {
            const timelineRect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calcular el porcentaje de scroll dentro de la timeline
            if (timelineRect.top < windowHeight && timelineRect.bottom > 0) {
                const scrollPercentage = Math.min(
                    Math.max((windowHeight - timelineRect.top) / timelineRect.height, 0),
                    1
                );
                
                // Aplicar efecto visual a las líneas según el progreso
                const markers = document.querySelectorAll('.marker-line');
                markers.forEach((line, index) => {
                    const lineProgress = (scrollPercentage * markers.length) - index;
                    const opacity = Math.min(Math.max(lineProgress, 0), 1);
                    line.style.opacity = opacity;
                });
            }
        });
    };

    // Animación de los iconos de duración
    const animateDurationIcons = () => {
        const durationIcons = document.querySelectorAll('.timeline-duration svg');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'rotate-clock 2s linear infinite';
                }
            });
        }, { threshold: 0.5 });

        durationIcons.forEach(icon => observer.observe(icon));
    };

    // Agregar animaciones CSS dinámicamente
    const addDynamicStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse-circle {
                0%, 100% { 
                    box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); 
                    transform: scale(1);
                }
                50% { 
                    box-shadow: 0 0 60px rgba(59, 130, 246, 0.9), 0 0 90px rgba(59, 130, 246, 0.5); 
                    transform: scale(1.1);
                }
            }
            
            @keyframes rotate-clock {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0) translateY(-20px) rotate(2deg); }
                25% { transform: translateX(-5px) translateY(-22px) rotate(1deg); }
                75% { transform: translateX(5px) translateY(-18px) rotate(3deg); }
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    };

    // Inicializar todas las funciones
    observeTimeline();
    animateCounters();
    heroParallax();
    observeBenefits();
    benefitHoverEffect();
    smoothScrollCTAs();
    timelineProgress();
    animateDurationIcons();
    addDynamicStyles();

    // Logging para desarrollo (remover en producción)
    console.log('✓ Página de procesos inicializada correctamente');

}); // Fin del DOMContentLoaded
