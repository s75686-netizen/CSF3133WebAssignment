document.addEventListener('DOMContentLoaded', function() {
    initializeDropdown();
    initializeSlideshow();
    initializeModal();
    collectImages();
});

let slideIndex = 1;
let slideshowInterval;
let currentModalIndex = 0;
const images = [];

/* dropdown menu functionality */
function initializeDropdown() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    if (dropdown && dropdownToggle) {
        // Toggle dropdown on click
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
}

/* collect all images for modal navigation */
function collectImages() {
    const photoCards = document.querySelectorAll('.photo-card');
    photoCards.forEach((card) => {
        const img = card.querySelector('img');
        const caption = card.querySelector('.caption h3');
        if (img && caption) {
            images.push({
                src: img.src,
                title: caption.textContent
            });
        }
    });
}

/* modal functionality */
function initializeModal() {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
}

/* open modal with image */
function openModal(imageSrc, imageTitle) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');

    if (modal && modalImg) {
        // Find index of current image
        currentModalIndex = images.findIndex(img => img.src.includes(imageSrc));
        if (currentModalIndex === -1) currentModalIndex = 0;

        // Display modal
        modal.style.display = 'flex';
        modalImg.src = imageSrc;

        // Set caption if provided
        if (modalCaption && imageTitle) {
            modalCaption.textContent = imageTitle;
        }

        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';

        // Add fade-in animation
        modalImg.style.animation = 'zoomIn 0.4s ease';
    }
}

/* close modal */
function closeModal() {
    const modal = document.getElementById('photoModal');

    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/* navigate through images in modal */
function navigateModal(direction) {
    currentModalIndex += direction;

    // Wrap around if at ends
    if (currentModalIndex >= images.length) {
        currentModalIndex = 0;
    } else if (currentModalIndex < 0) {
        currentModalIndex = images.length - 1;
    }

    // Update modal with new image
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');

    if (modalImg && images[currentModalIndex]) {
        modalImg.src = images[currentModalIndex].src;
        modalImg.style.animation = 'zoomIn 0.3s ease';

        if (modalCaption) {
            modalCaption.textContent = images[currentModalIndex].title;
        }
    }
}

/* slideshow functionality */
function initializeSlideshow() {
    showSlides(slideIndex);
    startSlideshow();
}

/* change slide by n steps */
function plusSlides(n) {
    showSlides(slideIndex += n);
}

/* jump to specific slide */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* display the current slide */
function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return;

    // Wrap around at ends
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show current slide and activate corresponding dot
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";
    }
}

/* start automatic slideshow */
function startSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }

    // Auto advance every 4 seconds
    slideshowInterval = setInterval(function() {
        plusSlides(1);
    }, 4000);
}

/* toggle slideshow play/pause */
function toggleSlideshow() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseText = document.getElementById('playPauseText');
    const icon = playPauseBtn.querySelector('i');

    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        if (icon) icon.className = 'fas fa-play';
        if (playPauseText) playPauseText.textContent = 'Play';
    } else {
        startSlideshow();
        if (icon) icon.className = 'fas fa-pause';
        if (playPauseText) playPauseText.textContent = 'Pause';
    }
}

/* image loading optimization */
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});
