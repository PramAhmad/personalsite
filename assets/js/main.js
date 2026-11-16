// Antigravity Minimalist Modern JavaScript
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMaxStr();
  initLangSwitcher();
});

/* ============================================================
   BILINGUAL LANGUAGE SWITCHER (ID / EN)
   ============================================================ */
function initLangSwitcher() {
  const switchers = document.querySelectorAll('.lang-switcher');
  if (!switchers.length) return;

  switchers.forEach(switcher => {
    const buttons = switcher.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetLang = btn.getAttribute('data-switch-lang');
        if (!targetLang) return;

        // Update active class on buttons
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Toggle language content containers
        const article = switcher.closest('.article-wrapper') || document;
        const langContents = article.querySelectorAll('.lang-content');
        langContents.forEach(content => {
          if (content.getAttribute('data-lang') === targetLang) {
            content.style.display = 'block';
          } else {
            content.style.display = 'none';
          }
        });
      });
    });
  });
}

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
  const isBlogSection = window.location.pathname.includes('/blog') || currentPath.startsWith('blog');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (isBlogSection && (href === 'blog.html' || href === 'index.html' && window.location.pathname.includes('/blog/'))) {
      if (href.includes('blog')) link.classList.add('active');
    } else if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
