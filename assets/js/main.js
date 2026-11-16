// Antigravity / Vanilla JS Core Script
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initContactForms();
  initMediumBlogs();
  initProjectsList();
  initProjectDetail();
});

/* ============================================================
   NAVBAR & SCROLL BEHAVIOR
   ============================================================ */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  // Sticky / scroll background toggle
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    // Close mobile menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Active link highlighter based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ============================================================
   CONTACT & TRANSMISSION FORMS (STATIC LOCAL REPLACEMENT)
   ============================================================ */
function initContactForms() {
  // Main contact form
  const contactForm = document.getElementById('contactForm');
  const contactSuccessAlert = document.getElementById('contactSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]')?.value || 'Guest';
      
      if (contactSuccessAlert) {
        contactSuccessAlert.style.display = 'block';
        contactSuccessAlert.innerHTML = `
          <p class="font-press text-black" style="margin-bottom: 0.25rem;">✔ TRANSMISSION DELIVERED!</p>
          <p class="font-pixel" style="margin: 0; font-size: 0.95rem; color: #3f3f46;">
            Pesan dari <strong>${name}</strong> berhasil dikirim ke Pramudita. Terima kasih sudah menghubungi!
          </p>
        `;
      }
      contactForm.reset();
    });
  }

  // Footer newsletter / inquiry form
  const footerForm = document.getElementById('footerInquiryForm');
  const footerSuccessMsg = document.getElementById('footerSuccessMsg');

  if (footerForm) {
    footerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (footerSuccessMsg) {
        footerSuccessMsg.style.display = 'block';
      }
      footerForm.reset();
    });
  }
}

/* ============================================================
   MEDIUM BLOG RSS / STATIC DATA RENDERER
   ============================================================ */
function initMediumBlogs() {
  const blogContainer = document.getElementById('blogPostsContainer');
  if (!blogContainer) return;

  const isFullArchive = blogContainer.dataset.type === 'full';
  const mediumUsername = PORTFOLIO_DATA?.profile?.mediumUsername || 'rheaa2602';
  const rssUrl = `https://medium.com/feed/@${mediumUsername}`;
  const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  // Show loading indicator
  blogContainer.innerHTML = `
    <div style="text-align: center; padding: 3rem 0;">
      <p class="custom-loader"></p>
      <p class="font-press text-muted" style="font-size: 11px; margin-top: 1rem;">LOADING MEDIUM ARTICLES...</p>
    </div>
  `;

  // Fetch with fallback to static local blogs
  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      if (data && data.status === 'ok' && data.items && data.items.length > 0) {
        const posts = isFullArchive ? data.items : data.items.slice(0, 3);
        renderBlogCards(posts, blogContainer);
      } else {
        fallbackStaticBlogs(blogContainer, isFullArchive);
      }
    })
    .catch(() => {
      // Offline or network error fallback
      fallbackStaticBlogs(blogContainer, isFullArchive);
    });
}

function fallbackStaticBlogs(container, isFullArchive) {
  const staticPosts = PORTFOLIO_DATA?.blogs || [];
  const posts = isFullArchive ? staticPosts : staticPosts.slice(0, 3);
  renderBlogCards(posts, container);
}

function renderBlogCards(posts, container) {
  if (!posts || posts.length === 0) {
    container.innerHTML = `
      <div class="pixel-box" style="text-align: center; padding: 2rem;">
        <p class="font-press" style="font-size: 11px;">NO ARTICLES FOUND IN ARCHIVE</p>
      </div>
    `;
    return;
  }

  let html = '<div class="grid grid-cols-1 gap-6">';
  posts.forEach((post, index) => {
    const rawExcerpt = (post.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const excerpt = rawExcerpt.length > 180 ? rawExcerpt.slice(0, 180) + '...' : rawExcerpt;
    const dateFormatted = post.pubDate ? new Date(post.pubDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : '2024';
    const thumbnail = post.thumbnail || 'assets/images/JJ.png';

    html += `
      <article class="pixel-box" style="padding: 1.5rem; transition: transform 0.2s ease;">
        <div class="flex flex-wrap md:flex-nowrap gap-6 items-center">
          <!-- Thumbnail -->
          <a href="${post.link}" target="_blank" rel="noopener noreferrer" style="position: relative; width: 100%; max-width: 320px; height: 180px; border: 2px solid #000; overflow: hidden; background: #f4f4f5; flex-shrink: 0; box-shadow: var(--shadow-sm); display: block;">
            <img src="${thumbnail}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/images/JJ.png'">
            <div style="position: absolute; top: 6px; left: 6px; border: 2px solid #000; background: #000; color: #fff; padding: 2px 6px; font-family: var(--font-press); font-size: 8px;">
              LOG #${String(index + 1).padStart(2, '0')}
            </div>
          </a>

          <!-- Details -->
          <div style="flex: 1; min-width: 260px;">
            <div class="flex items-center gap-2" style="margin-bottom: 0.5rem; font-family: var(--font-press); font-size: 9px; color: #52525b;">
              <span style="display: inline-block; width: 8px; height: 8px; background: #000;"></span>
              <span>PUB: ${dateFormatted}</span>
            </div>

            <a href="${post.link}" target="_blank" rel="noopener noreferrer" style="display: block; margin-bottom: 0.75rem;">
              <h3 style="font-size: 1.15rem; line-height: 1.4;">${post.title}</h3>
            </a>

            <p style="font-size: 0.95rem; color: #3f3f46; margin-bottom: 1.25rem;">${excerpt}</p>

            <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="btn-pixel" style="font-size: 9px; padding: 0.5rem 0.9rem;">
              <span>▶ READ ON MEDIUM</span>
            </a>
          </div>
        </div>
      </article>
    `;
  });
  html += '</div>';

  container.innerHTML = html;
}

/* ============================================================
   PROJECTS LIST (STATIC DATA STORE RENDERER)
   ============================================================ */
function initProjectsList() {
  const container = document.getElementById('projectsContainer');
  if (!container) return;

  const isHome = container.dataset.view === 'home';
  const projects = PORTFOLIO_DATA?.projects || [];
  const displayProjects = isHome ? projects.slice(0, 3) : projects;

  let html = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">';
  displayProjects.forEach(proj => {
    html += `
      <article class="pixel-card project-card-layout">
        <div>
          <a href="project-detail.html?id=${proj.id}" class="project-thumb">
            <img src="${proj.img}" alt="${proj.nama}" loading="lazy" onerror="this.src='assets/images/JJ.png'">
            <div class="project-badge-corner">
              ID:${proj.id}
            </div>
          </a>

          <div class="flex items-center gap-2" style="font-family: var(--font-press); font-size: 9px; color: #71717a; margin-bottom: 0.5rem;">
            <span>🗓 ${proj.created_at || '2024'}</span>
            <span>•</span>
            <span>${proj.type || 'Software'}</span>
          </div>

          <a href="project-detail.html?id=${proj.id}">
            <h3 style="font-size: 0.95rem; line-height: 1.4; margin-bottom: 0.5rem;">${proj.nama}</h3>
          </a>

          <p style="font-size: 0.9rem; color: #3f3f46; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
            ${proj.deskripsi}
          </p>
        </div>

        <div style="border-top: 2px solid rgba(0,0,0,0.1); padding-top: 0.75rem; margin-top: 0.5rem;">
          <a href="project-detail.html?id=${proj.id}" class="btn-pixel" style="width: 100%; font-size: 9px; padding: 0.5rem;">
            ▶ VIEW PROJECT
          </a>
        </div>
      </article>
    `;
  });
  html += '</div>';

  container.innerHTML = html;
}

/* ============================================================
   PROJECT DETAIL PAGE (STATIC DATA READER)
   ============================================================ */
function initProjectDetail() {
  const detailContainer = document.getElementById('projectDetailContainer');
  if (!detailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const projectId = parseInt(urlParams.get('id'), 10) || 1;
  const project = PORTFOLIO_DATA?.projects?.find(p => p.id === projectId) || PORTFOLIO_DATA?.projects?.[0];

  if (!project) {
    detailContainer.innerHTML = `
      <div class="pixel-box" style="text-align: center; padding: 3rem;">
        <h2 style="font-size: 1.2rem;">PROJECT NOT FOUND</h2>
        <p>The requested project specification could not be located in database.</p>
        <a href="project.html" class="btn-pixel" style="margin-top: 1rem;">⬅ BACK TO DIRECTORY</a>
      </div>
    `;
    return;
  }

  // Update page title dynamically
  document.title = `${project.nama} | Project Specification`;

  const githubBtn = project.github ? `
    <a href="${project.github}" target="_blank" class="btn-pixel-primary">
      <span>👾 REPOSITORY SOURCE</span>
    </a>
  ` : '';

  const liveBtn = (project.link && project.link !== '-') ? `
    <a href="${project.link}" target="_blank" class="btn-pixel">
      <span>🌐 LIVE DEPLOYMENT</span>
    </a>
  ` : '';

  const liveLinkText = (project.link && project.link !== '-') ? `
    <a href="${project.link}" target="_blank" style="text-decoration: underline;">VISIT SYSTEM</a>
  ` : '<span style="color: #a1a1aa;">N/A</span>';

  detailContainer.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Main Showcase Box -->
      <div class="pixel-box" style="padding: 2rem;">
        <div class="flex flex-wrap gap-8 items-center">
          <!-- Thumbnail Frame -->
          <div style="position: relative; width: 100%; max-width: 480px; border: 3px solid #000; overflow: hidden; box-shadow: var(--shadow-sm); background: #f4f4f5;">
            <img src="${project.img}" alt="${project.nama}" style="width: 100%; height: 320px; object-fit: cover;" onerror="this.src='assets/images/JJ.png'">
            <div style="position: absolute; top: 8px; left: 8px; border: 2px solid #000; background: #000; color: #fff; padding: 2px 8px; font-family: var(--font-press); font-size: 9px;">
              SPEC_ID: ${project.id}
            </div>
          </div>

          <!-- Main Info -->
          <div style="flex: 1; min-width: 280px;">
            <div class="flex items-center gap-2" style="font-family: var(--font-press); font-size: 9px; color: #71717a; margin-bottom: 0.5rem;">
              <span style="display: inline-block; width: 8px; height: 8px; background: #000;"></span>
              <span>SYSTEM OVERVIEW</span>
            </div>

            <h1 style="font-size: 1.5rem; line-height: 1.3; margin-bottom: 1rem;">
              ${project.nama}
            </h1>

            <p style="font-size: 1.05rem; line-height: 1.6; color: #3f3f46; margin-bottom: 1.5rem;">
              ${project.deskripsi}
            </p>

            <div class="flex flex-wrap gap-3">
              ${githubBtn}
              ${liveBtn}
            </div>
          </div>
        </div>
      </div>

      <!-- Technical Specifications Grid -->
      <div class="grid grid-cols-4 gap-4">
        <!-- Type -->
        <div class="pixel-card">
          <div style="border-bottom: 2px solid #000; padding-bottom: 0.5rem; margin-bottom: 0.75rem; font-family: var(--font-press); font-size: 10px; color: #52525b;">
            🏷 TYPE
          </div>
          <p class="font-press" style="font-size: 11px; margin: 0;">${project.type || 'Software System'}</p>
        </div>

        <!-- Source -->
        <div class="pixel-card">
          <div style="border-bottom: 2px solid #000; padding-bottom: 0.5rem; margin-bottom: 0.75rem; font-family: var(--font-press); font-size: 10px; color: #52525b;">
            👾 SOURCE
          </div>
          <p class="font-press" style="font-size: 11px; margin: 0;">
            ${project.github ? `<a href="${project.github}" target="_blank" style="text-decoration: underline;">GITHUB REPO</a>` : '<span style="color: #a1a1aa;">PRIVATE</span>'}
          </p>
        </div>

        <!-- Tech Stack -->
        <div class="pixel-card">
          <div style="border-bottom: 2px solid #000; padding-bottom: 0.5rem; margin-bottom: 0.75rem; font-family: var(--font-press); font-size: 10px; color: #52525b;">
            ⚡ TECH STACK
          </div>
          <p class="font-press" style="font-size: 11px; margin: 0;">${project.stack || 'Fullstack'}</p>
        </div>

        <!-- Live Link -->
        <div class="pixel-card">
          <div style="border-bottom: 2px solid #000; padding-bottom: 0.5rem; margin-bottom: 0.75rem; font-family: var(--font-press); font-size: 10px; color: #52525b;">
            🌐 LIVE LINK
          </div>
          <p class="font-press" style="font-size: 11px; margin: 0;">
            ${liveLinkText}
          </p>
        </div>
      </div>
    </div>
  `;
}
