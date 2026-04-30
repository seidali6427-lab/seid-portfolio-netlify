// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
  updateActiveNav();
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ===== TYPED TEXT EFFECT =====
const phrases = [
  'Front-End Developer',
  'UI Enthusiast',
  'HTML & CSS Lover',
  'JavaScript Explorer',
  'Creative Coder'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
  });
}

// ===== SKILL BAR ANIMATION =====
function animateSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  fills.forEach(fill => {
    const width = fill.getAttribute('data-width');
    fill.style.width = width;
  });
}

// ===== INTERSECTION OBSERVER =====
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');

      // Trigger counters when about section is visible
      if (entry.target.id === 'about') {
        animateCounters();
      }

      // Trigger skill bars when skills section is visible
      if (entry.target.id === 'skills') {
        animateSkillBars();
      }

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');

      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate sending (no backend)
  setTimeout(() => {
    formSuccess.classList.add('show');
    contactForm.reset();
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;

    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 4000);
  }, 1200);
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== CARD ENTRANCE ANIMATIONS =====
// Add CSS for animate-in via JS
const style = document.createElement('style');
style.textContent = `
  .about-card,
  .skill-card,
  .project-card {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .animate-in .about-card,
  .animate-in .skill-card,
  .animate-in .project-card {
    opacity: 1;
    transform: translateY(0);
  }

  .animate-in .about-card:nth-child(1),
  .animate-in .skill-card:nth-child(1),
  .animate-in .project-card:nth-child(1) { transition-delay: 0.1s; }

  .animate-in .about-card:nth-child(2),
  .animate-in .skill-card:nth-child(2),
  .animate-in .project-card:nth-child(2) { transition-delay: 0.2s; }

  .animate-in .about-card:nth-child(3),
  .animate-in .skill-card:nth-child(3),
  .animate-in .project-card:nth-child(3) { transition-delay: 0.3s; }

  .animate-in .skill-card:nth-child(4),
  .animate-in .project-card:nth-child(4) { transition-delay: 0.4s; }

  .animate-in .skill-card:nth-child(5),
  .animate-in .project-card:nth-child(5) { transition-delay: 0.5s; }

  .animate-in .skill-card:nth-child(6),
  .animate-in .project-card:nth-child(6) { transition-delay: 0.6s; }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// Observe child grids for staggered animation
const gridObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      gridObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.about-cards, .skills-grid, .projects-grid').forEach(grid => {
  gridObserver.observe(grid);
});
