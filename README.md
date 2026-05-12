# IT Club – SMK Muhammadiyah 2 Cileungsi

Website resmi IT Club SMK Muhammadiyah 2 Cileungsi.  
Dibimbing oleh: **Muhamad Fahmi** (Asisten Kepala Lab Komputer & Guru TKJ)

---

## 🚀 Fitur

- Loading screen animasi dengan progress bar
- Navbar sticky + mobile hamburger menu
- Hero section dengan typing effect & counter animasi
- Section: Kegiatan, Gallery, Video, Prestasi, About (Struktur Pengurus), Komentar
- Network canvas background (particle animation)
- Background music toggle
- Toast notification
- Form komentar dengan validasi & animasi
- AOS scroll animations
- Responsive design — **Mobile First**
- Semantic HTML5 + ARIA accessibility
- Active nav link highlight via IntersectionObserver

---

## 🐛 Bug yang Diperbaiki (v2)

| # | Bug | Fix |
|---|-----|-----|
| 1 | `tailwind is not defined` di Acode Live Server | Config dibungkus guard `typeof tailwind !== 'undefined'` + DOMContentLoaded fallback |
| 2 | `fa-hands-helping` tidak ada di FA 6.x | Diganti `fa-hand-holding-heart` |
| 3 | `onclick="submitComment()"` inline di HTML | Diubah ke event listener `#submit-btn` |
| 4 | Active nav pakai `link.style.color` hardcode | Diganti toggle CSS class `.active` |
| 5 | `@media (max-width: 640px)` = desktop-first | Diubah ke mobile-first `@media (min-width: ...)` |
| 6 | `team-card-main::before` gradient border (`-webkit-mask`) | Diganti dengan `::after` + `z-index: -1` yang lebih kompatibel |
| 7 | Favicon kosong (0 bytes) | Dibuat ulang PNG 32×32 yang valid |
| 8 | Tidak ada `<main>`, `<header>` wrapper | Ditambahkan semantic HTML lengkap |
| 9 | Canvas resize tidak di-debounce | Ditambahkan `setTimeout` 200ms debounce |
| 10 | `screen.remove()` tanpa null check | Ditambahkan `if (screen.parentNode)` guard |

---

## 📁 Struktur Folder

```
itclub/
├── index.html          ← Halaman utama
├── LICENSE             ← MIT License
├── README.md           ← Dokumentasi ini
├── vercel.json         ← Konfigurasi Vercel deploy
├── css/
│   └── style.css       ← Custom CSS (mobile-first)
├── js/
│   └── main.js         ← JavaScript
└── assets/
    ├── images/         ← Ganti dengan foto nyata
    ├── audio/          ← bg-music.mp3
    └── icons/
        └── favicon.png
```

---

## 🖼️ Mengganti Gambar Gallery

Letakkan foto di `assets/images/` lalu edit `index.html`:

```html
<!-- Sebelum (placeholder) -->
<div class="gallery-placeholder h-72">
  <i class="fa-solid fa-image ..."></i>
</div>

<!-- Sesudah (gambar nyata) -->
<div class="gallery-placeholder h-72">
  <img src="assets/images/namafile.jpg" alt="Deskripsi foto" />
</div>
```

---

## 📺 Mengganti Video YouTube

Cari baris berikut di `index.html` section video:

```html
src="https://www.youtube.com/embed/dQw4w9WgXcQ"
```

Ganti `dQw4w9WgXcQ` dengan ID video YouTube kamu.

---

## 📦 Teknologi

- HTML5 Semantik
- Tailwind CSS (CDN)
- Custom CSS (Mobile First)
- Vanilla JavaScript (ES6+)
- Font Awesome 6.5
- Google Fonts (Poppins, Inter, JetBrains Mono)
- AOS Animation Library

---

## 📄 Lisensi

Dirilis di bawah [MIT License](LICENSE).  
© 2024 IT Club SMK Muhammadiyah 2 Cileungsi
