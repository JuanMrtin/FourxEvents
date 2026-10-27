lucide.createIcons();

// Medición preparada: al añadir Google Analytics, estos eventos se enviarán automáticamente.
function trackEvent(name, parameters = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...parameters });
    if (typeof window.gtag === 'function') window.gtag('event', name, parameters);
}

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
document.querySelectorAll('a[data-service], #servicios a[href="#contacto"]').forEach(link => {
    link.addEventListener('click', () => {
        const service = link.dataset.service || link.closest('[id]')?.id;
        const select = document.getElementById('service');
        if (select && service) select.value = service;
        if (link.dataset.eventType) {
            const details = document.getElementById('details');
            if (details && !details.value.trim()) details.value = `Tipo de evento: ${link.dataset.eventType}.`;
        }
        trackEvent('service_interest', { service: service || 'unknown' });
    });
});

// La galería se puede ampliar sin sacar al visitante de la página.
const galleryLightbox = document.getElementById('gallery-lightbox');
const galleryLightboxImage = document.getElementById('gallery-lightbox-image');
function closeGalleryLightbox() {
    galleryLightbox?.classList.remove('is-open');
    galleryLightbox?.setAttribute('aria-hidden', 'true');
}
document.querySelectorAll('#galeria .image-reveal-img').forEach(image => image.addEventListener('click', () => {
    galleryLightboxImage.src = image.currentSrc || image.src;
    galleryLightboxImage.alt = image.alt;
    galleryLightbox.classList.add('is-open');
    galleryLightbox.setAttribute('aria-hidden', 'false');
    trackEvent('gallery_open', { image: image.alt });
}));
document.getElementById('gallery-lightbox-close')?.addEventListener('click', closeGalleryLightbox);
galleryLightbox?.addEventListener('click', event => {
    if (event.target === galleryLightbox) closeGalleryLightbox();
});

// Abre WhatsApp con una solicitud clara, lista para enviar.
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    const channel = event.submitter?.dataset.contactChannel || 'whatsapp';
    const emailField = document.getElementById('email');
    emailField.setCustomValidity(channel === 'email' && !emailField.value.trim() ? 'Indica tu correo para poder preparar el mensaje.' : '');
    if (!contactForm.reportValidity()) return;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const serviceSelect = document.getElementById('service');
    const service = serviceSelect.options[serviceSelect.selectedIndex].text;
    const eventDate = document.getElementById('event-date').value;
    const guests = document.getElementById('guests').value.trim();
    const location = document.getElementById('event-location').value.trim();
    const details = document.getElementById('details').value.trim();
    const eventInfo = [
        eventDate && `Fecha aproximada: ${eventDate}`,
        location && `Lugar: ${location}`,
        guests && `Invitados aproximados: ${guests}`
    ].filter(Boolean).join('\n');
    const plainMessage = `Hola, soy ${name}.\n\nQuiero solicitar información para: ${service}.${email ? `\nEmail: ${email}` : ''}${eventInfo ? `\n${eventInfo}` : ''}\n\nDetalles del evento:\n${details}\n\nGracias.`;

    if (channel === 'email') {
        const subject = `Solicitud de información — ${service}`;
        trackEvent('generate_lead', { method: 'email', service: serviceSelect.value });
        window.location.href = `mailto:fourxeventos@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(plainMessage)}`;
        return;
    }

    const whatsappMessage = plainMessage.replace(`para: ${service}`, `para: *${service}*`);
    trackEvent('generate_lead', { method: 'whatsapp', service: serviceSelect.value });
    window.open(`https://wa.me/34681649608?text=${encodeURIComponent(whatsappMessage)}`, '_blank', 'noopener');
});

document.querySelectorAll('a[href*="wa.me"], a[href*="instagram.com"], a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        const href = link.getAttribute('href') || '';
        const channel = href.includes('wa.me') ? 'whatsapp' : href.includes('instagram') ? 'instagram' : 'email';
        trackEvent('contact_click', { channel, placement: link.className || 'link' });
    });
});

document.querySelectorAll('.faq-list details').forEach(item => item.addEventListener('toggle', () => {
    if (item.open) trackEvent('faq_open', { question: item.querySelector('summary')?.textContent.trim() || '' });
}));

// Panel de administración local. Para una web estática, los cambios viven en este navegador.
const ADMIN_STORAGE_KEY = 'fourx-events-admin-content-v1';
const ADMIN_USER = 'admin';
const ADMIN_PASSWORD = 'Fourx2026!';
const adminLogin = document.getElementById('admin-login');
const adminPanel = document.getElementById('admin-panel');
const adminLoginForm = document.getElementById('admin-login-form');
const adminEditorForm = document.getElementById('admin-editor-form');
const adminError = document.getElementById('admin-login-error');
const editableSelectors = ['.hero-copy > p', '#nosotros p', '#organizacion h3 + p'];

const defaultAdminContent = {
    texts: Object.fromEntries(editableSelectors.map(selector => [selector, document.querySelector(selector)?.textContent.trim() || ''])),
    images: Object.fromEntries(['dj', 'animacion', 'sonido', 'organizacion'].map(id => [id, document.querySelector(`#${id} .image-reveal-img`)?.src || '']))
};

function getAdminContent() {
    try { return JSON.parse(localStorage.getItem(ADMIN_STORAGE_KEY)) || defaultAdminContent; }
    catch { return defaultAdminContent; }
}

function applyAdminContent(content) {
    Object.entries(content.texts || {}).forEach(([selector, value]) => {
        const element = document.querySelector(selector);
        if (element && value) element.textContent = value;
    });
    Object.entries(content.images || {}).forEach(([id, source]) => {
        const image = document.querySelector(`#${id} .image-reveal-img`);
        if (image && source) image.src = source;
    });
}

function saveAdminContent(content) {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(content));
}

let adminContent = getAdminContent();
applyAdminContent(adminContent);

function openAdminLogin() {
    adminLogin.classList.add('is-open');
    adminLogin.setAttribute('aria-hidden', 'false');
    document.body.classList.add('admin-active');
    adminError.textContent = '';
    document.getElementById('admin-user').focus();
}

function closeAdmin() {
    adminLogin.classList.remove('is-open');
    adminPanel.classList.remove('is-open');
    adminLogin.setAttribute('aria-hidden', 'true');
    adminPanel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('admin-active');
}

document.getElementById('logo')?.addEventListener('click', event => {
    if (event.detail !== 3) return;
    event.preventDefault();
    openAdminLogin();
});

document.querySelectorAll('[data-admin-close]').forEach(button => button.addEventListener('click', closeAdmin));

adminLoginForm?.addEventListener('submit', event => {
    event.preventDefault();
    const user = document.getElementById('admin-user').value.trim();
    const password = document.getElementById('admin-password').value;
    if (user !== ADMIN_USER || password !== ADMIN_PASSWORD) {
        adminError.textContent = 'Usuario o contraseña incorrectos.';
        return;
    }
    adminLogin.classList.remove('is-open');
    adminPanel.classList.add('is-open');
    adminPanel.setAttribute('aria-hidden', 'false');
    document.getElementById('edit-hero-subtitle').value = adminContent.texts['.hero-copy > p'] || '';
    document.getElementById('edit-about').value = adminContent.texts['#nosotros p'] || '';
    document.getElementById('edit-organization').value = adminContent.texts['#organizacion h3 + p'] || '';
});

adminEditorForm?.addEventListener('submit', event => {
    event.preventDefault();
    adminEditorForm.querySelectorAll('[data-edit-target]').forEach(field => {
        adminContent.texts[field.dataset.editTarget] = field.value.trim();
    });
    saveAdminContent(adminContent);
    applyAdminContent(adminContent);
});

document.getElementById('admin-apply-image')?.addEventListener('click', () => {
    const service = document.getElementById('edit-image-service').value;
    const url = document.getElementById('edit-image-url').value.trim();
    const file = document.getElementById('edit-image-file').files[0];
    const setImage = source => {
        if (!source) return;
        adminContent.images[service] = source;
        saveAdminContent(adminContent);
        applyAdminContent(adminContent);
    };
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', () => setImage(reader.result));
        reader.readAsDataURL(file);
    } else {
        setImage(url);
    }
});

document.getElementById('admin-reset')?.addEventListener('click', () => {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    adminContent = JSON.parse(JSON.stringify(defaultAdminContent));
    applyAdminContent(adminContent);
    adminEditorForm.reset();
});

// Textos legales: falta completar titular, NIF y domicilio antes de publicar la web.
const legalModal = document.getElementById('legal-modal');
const legalContent = document.getElementById('legal-content');
const legalTexts = {
    legal: `<h2 id="legal-modal-title">Aviso legal</h2><p><strong>Información pendiente de completar antes de publicar:</strong> denominación o nombre completo del titular, NIF/CIF y domicilio profesional.</p><h3>Datos identificativos</h3><p>Este sitio web es operado por Fourx Events. Para consultas generales puedes escribir a <a href="mailto:fourxeventos@gmail.com">fourxeventos@gmail.com</a> o llamar/usar WhatsApp en el 681 649 608.</p><h3>Uso del sitio</h3><p>Los contenidos de la web tienen carácter informativo y no constituyen una oferta contractual. Los presupuestos, disponibilidad, desplazamientos y condiciones del servicio se confirman de manera personalizada antes de cada contratación.</p><h3>Propiedad intelectual</h3><p>El diseño, textos, logotipo y recursos propios de Fourx Events no pueden reutilizarse sin autorización. Las imágenes de terceros se utilizan conforme a sus correspondientes licencias o autorizaciones.</p>`,
    privacy: `<h2 id="legal-modal-title">Política de privacidad</h2><p><strong>Información pendiente de completar antes de publicar:</strong> nombre legal del responsable, NIF/CIF y dirección postal.</p><h3>Qué datos se tratan</h3><p>Al contactar mediante correo electrónico o WhatsApp pueden tratarse tu nombre, correo electrónico, teléfono y los datos que aportes sobre el evento.</p><h3>Para qué se usan</h3><p>Los datos se utilizan únicamente para responder a tu solicitud, preparar un presupuesto, gestionar el servicio si se contrata y cumplir las obligaciones legales correspondientes.</p><h3>Base jurídica y conservación</h3><p>La base jurídica es tu solicitud de información o la relación contractual, cuando exista. Los datos se conservarán el tiempo necesario para atender la petición y, si procede, durante los plazos legales aplicables.</p><h3>Destinatarios y derechos</h3><p>La comunicación enviada por WhatsApp o correo se procesa a través de esos proveedores. Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad escribiendo a fourxeventos@gmail.com. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos.</p>`
};

document.querySelectorAll('[data-legal-open]').forEach(button => button.addEventListener('click', () => {
    legalContent.innerHTML = legalTexts[button.dataset.legalOpen];
    legalModal.classList.add('is-open');
    legalModal.setAttribute('aria-hidden', 'false');
}));
document.querySelectorAll('[data-legal-close]').forEach(button => button.addEventListener('click', () => {
    legalModal.classList.remove('is-open');
    legalModal.setAttribute('aria-hidden', 'true');
}));

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
