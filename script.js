/* ==========================================================================
   MACROSS ABAÑO PORTFOLIO - OPTIMIZED JAVASCRIPT
   ========================================================================== */

/* ==========================================================================
   1. NAVIGATION FUNCTIONALITY
   ========================================================================== */

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Navbar background on scroll
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

// Mobile menu close on link click
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

/* ==========================================================================
   2. CONTACT FORM HANDLING
   ========================================================================== */

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Update button state
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
        submitBtn.classList.remove('btn-dark');
        submitBtn.classList.add('btn-success');

        this.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-success');
            submitBtn.classList.add('btn-dark');
        }, 3000);
    }, 2000);
});

/* ==========================================================================
   3. CAROUSEL FUNCTIONALITY
   ========================================================================== */

// Generate carousel indicators dynamically
function initializeCarouselIndicators(carouselId, indicatorsId) {
    const carousel = document.querySelector(`${carouselId} .carousel-inner`);
    const indicators = document.querySelector(indicatorsId);

    if (carousel && indicators) {
        indicators.innerHTML = ''; // Clear existing indicators

        [...carousel.children].forEach((_, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.bsTarget = carouselId;
            button.dataset.bsSlideTo = index;
            button.setAttribute('aria-label', `Slide ${index + 1}`);

            if (index === 0) {
                button.classList.add('active');
                button.setAttribute('aria-current', 'true');
            }

            indicators.appendChild(button);
        });
    }
}

// Gallery toggle functionality
function initializeGalleryToggle() {
    const btnDesktop = document.getElementById("btnDesktop");
    const btnMobile = document.getElementById("btnMobile");
    const carouselDesktop = document.getElementById("carouselDesktop");
    const carouselMobile = document.getElementById("carouselMobile");

    if (!btnDesktop || !btnMobile || !carouselDesktop || !carouselMobile) {
        return;
    }

    function switchToDesktop() {
        btnDesktop.classList.add("active");
        btnMobile.classList.remove("active");
        carouselMobile.classList.remove("active");
        setTimeout(() => carouselDesktop.classList.add("active"), 150);
    }

    function switchToMobile() {
        btnMobile.classList.add("active");
        btnDesktop.classList.remove("active");
        carouselDesktop.classList.remove("active");
        setTimeout(() => carouselMobile.classList.add("active"), 150);
    }

    btnDesktop.addEventListener("click", switchToDesktop);
    btnMobile.addEventListener("click", switchToMobile);

    // Initialize with desktop view
    switchToDesktop();
}

/* ==========================================================================
   4. ANIMATIONS & EFFECTS
   ========================================================================== */

// Intersection Observer for fade-in animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

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
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
}

/* ==========================================================================
   5. INITIALIZATION
   ========================================================================== */

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    initializeCarouselIndicators('#carouselDesktop', '#desktopIndicators');
    initializeCarouselIndicators('#carouselMobile', '#mobileIndicators');
    initializeGalleryToggle();
    initializeScrollAnimations();
});

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    initializeTypingEffect();
});

// Re-initialize gallery toggle when modal is shown
document.addEventListener('DOMContentLoaded', function () {
    const galleryModal = document.getElementById('galleryModal1');
    if (galleryModal) {
        galleryModal.addEventListener('shown.bs.modal', function () {
            initializeGalleryToggle();
        });
    }
});