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
        if(logoImg) logoImg.classList.remove('logo-white');

        navLinks.forEach(link => link.classList.replace('text-white', 'text-[#4A3B32]'));

        ctaBtn.classList.remove('bg-white', 'text-[#4A3B32]', 'border-white');
        ctaBtn.classList.add('bg-[#4A3B32]', 'text-[#F7F5F0]', 'border-[#4A3B32]');
        
        mobileMenuBtn.classList.replace('text-white', 'text-[#4A3B32]');
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

// Imágenes de servicio y galería: temas coherentes y optimizadas por el CDN.
const imageSources = {
    sonido: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=85&w=1800',
    dj: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=85&w=1800',
    animacion: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=85&w=1800',
    organizacion: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=85&w=1800'
};

Object.entries(imageSources).forEach(([id, source]) => {
    const image = document.querySelector(`#${id} .image-reveal-img`);
    if (image) {
        image.src = source;
        image.loading = 'lazy';
    }
});

// Organización enfocada a comuniones, bautizos y celebraciones familiares.
const organizationIntro = document.querySelector('#organizacion h3 + p');
if (organizationIntro) {
    organizationIntro.textContent = 'Mesas dulces, decoración y ambientación cuidada para comuniones, bautizos, cumpleaños y celebraciones familiares.';
}
const organizationBenefits = [
    'Mesas dulces y rincones personalizados',
    'Decoración temática para comuniones y cumpleaños',
    'Cuidamos cada detalle para sorprender a tus invitados'
];
document.querySelectorAll('#organizacion li span:last-child').forEach((item, index) => {
    if (organizationBenefits[index]) item.textContent = organizationBenefits[index];
});

const gallerySources = [
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=85&w=1400',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=85&w=900',
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=85&w=900',
    'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=85&w=1400'
];
document.querySelectorAll('#galeria .image-reveal-img').forEach((image, index) => {
    if (gallerySources[index]) image.src = gallerySources[index];
    image.loading = 'lazy';
    image.alt = ['Celebración decorada', 'Detalles de boda', 'Mesa para evento', 'Equipo de música para evento'][index];
});

// Microinteracciones al entrar en cada bloque: dan ritmo sin cargar la página.
document.body.classList.add('js-ready');
document.querySelectorAll('#servicios > div.space-y-40 > div').forEach(card => card.classList.add('service-card'));
document.querySelectorAll('#galeria .image-reveal-container').forEach(card => card.classList.add('gallery-card'));

const motionObserver = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observerInstance.unobserve(entry.target);
    });
}, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.service-card, .gallery-card').forEach(item => motionObserver.observe(item));

window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    document.documentElement.style.setProperty('--page-progress', progress);
}, { passive: true });

// Los botones de cada servicio llevan la elección directamente al formulario.
document.querySelectorAll('#servicios a[href="#contacto"]').forEach(link => {
    link.addEventListener('click', () => {
        const service = link.closest('[id]')?.id;
        const select = document.getElementById('service');
        if (select && service) select.value = service;
    });
});

// Abre WhatsApp con una solicitud clara, lista para enviar.
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const serviceSelect = document.getElementById('service');
    const service = serviceSelect.options[serviceSelect.selectedIndex].text;
    const details = document.getElementById('details').value.trim();
    const channel = event.submitter?.dataset.contactChannel || 'whatsapp';
    const plainMessage = `Hola, soy ${name}.\n\nQuiero solicitar información para: ${service}.\nEmail: ${email}\n\nDetalles del evento:\n${details}\n\nGracias.`;

    if (channel === 'email') {
        const subject = `Solicitud de información — ${service}`;
        window.location.href = `mailto:fourxeventos@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(plainMessage)}`;
        return;
    }

    const whatsappMessage = plainMessage.replace(`para: ${service}`, `para: *${service}*`);
    window.open(`https://wa.me/34681649608?text=${encodeURIComponent(whatsappMessage)}`, '_blank', 'noopener');
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
