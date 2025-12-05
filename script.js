// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect with Animation
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
        header.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5)';
    } else {
        header.classList.remove('scrolled');
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Parallax Effect for Hero Section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        if (heroContent) {
            heroContent.style.opacity = Math.max(0, 1 - (scrolled / 400));
        }
    }
});

// Advanced Scroll Animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); // Stagger animation
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.course-card, .problem-card, .target-card, .impact-card, .sdg-card, .team-card').forEach((el, index) => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Stagger animations for grid items
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        }
    });
}, observerOptions);

// Apply stagger to course cards
document.querySelectorAll('.course-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) scale(0.9)';
    card.style.transition = `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;
    staggerObserver.observe(card);
});

// Mouse Move Parallax Effect
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.floating-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach((card, index) => {
        const speed = (index + 1) * 10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Form Submission with Backend API
const contactForm = document.querySelector('.contact-form');
const joinForm = document.getElementById('joinForm');

if (contactForm || joinForm) {
    const form = contactForm || joinForm;
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn') || form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nameInput = form.querySelector('#name') || form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('#email') || form.querySelector('input[type="email"]');
        const courseInput = form.querySelector('#course') || form.querySelector('select');
        const messageInput = form.querySelector('#message') || form.querySelector('textarea');
        
        const name = nameInput?.value;
        const email = emailInput?.value;
        const course = courseInput?.value;
        const message = messageInput?.value || '';
        
        if (!name || !email || !course) {
            // Shake animation for error
            form.style.animation = 'shake 0.5s';
            setTimeout(() => {
                form.style.animation = '';
            }, 500);
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Disable submit button
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }
        
        try {
            // Determine API URL (use relative path for same domain, or full URL for production)
            const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                ? 'http://localhost:3000/api/contact'
                : '/api/contact';
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    course,
                    message
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                showMessage(data.message || 'Thank you! We have received your enrollment request. Check your email for confirmation.', 'success');
                form.reset();
                
                // Success animation
                form.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    form.style.transform = 'scale(1)';
                }, 200);
            } else {
                showMessage(data.message || 'Sorry, there was an error. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Sorry, there was an error connecting to the server. Please check if the backend is running or try again later.', 'error');
        } finally {
            // Re-enable submit button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Join Us';
            }
        }
    });
    
    function showMessage(text, type) {
        if (formMessage) {
            formMessage.textContent = text;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            alert(text);
        }
    }
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Counter Animation for Stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Enhanced Stat Observer
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const text = statNumber.textContent;
                // Handle different formats (numbers, ranges, etc.)
                if (text.includes('-')) {
                    // For ranges like "18-40"
                    const parts = text.split('-');
                    statNumber.textContent = '0-0';
                    setTimeout(() => {
                        statNumber.textContent = text;
                    }, 500);
                } else {
                    const targetValue = parseInt(text);
                    if (!isNaN(targetValue)) {
                        statNumber.textContent = '0';
                        setTimeout(() => {
                            animateCounter(statNumber, targetValue);
                        }, 300);
                    }
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Cursor Trail Effect (optional, can be disabled for performance)
let cursorTrail = [];
const createCursorTrail = () => {
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        
        cursorTrail.push(trail);
        if (cursorTrail.length > 5) {
            const oldTrail = cursorTrail.shift();
            setTimeout(() => {
                if (oldTrail && oldTrail.parentNode) {
                    oldTrail.parentNode.removeChild(oldTrail);
                }
            }, 1000);
        }
        
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
        }, 500);
    });
};

// Add cursor trail styles
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor-trail {
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.8), transparent);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: all 0.5s ease;
    }
`;
document.head.appendChild(cursorStyle);

// Uncomment to enable cursor trail (may impact performance on slower devices)
// createCursorTrail();

// Button Ripple Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth reveal animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    sectionObserver.observe(section);
});

// Floating animation for icons
const iconObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'float 3s ease-in-out infinite';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.problem-icon, .target-icon, .impact-icon, .course-icon').forEach(icon => {
    iconObserver.observe(icon);
});

// Performance optimization: Throttle scroll events
let ticking = false;
const optimizedScroll = () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-dependent animations here
            ticking = false;
        });
        ticking = true;
    }
};

window.addEventListener('scroll', optimizedScroll);
