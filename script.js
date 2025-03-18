// Initialize current index for all 6 sliders
let currentIndex = [0, 0, 0, 0, 0, 0];  // Expanded to 6 elements for all sliders

function showSlide(sliderId, index) {
    const slider = document.getElementById('slider' + sliderId);
    const sliderItems = slider.querySelectorAll('img');
    const totalSlides = sliderItems.length;
    
    if (index >= totalSlides) {
        currentIndex[sliderId - 1] = 0;  // Go back to the first slide
    } else if (index < 0) {
        currentIndex[sliderId - 1] = totalSlides - 1;  // Go to the last slide
    } else {
        currentIndex[sliderId - 1] = index;
    }

    const newTransform = `translateX(-${currentIndex[sliderId - 1] * 100}%)`;
    slider.style.transform = newTransform;
}

function nextSlide(sliderId) {
    showSlide(sliderId, currentIndex[sliderId - 1] + 1);
}

function prevSlide(sliderId) {
    showSlide(sliderId, currentIndex[sliderId - 1] - 1);
}

// Initialize all sliders when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set up each slider initially
    for (let i = 1; i <= 6; i++) {
        showSlide(i, 0);
    }
});







document.getElementById('hamburger').addEventListener('click', function() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    
    // Toggle hamburger menu
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
});





document.addEventListener('wheel', function(e) {
    if (e.deltaY !== 0) {
      e.preventDefault();
      window.scrollBy({
        top: e.deltaY * 3.0, // Faktor 0.3 membuat scroll lebih lambat
        behavior: 'smooth'
      });
    }
  }, { passive: false });





  document.addEventListener('DOMContentLoaded', function() {
    // First, let's add the particles-js container to your projects section
    const projectsContainer = document.querySelector('.projects-container');
    
    // Create the particles-js container
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-js';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    `;
    
    // Insert the particles container as the first child of projects-container
    projectsContainer.insertBefore(particlesContainer, projectsContainer.firstChild);
    
    // Initialize particles.js
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 40,             // Reduced number of particles
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#3FA2F6"       // Match your blue color theme
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.3,            // Lower opacity for subtle effect
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#3FA2F6",
                opacity: 0.2,          // Lower opacity for lines
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,            // Slower speed for subtlety
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"       // Interactive effect on hover
                },
                onclick: {
                    enable: true,
                    mode: "push"       // Add particles on click
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 3
                }
            }
        },
        retina_detect: true
    });
    
    // Add special effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Create a ripple effect when hovering over cards
            const ripple = document.createElement('div');
            ripple.className = 'card-ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 1s ease-out forwards;
                pointer-events: none;
                z-index: -1;
            `;
            
            // Position the ripple at the center of the card
            ripple.style.width = Math.max(card.offsetWidth, card.offsetHeight) * 2 + 'px';
            ripple.style.height = Math.max(card.offsetWidth, card.offsetHeight) * 2 + 'px';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.marginLeft = -(Math.max(card.offsetWidth, card.offsetHeight)) + 'px';
            ripple.style.marginTop = -(Math.max(card.offsetWidth, card.offsetHeight)) + 'px';
            
            card.appendChild(ripple);
            
            // Remove the ripple element after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
    
    // Add CSS for the ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(1);
                opacity: 0;
            }
        }
        
        .projects-container {
            position: relative;
            overflow: hidden;
        }
        
        .project-card {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});





// Add this JavaScript to your script file
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    const projectsContainer = document.querySelector('.projects-container');
    
    // Set canvas size to match container
    function resizeCanvas() {
        canvas.width = projectsContainer.offsetWidth;
        canvas.height = projectsContainer.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle properties
    const particlesArray = [];
    const numberOfParticles = 100;
    const particleColor = '#3FA2F6';
    let mouse = {
        x: null,
        y: null,
        radius: 150 // Mouse influence radius
    };
    
    // Track mouse position
    window.addEventListener('mousemove', function(event) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.x - rect.left;
        mouse.y = event.y - rect.top;
    });
    
    // Reset mouse position when mouse leaves
    window.addEventListener('mouseout', function() {
        mouse.x = undefined;
        mouse.y = undefined;
    });
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }
        
        update() {
            // Basic movement
            this.x += this.speedX * 0.2;
            this.y += this.speedY * 0.2;
            
            // Boundary check with bounce effect
            if (this.x > canvas.width || this.x < 0) {
                this.speedX *= -1;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY *= -1;
            }
            
            // Mouse interaction
            if (mouse.x !== undefined && mouse.y !== undefined) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    
                    const directionX = forceDirectionX * force * this.density;
                    const directionY = forceDirectionY * force * this.density;
                    
                    this.x += directionX;
                    this.y += directionY;
                }
            }
            
            // Gradual return to base position when away from mouse
            if (mouse.x === undefined || mouse.y === undefined) {
                this.x += (this.baseX - this.x) * 0.05;
                this.y += (this.baseY - this.y) * 0.05;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();
        }
    }
    
    // Initialize particles
    function init() {
        particlesArray.length = 0;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connecting lines between nearby particles
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(63, 162, 246, ${1 - distance/100})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Update and draw particles
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start the animation
    init();
    animate();
});


// Add this to your JavaScript file for the button ripple effect
document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.cta-button');
    
    if (button) {
        button.addEventListener('mouseenter', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            // Center the ripple
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            button.appendChild(ripple);
            
            // Remove the span after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
});
