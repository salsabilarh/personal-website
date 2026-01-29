(() => {
    'use strict';

    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }

    // Mobile Navigation Toggle
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuIcon.classList.toggle('bx-x');
        });

        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuIcon.classList.remove('bx-x');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
                navbar.classList.remove('active');
                menuIcon.classList.remove('bx-x');
            }
        });
    }

    // Sticky Header
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
        
        // Hide header on scroll down
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // Animate on Scroll
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

    // Observe elements
    document.querySelectorAll('.skill-category, .achievement-card, .project-card, .timeline-content').forEach(el => {
        observer.observe(el);
    });

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.style.width;
                    skillBar.style.width = '0';
                    setTimeout(() => {
                        skillBar.style.width = width;
                    }, 300);
                    skillsObserver.unobserve(skillBar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => skillsObserver.observe(bar));
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project card hover effect enhancement
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact form validation (if added later)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted!');
        });
    }

    // Initialize animations
    document.addEventListener('DOMContentLoaded', () => {
        // Add initial animation to hero section
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    });

    // Add copy email functionality
    const emailLink = document.querySelector('a[href^="mailto"]');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            const email = emailLink.getAttribute('href').replace('mailto:', '');
            navigator.clipboard.writeText(email).then(() => {
                // Show notification
                const notification = document.createElement('div');
                notification.textContent = 'Email copied to clipboard!';
                notification.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: var(--success);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    z-index: 9999;
                    animation: slideIn 0.3s ease;
                `;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            });
        });
    }

    // Add style for notification animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Theme switcher (optional enhancement)
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="bx bx-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        cursor: pointer;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
    `;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeToggle.innerHTML = document.body.classList.contains('dark-theme') 
            ? '<i class="bx bx-sun"></i>' 
            : '<i class="bx bx-moon"></i>';
    });
    
    // Uncomment to add theme toggle
    // document.body.appendChild(themeToggle);

    // Add dark theme styles
    const darkThemeStyles = `
        .dark-theme {
            --light: #1a1a1a;
            --dark: #ffffff;
            --gray-100: #2d2d2d;
            --gray-200: #3d3d3d;
            --gray-300: #4d4d4d;
            --gray-700: #cccccc;
            --secondary: #34495e;
        }
        
        .dark-theme .header {
            background: rgba(26, 26, 26, 0.95);
        }
        
        .dark-theme .skill-category,
        .dark-theme .achievement-card,
        .dark-theme .project-card,
        .dark-theme .education-card,
        .dark-theme .timeline-content {
            background: var(--gray-100);
        }
    `;
    
    const darkStyle = document.createElement('style');
    darkStyle.textContent = darkThemeStyles;
    document.head.appendChild(darkStyle);

})();

// Tambahkan ke script.js yang sudah ada

// Initialize certifications timeline animation
function initCertificationsTimeline() {
    const certYears = document.querySelectorAll('.cert-year');
    
    certYears.forEach((year, index) => {
        year.style.opacity = '0';
        year.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            year.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            year.style.opacity = '1';
            year.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Initialize project timeline animation
function initProjectsTimeline() {
    const projectItems = document.querySelectorAll('.project-timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    projectItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Image gallery modal
function initImageGallery() {
    const uiItems = document.querySelectorAll('.ui-item');
    
    uiItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${imgSrc}" alt="${imgAlt}">
                    <p>${imgAlt}</p>
                </div>
            `;
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .image-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    animation: fadeIn 0.3s ease;
                }
                
                .modal-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                }
                
                .modal-content img {
                    width: 100%;
                    height: auto;
                    border-radius: 8px;
                }
                
                .modal-content p {
                    color: white;
                    text-align: center;
                    margin-top: 1rem;
                    font-size: 1.6rem;
                }
                
                .close-modal {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    color: white;
                    font-size: 3rem;
                    cursor: pointer;
                    background: none;
                    border: none;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(modal);
            
            // Close modal
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => modal.remove(), 300);
            });
            
            // Close on click outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => modal.remove(), 300);
                }
            });
        });
    });
}

// Copy endpoint code functionality
function initEndpointCopy() {
    const endpoints = document.querySelectorAll('.endpoint code');
    
    endpoints.forEach(code => {
        const container = code.closest('.endpoint');
        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = '<i class="bx bx-copy"></i>';
        copyBtn.className = 'copy-btn';
        copyBtn.title = 'Copy endpoint';
        
        copyBtn.style.cssText = `
            background: none;
            border: none;
            color: var(--gray-600);
            cursor: pointer;
            font-size: 1.4rem;
            padding: 0.5rem;
            border-radius: 4px;
            transition: all 0.3s ease;
        `;
        
        copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.background = 'var(--gray-200)';
            copyBtn.style.color = 'var(--primary)';
        });
        
        copyBtn.addEventListener('mouseleave', () => {
            copyBtn.style.background = 'none';
            copyBtn.style.color = 'var(--gray-600)';
        });
        
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(code.textContent);
                
                // Show notification
                const notification = document.createElement('div');
                notification.textContent = 'Endpoint copied!';
                notification.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: var(--success);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    z-index: 9999;
                    animation: slideIn 0.3s ease;
                `;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => notification.remove(), 300);
                }, 1500);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
        
        container.appendChild(copyBtn);
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCertificationsTimeline();
    initProjectsTimeline();
    initImageGallery();
    initEndpointCopy();
    
    // Smooth scroll to certifications
    const certLinks = document.querySelectorAll('a[href="#certifications"]');
    certLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#certifications');
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});