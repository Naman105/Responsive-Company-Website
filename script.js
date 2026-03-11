// ---- LOADER ----
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1900);
});

// ---- PARTICLES ----
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1
    };
}

for (let i = 0; i < 80; i++) particles.push(createParticle());

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ---- NAV SCROLL & ACTIVE ----
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    // Shrink nav
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Scroll to top button
    document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);

    // Active nav link
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 250) current = s.id;
    });
    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
    });
});

// ---- SCROLL REVEAL ----
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

// ---- STATS COUNTER ----
const statNums = document.querySelectorAll('.stat-num');
let counted = false;

const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counted) {
        counted = true;
        statNums.forEach(el => {
            const target = parseInt(el.dataset.target);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
}, { threshold: 0.5 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

// ---- TESTIMONIALS SLIDER ----
const track = document.getElementById('testimonialsTrack');
const dots = document.querySelectorAll('.dot');
let current = 0;
const total = 3;

function goToSlide(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

document.getElementById('nextBtn').addEventListener('click', () => goToSlide(current + 1));
document.getElementById('prevBtn').addEventListener('click', () => goToSlide(current - 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

// Auto slide
setInterval(() => goToSlide(current + 1), 5000);

// ---- CONTACT FORM ----
document.getElementById('sendBtn').addEventListener('click', function () {
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const subject = document.getElementById('fsubject').value.trim();
    const message = document.getElementById('fmessage').value.trim();

    if (!name || !email || !subject || !message) {
        this.textContent = 'Fill all fields!';
        this.style.background = '#ff4d6d';
        setTimeout(() => { this.textContent = 'Send Message →'; this.style.background = ''; }, 2000);
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        this.textContent = 'Invalid email!';
        this.style.background = '#ff4d6d';
        setTimeout(() => { this.textContent = 'Send Message →'; this.style.background = ''; }, 2000);
        return;
    }

    this.textContent = 'Sending...';
    setTimeout(() => {
        this.textContent = 'Message Sent ✓';
        this.style.background = '#00c896';
        document.querySelectorAll('.contact-form input, .contact-form textarea')
            .forEach(i => i.value = '');
        setTimeout(() => { this.textContent = 'Send Message →'; this.style.background = ''; }, 3000);
    }, 1000);
});

// ---- SCROLL TO TOP ----
document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
