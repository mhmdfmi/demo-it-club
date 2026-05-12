/* ═══════════════════════════════════════════════
   IT CLUB – main.js  (v2 – Bug Fixed)
   SMK Muhammadiyah 2 Cileungsi
   Dibimbing oleh: Muhamad Fahmi
   License: MIT
   ═══════════════════════════════════════════════ */

"use strict";

/* ── 1. LOADING SCREEN ── */
(function initLoader() {
  const screen = document.getElementById("loading-screen");
  const bar = document.getElementById("loading-bar");
  const pct = document.getElementById("loading-percent");
  if (!screen || !bar || !pct) return;

  // Kunci scroll selama loading aktif
  document.body.classList.add("loading-active");

  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      bar.style.width = "100%";
      pct.textContent = "100%";
      setTimeout(() => {
        screen.classList.add("hidden-screen");
        // Lepas kunci scroll setelah loading benar-benar selesai
        document.body.classList.remove("loading-active");
        setTimeout(() => {
          if (screen.parentNode) screen.parentNode.removeChild(screen);
        }, 600);
      }, 300);

      return;
    }
    bar.style.width = progress + "%";
    pct.textContent = Math.floor(progress) + "%";
    screen.setAttribute("aria-valuenow", Math.floor(progress));
  }, 120);
})();

/* ── 2. DOM READY ── */
document.addEventListener("DOMContentLoaded", function () {
  /* ── AOS Init ── */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }

  /* ── 3. NAVBAR SCROLL ── */
  const navbar = document.getElementById("navbar");
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ── 4. HAMBURGER MENU ── */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.getAttribute("aria-expanded") === "true";
      toggleMenu(!isOpen);
    });

    // Close on nav link click
    mobileMenu.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => toggleMenu(false));
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target)) toggleMenu(false);
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") toggleMenu(false);
    });
  }

  function toggleMenu(open) {
    if (!hamburger || !mobileMenu) return;
    hamburger.setAttribute("aria-expanded", String(open));
    const icon = hamburger.querySelector("i");
    if (open) {
      mobileMenu.classList.remove("hidden");
      if (icon) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      }
    } else {
      mobileMenu.classList.add("hidden");
      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    }
  }

  /* ── 5. TYPING EFFECT ── */
  const typingTexts = [
    "Networking & Infrastructure",
    "Scratch",
    "UI/UX Design",
    "Cisco & Mikrotik",
    "Digital Creativity",
  ];

  let typeIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const typingEl = document.getElementById("typing-text");

  function typeLoop() {
    if (!typingEl) return;
    const current = typingTexts[typeIdx];

    if (!deleting) {
      typingEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      typingEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        typeIdx = (typeIdx + 1) % typingTexts.length;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 90);
  }

  setTimeout(typeLoop, 1200);

  /* ── 6. COUNTER ANIMATION ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));

    const tick = () => {
      current = Math.min(current + step, target);
      el.textContent = current + "+";
      if (current < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  document
    .querySelectorAll(".counter")
    .forEach((el) => counterObserver.observe(el));

  /* ── 7. NETWORK CANVAS ── */
  (function initCanvas() {
    const canvas = document.getElementById("network-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W,
      H,
      nodes = [],
      animFrame;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function createNode() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      };
    }

    function buildNodes() {
      const count = Math.min(Math.floor(W / 14), 80);
      nodes = Array.from({ length: count }, createNode);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(37,99,235,${(1 - dist / 150) * 0.35})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37,99,235,0.6)";
        ctx.fill();
      });

      animFrame = requestAnimationFrame(draw);
    }

    let resizeTimer;
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          cancelAnimationFrame(animFrame);
          resize();
          buildNodes();
          draw();
        }, 200);
      },
      { passive: true },
    );

    resize();
    buildNodes();
    draw();
  })();

  /* ── 8. BACKGROUND MUSIC ── */
  const musicBtn = document.getElementById("music-btn");
  const musicIcon = document.getElementById("music-icon");
  const bgMusic = document.getElementById("bg-music");
  let musicOn = false;

  if (musicBtn && bgMusic) {
    musicBtn.addEventListener("click", () => {
      musicOn = !musicOn;
      if (musicOn) {
        bgMusic.play().catch(() => {
          // Autoplay blocked — inform user
          musicOn = false;
          showToast("⚠️ Aktifkan izin audio di browser kamu");
        });
        if (musicIcon) {
          musicIcon.classList.remove("fa-music");
          musicIcon.classList.add("fa-pause");
        }
        showToast("🎵 Musik latar aktif");
      } else {
        bgMusic.pause();
        if (musicIcon) {
          musicIcon.classList.remove("fa-pause");
          musicIcon.classList.add("fa-music");
        }
        showToast("🔇 Musik dijeda");
      }
    });
  }

  /* ── 9. TOAST NOTIFICATION ── */
  let toastTimeout;

  window.showToast = function showToast(msg) {
    const toast = document.getElementById("toast");
    const label = document.getElementById("toast-msg");
    if (!toast || !label) return;

    label.textContent = msg;
    toast.classList.remove("hidden");
    // Force reflow for animation restart
    void toast.offsetWidth;
    toast.classList.add("show");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.classList.add("hidden"), 300);
    }, 2800);
  };

  /* ── 10. COMMENT FORM ── FIX: event listener, not inline onclick */
  const submitBtn = document.getElementById("submit-btn");
  if (submitBtn) {
    submitBtn.addEventListener("click", submitComment);
  }

  // Also allow Enter in fields to submit
  ["nama", "email"].forEach((id) => {
    const el = document.getElementById(id);
    if (el)
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") submitComment();
      });
  });

  function submitComment() {
    const nama = document.getElementById("nama");
    const pesan = document.getElementById("pesan");
    if (!nama || !pesan) return;

    const namaVal = nama.value.trim();
    const pesanVal = pesan.value.trim();

    if (!namaVal) {
      showToast("⚠️ Nama tidak boleh kosong!");
      nama.focus();
      return;
    }
    if (!pesanVal) {
      showToast("⚠️ Pesan tidak boleh kosong!");
      pesan.focus();
      return;
    }

    const list = document.getElementById("comments-list");
    if (!list) return;

    const newCmt = document.createElement("div");
    newCmt.className = "comment-bubble";

    const now = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateStr = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    newCmt.innerHTML = `
      <div class="flex items-center gap-3 mb-2">
        <div class="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0" aria-hidden="true">
          <i class="fa-solid fa-user text-accent text-xs"></i>
        </div>
        <div>
          <p class="font-heading font-semibold text-light text-sm">${escHtml(namaVal)}</p>
          <p class="font-mono text-muted text-xs"><time datetime="${new Date().toISOString()}">${dateStr} · ${now}</time></p>
        </div>
      </div>
      <p class="font-body text-muted text-sm">${escHtml(pesanVal)}</p>
    `;

    // Animate in
    newCmt.style.opacity = "0";
    newCmt.style.transform = "translateY(10px)";
    newCmt.style.transition = "opacity 0.4s ease, transform 0.4s ease";

    list.prepend(newCmt);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        newCmt.style.opacity = "1";
        newCmt.style.transform = "translateY(0)";
      });
    });

    nama.value = "";
    pesan.value = "";
    showToast("✅ Pesan berhasil dikirim! Terima kasih.");
  }

  function escHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* ── 11. SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        // Account for fixed navbar height
        const navH = navbar ? navbar.offsetHeight : 64;
        const top =
          target.getBoundingClientRect().top + window.pageYOffset - navH;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  /* ── 12. ACTIVE NAV HIGHLIGHT ── FIX: use CSS class, not inline style */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const sectionObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    { threshold: 0.35, rootMargin: "-80px 0px -40% 0px" },
  );

  sections.forEach((s) => sectionObs.observe(s));

  /* ── 13. GALLERY KEYBOARD SUPPORT ── */
  document
    .querySelectorAll('.gallery-placeholder[role="button"]')
    .forEach((el) => {
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          el.click();
        }
      });
    });
}); // end DOMContentLoaded
