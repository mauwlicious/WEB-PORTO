const btnBurger = document.getElementById('btn-burger');
const menuNav = document.getElementById('menu');
const navBar = document.querySelector('nav');
const navLinks = menuNav ? menuNav.querySelectorAll('a[href^="#"]') : [];

if (btnBurger && menuNav) {
    btnBurger.addEventListener('click', function () {
        menuNav.classList.toggle('tampil');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuNav.classList.contains('tampil')) {
            menuNav.classList.remove('tampil');
        }
    });
});

window.addEventListener('scroll', () => {
    if (!navBar) return;
    if (window.scrollY > 20) {
        navBar.classList.add('scrolled');
    } else {
        navBar.classList.remove('scrolled');
    }
});

const carouselTrack = document.getElementById('carousel-track');
const slides = carouselTrack ? Array.from(carouselTrack.querySelectorAll('.carousel-slide')) : [];
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const dotsContainer = document.getElementById('carousel-dots');
let currentSlide = 0;

function updateCarousel() {
    if (!carouselTrack) return;
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    if (!dotsContainer) return;
    const dots = Array.from(dotsContainer.children);
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function createCarouselDots() {
    if (!dotsContainer || slides.length === 0) return;
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });
}

function goToNextSlide() {
    if (slides.length === 0) return;
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

function goToPrevSlide() {
    if (slides.length === 0) return;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

if (btnNext) {
    btnNext.addEventListener('click', goToNextSlide);
}

if (btnPrev) {
    btnPrev.addEventListener('click', goToPrevSlide);
}

createCarouselDots();
updateCarousel();
    