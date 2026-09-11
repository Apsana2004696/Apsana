document.addEventListener('DOMContentLoaded', () => {

    // 1. DYNAMIC COPYRIGHT YEAR
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. MOBILE NAVIGATION HAMBURGER MENU
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            hamburgerBtn.setAttribute('aria-expanded', isOpen);
            hamburgerBtn.innerHTML = isOpen 
                ? '<i class="fa-solid fa-xmark"></i>' 
                : '<i class="fa-solid fa-bars"></i>';
        });

        // Close menu when selecting a navigation link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburgerBtn.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    }

    // 3. ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActiveHighlight() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-links a[href*="#${sectionId}"]`);

            if (correspondingNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingNavLink.classList.add('active');
                } else {
                    correspondingNavLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollActiveHighlight);

    // 4. TESTIMONIALS CAROUSEL
    const track = document.getElementById('testimonial-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.indicator');

    if (track && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        function updateCarousel(index) {
            track.style.transform = `translateX(-${index * 100}%)`;
            
            indicators.forEach((ind, idx) => {
                ind.classList.toggle('active', idx === index);
            });

            currentIndex = index;
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const newIndex = (currentIndex + 1) % totalSlides;
                updateCarousel(newIndex);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateCarousel(newIndex);
            });
        }

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                updateCarousel(index);
            });
        });

        // Optional Auto-play every 6 seconds
        setInterval(() => {
            const newIndex = (currentIndex + 1) % totalSlides;
            updateCarousel(newIndex);
        }, 6000);
    }

    // 5. SUBTLE SCROLL REVEAL ANIMATION
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.card-glow, .section-header, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        revealObserver.observe(el);
    });

});