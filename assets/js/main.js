// Antigravity Minimalist Modern JavaScript
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

/* ============================================================
   CONTACT & TRANSMISSION FORMS (STATIC LOCAL REPLACEMENT)
   ============================================================ */
function initContactForms() {
  const contactForm = document.getElementById('contactForm');
  const contactSuccessAlert = document.getElementById('contactSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]')?.value || 'Guest';
      
      if (contactSuccessAlert) {
        contactSuccessAlert.style.display = 'block';
        contactSuccessAlert.innerHTML = `
          <p class="font-bold text-slate-800" style="margin-bottom: 0.25rem;">Pesan Terkirim</p>
          <p class="text-sm text-slate-600" style="margin: 0;">
            Pesan dari <strong>${name}</strong> terkirim ke Pramudita. Terima kasih sudah menghubungi saya^^
          </p>
        `;
      }
      contactForm.reset();
    });
  }

  const footerForm = document.getElementById('footerInquiryForm');
  const footerSuccessMsg = document.getElementById('footerSuccessMsg');

  if (footerForm) {
    footerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Berhasil mengirim email!');
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

  blogContainer.innerHTML = `
    <div style="text-align: center; padding: 2.5rem 0;">
      <p class="custom-loader"></p>
    </div>
  `;

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
    container.innerHTML = `<p class="text-center text-slate-500">No Medium posts found.</p>`;
    return;
  }

  let html = '<div>';
  posts.forEach(post => {
    const rawExcerpt = (post.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const excerpt = rawExcerpt.length > 180 ? rawExcerpt.slice(0, 180) + '...' : rawExcerpt;
    const dateFormatted = post.pubDate ? new Date(post.pubDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : '2024';
    const thumbnail = post.thumbnail || 'assets/images/JJ.png';

    html += `
      <article class="project-horizontal">
        <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="project-horizontal-img">
          <img src="${thumbnail}" alt="${post.title}" onerror="this.src='assets/images/JJ.png'">
        </a>

        <div class="project-horizontal-content">
          <p class="text-sm font-medium text-primary" style="margin-bottom: 0.5rem;">${dateFormatted}</p>
          <a href="${post.link}" target="_blank" rel="noopener noreferrer">
            <h3 style="margin-bottom: 0.75rem;">${post.title}</h3>
          </a>
          <p>${excerpt}</p>
          <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="view-project-link">
            <span>Read Article</span>
            <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
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

  if (isHome) {
    // 3-Column Grid for Home Page (like project.vue from git HEAD)
    let html = '<div class="grid grid-cols-3 gap-8 mt-8">';
    projects.slice(0, 3).forEach(proj => {
      html += `
        <article class="project-card">
          <a href="project-detail.html?id=${proj.id}">
            <div class="project-thumb">
              <img src="${proj.img}" alt="${proj.nama}" loading="lazy" onerror="this.src='assets/images/JJ.png'">
            </div>
          </a>

          <div class="project-meta">
            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <span>${proj.created_at || '2024'}</span>
          </div>

          <a href="project-detail.html?id=${proj.id}" class="project-title" style="margin-bottom: 0.5rem; display: block;">
            ${proj.nama}
          </a>

          <p style="font-size: 0.95rem; color: #64748b; line-height: 1.5; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
            ${proj.deskripsi}
          </p>

          <a href="project-detail.html?id=${proj.id}" class="view-project-link" style="font-size: 0.9rem; margin-top: auto;">
            <span>View Project</span>
            <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </article>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  } else {
    // Horizontal Showcase for Project Directory Page (like projectcard.vue from git HEAD)
    let html = '<div class="mt-8">';
    projects.forEach(proj => {
      html += `
        <article class="project-horizontal">
          <div class="project-horizontal-img">
            <img src="${proj.img}" alt="${proj.nama}" onerror="this.src='assets/images/JJ.png'">
          </div>

          <div class="project-horizontal-content">
            <h3 style="margin-bottom: 0.75rem;">${proj.nama}</h3>
            <p>${proj.deskripsi}</p>
            <a href="project-detail.html?id=${proj.id}" class="view-project-link">
              <span>View Project</span>
              <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </article>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  }
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
      <div style="text-align: center; padding: 4rem 0;">
        <h2>Project Not Found</h2>
        <p>The requested project could not be found.</p>
        <a href="project.html" class="btn btn-primary" style="margin-top: 1rem;">Back to Projects</a>
      </div>
    `;
    return;
  }

  document.title = `${project.nama} | Project`;

  const githubLink = project.github ? `
    <a href="${project.github}" target="_blank" class="view-project-link" style="font-size: 1.05rem;">
      <span>View Source on GitHub</span>
      <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path>
      </svg>
    </a>
  ` : '';

  detailContainer.innerHTML = `
    <!-- Top Horizontal Hero -->
    <div class="project-horizontal" style="margin-bottom: 2.5rem;">
      <div class="project-horizontal-img">
        <img src="${project.img}" alt="${project.nama}" onerror="this.src='assets/images/JJ.png'">
      </div>

      <div class="project-horizontal-content">
        <h3 style="font-size: 2rem; margin-bottom: 1rem;">${project.nama}</h3>
        <p style="font-size: 1.1rem; line-height: 1.7; margin-bottom: 1.5rem;">${project.deskripsi}</p>
        ${githubLink}
      </div>
    </div>

    <!-- Info Specs Box Grid (matching pages/project/[id].vue from git HEAD) -->
    <div class="grid grid-cols-2 gap-6 mt-8">
      <!-- Type Project -->
      <div class="info-box">
        <div class="info-box-header">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
          </svg>
          <h4>Type Project</h4>
        </div>
        <p>${project.type || 'Web Application'}</p>
      </div>

      <!-- Source -->
      <div class="info-box">
        <div class="info-box-header">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
          </svg>
          <h4>Source</h4>
        </div>
        ${project.github ? `<a href="${project.github}" target="_blank" style="text-decoration: underline; color: #1e293b;">github</a>` : '<p style="color: #94a3b8;">Private</p>'}
      </div>

      <!-- Stack -->
      <div class="info-box">
        <div class="info-box-header">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <h4>Stack</h4>
        </div>
        <p>${project.stack || 'Fullstack'}</p>
      </div>

      <!-- Link -->
      <div class="info-box">
        <div class="info-box-header">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
          <h4>Link</h4>
        </div>
        <p>${(project.link && project.link !== '-') ? `<a href="${project.link}" target="_blank" style="text-decoration: underline; color: #3b82f6;">${project.link}</a>` : '-'}</p>
      </div>
    </div>
  `;
}
