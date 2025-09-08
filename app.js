// Sections Interiors & Drawing Solutions - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = this.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(6px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
    }

    // Smooth Scrolling Function
    function smoothScrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            return true;
        }
        return false;
    }

    // Navigation Links Event Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            console.log('Navigation clicked:', targetId);
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                // Reset hamburger bars
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
            
            // Perform smooth scroll
            smoothScrollToSection(targetId);
        });
    });

    // Hero CTA Button Event Listener
    const heroCTA = document.querySelector('.hero .btn-primary');
    if (heroCTA) {
        heroCTA.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Hero CTA clicked - scrolling to contact');
            smoothScrollToSection('#contact');
        });
    }

    // Active Navigation Link Highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(248, 250, 252, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(37, 99, 235, 0.15)';
            navbar.style.borderBottom = '1px solid rgba(37, 99, 235, 0.2)';
        } else {
            navbar.style.background = 'rgba(248, 250, 252, 0.95)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid #e2e8f0';
        }
    }

    // Scroll Event Listener
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNavLink();
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Contact Form Handler
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name')?.trim();
            const email = formData.get('email')?.trim();
            const company = formData.get('company')?.trim();
            const projectType = formData.get('project-type');
            const subject = formData.get('subject')?.trim();
            const message = formData.get('message')?.trim();

            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields (Name, Email, Subject, Message)', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            if (message.length < 10) {
                showNotification('Please provide more details about your project requirements', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification('Thank you for your inquiry! Our CAD drafting team will contact you within 24 hours to discuss your project requirements and international design standards expertise.', 'success');
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Enhanced Notification System with Blue Theme
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = type === 'success' ? '✅' : '⚠️';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icon}</span>
                <span class="notification-message">${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;

        // Add styles with blue theme
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 20px;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            display: flex;
            align-items: flex-start;
            gap: 15px;
            animation: slideInRight 0.4s ease-out;
            max-width: 450px;
            min-width: 300px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
            ${type === 'success' 
                ? 'background: linear-gradient(135deg, #2563eb, #3b82f6); color: #ffffff;' 
                : 'background: linear-gradient(135deg, #ef4444, #f87171);'
            }
        `;

        // Add notification styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                .notification-content {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    flex: 1;
                }
                .notification-icon {
                    font-size: 18px;
                    flex-shrink: 0;
                    margin-top: 2px;
                }
                .notification-message {
                    line-height: 1.4;
                    font-size: 14px;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: inherit;
                    font-size: 22px;
                    cursor: pointer;
                    padding: 0;
                    margin-left: 10px;
                    opacity: 0.8;
                    flex-shrink: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }
                .notification-close:hover {
                    opacity: 1;
                    background: rgba(255,255,255,0.2);
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });

        // Auto remove after 7 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 7000);
    }

    // Make showNotification available globally
    window.showNotification = showNotification;

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Unobserve after animation to prevent re-triggering
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .commitment-card, .technical-feature, .contact-item, .about-text, .about-technical'
    );
    
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Counter Animation for Statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.highlight-number');
        
        counters.forEach(counter => {
            const originalText = counter.textContent;
            const hasPlus = originalText.includes('+');
            const hasPercent = originalText.includes('%');
            const hasSlash = originalText.includes('/');
            
            // Handle different number formats
            let target;
            if (hasSlash) {
                // Handle "24/7" format
                const parts = originalText.split('/');
                target = parseInt(parts[0]);
            } else {
                target = parseInt(originalText.replace(/[+%]/g, ''));
            }
            
            if (isNaN(target)) return;
            
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    const displayValue = Math.ceil(current);
                    let suffix = '';
                    if (hasSlash) {
                        suffix = '/' + originalText.split('/')[1];
                    } else {
                        if (hasPlus) suffix = '+';
                        if (hasPercent) suffix = '%';
                    }
                    counter.textContent = displayValue + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = originalText;
                }
            };
            
            updateCounter();
        });
    }

    // Observe stats section for counter animation
    const statsSection = document.querySelector('.about-highlights');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Enhanced Hover Effects for Cards
    const interactiveCards = document.querySelectorAll('.service-card, .portfolio-item, .commitment-card, .technical-feature');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Form Input Enhanced Effects
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        // Focus effects
        input.addEventListener('focus', function() {
            this.style.borderColor = '#2563eb';
            this.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.15)';
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'all 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#e2e8f0';
            this.style.boxShadow = 'none';
            this.style.transform = 'translateY(0)';
        });

        // Typing effects for textarea
        if (input.tagName === 'TEXTAREA') {
            let typingTimer;
            input.addEventListener('input', function() {
                clearTimeout(typingTimer);
                this.style.borderColor = '#2563eb';
                
                typingTimer = setTimeout(() => {
                    if (this !== document.activeElement) {
                        this.style.borderColor = '#e2e8f0';
                    }
                }, 1000);
            });
        }
    });

    // Parallax Effect for Hero Technical Pattern
    const technicalPattern = document.querySelector('.technical-pattern');
    if (technicalPattern) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                technicalPattern.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Service Card Click Handler for Featured Services
    const featuredCards = document.querySelectorAll('.service-card.featured');
    featuredCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const isShopDrawings = title.includes('Shop Drawings');
            
            if (isShopDrawings) {
                showNotification('Shop Drawings are our specialty! Contact us to discuss your technical drawing requirements with expertise in Indian and international standards.', 'success');
            } else {
                showNotification('Interested in our comprehensive CAD drafting services? Get in touch for a consultation on your project requirements.', 'success');
            }
        });
        
        // Add cursor pointer
        card.style.cursor = 'pointer';
    });

    // Regular Service Card Click Handler
    const regularServiceCards = document.querySelectorAll('.service-card:not(.featured)');
    regularServiceCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showNotification(`Learn more about our ${title} services. Contact us for detailed information about our international design standards expertise.`, 'success');
        });
        
        card.style.cursor = 'pointer';
    });

    // Portfolio Item Click Effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showNotification(`Interested in ${title}? Contact us to discuss your project requirements and our expertise in international design standards.`, 'success');
        });
        
        item.style.cursor = 'pointer';
    });

    // Contact Information Click to Copy
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const text = item.querySelector('p');
        if (text && (text.textContent.includes('@') || text.textContent.includes('+91'))) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', function() {
                const textToCopy = text.textContent.trim();
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showNotification(`${textToCopy} copied to clipboard!`, 'success');
                }).catch(() => {
                    showNotification('Could not copy to clipboard', 'error');
                });
            });
        }
    });

    // Logo Click Effects
    const logoElements = document.querySelectorAll('.logo-s, .hero-logo-s, .footer-logo-s');
    logoElements.forEach(logo => {
        logo.addEventListener('click', function() {
            // Add a fun animation effect
            this.style.transform = 'rotate(360deg) scale(1.1)';
            this.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            setTimeout(() => {
                this.style.transform = 'rotate(0deg) scale(1)';
            }, 600);
            
            showNotification('Welcome to Sections Interiors & Drawing Solutions - Your CAD drafting experts!', 'success');
        });
        
        logo.style.cursor = 'pointer';
    });

    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // Initialize page
    function initializePage() {
        // Set initial active nav link
        updateActiveNavLink();
        
        // Show hero section immediately
        const heroSection = document.querySelector('#home');
        if (heroSection) {
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }
        
        console.log('Sections Interiors & Drawing Solutions website initialized');
        console.log('Professional Blue & Grey Theme Active');
        console.log('Services loaded:', document.querySelectorAll('.service-card').length);
        console.log('Portfolio items loaded:', document.querySelectorAll('.portfolio-item').length);
        console.log('Contact form ready:', contactForm ? 'Yes' : 'No');
        console.log('Navigation links:', navLinks.length);
        console.log('International design standards expertise highlighted');
    }

    // Run initialization
    initializePage();

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
            
            // Close any notifications
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => {
                notification.querySelector('.notification-close').click();
            });
        }
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #2563eb';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Add smooth page loading effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });

    // Enhanced commitment card interactions
    const commitmentCards = document.querySelectorAll('.commitment-card');
    commitmentCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const messages = {
                'Project Timeline Commitment': 'We understand the importance of deadlines in your projects and commit to delivering quality CAD drafting services on time.',
                'Customized Design Solutions': 'Every project is unique. Our team creates customized designs tailored to your specific requirements and international standards.',
                'Building Standards Compliance': 'All our drawings comply with relevant building codes and standards, ensuring smooth approval processes.',
                'Function & Aesthetics Balance': 'We believe in creating designs that are both functional and aesthetically pleasing, meeting all your requirements.',
                'Efficient Project Completion': 'Our streamlined processes ensure quick turnaround times without compromising on quality or attention to detail.',
                'Technical Excellence': 'Our shop drawings and technical expertise minimize construction errors and enhance project efficiency.'
            };
            
            const message = messages[title] || `Learn more about our commitment to ${title.toLowerCase()}.`;
            showNotification(message, 'success');
        });
        
        card.style.cursor = 'pointer';
    });

    // Add special effects for hero logo
    const heroLogo = document.querySelector('.hero-logo-s');
    if (heroLogo) {
        // Add subtle pulsing animation
        heroLogo.style.animation = 'logoPulse 3s ease-in-out infinite';
        
        // Add CSS for the pulse animation
        if (!document.querySelector('#logo-animations')) {
            const style = document.createElement('style');
            style.id = 'logo-animations';
            style.textContent = `
                @keyframes logoPulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); }
                    50% { transform: scale(1.05); box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4); }
                }
            `;
            document.head.appendChild(style);
        }
    }
});

// Additional utility functions
window.SectionsInteriors = {
    // Scroll to specific section
    scrollToSection: function(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            const headerOffset = 80;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    // Show custom notification
    showNotification: function(message, type = 'success') {
        if (window.showNotification) {
            window.showNotification(message, type);
        }
    },
    
    // Get company information
    getCompanyInfo: function() {
        return {
            name: 'Sections Interiors & Drawing Solutions',
            specialization: 'CAD Drafting & Interior Design',
            expertise: ['Indian Design Standards', 'International Design Standards'],
            services: ['Full-scope CAD Drafting', 'Shop Drawings Preparation', 'Millwork & Joinery', 'Building Code Compliance'],
            markets: ['India', 'GCC Region'],
            theme: 'Professional Blue & Grey'
        };
    }
};