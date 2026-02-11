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

// (Disabled) Parallax / fade effect for hero so buttons stay visible when scrolling

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

// Shared helper for showing messages on forms
const showFormMessage = (formMessageEl, text, type) => {
    if (formMessageEl) {
        formMessageEl.textContent = text;
        formMessageEl.className = `form-message ${type}`;
        formMessageEl.style.display = 'block';

        setTimeout(() => {
            formMessageEl.style.display = 'none';
        }, 5000);
    } else {
        alert(text);
    }
};

// Flour order form - e‑commerce style
const orderForm = document.getElementById('orderForm');

if (orderForm) {
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    const flourType = document.getElementById('flourType');
    const packageSize = document.getElementById('packageSize');
    const quantity = document.getElementById('quantity');
    const paymentMethod = document.getElementById('paymentMethod');

    const customerName = document.getElementById('customerName');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const city = document.getElementById('city');
    const address = document.getElementById('address');
    const notes = document.getElementById('notes');

    const summaryFlour = document.getElementById('summaryFlour');
    const summarySize = document.getElementById('summarySize');
    const summaryQty = document.getElementById('summaryQty');
    const summaryPayment = document.getElementById('summaryPayment');
    const summaryTotal = document.getElementById('summaryTotal');

    // Simple estimated price table (can be adjusted later)
    const priceTable = {
        'Gluten-Free Flour': { '500g': 450, '1kg': 850 },
        'Diabetic-Friendly Flour': { '500g': 480, '1kg': 900 },
        'Multi-Grain Flour': { '500g': 420, '1kg': 780 },
        'High-Iron Women’s Atta': { '500g': 460, '1kg': 860 }
    };

    const updateSummary = () => {
        const flour = flourType.value || 'Not selected';
        const size = packageSize.value || '500g';
        const qty = parseInt(quantity.value || '1', 10);
        const payment = paymentMethod.value === 'COD' ? 'Cash on Delivery' : paymentMethod.value;

        summaryFlour.textContent = flour;
        summarySize.textContent = size;
        summaryQty.textContent = `${qty} pack${qty > 1 ? 's' : ''}`;
        summaryPayment.textContent = payment;

        if (priceTable[flour] && priceTable[flour][size]) {
            const base = priceTable[flour][size];
            const total = base * qty;
            summaryTotal.textContent = `Rs. ${total.toLocaleString()} (approx.)`;
        } else {
            summaryTotal.textContent = 'Select flour & size';
        }
    };

    // Prefill flour type from query param if available
    const params = new URLSearchParams(window.location.search);
    const flourParam = params.get('flour');
    if (flourParam && flourType) {
        Array.from(flourType.options).forEach(opt => {
            if (opt.value === flourParam) {
                opt.selected = true;
            }
        });
    }

    // Attach listeners to update summary live
    [flourType, packageSize, quantity, paymentMethod].forEach(el => {
        if (el) {
            el.addEventListener('change', updateSummary);
            el.addEventListener('input', updateSummary);
        }
    });

    updateSummary();

    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!customerName.value || !phone.value || !city.value || !address.value || !flourType.value) {
            orderForm.style.animation = 'shake 0.5s';
            setTimeout(() => {
                orderForm.style.animation = '';
            }, 500);
            showFormMessage(formMessage, 'Please fill in all required fields (name, phone, city, address, flour type).', 'error');
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Placing order...';
        }

        const payload = {
            type: 'flour-order',
            flourType: flourType.value,
            packageSize: packageSize.value,
            quantity: parseInt(quantity.value || '1', 10),
            paymentMethod: paymentMethod.value,
            name: customerName.value,
            phone: phone.value,
            email: email.value,
            city: city.value,
            address: address.value,
            notes: notes.value
        };

        try {
            const apiUrl = 'https://script.google.com/macros/s/AKfycbxPY34mxoW3608ZYKASmXmAiUqwWoRUOxRp1WLNMAQdBuc8PCdTt0-7DI51jnrsgQRLUw/exec';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.success) {
                showFormMessage(
                    formMessage,
                    data.message || 'Thank you! Your flour order has been received. Our team will contact you shortly to confirm delivery.',
                    'success'
                );
                orderForm.reset();
                updateSummary();

                orderForm.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    orderForm.style.transform = 'scale(1)';
                }, 200);
            } else {
                showFormMessage(formMessage, data.message || 'Sorry, there was an error. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showFormMessage(
                formMessage,
                'Sorry, there was an error connecting to the server. Please try again later.',
                'error'
            );
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Place Order (Cash on Delivery)';
            }
        }
    });
}

// Home page "Make your blend" mini-recommendation
const blendForm = document.getElementById('blendForm');

if (blendForm) {
    const blendFlour = document.getElementById('blendFlour');
    const blendText = document.getElementById('blendText');
    const blendCard = document.getElementById('blendResult');
    const blendNext = document.getElementById('blendNext');

    blendForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const ageRange = document.getElementById('blendAge').value;
        const gender = document.getElementById('blendGender').value;
        const lifestyle = document.getElementById('blendLifestyle').value;
        const healthGoal = document.getElementById('blendGoal').value;

        if (!ageRange || !gender || !lifestyle || !healthGoal) {
            blendForm.style.animation = 'shake 0.5s';
            setTimeout(() => {
                blendForm.style.animation = '';
            }, 500);
            return;
        }

        const { flour, tagline } = getFlourRecommendation({
            ageRange,
            gender,
            lifestyle,
            healthGoal
        });

        blendFlour.textContent = flour;
        blendText.textContent = tagline;

        // Link to order page with flour pre-selected (relative URL so it works locally and when hosted)
        const encodedFlour = encodeURIComponent(flour);
        blendNext.href = `contact.html?flour=${encodedFlour}#order`;

        blendCard.classList.remove('hidden');
    });
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

// Shared recommendation logic (smart flour match)
const getFlourRecommendation = ({ ageRange, gender, lifestyle, healthGoal }) => {
    // Base on primary health goal first
    let flour = 'Multi-Grain Flour';
    let tagline = 'Balanced everyday nutrition for your whole family.';
    let benefits = [
        'Rich in fiber, vitamins, and minerals',
        'Supports digestion and daily energy',
        'Suitable for kids, adults, and elders'
    ];

    if (healthGoal === 'gluten-free') {
        flour = 'Gluten-Free Flour';
        tagline = 'For gluten-sensitive and light-on-stomach meals.';
        benefits = [
            'Gentle on digestion',
            'Ideal when you cannot eat regular wheat',
            'Great for rotis, parathas, and baking'
        ];
    } else if (healthGoal === 'diabetes') {
        flour = 'Diabetic-Friendly Flour';
        tagline = 'Designed to support blood sugar management.';
        benefits = [
            'Low-glycemic flour blend',
            'High in fiber to keep you full longer',
            'Ideal for diabetics and pre-diabetics'
        ];
    } else if (healthGoal === 'women-health' || (gender === 'female' && ageRange !== '18-30')) {
        flour = 'High-Iron Women’s Atta';
        tagline = 'Extra support for women’s iron and bone health.';
        benefits = [
            'Helps prevent iron deficiency',
            'Supports healthy blood and bones',
            'Boosts daily strength and energy'
        ];
    } else if (healthGoal === 'fitness' || lifestyle === 'gym') {
        flour = 'Multi-Grain Flour';
        tagline = 'Whole-grain energy for active and gym lifestyles.';
        benefits = [
            'Slow-release energy for workouts',
            'Better satiety versus regular wheat',
            'Pairs well with high-protein meals'
        ];
    } else if (healthGoal === 'weight-loss' || lifestyle === 'weight-loss') {
        flour = 'Gluten-Free Flour';
        tagline = 'Light, easy-to-digest flour for weight management.';
        benefits = [
            'Helps avoid heavy, bloated feeling',
            'Supports portion control and calorie awareness',
            'Works for rotis, wraps, and baked snacks'
        ];
    }

    return { flour, tagline, benefits };
};

// Recommendation form logic on dedicated page
const recommendationForm = document.getElementById('recommendationForm');

if (recommendationForm) {
    const recResult = document.getElementById('recommendationResult');
    const recName = document.getElementById('recName');
    const recTagline = document.getElementById('recTagline');
    const recBenefits = document.getElementById('recBenefits');
    const recOrderLink = document.getElementById('recOrderLink');

    recommendationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const ageRange = document.getElementById('ageRange').value;
        const gender = document.getElementById('gender').value;
        const lifestyle = document.getElementById('lifestyleMatch').value;
        const healthGoal = document.getElementById('healthGoalMatch').value;

        if (!ageRange || !gender || !lifestyle || !healthGoal) {
            recommendationForm.style.animation = 'shake 0.5s';
            setTimeout(() => {
                recommendationForm.style.animation = '';
            }, 500);
            return;
        }

        const { flour, tagline, benefits } = getFlourRecommendation({
            ageRange,
            gender,
            lifestyle,
            healthGoal
        });

        recName.textContent = flour;
        recTagline.textContent = tagline;
        recBenefits.innerHTML = '';
        benefits.forEach(b => {
            const li = document.createElement('li');
            li.textContent = b;
            recBenefits.appendChild(li);
        });

        if (recOrderLink) {
            const encodedFlour = encodeURIComponent(flour);
            recOrderLink.href = `contact.html?flour=${encodedFlour}#order`;
        }

        recResult.classList.remove('hidden');
        recResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

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
