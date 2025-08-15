let currentSlide = 0;
const totalSlides = 5;
let autoSlideInterval;

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation - find the clicked link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase() === pageId || 
            (pageId === 'home' && link.textContent.toLowerCase() === 'home')) {
            link.classList.add('active');
        }
    });

    // Close mobile menu
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.remove('open');
    }

    // Show/hide carousel arrows based on page
    const globalPrevBtn = document.getElementById('globalPrevBtn');
    const globalNextBtn = document.getElementById('globalNextBtn');
    
    if (pageId === 'home') {
        if (globalPrevBtn) globalPrevBtn.style.display = 'flex';
        if (globalNextBtn) globalNextBtn.style.display = 'flex';
        setTimeout(startAutoSlide, 100);
    } else {
        if (globalPrevBtn) globalPrevBtn.style.display = 'none';
        if (globalNextBtn) globalNextBtn.style.display = 'none';
        stopAutoSlide();
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('open');
    }
}

// Carousel functionality
function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.nav-dot');
    
    if (track) {
        track.style.transform = `translateX(-${currentSlide * 20}%)`;
    }
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
    resetAutoSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
    resetAutoSlide();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
    resetAutoSlide();
}

function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval
    // Only start auto-slide if we're on the home page
    const homePage = document.getElementById('home');
    if (homePage && homePage.classList.contains('active')) {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Form handling
function handleFormSubmit(event) {
    event.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    event.target.reset();
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set initial slide
    updateCarousel();
    
    // Show carousel arrows since home page is active by default
    const globalPrevBtn = document.getElementById('globalPrevBtn');
    const globalNextBtn = document.getElementById('globalNextBtn');
    if (globalPrevBtn) globalPrevBtn.style.display = 'flex';
    if (globalNextBtn) globalNextBtn.style.display = 'flex';
    
    // Start auto-slide since home page is active by default
    startAutoSlide();
    
    // Add click event listeners to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.textContent.toLowerCase();
            showPage(page);
        });
    });
    
    // Add click event listeners to carousel dots
    document.querySelectorAll('.nav-dot').forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    // Add click event listeners to both sets of carousel arrows
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (globalPrevBtn) globalPrevBtn.addEventListener('click', prevSlide);
    if (globalNextBtn) globalNextBtn.addEventListener('click', nextSlide);
    
    // Logo click handler
    document.querySelector('.logo').addEventListener('click', function(e) {
        e.preventDefault();
        showPage('home');
    });
});

// Keyboard navigation for carousel
document.addEventListener('keydown', function(e) {
    const homePage = document.getElementById('home');
    if (homePage && homePage.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileNav = document.getElementById('mobileNav');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileNav && mobileBtn && 
        !mobileNav.contains(e.target) && 
        !mobileBtn.contains(e.target)) {
        mobileNav.classList.remove('open');
    }
});