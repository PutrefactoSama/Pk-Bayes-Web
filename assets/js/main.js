/**
 * PK-Bayes — Interacciones generales del sitio
 * Menú móvil, resaltado de enlace activo, animaciones al hacer scroll,
 * acordeón de preguntas frecuentes y toast de aviso.
 */
(function () {
  "use strict";

  /* ---------- Menú móvil ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      document.body.classList.toggle("menu-open");
      const isOpen = document.body.classList.contains("menu-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
  document.querySelectorAll(".mobile-menu a").forEach((a) => {
    a.addEventListener("click", () => document.body.classList.remove("menu-open"));
  });

  /* ---------- Resaltar enlace activo por URL ---------- */
  const currentPage = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  /* ---------- Revelado al hacer scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Acordeón FAQ ---------- */
  document.querySelectorAll(".accordion-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".accordion-item");
      const panel = item.querySelector(".accordion-panel");
      const isOpen = item.classList.contains("open");

      item.parentElement.querySelectorAll(".accordion-item.open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".accordion-panel").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        panel.style.maxHeight = null;
      } else {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---------- Contadores animados (stat numérico) ---------- */
  document.querySelectorAll("[data-count-to]").forEach((el) => {
    const target = parseFloat(el.getAttribute("data-count-to"));
    const suffix = el.getAttribute("data-suffix") || "";
    const decimals = el.getAttribute("data-decimals") ? parseInt(el.getAttribute("data-decimals"), 10) : 0;
    const duration = 1100;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => e.isIntersecting && run());
      }, { threshold: 0.4 });
      io.observe(el);
    } else {
      run();
    }
  });

  /* ---------- Toast genérico (usado por checkout.js) ---------- */
  window.pkbayesToast = function (title, body) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/></svg>' +
        '<div><div class="t-title"></div><div class="t-body"></div></div>' +
        '<button class="t-close" aria-label="Cerrar aviso">×</button>';
      document.body.appendChild(toast);
      toast.querySelector(".t-close").addEventListener("click", () => toast.classList.remove("show"));
    }
    toast.querySelector(".t-title").textContent = title;
    toast.querySelector(".t-body").textContent = body;
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("show"), 8000);
  };

  /* ---------- Año dinámico en el footer ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Enlaces "Acceder a la app" / "Registrarse" / "Stripe Checkout" / mailto centralizados por config.js ---------- */
  if (window.PKBAYES_CONFIG) {
    document.querySelectorAll("[data-app-link]").forEach((el) => {
      el.setAttribute("href", PKBAYES_CONFIG.APP_URL);
    });
    document.querySelectorAll("[data-register-link]").forEach((el) => {
      el.setAttribute("href", PKBAYES_CONFIG.REGISTER_URL || PKBAYES_CONFIG.APP_URL);
    });
    document.querySelectorAll("[data-checkout-link]").forEach((el) => {
      if (PKBAYES_CONFIG.STRIPE_PAYMENT_LINK) {
        el.setAttribute("href", PKBAYES_CONFIG.STRIPE_PAYMENT_LINK);
      }
    });
    document.querySelectorAll("[data-contact-email]").forEach((el) => {
      const subject = el.getAttribute("data-subject") || "Consulta sobre PK-Bayes";
      el.setAttribute("href", `mailto:${PKBAYES_CONFIG.CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`);
    });
    document.querySelectorAll("[data-contact-email-text]").forEach((el) => {
      el.textContent = PKBAYES_CONFIG.CONTACT_EMAIL;
    });
  }

  /* ---------- Showcase Interactivo de Capturas Reales (Tour Auto-Play) ---------- */
  const tourTabs = document.querySelectorAll(".app-tour-tab");
  const tourSlides = document.querySelectorAll(".app-tour-slide");
  if (tourTabs.length && tourSlides.length) {
    let currentIdx = 0;
    let tourTimer = null;
    const tourDuration = 6000;

    function goToSlide(idx) {
      tourTabs.forEach((tab, i) => {
        tab.classList.toggle("active", i === idx);
        // Reset progress bar animation
        const prog = tab.querySelector(".app-tour-progress");
        if (prog) {
          prog.style.animation = "none";
          void prog.offsetWidth; // trigger reflow
          if (i === idx) {
            prog.style.animation = `tourProgress ${tourDuration}ms linear forwards`;
          }
        }
      });
      tourSlides.forEach((slide, i) => {
        slide.classList.toggle("active", i === idx);
      });
      currentIdx = idx;
    }

    function startAutoTour() {
      stopAutoTour();
      tourTimer = setInterval(() => {
        const next = (currentIdx + 1) % tourTabs.length;
        goToSlide(next);
      }, tourDuration);
    }

    function stopAutoTour() {
      if (tourTimer) {
        clearInterval(tourTimer);
        tourTimer = null;
      }
    }

    tourTabs.forEach((tab, i) => {
      tab.addEventListener("click", () => {
        goToSlide(i);
        startAutoTour(); // Restart timer on click
      });
    });

    const wrapper = document.querySelector(".app-tour-wrapper");
    if (wrapper) {
      wrapper.addEventListener("mouseenter", stopAutoTour);
      wrapper.addEventListener("mouseleave", startAutoTour);
    }

    goToSlide(0);
    startAutoTour();
  }
})();

