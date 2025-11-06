document.addEventListener('DOMContentLoaded', () => {
    
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            }
        });
    });
    
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(el => {
        const tiltIntensity = 20; // Max tilt rotation in degrees
        
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const width = el.offsetWidth;
            const height = el.offsetHeight;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const rotateX = (tiltIntensity * (mouseY - height / 2) / (height / 2)) * -1; // Invert X-axis
            const rotateY = tiltIntensity * (mouseX - width / 2) / (width / 2);
            
            el.style.transition = 'transform 0.1s ease-out';
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transition = 'transform 0.5s ease-in-out';
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

});

