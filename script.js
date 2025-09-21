/* =========================================================
   1. SMOOTH SCROLL & NAVBAR
   ========================================================= */

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        const navbar = document.querySelector('.navbar');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const isMobileMenuOpen = navbarCollapse.classList.contains('show');

        const navbarHeight = isMobileMenuOpen
            ? navbar.querySelector('.navbar-brand').offsetHeight + 32
            : navbar.offsetHeight;

        const targetPosition = target.offsetTop - navbarHeight;

        if (isMobileMenuOpen) {
            setTimeout(() => window.scrollTo({ top: targetPosition, behavior: 'smooth' }), 100);
        } else {
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// Highlight active nav links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 20;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// Navbar background and shadow on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'var(--shadow-sm)';
    } else {
        navbar.style.background = 'var(--color-white)';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = 'none';
    }
});

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) navbarToggler.click();
    });
});


/* =========================================================
   2. CONTACT FORM HANDLING
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    if (!contactForm || !submitBtn) return;

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        successMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');

        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) throw new Error('Form submission failed');

            // Success
            submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
            submitBtn.classList.replace('btn-dark', 'btn-success');
            successMessage.classList.remove('d-none');
            contactForm.reset();
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } catch (error) {
            console.error(error);
            submitBtn.innerHTML = '<i class="bi bi-x-circle me-2"></i>Send Failed';
            submitBtn.classList.replace('btn-dark', 'btn-danger');
            errorMessage.classList.remove('d-none');
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-success', 'btn-danger');
            submitBtn.classList.add('btn-dark');
        }, 3000);
    });
});


/* =========================================================
   3. ANIMATIONS & EFFECTS
   ========================================================= */

// Fade-in animations using Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.summary-card, .project-card, .skill-card').forEach(el => {
        observer.observe(el);
    });
}

// Typing effect for hero section
function typeWriter(element, text, speed = 80) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i++);
            setTimeout(type, speed);
        }
    }
    type();
}

function initializeTypingEffect() {
    const element = document.getElementById('typewriter');
    if (element) setTimeout(() => typeWriter(element, "Macross Abaño", 80), 500);
}


/* =========================================================
   4. INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    initializeTypingEffect();
    initializeScrollAnimations();

    // Initialize GLightbox for all gallery links
    GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        zoomable: true,
        draggable: true,
    });
});
