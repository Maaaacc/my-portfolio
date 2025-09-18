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

            const targetPosition = target.offsetTop - navbarHeight - 10;

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
   3. CAROUSEL FUNCTIONALITY - COMPLETE FIXED VERSION
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

// Gallery toggle functionality for Modal 1
function initializeModal1Toggle() {
    const modal1 = document.getElementById('galleryModal1');
    if (!modal1) return;

    const btnDesktop = modal1.querySelector('#btnDesktop');
    const btnMobile = modal1.querySelector('#btnMobile');
    const carouselDesktop = modal1.querySelector('#carouselDesktop');
    const carouselMobile = modal1.querySelector('#carouselMobile');

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

// Gallery toggle functionality for Modal 2
function initializeModal2Toggle() {
    const modal2 = document.getElementById('galleryModal2');
    if (!modal2) return;

    const btnDesktop2 = modal2.querySelector('#btnDesktop2');
    const carouselDesktop2 = modal2.querySelector('#carouselDesktop2');

    if (btnDesktop2 && carouselDesktop2) {
        btnDesktop2.addEventListener('click', function () {
            btnDesktop2.classList.add('active');
            carouselDesktop2.classList.add('active');
        });
    }
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

    // Initialize scroll animations (uncomment if needed)
    // initializeScrollAnimations();

    // Initialize modal toggles
    initializeModal1Toggle();
    initializeModal2Toggle();
});

// Modal event handlers - FIXED VERSION
document.addEventListener('DOMContentLoaded', function () {
    // Modal 1 Event Handlers
    const galleryModal1 = document.getElementById('galleryModal1');
    if (galleryModal1) {
        // Initialize indicators when modal is shown
        galleryModal1.addEventListener('shown.bs.modal', function () {
            initializeCarouselIndicators('#carouselDesktop', '#desktopIndicators');
            initializeCarouselIndicators('#carouselMobile', '#mobileIndicators');
            initializeModal1Toggle();
        });

        // Reset modal state when it's hidden (closed)
        galleryModal1.addEventListener('hidden.bs.modal', function () {
            const btnDesktop = galleryModal1.querySelector('#btnDesktop');
            const btnMobile = galleryModal1.querySelector('#btnMobile');
            const carouselDesktop = galleryModal1.querySelector('#carouselDesktop');
            const carouselMobile = galleryModal1.querySelector('#carouselMobile');

            if (btnDesktop && btnMobile && carouselDesktop && carouselMobile) {
                // Reset to desktop view without animation
                btnDesktop.classList.add("active");
                btnMobile.classList.remove("active");
                carouselDesktop.classList.add("active");
                carouselMobile.classList.remove("active");

                // Reset both carousels to first slide
                if (typeof bootstrap !== 'undefined') {
                    const desktopCarousel = new bootstrap.Carousel(carouselDesktop);
                    const mobileCarousel = new bootstrap.Carousel(carouselMobile);
                    desktopCarousel.to(0);
                    mobileCarousel.to(0);
                }
            }
        });
    }

    // Modal 2 Event Handlers
    const galleryModal2 = document.getElementById('galleryModal2');
    if (galleryModal2) {
        // Initialize indicators when modal is shown
        galleryModal2.addEventListener('shown.bs.modal', function () {
            initializeCarouselIndicators('#carouselDesktop2', '#desktopIndicators2');
            initializeModal2Toggle();
        });

        // Reset modal state when it's hidden (closed)
        galleryModal2.addEventListener('hidden.bs.modal', function () {
            const carouselDesktop2 = galleryModal2.querySelector('#carouselDesktop2');

            if (carouselDesktop2 && typeof bootstrap !== 'undefined') {
                // Reset carousel to first slide
                const carousel = new bootstrap.Carousel(carouselDesktop2);
                carousel.to(0);
            }
        });
    }
});
