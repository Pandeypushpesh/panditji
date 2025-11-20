// ===== Language System =====
let currentLang = 'hi'; // Default language: Hindi
let translations = {};

// Load language file
async function loadLanguage(lang) {
    try {
        const response = await fetch(`/lang/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load language file: ${lang}.json`);
        }
        translations = await response.json();
        applyTranslations();
    } catch (error) {
        console.error('Error loading language:', error);
        // Fallback: try to load from languages folder if lang folder fails
        try {
            const fallbackResponse = await fetch(`/languages/${lang}.json`);
            if (fallbackResponse.ok) {
                translations = await fallbackResponse.json();
                applyTranslations();
            }
        } catch (fallbackError) {
            console.error('Fallback language load also failed:', fallbackError);
        }
    }
}

// Apply translations to all elements with data-translate attribute
function applyTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedTranslation(translations, key);
        
        if (translation) {
            // For input placeholders, labels, and option text
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.type === 'text' || element.type === 'email' || element.type === 'tel' || element.type === 'date') {
                    element.placeholder = translation;
                }
            } else if (element.tagName === 'LABEL') {
                element.textContent = translation;
            } else if (element.tagName === 'OPTION') {
                element.textContent = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}

// Get nested translation value (e.g., "nav.home" -> translations.nav.home)
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : null;
    }, obj);
}

// Toggle language
function toggleLanguage() {
    currentLang = currentLang === 'hi' ? 'en' : 'hi';
    loadLanguage(currentLang);
    
    // Update button text
    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.textContent = currentLang === 'hi' ? 'EN' : 'HI';
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load default language
    loadLanguage(currentLang);
    
    // Set up language switcher
    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.addEventListener('click', toggleLanguage);
    }
});

// ===== Mobile Menu Toggle =====
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===== Appointment Form Handling =====
document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointmentForm');
    const formMessage = document.getElementById('formMessage');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                email: document.getElementById('email').value.trim(),
                service: document.getElementById('service').value,
                date: document.getElementById('date').value,
                message: document.getElementById('message').value.trim()
            };
            
            // Validate form
            if (!formData.name || !formData.phone || !formData.email || !formData.service || !formData.date) {
                showFormMessage('error', 'Please fill in all required fields.');
                return;
            }
            
            // Show loading state
            const submitButton = appointmentForm.querySelector('.btn-submit');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            try {
                // Determine API URL (use relative path, will work with backend)
                const apiUrl = '/api/send-mail';
                
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (response.ok && data.success) {
                    // Success
                    showFormMessage('success', getTranslation('appointment.success') || 'Thank you! Your appointment request has been submitted.');
                    appointmentForm.reset();
                } else {
                    // Error from server
                    showFormMessage('error', data.message || getTranslation('appointment.error') || 'Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                showFormMessage('error', getTranslation('appointment.error') || 'Something went wrong. Please try again.');
            } finally {
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }
    
    function showFormMessage(type, message) {
        if (formMessage) {
            formMessage.className = `form-message ${type}`;
            formMessage.textContent = message;
            formMessage.style.display = 'block';
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    function getTranslation(key) {
        return getNestedTranslation(translations, key);
    }
});

// ===== Set minimum date to today =====
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

// ===== Animation on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .about-card, .service-card-full, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

