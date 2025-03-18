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
