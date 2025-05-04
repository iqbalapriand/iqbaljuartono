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

function nextSlide(sliderId, event) {
    if (event) {
        event.preventDefault();  // Prevent default button behavior
        event.stopPropagation(); // Stop event from bubbling up
    }
    showSlide(sliderId, currentIndex[sliderId - 1] + 1);
}

function prevSlide(sliderId, event) {
    if (event) {
        event.preventDefault();  // Prevent default button behavior
        event.stopPropagation(); // Stop event from bubbling up
    }
    showSlide(sliderId, currentIndex[sliderId - 1] - 1);
}

// Initialize all sliders when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set up each slider initially
    for (let i = 1; i <= 6; i++) {
        showSlide(i, 0);
    }
    
    // Add click event listeners to all slider navigation buttons
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














// Add this JavaScript to enhance the interactive animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialization for the animation
    const qualities = document.querySelectorAll('.quality');
    
    // Add mouse movement parallax effect to each card
    qualities.forEach(quality => {
        quality.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate rotation based on mouse position
            const rotateY = ((x / rect.width) - 0.5) * 10;  // -5 to 5 degrees
            const rotateX = ((y / rect.height) - 0.5) * -10; // 5 to -5 degrees
            
            // Apply the rotation transform
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            
            // Move the icon based on mouse position (subtle effect)
            const iconContainer = this.querySelector('.icon-container');
            if (iconContainer) {
                iconContainer.style.transform = `translateX(${(x / rect.width - 0.5) * 10}px) translateY(${(y / rect.height - 0.5) * 10}px) scale(1.1)`;
            }
        });
        
        // Reset transforms when mouse leaves
        quality.addEventListener('mouseleave', function() {
            this.style.transform = '';
            const iconContainer = this.querySelector('.icon-container');
            if (iconContainer) {
                iconContainer.style.transform = '';
            }
            // Removed automatic floating animation
        });
    });
    
    // Optional: Add a staggered entrance animation when scrolling to the section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // When the section is visible, animate the cards one by one
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
    
    // Initial state for cards (hidden)
    qualities.forEach(quality => {
        quality.style.opacity = '0';
        quality.style.transform = 'translateY(30px)';
        quality.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Observe the qualities container
    const qualitiesContainer = document.querySelector('.qualities');
    if (qualitiesContainer) {
        observer.observe(qualitiesContainer);
    }
});








document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const ctaContainer = document.querySelector('.cta-container');
    const ctaText = document.querySelector('.cta-text');
    const ctaButtons = document.querySelector('.cta-buttons');
    const buttons = document.querySelectorAll('.btn');
    
    // Entrance animations with delay
    setTimeout(function() {
        ctaText.style.opacity = '1';
        ctaText.style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(function() {
        ctaButtons.style.opacity = '1';
        ctaButtons.style.transform = 'translateY(0)';
    }, 500);
    
    // Add hover effect to container
    ctaContainer.addEventListener('mouseenter', function() {
        this.classList.add('hover-active');
    });
    
    ctaContainer.addEventListener('mouseleave', function() {
        this.classList.remove('hover-active');
    });
    
    // Add interactive tilt effect
    ctaContainer.addEventListener('mousemove', function(e) {
        if (window.innerWidth < 768) return; // Disable on mobile
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate position relative to center
        const xPercent = ((x / rect.width) - 0.5) * 4; // Max 4 degrees
        const yPercent = ((y / rect.height) - 0.5) * 3; // Max 3 degrees
        
        // Apply subtle tilt based on mouse position
        this.style.transform = `perspective(1000px) rotateX(${-yPercent}deg) rotateY(${xPercent}deg) scale(1.02)`;
    });
    
    ctaContainer.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Add pulse effect to buttons
    buttons.forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        btn.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    });
    
    // Create blue floating particles in background
    createFloatingElements();
});

// Create subtle background elements with blue colors
function createFloatingElements() {
    const ctaContainer = document.querySelector('.cta-container');
    const particleCount = 8; // Increased particle count
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Style the particle - now with blue colors
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 50 + 30 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        
        // Use blue gradients with different opacities
        const blueOpacity = Math.random() * 0.08 + 0.02; // Low opacity for subtle effect
        const blueColor = `rgba(63, 162, 246, ${blueOpacity})`;
        const blueGradient = `radial-gradient(circle, ${blueColor} 0%, rgba(63, 162, 246, 0) 70%)`;
        particle.style.background = blueGradient;
        
        particle.style.pointerEvents = 'none';
        
        // Position randomly
        particle.style.left = Math.random() * 80 + 10 + '%';
        particle.style.top = Math.random() * 80 + 10 + '%';
        
        // Add animation with random duration
        const duration = Math.random() * 5 + 5;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        
        // Add to container
        ctaContainer.appendChild(particle);
    }
}

// Create dynamic particles on mousemove
document.querySelector('.cta-container').addEventListener('mousemove', function(e) {
    if (Math.random() > 0.8) { // Only create particles occasionally
        createDynamicBlueParticle(e, this);
    }
});

// Function to create dynamic blue particles on mouse movement
function createDynamicBlueParticle(e, container) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const particle = document.createElement('div');
    
    // Style the particle
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 8 + 4 + 'px'; // Smaller dynamic particles
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    
    // Blue color with random opacity
    const opacity = Math.random() * 0.4 + 0.1;
    particle.style.backgroundColor = `rgba(63, 162, 246, ${opacity})`;
    
    // Position at mouse location
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.pointerEvents = 'none';
    
    // Add to container
    container.appendChild(particle);
    
    // Animate outward in random direction
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 60 + 20;
    const destX = x + Math.cos(angle) * distance;
    const destY = y + Math.sin(angle) * distance;
    
    // Animate using keyframes
    const animation = particle.animate([
        { transform: 'scale(1)', opacity: opacity, left: x + 'px', top: y + 'px' },
        { transform: 'scale(0)', opacity: 0, left: destX + 'px', top: destY + 'px' }
    ], {
        duration: 1000 + Math.random() * 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });
    
    // Remove particle when animation completes
    animation.onfinish = () => {
        particle.remove();
    };
}












