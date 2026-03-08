// Hero Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Auto-advance slideshow every 4 seconds
setInterval(() => {
    showSlide(currentSlide + 1);
}, 4000);

// Scroll Navigation
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animations - Intersection Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Mailchimp Form Handling
const form = document.getElementById('mc-embedded-subscribe-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('mce-EMAIL').value;
    
    // Basic email validation
    if (!email || !email.includes('@')) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.className = 'form-message error';
        return;
    }

    // Show success message (you'll need to configure actual Mailchimp integration)
    formMessage.textContent = 'Thank you for subscribing! Check your email for confirmation.';
    formMessage.className = 'form-message success';
    
    // Reset form
    form.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);

    // ACTUAL MAILCHIMP INTEGRATION:
    // Uncomment and configure the following when you have your Mailchimp account:
    /*
    const actionUrl = 'YOUR_MAILCHIMP_ACTION_URL_HERE';
    fetch(actionUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(form)
    }).then(() => {
        formMessage.textContent = 'Thank you for subscribing! Check your email for confirmation.';
        formMessage.className = 'form-message success';
        form.reset();
    }).catch(() => {
        formMessage.textContent = 'Something went wrong. Please try again.';
        formMessage.className = 'form-message error';
    });
    */
});

// Initial visibility for hero section
document.querySelector('.hero').classList.add('visible');

// Testimonial Slider
let currentTestimonial = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const totalTestimonials = testimonialSlides.length;

function showTestimonial(index) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    currentTestimonial = (index + totalTestimonials) % totalTestimonials;
    testimonialSlides[currentTestimonial].classList.add('active');
}

// Testimonial navigation buttons
document.querySelector('.slider-arrow.prev').addEventListener('click', () => {
    showTestimonial(currentTestimonial - 1);
});

document.querySelector('.slider-arrow.next').addEventListener('click', () => {
    showTestimonial(currentTestimonial + 1);
});

// Auto-advance testimonials every 5 seconds
setInterval(() => {
    showTestimonial(currentTestimonial + 1);
}, 5000);
