// Initialize EmailJS
// Add this at the beginning of your script.js file
(function() {
    // Replace with your actual EmailJS public key
    emailjs.init("P-3-cVwJ1-pK5ihO_"); // You need to add your public key here
})();

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = '';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Toast notification function
function showToast(message, type = 'success') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast-container');
    existingToasts.forEach(toast => document.body.removeChild(toast));
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');
    toast.textContent = message;
    
    const container = document.createElement('div');
    container.className = 'toast-container';
    container.appendChild(toast);
    document.body.appendChild(container);
    
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(container)) {
                document.body.removeChild(container);
            }
        }, 300);
    }, 3000);
}

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        try {
            const templateParams = {
                from_name: document.getElementById('name').value.trim(),
                from_email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim(),
                to_name: "Juma Kariuki"
            };
            
            const response = await emailjs.send("service_79gy7w4", "template_h6e9xer", templateParams);
            showToast('Message sent successfully!', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Email error:', error);
            showToast('Failed to send message. Please try again.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

// Add form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!name) {
        showToast('Please enter your name', 'error');
        return false;
    }
    
    if (!email || !emailRegex.test(email)) {
        showToast('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!subject) {
        showToast('Please enter a subject', 'error');
        return false;
    }
    
    if (!message) {
        showToast('Please enter your message', 'error');
        return false;
    }
    
    return true;
}

// Add active class to header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add animation to skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    const windowHeight = window.innerHeight;
    
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        if (barTop < windowHeight - 100) {
            bar.style.width = bar.parentElement.getAttribute('data-progress') + '%';
        }
    });
}

// Update skill bars on page load and scroll
window.addEventListener('load', animateSkillBars);
window.addEventListener('scroll', animateSkillBars);


// Function to update the copyright year
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('.footer-content p');
    if (footerYear) {
        footerYear.textContent = `© ${currentYear} Juma Kariuki. All Rights Reserved.`;
    }
}

// Update year when the page loads
document.addEventListener('DOMContentLoaded', updateCopyrightYear);

// Add error boundary
window.addEventListener('error', function(e) {
    console.error('Global error:', e);
    return false;
});

// Improve scroll handling
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(function() {
        // Your scroll handling code
    });
});

// Add image lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Update project filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Theme toggle functionality
function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        themeToggle.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Add theme toggle event listener
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});