document.addEventListener('DOMContentLoaded', () => {
    // 0. Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 800);
        });
        // Fallback if load already fired
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 3000);
    }

    // 0.5. Create Floating Particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particlesContainer.appendChild(particle);
        }
    }

    // 1. Scroll Progress Bar
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.prepend(scrollProgress);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // 2. Navigation Bar Scrolled State
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const slideUpElements = document.querySelectorAll('.slide-up');
    slideUpElements.forEach(el => observer.observe(el));

    // Stagger children observer
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.stagger-children').forEach(el => staggerObserver.observe(el));

    // 4. Counter Animation for Stats
    function animateCounters(container) {
        if (container.dataset.counted) return;
        container.dataset.counted = 'true';
        const counters = container.querySelectorAll('.stat-number, .nature-stat-number');
        counters.forEach(counter => {
            let rawTarget = counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            
            // Clean up the target value
            if (!rawTarget) return;
            rawTarget = rawTarget.toString().trim().replace(/\s+/g, '');
            
            const target = parseFloat(rawTarget);
            if (isNaN(target) || target === 0) {
                // If target is  or invalid, just show the raw value
                counter.textContent = rawTarget + suffix;
                return;
            }
            
            const isDecimal = rawTarget.includes('.');
            const duration = 2000;
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = target * easeOut;

                if (isDecimal) {
                    counter.textContent = current.toFixed(1) + suffix;
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
                }
            };

            requestAnimationFrame(updateCounter);
        });
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                animateCounters(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.stats-section, .stats-grid, .nature-stats').forEach(el => {
        counterObserver.observe(el);
        // Fallback: if already visible, animate immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animateCounters(el);
        }
    });
    
    // Final fallback: run after a short delay for any elements that might have been missed
    setTimeout(() => {
        document.querySelectorAll('.stats-section, .stats-grid, .nature-stats').forEach(el => {
            if (!el.dataset.counted) {
                animateCounters(el);
            }
        });
    }, 500);

    // 5. Parallax Effect for Hero
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `scale(${1 + scrolled * 0.0002}) translateY(${scrolled * 0.4}px)`;
            }
        });
    }

    // 6. Back to Top Button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '&#8593;';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // 7. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Create mobile menu overlay
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-menu-overlay';
    const clonedLinks = navLinks ? navLinks.cloneNode(true) : document.createElement('div');
    clonedLinks.className = 'nav-links';
    mobileOverlay.appendChild(clonedLinks);
    document.body.appendChild(mobileOverlay);

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });
    }

    // 8. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hash = this.getAttribute('href');
            if (hash !== '#') {
                e.preventDefault();
                const target = document.querySelector(hash);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
                
                // Close mobile menu on click
                if (mobileOverlay.classList.contains('active')) {
                    mobileBtn.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // 9. Close mobile menu on overlay click
    mobileOverlay.addEventListener('click', (e) => {
        if (e.target === mobileOverlay) {
            mobileBtn.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 10. Alert auto-dismiss
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(100%)';
            alert.style.transition = 'all 0.5s ease';
            setTimeout(() => alert.remove(), 500);
        }, 5000);

        const closeBtn = alert.querySelector('.close-alert');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                alert.style.opacity = '0';
                alert.style.transform = 'translateX(100%)';
                alert.style.transition = 'all 0.5s ease';
                setTimeout(() => alert.remove(), 500);
            });
        }
    });

    // 11. Tilt Effect on Suite Cards
    const cards = document.querySelectorAll('.suite-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // 12. Reveal text animation on scroll
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-text').forEach(el => textObserver.observe(el));

    // 13. AI Chatbot Widget
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInputForm = document.getElementById('chatbot-input-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    if (chatbotToggle && chatbotWindow) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.toggle('active');
            if (chatbotWindow.classList.contains('active') && chatbotInput) {
                setTimeout(() => chatbotInput.focus(), 300);
            }
        });
    }

    if (chatbotClose && chatbotWindow) {
        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });
    }

    function addMessage(content, isUser = false, isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = `message-content${isError ? ' error' : ''}`;
        contentDiv.textContent = content;
        
        messageDiv.appendChild(contentDiv);
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        return messageDiv;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    if (chatbotInputForm) {
        chatbotInputForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const message = chatbotInput.value.trim();
            if (!message) return;

            addMessage(message, true);
            chatbotInput.value = '';
            chatbotSend.disabled = true;

            showTypingIndicator();

            try {
                const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;
                
                const response = await fetch('/api/chat/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken || ''
                    },
                    body: JSON.stringify({ message: message })
                });

                hideTypingIndicator();

                const data = await response.json();

                if (response.ok) {
                    addMessage(data.response);
                } else {
                    addMessage(data.error || 'Terjadi kesalahan. Silakan coba lagi.', false, true);
                }
            } catch (error) {
                hideTypingIndicator();
                addMessage('Tidak dapat terhubung ke server. Pastikan Ollama sudah berjalan.', false, true);
            } finally {
                chatbotSend.disabled = false;
                chatbotInput.focus();
            }
        });
    }
});
