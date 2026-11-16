// Antigravity Minimalist Modern JavaScript
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMaxStr();
});

/* ============================================================
   STRING TRUNCATION / MAX STR HELPER
   ============================================================ */
function initMaxStr() {
  document.querySelectorAll('[data-max-str]').forEach(el => {
    const max = parseInt(el.getAttribute('data-max-str'), 10) || 160;
    const text = el.textContent.trim();
    if (text.length > max) {
      el.textContent = text.slice(0, max).trim() + '...';
    }
  });
}

/* ============================================================
   NAVBAR & SCROLL BEHAVIOR
   ============================================================ */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  // Sticky / scroll background blur toggle
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Active link highlight
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
