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

    document.querySelectorAll('.content-box').forEach(item => {
        observer.observe(item);
    });

    // Email copy functionality
    const emailAddress = document.querySelector('.email-address');
    emailAddress.addEventListener('click', function() {
        const tempInput = document.createElement('input');
        tempInput.value = this.textContent;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        setTimeout(() => {
            this.textContent = originalText;
        }, 2000);
    });
});

// Adjust hero section height dynamically
function adjustHeroHeight() {
    const header = document.querySelector('header');
    const hero = document.getElementById('hero');
    const windowHeight = window.innerHeight;
    const headerHeight = header.offsetHeight;
    hero.style.minHeight = `${windowHeight - headerHeight}px`;
}

window.addEventListener('load', adjustHeroHeight);
window.addEventListener('resize', adjustHeroHeight);