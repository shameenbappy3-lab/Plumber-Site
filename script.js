// ============================================================
// HERO SLIDESHOW
// ============================================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Auto-advance every 5 seconds
setInterval(() => showSlide(currentSlide + 1), 5000);


// ============================================================
// SCROLL NAVIGATION
// ============================================================
const navbar = document.getElementById('navbar');

// PERF FIX: { passive: true } — tells the browser it can scroll
// immediately without waiting for this listener to finish running.
// This eliminates the scroll lag you were experiencing.
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });


// ============================================================
// HAMBURGER MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    // Prevent body scrolling when menu is open
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});


// ============================================================
// SMOOTH SCROLLING
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu on link click
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});


// ============================================================
// SCROLL ANIMATIONS — INTERSECTION OBSERVER
// ============================================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // PERF FIX: stop watching after it animates in.
            // Without this, the observer keeps running for every section
            // forever, wasting CPU.
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
});

document.querySelectorAll('section').forEach(section => observer.observe(section));


// ============================================================
// MAILCHIMP FORM HANDLING
// ============================================================
const form = document.getElementById('mc-embedded-subscribe-form');
const formMessage = document.getElementById('form-message');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('mce-EMAIL').value;

        if (!email || !email.includes('@')) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.className = 'form-message error';
            return;
        }

        formMessage.textContent = 'Thank you for subscribing! Check your email for confirmation.';
        formMessage.className = 'form-message success';
        form.reset();

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);

        // ACTUAL MAILCHIMP INTEGRATION:
        // Uncomment and configure when you have your Mailchimp account set up:
        /*
        const actionUrl = 'YOUR_MAILCHIMP_ACTION_URL_HERE';
        fetch(actionUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: new FormData(form)
        }).then(() => {
            formMessage.textContent = 'Thank you for subscribing!';
            formMessage.className = 'form-message success';
            form.reset();
        }).catch(() => {
            formMessage.textContent = 'Something went wrong. Please try again.';
            formMessage.className = 'form-message error';
        });
        */
    });
}


// ============================================================
// TESTIMONIAL SLIDER
// ============================================================
let currentTestimonial = 0;
const testimonialSlides   = document.querySelectorAll('.testimonial-slide');
const totalTestimonials   = testimonialSlides.length;

function showTestimonial(index) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    currentTestimonial = (index + totalTestimonials) % totalTestimonials;
    testimonialSlides[currentTestimonial].classList.add('active');
}

const prevBtn = document.querySelector('.slider-arrow.prev');
const nextBtn = document.querySelector('.slider-arrow.next');

if (prevBtn) prevBtn.addEventListener('click', () => showTestimonial(currentTestimonial - 1));
if (nextBtn) nextBtn.addEventListener('click', () => showTestimonial(currentTestimonial + 1));

// Auto-advance every 6 seconds
setInterval(() => showTestimonial(currentTestimonial + 1), 6000);
