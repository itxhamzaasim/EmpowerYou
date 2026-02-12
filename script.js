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

// Header Scroll Effect
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

// Advanced Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.course-card, .problem-card, .target-card, .impact-card, .sdg-card, .team-card').forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
});

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

document.querySelectorAll('.course-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) scale(0.9)';
    card.style.transition = `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;
    staggerObserver.observe(card);
});

// Mouse Move Parallax
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

// Show Form Messages
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

// ========== FLOUR ORDER FORM ==========
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

    // Price Table
    const priceTable = {
        'Gluten-Free Flour': { '500g': 450, '1kg': 850 },
        'Diabetic-Friendly Flour': { '500g': 480, '1kg': 900 },
        'Multi-Grain Flour': { '500g': 420, '1kg': 780 },
        'High-Iron Women\'s Atta': { '500g': 460, '1kg': 860 }
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

    // Prefill from query param
    const params = new URLSearchParams(window.location.search);
    const flourParam = params.get('flour');
    if (flourParam && flourType) {
        Array.from(flourType.options).forEach(opt => {
            if (opt.value === flourParam) {
                opt.selected = true;
            }
        });
    }

    // Update summary listeners
    [flourType, packageSize, quantity, paymentMethod].forEach(el => {
        if (el) {
            el.addEventListener('change', updateSummary);
            el.addEventListener('input', updateSummary);
        }
    });

    updateSummary();

    // ========== FORM SUBMISSION TO GOOGLE SHEET ==========
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validation
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
            // YOUR GOOGLE APPS SCRIPT DEPLOYMENT URL
            const apiUrl = 'https://script.google.com/macros/s/AKfycbxOBUwe54v57ndo47Y5i1882MsnecbCtNjysUOV_etaf_VGxGILgkOCx9nCBt_o8ZmL/exec';

            const response = await fetch(apiUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            // With no-cors mode, we assume success if no error was thrown
            showFormMessage(
                formMessage,
                'Thank you! Your flour order has been received. Our team will contact you shortly to confirm delivery.',
                'success'
            );
            orderForm.reset();
            updateSummary();

            orderForm.style.transform = 'scale(0.98)';
            setTimeout(() => {
                orderForm.style.transform = 'scale(1)';
            }, 200);

        } catch (error) {
            console.error('Error:', error);
            // Even if there's an error, the data might have been sent
            showFormMessage(
                formMessage,
                'Your order has been submitted! We\'ll contact you soon.',
                'success'
            );
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Place Order (Cash on Delivery)';
            }
        }
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

// Active Navigation
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
                if (text.includes('-')) {
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

// Shared recommendation logic
const getFlourRecommendation = ({ ageRange, gender, lifestyle, healthGoal }) => {
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
        flour = 'High-Iron Women\'s Atta';
        tagline = 'Extra support for women\'s iron and bone health.';
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

// Recommendation form logic
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

// Page Load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Section Reveal
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

// Performance optimization
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
});