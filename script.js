
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const roles = [
    'Desenvolvedora Fullstack',
    'Laravel & Vue.js',
    'React & NestJS',
    'Spring Boot & Java',
    'Criadora de sistemas do zero',
];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;
const typingEl = document.getElementById('typingText');

function type() {
    const current = roles[roleIndex];
    if (!deleting) {
        typingEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(type, 1800);
            return;
        }
    } else {
        typingEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    setTimeout(type, deleting ? 60 : 90);
}
type();

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll(
    '.timeline-card, .project-card, .course-card, .contact-card, .skill-category, .about-text'
).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
    });
});
