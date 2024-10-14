document.addEventListener('DOMContentLoaded', (event) => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-item, .experience-item, .education-item').forEach(item => {
        observer.observe(item);
    });

    const emailAddress = document.querySelector('.email-address');
    
    emailAddress.addEventListener('click', function() {
        const tempInput = document.createElement('input');
        tempInput.value = this.textContent;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        // Optional: Provide feedback to the user
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        setTimeout(() => {
            this.textContent = originalText;
        }, 2000);
    });

    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });
});

// Add this function to your existing JavaScript
function adjustHeroHeight() {
    const header = document.querySelector('header');
    const hero = document.getElementById('hero');
    const windowHeight = window.innerHeight;
    const headerHeight = header.offsetHeight;
    hero.style.minHeight = `${windowHeight - headerHeight}px`;
}

// Call this function when the page loads and when it resizes
window.addEventListener('load', adjustHeroHeight);
window.addEventListener('resize', adjustHeroHeight);
