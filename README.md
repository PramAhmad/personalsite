# Pramudita Portfolio (Vanilla HTML, CSS & JavaScript)

Website portofolio statis bertema **Retro Pixel 2D** yang telah di-rewrite dari Nuxt 3 / Tailwind CSS ke **Pure Vanilla HTML5, CSS3, dan Vanilla JS** tanpa dependensi build-tool atau database eksternal (Supabase telah digantikan dengan static data store).

---

## 📁 Struktur Folder

```text
pramudita-html/
├── assets/
│   ├── css/
│   │   └── style.css       # Pure Vanilla CSS (Pixel 2D styling, grid, buttons, animations)
│   ├── js/
│   │   ├── data.js         # Static Data Store (Pengganti Supabase: Projects, Profile, Blog)
│   │   └── main.js         # Vanilla JS (Mobile menu, navbar scroll, form handling, router query)
│   └── images/             # Sprite, icon, project screenshots, avatar, dan resume PDF
├── index.html              # Halaman Utama (Hero, Passions, Featured Projects, Dev Logs, Spotify)
├── me.html                 # Halaman About Me (Quest Log, Stats Matrix, Social Channels)
├── project.html            # Direktori Project & Software Systems
├── project-detail.html     # Spesifikasi Teknis Project Detail (?id=1, ?id=2, dst)
├── blog.html               # Arsip Blog & Dev Logs (Medium RSS + Static Fallback)
├── contact.html            # Communication Relay / Formulir Kontak
└── README.md
```

---

## 🚀 Keunggulan Versi Static HTML/CSS:

1. **Zero Dependencies & Zero Build Step**:
   - Tidak perlu `npm install`, `node_modules`, `vite`, atau server runtime.
   - Bisa langsung dibuka hanya dengan double-click file `index.html` di browser atau via Live Server.

2. **100% Pure CSS (No Tailwind)**:
   - Styling retro 2D pixel dibuat dengan custom CSS variables, pixelated borders, dan box-shadows.

3. **Data Statis Mandiri (No Supabase dependency)**:
   - Semua project data, skills, dan profil tersimpan di `assets/js/data.js`.
   - Menambahkan project baru cukup tambahkan object ke array `PORTFOLIO_DATA.projects`.

4. **Multi-Page Route**:
   - Tiap rute adalah file `.html` terpisah (`index.html`, `me.html`, `project.html`, `blog.html`, `contact.html`).

---

## 🖥 Cara Menjalankan

Kamu bisa langsung membukanya di browser:
- Menggunakan ekstensi **Live Server** di VS Code, atau
- Menjalankan server lokal sederhana:
  ```bash
  python3 -m http.server 3000
  ```
  Lalu buka `http://localhost:3000`.
