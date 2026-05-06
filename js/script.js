document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeMenu = document.querySelector('.close-menu');
    const overlay = document.querySelector('.overlay');

    function toggleMenu() {
        if(mobileNav) mobileNav.classList.toggle('active');
        if(overlay) overlay.classList.toggle('active');
    }

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (closeMenu) closeMenu.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // 2. Intersection Observer for Fade-Up Animations & Counters
    const fadeElements = document.querySelectorAll('.fade-up');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If the element has counters, animate them
                const counters = entry.target.querySelectorAll('.counter');
                if (counters.length > 0) {
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        let count = 0;
                        const duration = 1500; // 1.5 seconds animation
                        const increment = target / (duration / 16); 

                        function updateCount() {
                            count += increment;
                            if (count < target) {
                                counter.innerText = Math.ceil(count);
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.innerText = target;
                            }
                        }
                        updateCount();
                    });
                }
                
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
});
