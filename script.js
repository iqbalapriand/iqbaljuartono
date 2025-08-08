// Slider functionality
let currentIndex = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  // Extended for all sliders including coding projects

function showSlide(sliderId, index) {
    const slider = document.getElementById('slider' + sliderId);
    if (!slider) return;
    
    const sliderItems = slider.querySelectorAll('img');
    const totalSlides = sliderItems.length;
    
    if (index >= totalSlides) {
        currentIndex[sliderId - 1] = 0;
    } else if (index < 0) {
        currentIndex[sliderId - 1] = totalSlides - 1;
    } else {
        currentIndex[sliderId - 1] = index;
    }

    const newTransform = `translateX(-${currentIndex[sliderId - 1] * 100}%)`;
    slider.style.transform = newTransform;
}

function nextSlide(sliderId, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    showSlide(sliderId, currentIndex[sliderId - 1] + 1);
}

function prevSlide(sliderId, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    showSlide(sliderId, currentIndex[sliderId - 1] - 1);
}

// Category Filter Functionality
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Add fade out effect
    projectsGrid.classList.add('fade-out');
    
    setTimeout(() => {
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
        
        // Remove fade out effect
        projectsGrid.classList.remove('fade-out');
    }, 250);
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sliders
    for (let i = 1; i <= 10; i++) {
        showSlide(i, 0);
    }
    
    // Add click event listeners to slider navigation buttons
    const prevButtons = document.querySelectorAll('.prev');
    const nextButtons = document.querySelectorAll('.next');
    
    prevButtons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            prevSlide(index + 1, event);
        });
    });
    
    nextButtons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            nextSlide(index + 1, event);
        });
    });
    
    // Add event listeners to filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const category = this.getAttribute('data-category');
            filterProjects(category);
        });
    });
    
    // Hamburger menu functionality (if exists)
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    
    if (hamburger && navbar) {
        hamburger.addEventListener('click', function() {
            navbar.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.navbar-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('active');
            });
        });
        
        // Shrink navbar on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize interactive animations for qualities section (if exists)
    initializeQualitiesAnimations();
    
    // Initialize CTA animations (if exists)
    initializeCTAAnimations();
});

// Custom smooth scroll with wheel event (optional - can be removed if causing issues)
function initCustomScroll() {
    document.addEventListener('wheel', function(e) {
        if (e.deltaY !== 0) {
            e.preventDefault();
            window.scrollBy({
                top: e.deltaY * 0.8, // Adjust scroll speed
                behavior: 'smooth'
            });
        }
    }, { passive: false });
}

// Button ripple effect
function addRippleEffect() {
    const buttons = document.querySelectorAll('.cta-button, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Interactive qualities animations
function initializeQualitiesAnimations() {
    const qualities = document.querySelectorAll('.quality');
    if (qualities.length === 0) return;
    
    qualities.forEach(quality => {
        quality.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rotateY = ((x / rect.width) - 0.5) * 10;
            const rotateX = ((y / rect.height) - 0.5) * -10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            
            const iconContainer = this.querySelector('.icon-container');
            if (iconContainer) {
                iconContainer.style.transform = `translateX(${(x / rect.width - 0.5) * 10}px) translateY(${(y / rect.height - 0.5) * 10}px) scale(1.1)`;
            }
        });
        
        quality.addEventListener('mouseleave', function() {
            this.style.transform = '';
            const iconContainer = this.querySelector('.icon-container');
            if (iconContainer) {
                iconContainer.style.transform = '';
            }
        });
    });
    
    // Intersection observer for entrance animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                qualities.forEach((quality, index) => {
                    setTimeout(() => {
                        quality.style.opacity = '1';
                        quality.style.transform = 'translateY(0)';
                    }, 150 * index);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Set initial state
    qualities.forEach(quality => {
        quality.style.opacity = '0';
        quality.style.transform = 'translateY(30px)';
        quality.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const qualitiesContainer = document.querySelector('.qualities');
    if (qualitiesContainer) {
        observer.observe(qualitiesContainer);
    }
}

// CTA section animations
function initializeCTAAnimations() {
    const ctaContainer = document.querySelector('.cta-container');
    if (!ctaContainer) return;
    
    const ctaText = document.querySelector('.cta-text');
    const ctaButtons = document.querySelector('.cta-buttons');
    const buttons = document.querySelectorAll('.btn');
    
    // Entrance animations
    if (ctaText) {
        setTimeout(() => {
            ctaText.style.opacity = '1';
            ctaText.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (ctaButtons) {
        setTimeout(() => {
            ctaButtons.style.opacity = '1';
            ctaButtons.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Hover effects
    ctaContainer.addEventListener('mouseenter', function() {
        this.classList.add('hover-active');
    });
    
    ctaContainer.addEventListener('mouseleave', function() {
        this.classList.remove('hover-active');
    });
    
    // Interactive tilt effect
    ctaContainer.addEventListener('mousemove', function(e) {
        if (window.innerWidth < 768) return;
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = ((x / rect.width) - 0.5) * 4;
        const yPercent = ((y / rect.height) - 0.5) * 3;
        
        this.style.transform = `perspective(1000px) rotateX(${-yPercent}deg) rotateY(${xPercent}deg) scale(1.02)`;
    });
    
    ctaContainer.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Button pulse effects
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    });
    
    // Create floating particles
    createFloatingElements(ctaContainer);
    
    // Dynamic particles on mouse move
    ctaContainer.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.8) {
            createDynamicBlueParticle(e, this);
        }
    });
}

// Create floating background elements
function createFloatingElements(container) {
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 50 + 30 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        
        const blueOpacity = Math.random() * 0.08 + 0.02;
        const blueColor = `rgba(63, 162, 246, ${blueOpacity})`;
        const blueGradient = `radial-gradient(circle, ${blueColor} 0%, rgba(63, 162, 246, 0) 70%)`;
        particle.style.background = blueGradient;
        
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * 80 + 10 + '%';
        particle.style.top = Math.random() * 80 + 10 + '%';
        
        const duration = Math.random() * 5 + 5;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        
        container.appendChild(particle);
    }
}

// Create dynamic particles on mouse movement
function createDynamicBlueParticle(e, container) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const particle = document.createElement('div');
    
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 8 + 4 + 'px';
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    
    const opacity = Math.random() * 0.4 + 0.1;
    particle.style.backgroundColor = `rgba(63, 162, 246, ${opacity})`;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.pointerEvents = 'none';
    
    container.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 60 + 20;
    const destX = x + Math.cos(angle) * distance;
    const destY = y + Math.sin(angle) * distance;
    
    const animation = particle.animate([
        { transform: 'scale(1)', opacity: opacity, left: x + 'px', top: y + 'px' },
        { transform: 'scale(0)', opacity: 0, left: destX + 'px', top: destY + 'px' }
    ], {
        duration: 1000 + Math.random() * 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });
    
    animation.onfinish = () => {
        particle.remove();
    };
}

// Initialize additional effect
document.addEventListener('DOMContentLoaded', function() {
    addRippleEffect();
    // Uncomment the line below if you want custom scroll (might interfere with normal scrolling)
    // initCustomScroll();
});
