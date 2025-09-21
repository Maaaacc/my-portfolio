/* ==========================================================================
   MACROSS ABAÑO PORTFOLIO - OPTIMIZED JAVASCRIPT (FIXED SCROLL)
   ========================================================================== */

/* ==========================================================================
   1. NAVIGATION FUNCTIONALITY
   ========================================================================== */

// Smooth scrolling for navigation links - MOBILE FIXED VERSION
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbar = document.querySelector('.navbar');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            const isMobileMenuOpen = navbarCollapse.classList.contains('show');

            // On mobile, if menu is open, it will close, so use collapsed height
            // On desktop or when menu is already closed, use current height
            const navbarHeight = isMobileMenuOpen ?
                navbar.querySelector('.navbar-brand').offsetHeight + 32 : // Approximate collapsed height
                navbar.offsetHeight;

            const targetPosition = target.offsetTop - navbarHeight;

            // If mobile menu is open, add a small delay to account for closing animation
            if (isMobileMenuOpen) {
                setTimeout(() => {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 100); // Small delay for navbar collapse animation
            } else {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Active navigation highlighting - UPDATED
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    let current = '';
    sections.forEach(section => {
        // Fixed: Reduced the buffer from 100px to 20px for more accurate detection
        const sectionTop = section.offsetTop - navbarHeight - 20;
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

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Hide any existing messages
            successMessage.classList.add('d-none');
            errorMessage.classList.add('d-none');

            // Update button state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
            submitBtn.disabled = true;

            // Get form data
            const formData = new FormData(contactForm);

            try {
                // Send to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
                    submitBtn.classList.remove('btn-dark');
                    submitBtn.classList.add('btn-success');

                    // Show success message
                    successMessage.classList.remove('d-none');

                    // Reset form
                    contactForm.reset();

                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                } else {
                    throw new Error('Form submission failed');
                }

            } catch (error) {
                console.error('Error:', error);

                // Show error
                submitBtn.innerHTML = '<i class="bi bi-x-circle me-2"></i>Send Failed';
                submitBtn.classList.remove('btn-dark');
                submitBtn.classList.add('btn-danger');

                // Show error message
                errorMessage.classList.remove('d-none');

                // Scroll to error message
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
    }
});



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
    const element = document.getElementById('typewriter');
    if (element) {
        const text = "Macross Abaño";
        setTimeout(() => {
            typeWriter(element, text, 80);
        }, 500);
    }
}

/* ==========================================================================
   5. INITIALIZATION
   ========================================================================== */

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Initialize typing effect
    initializeTypingEffect();


});

