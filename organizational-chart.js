document.addEventListener('DOMContentLoaded', function() {
    initializeDropdown();
    initializeTableInteractions();
    initializeSmoothScroll();
    initializeAnimations();
});

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

/* table interactions functionality */
function initializeTableInteractions() {
    // Get all table images
    const tableImages = document.querySelectorAll('.table-img');
    tableImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openImageModal(this);
        });
    });

    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('.styled-table tbody tr');
    tableRows.forEach(row => {
        row.style.transition = 'all 0.3s ease';
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 5px 15px rgba(52, 152, 219, 0.3)';
        });

        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

/* image modal functionality */
function openImageModal(imgElement) {
    let modal = document.getElementById('imageModal');

    if (!modal) {
        modal = createImageModal();
    }

    const modalImg = document.getElementById('modalImage');
    modalImg.src = imgElement.src;
    modalImg.alt = imgElement.alt;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/* create image modal if not exists */
function createImageModal() {
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'image-modal';
    modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <img class="modal-image" id="modalImage" alt="Enlarged view">
    `;

    document.body.appendChild(modal);

    // Close modal on click
    modal.addEventListener('click', closeImageModal);

    // Close button
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', closeImageModal);

    return modal;
}

/* close image modal */
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/* smooth scrolling functionality */
function initializeSmoothScroll() {
    // Select all anchor links that start with #
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Ignore # only links
            if (href === '#') return;

            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* scroll animation functionality */
function initializeAnimations() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(
        '.advisor-card, .styled-table, .membership-cta, .info-card'
    );

    // Create intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element enters viewport
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Set initial state and observe each element
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
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
