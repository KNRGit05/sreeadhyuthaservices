document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    // --- Testimonial Carousel ---
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    if (dots.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Auto Advance Slides
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000); 
    }


    // --- Sticky Header Shadow & Smooth Scroll Offset ---
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)"; 
            } else {
                navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
            }
        });
    }

    // Smooth scroll for anchor links with header offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 90; // Height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // --- Contact Form Handling with EmailJS ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        console.log("Contact form found, attaching listener");
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log("Form submitted");

            // Collect form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Send email using EmailJS
            // REPLACE 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual values
            const serviceID = 'YOUR_SERVICE_ID';
            const templateID = 'YOUR_TEMPLATE_ID';

            const templateParams = {
                from_name: name,
                reply_to: email,
                service_requested: service,
                message: message
            };

            // Calculate 'Send Message' button to show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            if (typeof emailjs !== 'undefined') {
                emailjs.send(serviceID, templateID, templateParams)
                    .then(() => {
                        alert('Message sent successfully! We will get back to you soon.');
                        contactForm.reset();
                        submitBtn.innerText = originalBtnText;
                        submitBtn.disabled = false;
                    }, (err) => {
                        alert('Note: Email sending failed. This is likely because the EmailJS API keys (YOUR_PUBLIC_KEY, etc.) need to be replaced in the code with your actual keys.');
                        console.error('EmailJS Error:', err);
                        submitBtn.innerText = originalBtnText;
                        submitBtn.disabled = false;
                    });
            } else {
                 alert('EmailJS SDK not loaded.');
                 submitBtn.innerText = originalBtnText;
                 submitBtn.disabled = false;
            }
        });
    }

});
