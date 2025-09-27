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
   3. ANIMATIONS & EFFECTS - ENHANCED TYPEWRITER
   ========================================================= */

// Enhanced typing effect for hero section
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

// Enhanced typewriter loop with better timing and cursor effect
function typeWriterLoop(element, texts, typeSpeed = 80, deleteSpeed = 40, pauseAfterType = 2000, pauseAfterDelete = 300) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isInitialLoad = true;

    // Add cursor styling if not present
    if (!element.classList.contains('typewriter-cursor')) {
        element.classList.add('typewriter-cursor');
        // Add cursor CSS if not already added
        if (!document.querySelector('#typewriter-cursor-style')) {
            const style = document.createElement('style');
            style.id = 'typewriter-cursor-style';
            style.textContent = `
                .typewriter-cursor::after {
                    content: '|';
                    color: var(--color-primary, #007bff);
                    animation: blink 1s infinite;
                    font-weight: normal;
                }
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                .typewriter-text {
                    min-height: 1.2em;
                    display: inline-block;
                }
            `;
            document.head.appendChild(style);
        }
    }

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            // Deleting characters
            element.textContent = currentText.substring(0, charIndex);
            charIndex--;
        } else {
            // Typing characters
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        // Determine next delay
        let delay = isDeleting ? deleteSpeed : typeSpeed;

        // Add slight randomness to typing speed for more natural feel
        if (!isDeleting) {
            delay += Math.random() * 50;
        }

        // Handle state transitions
        if (!isDeleting && charIndex === currentText.length) {
            // Finished typing current text
            delay = pauseAfterType;
            isDeleting = true;
            charIndex--; // Start deleting from the last character
        } else if (isDeleting && charIndex < 0) {
            // Finished deleting current text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            charIndex = 0;
            delay = pauseAfterDelete;
        }

        setTimeout(type, delay);
    }

    // Start the animation
    type();
}

// Initialize typing effects
function initializeTypingEffect() {
    // Main name typewriter
    const nameElement = document.getElementById('typewriter');
    if (nameElement) {
        setTimeout(() => typeWriter(nameElement, "Macross Abaño", 100), 500);
    }

    // Role typewriter with fresh graduate appropriate titles
    const roleElement = document.getElementById('roleTypewriter');
    if (roleElement) {
        // Add wrapper class for styling
        roleElement.classList.add('typewriter-text');

        // Start role typewriter after name is finished
        setTimeout(() => {
            typeWriterLoop(roleElement, [
                "Fresh Graduate",
                "Aspiring Developer",
                "Web Developer",
                ".NET Enthusiast",
                "Frontend Developer",
                "Backend Developer",
                "Full Stack Developer"
            ],
                100,    // typing speed
                50,     // deleting speed  
                2500,   // pause after typing (longer for better readability)
                500     // pause after deleting
            );
        }, 2000); // Start after name typewriter completes
    }
}

// Alternative version with more dynamic effects
function initializeTypingEffectAdvanced() {
    const nameElement = document.getElementById('typewriter');
    const roleElement = document.getElementById('roleTypewriter');

    if (nameElement) {
        // Enhanced name typing with callback
        typeWriterWithCallback(nameElement, "Macross Abaño", 100, () => {
            // Start role animation after name completes
            if (roleElement) {
                roleElement.classList.add('typewriter-text');
                typeWriterLoop(roleElement, [
                    "Fresh Graduate 🎓",
                    "Aspiring Developer 💻",
                    "Web Developer 🌐",
                    ".NET Enthusiast ⚡",
                    "Problem Solver 🧩",
                    "Code Enthusiast 🚀"
                ], 120, 60, 3000, 800);
            }
        });
    }
}

// Typewriter with callback function
function typeWriterWithCallback(element, text, speed = 80, callback = null) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i++);
            setTimeout(type, speed + Math.random() * 40); // Add natural variation
        } else if (callback) {
            setTimeout(callback, 800); // Small delay before callback
        }
    }
    type();
}

// Smooth reveal animation for elements
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations for better visual effect
                setTimeout(() => {
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    entry.target.classList.add('fade-in');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.summary-card, .project-card, .skill-card, .slide-up, .fade-in:not(.hero-section .fade-in)').forEach(el => {
        observer.observe(el);
    });
}

/* =========================================================
   4. INITIALIZATION - ENHANCED
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    // Use the enhanced version
    initializeTypingEffect();

    // Or use the advanced version with emojis (uncomment to use)
    // initializeTypingEffectAdvanced();

    initializeScrollAnimations();

    // Initialize GLightbox for all gallery links
    if (typeof GLightbox !== 'undefined') {
        GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            zoomable: true,
            draggable: true,
        });
    }

    // Add smooth entrance animation to hero elements
    setTimeout(() => {
        document.querySelectorAll('.hero-section .fade-in, .hero-section .slide-up').forEach((el, index) => {
            setTimeout(() => el.classList.add('animate'), index * 200);
        });
    }, 100);
});