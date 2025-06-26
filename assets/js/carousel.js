// Carousel functionality
let currentImageIndex = 0;
let images = [];

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    console.log('Carousel initializing...');
    
    // Get DOM elements
    const modal = document.getElementById('carousel-modal');
    const modalContent = modal.querySelector('.modal-content');
    const carouselImages = modal.querySelector('.carousel-images');
    const prevButton = modal.querySelector('.prev');
    const nextButton = modal.querySelector('.next');
    const closeButton = modal.querySelector('.close');

    if (!modal || !modalContent || !carouselImages || !prevButton || !nextButton || !closeButton) {
        console.error('One or more carousel elements not found!');
        return;
    }

    // Collect art gallery images
    images = Array.from(document.querySelectorAll('article#art .gallery-section a.image'));
    
    // Add click event listeners to art gallery images
    images.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            console.log('Opening carousel for image:', link.href);
            currentImageIndex = index;
            openCarousel(link.href, modal, carouselImages);
        });
    });

    // Set up event listeners once
    prevButton.addEventListener('click', () => {
        console.log('Previous button clicked');
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        openCarousel(images[currentImageIndex].href, modal, carouselImages);
    });

    nextButton.addEventListener('click', () => {
        console.log('Next button clicked');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        openCarousel(images[currentImageIndex].href, modal, carouselImages);
    });

    closeButton.addEventListener('click', () => {
        console.log('Close button clicked');
        closeCarousel(modal);
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            console.log('Clicked outside modal');
            closeCarousel(modal);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            console.log('Escape key pressed');
            closeCarousel(modal);
        }
    });
});

// Open carousel function
function openCarousel(src, modal, carouselImages) {
    console.log('Opening carousel with image:', src);
    
    // Create image element
    const img = document.createElement('img');
    img.src = src;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    
    // Clear previous image
    carouselImages.innerHTML = '';
    carouselImages.appendChild(img);
    
    // Show modal
    modal.style.display = 'block';
    
    // Add transition class for smooth appearance
    modal.classList.add('modal-active');
}

// Close carousel function
function closeCarousel(modal) {
    console.log('Closing carousel');
    modal.style.display = 'none';
    modal.classList.remove('modal-active');
}
