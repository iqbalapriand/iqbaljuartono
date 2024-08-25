let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

const text = "Hello, I m Iqbal Apriand Juartono!";
let index = 0;
let isDeleting = false;
const speed = 100; 
const delayBetweenCycles = 1000; 

function typeEffect() {
    const element = document.getElementById("typing");

    if (!isDeleting) {
        element.innerHTML = text.substring(0, index);
        index++;
        if (index > text.length) {
            isDeleting = true;
            setTimeout(typeEffect, delayBetweenCycles);
        } else {
            setTimeout(typeEffect, speed);
        }
    } else {
        element.innerHTML = text.substring(0, index);
        index--;
        if (index < 0) {
            isDeleting = false;
            setTimeout(typeEffect, speed);
        } else {
            setTimeout(typeEffect, speed);
        }
    }
}

window.onload = function() {
    typeEffect();
};