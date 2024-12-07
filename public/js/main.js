document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => fadeObserver.observe(element));

    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('hidden');
        body.classList.toggle('overflow-hidden');
    });

    // Mobile dropdowns
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    mobileDropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('button');
        const content = dropdown.querySelector('div');
        
        button?.addEventListener('click', () => {
            const icon = button.querySelector('i');
            content.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
            
            // Close other dropdowns
            mobileDropdowns.forEach(other => {
                if (other !== dropdown) {
                    const otherContent = other.querySelector('div');
                    const otherIcon = other.querySelector('i');
                    otherContent.classList.add('hidden');
                    otherIcon?.classList.remove('rotate-180');
                }
            });
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (!mobileMenu?.contains(e.target) && !menuToggle?.contains(e.target)) {
            mobileMenu?.classList.add('hidden');
            menuToggle?.classList.remove('active');
            body.classList.remove('overflow-hidden');
        }
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Close mobile menu if open
                mobileMenu?.classList.add('hidden');
                menuToggle?.classList.remove('active');
                body.classList.remove('overflow-hidden');

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const options = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const animateCounter = (counter, target) => {
        const duration = 2000;
        const steps = 50;
        const stepValue = target / steps;
        let current = 0;
        
        const updateCounter = () => {
            current += stepValue;
            if (current <= target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));

    // Navbar scroll behavior
    const navbar = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('-translate-y-full');
            navbar.classList.remove('shadow-lg');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('-translate-y-full')) {
            // Scrolling down
            navbar.classList.add('-translate-y-full');
        } else if (currentScroll < lastScroll && navbar.classList.contains('-translate-y-full')) {
            // Scrolling up
            navbar.classList.remove('-translate-y-full');
        }

        navbar.classList.add('shadow-lg');
        lastScroll = currentScroll;
    });
});
