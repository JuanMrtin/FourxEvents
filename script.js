lucide.createIcons();

const navbar = document.getElementById('navbar');
const logo = document.getElementById('logo');
const logoImg = document.getElementById('logo-img');
const navLinks = document.querySelectorAll('.nav-link');
const ctaBtn = document.getElementById('cta-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const mobileMenu = document.getElementById('mobile-menu');

let isScrolled = false;
let mobileMenuOpen = false;

function updateNavbar() {
    if (isScrolled || mobileMenuOpen) {
        navbar.classList.replace('bg-transparent', 'bg-[#F7F5F0]');
        navbar.classList.replace('py-8', 'py-4');
        navbar.classList.add('shadow-sm');

        logo.classList.replace('opacity-0', 'opacity-100');
        if(logoImg) logoImg.classList.remove('logo-white');

        navLinks.forEach(link => link.classList.replace('text-white', 'text-[#4A3B32]'));

        ctaBtn.classList.remove('bg-white', 'text-[#4A3B32]', 'border-white');
        ctaBtn.classList.add('bg-[#4A3B32]', 'text-[#F7F5F0]', 'border-[#4A3B32]');
        
        mobileMenuBtn.classList.replace('text-white', 'text-[#4A3B32]');
    } else {
        navbar.classList.replace('bg-[#F7F5F0]', 'bg-transparent');
        navbar.classList.replace('py-4', 'py-8');
        navbar.classList.remove('shadow-sm');

        logo.classList.replace('opacity-100', 'opacity-0');
        logo.classList.add('md:opacity-100');
        if(logoImg) logoImg.classList.add('logo-white');

        navLinks.forEach(link => link.classList.replace('text-[#4A3B32]', 'text-white'));

        ctaBtn.classList.add('bg-white', 'text-[#4A3B32]', 'border-white');
        ctaBtn.classList.remove('bg-[#4A3B32]', 'text-[#F7F5F0]', 'border-[#4A3B32]');
        
        mobileMenuBtn.classList.replace('text-[#4A3B32]', 'text-white');
    }
}

window.addEventListener('scroll', () => {
    isScrolled = window.scrollY > 50;
    updateNavbar();
});

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuOpen = !mobileMenuOpen;
    updateNavbar();
    if (mobileMenuOpen) {
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        mobileMenu.classList.remove('h-0', 'opacity-0', 'pointer-events-none');
        mobileMenu.classList.add('h-screen', 'opacity-100', 'pointer-events-auto');
    } else {
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        mobileMenu.classList.add('h-0', 'opacity-0', 'pointer-events-none');
        mobileMenu.classList.remove('h-screen', 'opacity-100', 'pointer-events-auto');
    }
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuOpen = false;
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        mobileMenu.classList.add('h-0', 'opacity-0', 'pointer-events-none');
        mobileMenu.classList.remove('h-screen', 'opacity-100', 'pointer-events-auto');
        updateNavbar();
    });
});

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const heroContent = document.getElementById('hero-content');
        if(heroContent) heroContent.classList.remove('opacity-0');
        
        const heroScale = document.querySelector('.hero-scale');
        if(heroScale) {
            heroScale.style.transform = 'scale(1)';
            heroScale.style.opacity = '1';
        }

        const heroFade = document.querySelector('.hero-fade-up');
        if(heroFade) {
            heroFade.style.transform = 'translateY(0)';
            heroFade.style.opacity = '1';
        }
    }, 100);
});

const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up, .image-reveal-container, .stagger-child').forEach(el => {
    observer.observe(el);
});

const heroBg = document.getElementById('hero-bg');
const heroContent = document.getElementById('hero-content');
const scrollIndicator = document.getElementById('scroll-indicator');

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
        if(heroBg) heroBg.style.transform = `translateY(${y * 0.3}px)`;
        if(heroContent) heroContent.style.opacity = 1 - (y / 500);
        if(scrollIndicator) scrollIndicator.style.opacity = 1 - (y / 300);
    }
});
