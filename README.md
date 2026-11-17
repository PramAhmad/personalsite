# Pramudita Personal Site (HTML, CSS, JavaScript)

Situs web personal Pramudita Ahmad yang dibangun dengan arsitektur **HTML, CSS, dan JavaScript murni**:
- **Zero Build Step & Zero Bundlers**: Tanpa Webpack, Vite, Nuxt, atau Node.js runtime.
- **Zero Frameworks & Zero CSS Compilers**: 100% Pure CSS modern minimalis dengan tipografi font Inter (tanpa Tailwind).
- **Zero External Backend / Database**: Tanpa Supabase, PostgreSQL, atau CMS. Seluruh artikel dan konten tersimpan statis.
- **Ultra Lightweight & Fast**: Waktu muat mendekati instan, ramah resource, dan dapat dihosting secara gratis di GitHub Pages atau Cloudflare Pages.

---

## Struktur File

```text
root/
├── assets/
│   ├── css/
│   │   └── style.css       # Pure Vanilla CSS (Clean minimalist modern, responsive, typography)
│   ├── js/
│   │   ├── data.js         # Static Data Store (Profile metadata & article index)
│   │   └── main.js         # Vanilla JS (Navbar scroll blur & mobile toggle)
│   └── images/
│       ├── pramudita.png   # Hero character
│       ├── avatar.png      # Music avatar
│       ├── noise.webp      # Subtle noise texture
│       ├── favicon.ico     # Favicon
│       └── resume.pdf      # Resume document
├── index.html              # Halaman Utama (Hero, About Me, Passions, Featured Article, Favorite Music)
├── me.html                 # Halaman About Me & Social Channels
├── blog.html               # Halaman Artikel Lengkap: "Why I Rewrote My Personal Site..."
└── README.md
```

---

## 🖥Cara Menjalankan

Cukup buka file `index.html` langsung di browser, atau jalankan server lokal sederhana:
```bash
python3 -m http.server 3000
```
Lalu buka `http://localhost:3000`.
