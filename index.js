/* Dropdown Menu Functionality */
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    if (dropdown && dropdownToggle) {
        /* Toggle dropdown on click */
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('open');
        });

        /* Close dropdown when clicking outside */
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });
    }
});

/* Slideshow Functionality */
let slideIndex = 1;
let slideTimer;

/* Initialize slideshow when page loads */
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
    autoSlide();
});

/* Change slide by n positions */
function changeSlide(n) {
    clearTimeout(slideTimer);
    showSlides(slideIndex += n);
    autoSlide();
}

/* Go to specific slide */
function currentSlide(n) {
    clearTimeout(slideTimer);
    showSlides(slideIndex = n);
    autoSlide();
}

/* Display slides with fade animation */
function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName('slide');
    const dots = document.getElementsByClassName('dot');

    /* Loop back to first slide if exceeded */
    if (n > slides.length) {
        slideIndex = 1;
    }

    /* Loop to last slide if before first */
    if (n < 1) {
        slideIndex = slides.length;
    }

    /* Hide all slides */
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    /* Remove active class from all dots */
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }

    /* Show current slide and activate corresponding dot */
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = 'block';
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += ' active';
    }
}

/* Auto-play slideshow every 4 seconds */
function autoSlide() {
    slideTimer = setTimeout(function() {
        slideIndex++;
        showSlides(slideIndex);
        autoSlide();
    }, 4000);
}

/* Smooth Scroll for Event Button */
document.addEventListener('DOMContentLoaded', function() {
    const eventBtn = document.querySelector('.event-btn');

    if (eventBtn) {
        eventBtn.addEventListener('click', function(e) {
            /* Prevent default anchor behavior */
            e.preventDefault();
            
            /* Get target element */
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                /* Smooth scroll to target */
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

/* Scroll Animations for Sections */
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    /* Callback for intersection observer */
    const observerCallback = function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    /* Create observer */
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    /* Observe announcement cards */
    const announcementCards = document.querySelectorAll('.announcement-card');
    announcementCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    /* Observe highlight cards */
    const highlightCards = document.querySelectorAll('.highlight-card');
    highlightCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
