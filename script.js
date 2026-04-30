// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// Parallax Effect for Hero Image
const heroImage = document.querySelector('.hero-image');
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if(heroImage) {
        // Slow down the movement to create parallax
        heroImage.style.transform = `translateY(${scroll * 0.4}px) translateX(10%)`;
    }
});

// Star Generation
function createStars(containerId, count, sizeClass, speed) {
    const container = document.getElementById(containerId);
    if (!container) return;

    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        
        // Randomize position
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 200}vh`; // span multiple viewports
        
        // Randomize opacity
        star.style.opacity = Math.random();
        
        // Randomize size
        const size = Math.random() * sizeClass;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = i % 5 === 0 ? '#00E676' : '#ffffff'; // occasional emerald star
        star.style.borderRadius = '50%';
        
        // Box shadow for glow
        star.style.boxShadow = `0 0 ${size * 2}px ${star.style.backgroundColor}`;
        
        container.appendChild(star);
    }
}

// Generate layers of stars
createStars('stars', 100, 2, 0); // Small distant stars
createStars('stars2', 50, 4, 0); // Medium stars
createStars('stars3', 20, 6, 0); // Large near stars

// Parallax for star layers
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    document.getElementById('stars').style.transform = `translateY(${scroll * -0.1}px)`;
    document.getElementById('stars2').style.transform = `translateY(${scroll * -0.3}px)`;
    document.getElementById('stars3').style.transform = `translateY(${scroll * -0.5}px)`;
});

// Add subtle cursor interaction to glow
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const glowElements = document.querySelectorAll('.glow-wrap::after');
    // Using CSS custom properties would be better for pseudo-elements, 
    // but we can apply it to the container instead
    document.querySelectorAll('.glow-wrap').forEach(wrap => {
        wrap.style.transform = `translate(${(x - 0.5) * -10}px, ${(y - 0.5) * -10}px)`;
    });
});
