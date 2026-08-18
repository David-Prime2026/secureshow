// ========== HEADER SCROLL ==========
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// ========== MOBILE NAV ==========
const mobileToggle = document.getElementById('mobile-toggle');
const mainNav = document.getElementById('main-nav');

mobileToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  mobileToggle.classList.toggle('active');
  mobileToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mainNav.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ========== LOGIN DROPDOWN ==========
const loginToggle = document.getElementById('login-toggle');
const loginDropdown = document.getElementById('login-dropdown');

loginToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = loginDropdown.classList.toggle('open');
  loginToggle.setAttribute('aria-expanded', isOpen);
  loginDropdown.setAttribute('aria-hidden', !isOpen);
});

document.addEventListener('click', (e) => {
  if (!loginToggle.contains(e.target) && !loginDropdown.contains(e.target)) {
    loginDropdown.classList.remove('open');
    loginToggle.setAttribute('aria-expanded', 'false');
    loginDropdown.setAttribute('aria-hidden', 'true');
  }
});

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.problem-card, .pillar, .step-card, .brokerage-card, .persona-content, .persona-image, .hardware-content, .hardware-image, .screenshot-card, .section-header'
  );

  targets.forEach(el => el.classList.add('animate-on-scroll'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const parent = el.parentElement;
        const siblings = parent ? Array.from(parent.children).filter(c => c.classList.contains('animate-on-scroll')) : [];
        const index = siblings.indexOf(el);
        const delay = index >= 0 ? index * 120 : 0;

        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => observer.observe(el));
}

// ========== ACTIVE NAV LINK ==========
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach(section => observer.observe(section));
}

// ========== PARALLAX-STYLE DEPTH ==========
function initParallax() {
  const hero = document.querySelector('.hero-image');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < 800) {
      const translate = scrollY * 0.15;
      hero.style.transform = `translateY(${translate}px)`;
    }
  }, { passive: true });
}

// ========== COUNTER ANIMATION FOR BROKERAGE STATS ==========
function initCounters() {
  const stats = document.querySelectorAll('.brokerage-stat');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'countUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

// ========== FORM HANDLING ==========
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;
  });
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initActiveNav();
  initParallax();
  initCounters();
});
