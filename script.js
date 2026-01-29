(() => {
    const ready = (fn) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    };

    ready(() => {
        // === Mobile Navbar Toggle ===
        const menuIcon = document.querySelector('#menu-icon');
        const navbar = document.querySelector('.navbar');

        if (menuIcon && navbar) {
            menuIcon.addEventListener('click', () => {
                // Toggle active class
                navbar.classList.toggle('active');
                
                // Animate menu icon
                menuIcon.classList.toggle('bx-x');
                menuIcon.classList.toggle('bx-menu');
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
            });

            // Close menu when clicking on a link
            navbar.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navbar.classList.remove('active');
                    menuIcon.classList.remove('bx-x');
                    menuIcon.classList.add('bx-menu');
                    document.body.style.overflow = '';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (event) => {
                if (!navbar.contains(event.target) && !menuIcon.contains(event.target)) {
                    navbar.classList.remove('active');
                    menuIcon.classList.remove('bx-x');
                    menuIcon.classList.add('bx-menu');
                    document.body.style.overflow = '';
                }
            });
        }

        // === Modal Functions ===
        window.openModal = (id) => {
            const modal = document.getElementById(id);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeModal = (id) => {
            const modal = document.getElementById(id);
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        };

        // Close modal when clicking outside
        document.addEventListener('click', (event) => {
            document.querySelectorAll('.modal').forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                document.querySelectorAll('.modal').forEach(modal => {
                    if (modal.style.display === 'block') {
                        modal.style.display = 'none';
                        document.body.style.overflow = '';
                    }
                });
            }
        });

        // === Smooth Scrolling for Anchor Links ===
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // === Active Nav Link on Scroll ===
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar a');

        function updateActiveNavLink() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveNavLink);

        // === Sticky Header ===
        const header = document.querySelector('.header');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.padding = '1rem 5%';
                header.style.background = 'rgba(202, 59, 26, 0.98)';
            } else {
                header.style.padding = '2rem 5%';
                header.style.background = 'rgba(202, 59, 26, 0.95)';
            }
            
            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scroll down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scroll up
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });

        // === Animate elements on scroll ===
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements to animate
        document.querySelectorAll('.skill-card, .project-card, .experience-item, .cert-column').forEach(el => {
            observer.observe(el);
        });
    });
})();