/* ===========================
   BURGER MENU
   =========================== */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('open');
});

// Close menu on link click
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    nav.classList.remove('open');
  });
});

/* ===========================
   HEADER SCROLL EFFECT
   =========================== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.background = 'rgba(10, 10, 15, 0.95)';
  } else {
    header.style.background = 'rgba(10, 10, 15, 0.8)';
  }
});

/* ===========================
   ANIMATED COUNTERS
   =========================== */
function animateCounters() {
  const counters = document.querySelectorAll('[data-target]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1500;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out quad
          const eased = 1 - (1 - progress) * (1 - progress);
          const current = Math.round(eased * target);
          el.textContent = current + suffix;

          if (progress < 1) {
            requestAnimationFrame(update);
          }
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

animateCounters();

/* ===========================
   FAQ ACCORDION
   =========================== */
document.querySelectorAll('.faq-item__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.faq-item__question').forEach(b => b.setAttribute('aria-expanded', 'false'));

    // Open clicked (if it wasn't open)
    if (!isActive) {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ===========================
   FADE-IN ON SCROLL
   =========================== */
function initFadeIn() {
  const elements = document.querySelectorAll(
    '.service-card, .case-card, .adv-card, .stat-card, .about__image-col, .about__text, .faq-item'
  );

  elements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80); // stagger
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

initFadeIn();

/* ===========================
   SMOOTH SCROLL (fallback)
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===========================
   FORM SUBMISSION
   =========================== */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    // If using Formspree, let it handle naturally
    // For custom handling, uncomment below:
    /*
    e.preventDefault();
    const data = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(resp => {
      if (resp.ok) {
        form.innerHTML = '<p style="text-align:center;color:#4ecdc4;font-size:1.2rem;padding:40px 0;">Спасибо! Мы свяжемся с вами в ближайшее время.</p>';
      }
    })
    .catch(err => console.error(err));
    */
  });
}
