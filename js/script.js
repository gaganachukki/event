
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initBackToTop();
  initSmoothScroll();
});

// --------- Navbar Scroll Effect ---------
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check on load
}

// --------- Mobile Menu ---------
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// --------- Scroll Animations ---------
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animations
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// --------- Back to Top Button ---------
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --------- Smooth Scroll for Anchor Links ---------
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
}

// --------- Toast Notification ---------
function showToast(message, duration = 3000) {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// --------- Form Validation ---------
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return re.test(phone);
}

function validateRequired(value) {
  return value.trim().length > 0;
}

function showFieldError(field, message) {
  clearFieldError(field);
  field.classList.add('error');
  const errorEl = document.createElement('span');
  errorEl.className = 'field-error';
  errorEl.textContent = message;
  errorEl.style.cssText = 'color: #ef4444; font-size: 12px; margin-top: 4px; display: block;';
  field.parentNode.appendChild(errorEl);
}

function clearFieldError(field) {
  field.classList.remove('error');
  const existing = field.parentNode.querySelector('.field-error');
  if (existing) existing.remove();
}

// --------- Counter Animation ---------
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const suffix = element.dataset.suffix || '';

  function update() {
    start += increment;
    if (start >= target) {
      element.textContent = target.toLocaleString() + suffix;
      return;
    }
    element.textContent = Math.floor(start).toLocaleString() + suffix;
    requestAnimationFrame(update);
  }

  update();
}

// --------- Typewriter Effect ---------
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// --------- Throttle Function ---------
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// --------- Debounce Function ---------
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// --------- Generate Particle Effects ---------
function createParticles(container, count = 20) {
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(124, 58, 237, ${Math.random() * 0.5 + 0.1});
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: float ${Math.random() * 4 + 3}s ease-in-out infinite;
      animation-delay: ${Math.random() * 2}s;
      pointer-events: none;
    `;
    container.appendChild(particle);
  }
}

// --------- Parallax Effect ---------
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (parallaxElements.length === 0) return;

  window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  }, 16));
}

// --------- Tabs Functionality ---------
function initTabs(tabsContainer) {
  if (!tabsContainer) return;

  const buttons = tabsContainer.querySelectorAll('[data-tab]');
  const panels = tabsContainer.querySelectorAll('[data-tab-content]');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
      });

      btn.classList.add('active');
      const targetPanel = tabsContainer.querySelector(`[data-tab-content="${target}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.style.display = 'block';
      }
    });
  });
}

// --------- Image Lazy Loading ---------
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length === 0) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });

  lazyImages.forEach(img => imageObserver.observe(img));
}

// --------- Search Functionality ---------
function initSearch(inputSelector, itemsSelector) {
  const input = document.querySelector(inputSelector);
  const items = document.querySelectorAll(itemsSelector);
  if (!input || items.length === 0) return;

  input.addEventListener('input', debounce((e) => {
    const query = e.target.value.toLowerCase().trim();

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(query) || query === '') {
        item.style.display = '';
        item.style.animation = 'fadeInUp 0.3s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });
  }, 300));
}
