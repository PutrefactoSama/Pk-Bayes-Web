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

  /* =========================================================================
     Dossier Técnico-Comercial: Interactive UI Controllers
     ========================================================================= */

  /* ---------- 1. Calculadora Empírica AUC-Guiada (ASHP/IDSA 2020) ---------- */
  function initEmpiricalCalc() {
    const weightEl = document.getElementById("empWeight");
    const scrEl = document.getElementById("empScr");
    const ageEl = document.getElementById("empAge");
    const sexEl = document.getElementById("empSex");
    const micEl = document.getElementById("empMic");

    if (!weightEl || !scrEl) return;

    function recalculate() {
      const weight = parseFloat(weightEl.value) || 70;
      const scr = parseFloat(scrEl.value) || 1.0;
      const age = parseFloat(ageEl.value) || 55;
      const isFemale = sexEl ? sexEl.value === "f" : false;
      const mic = parseFloat(micEl ? micEl.value : 1.0) || 1.0;

      // Cockcroft-Gault CrCl
      let crcl = ((140 - age) * weight) / (72 * scr);
      if (isFemale) crcl *= 0.85;

      // Loading dose (25 mg/kg, step 250mg, max 2000mg)
      let loadingDose = Math.min(2000, Math.round((weight * 25) / 250) * 250);

      // Maintenance dose & interval based on CrCl
      let maintDose = 1000;
      let interval = 12;
      if (crcl > 80) {
        maintDose = Math.round((weight * 15) / 250) * 250;
        interval = 12;
      } else if (crcl >= 50) {
        maintDose = Math.round((weight * 15) / 250) * 250;
        interval = 12;
      } else if (crcl >= 30) {
        maintDose = Math.round((weight * 12.5) / 250) * 250;
        interval = 24;
      } else {
        maintDose = Math.round((weight * 10) / 250) * 250;
        interval = 48;
      }

      // Projected AUC24 / MIC
      const dailyDose = (maintDose * 24) / interval;
      const ke = 0.00083 * crcl + 0.0044; // approx ke
      const vd = 0.7 * weight;
      const auc24 = dailyDose / (ke * vd);
      const aucMicRatio = Math.round(auc24 / mic);

      // DOM Updates
      const resCrcl = document.getElementById("resEmpCrcl");
      const resLoad = document.getElementById("resEmpLoad");
      const resMaint = document.getElementById("resEmpMaint");
      const resAuc = document.getElementById("resEmpAuc");

      if (resCrcl) resCrcl.textContent = Math.round(crcl) + " mL/min";
      if (resLoad) resLoad.textContent = loadingDose + " mg";
      if (resMaint) resMaint.textContent = `${maintDose} mg q${interval}h`;
      if (resAuc) resAuc.textContent = `${aucMicRatio} h`;
    }

    [weightEl, scrEl, ageEl, sexEl, micEl].forEach((el) => {
      if (el) el.addEventListener("input", recalculate);
    });
    recalculate();
  }

  /* ---------- 2. Simulador Interactivo de Curva PK (Canvas) & Dose Predictor ---------- */
  function initPKSimulator() {
    const canvas = document.getElementById("pkCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const doseSlider = document.getElementById("simDoseSlider");
    const intervalSlider = document.getElementById("simIntervalSlider");
    const crclSlider = document.getElementById("simCrclSlider");

    const doseValEl = document.getElementById("simDoseVal");
    const intervalValEl = document.getElementById("simIntervalVal");
    const crclValEl = document.getElementById("simCrclVal");

    const cmaxEl = document.getElementById("simCmaxRes");
    const cminEl = document.getElementById("simCminRes");
    const auc24El = document.getElementById("simAuc24Res");

    function draw() {
      const width = canvas.width = canvas.parentElement.clientWidth || 600;
      const height = canvas.height = canvas.parentElement.clientHeight || 280;

      const dose = parseFloat(doseSlider ? doseSlider.value : 1000);
      const interval = parseFloat(intervalSlider ? intervalSlider.value : 12);
      const crcl = parseFloat(crclSlider ? crclSlider.value : 70);

      if (doseValEl) doseValEl.textContent = dose + " mg";
      if (intervalValEl) intervalValEl.textContent = `q${interval}h`;
      if (crclValEl) crclValEl.textContent = crcl + " mL/min";

      // PK calculations
      const ke = 0.00083 * crcl + 0.0044;
      const vd = 0.7 * 70; // 70 kg std
      const cmax = (dose / vd) / (1 - Math.exp(-ke * interval));
      const cmin = cmax * Math.exp(-ke * interval);
      const dailyDose = (dose * 24) / interval;
      const auc24 = dailyDose / (ke * vd);

      if (cmaxEl) cmaxEl.textContent = cmax.toFixed(1) + " mg/L";
      if (cminEl) cminEl.textContent = cmin.toFixed(1) + " mg/L";
      if (auc24El) auc24El.textContent = Math.round(auc24) + " mg·h/L";

      // Drawing setup
      ctx.clearRect(0, 0, width, height);

      // Target band background (15 to 20 mg/L trough equivalent / 400-600 AUC)
      const padding = 35;
      const graphW = width - padding * 2;
      const graphH = height - padding * 2;
      const maxY = 45;

      const y15 = height - padding - (15 / maxY) * graphH;
      const y20 = height - padding - (20 / maxY) * graphH;

      // Target band fill
      ctx.fillStyle = "rgba(16, 185, 129, 0.12)";
      ctx.fillRect(padding, y20, graphW, y15 - y20);

      // Target band text
      ctx.fillStyle = "#10b981";
      ctx.font = "11px sans-serif";
      ctx.fillText("Rango Objetivo Trough (15–20 mg/L)", padding + 8, y20 + 14);

      // Grid lines
      ctx.strokeStyle = "rgba(15, 23, 42, 0.08)";
      ctx.lineWidth = 1;
      for (let yVal = 0; yVal <= maxY; yVal += 15) {
        const y = height - padding - (yVal / maxY) * graphH;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        ctx.fillStyle = "#64748b";
        ctx.fillText(yVal, 10, y + 4);
      }

      // Draw Population Prior curve (Dashed Blue)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(14, 165, 233, 0.5)";
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 2;
      for (let x = 0; x <= graphW; x += 2) {
        const t = (x / graphW) * 48; // 48h timeline
        const tInInterval = t % interval;
        const cPrior = ((1000 / vd) / (1 - Math.exp(-0.04 * interval))) * Math.exp(-0.04 * tInInterval);
        const y = height - padding - (Math.min(cPrior, maxY) / maxY) * graphH;
        if (x === 0) ctx.moveTo(padding + x, y);
        else ctx.lineTo(padding + x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Individual MAP Adjusted Curve (Solid Cyan)
      ctx.beginPath();
      ctx.strokeStyle = "#0284c7";
      ctx.lineWidth = 3;
      for (let x = 0; x <= graphW; x += 2) {
        const t = (x / graphW) * 48;
        const tInInterval = t % interval;
        const cInd = cmax * Math.exp(-ke * tInInterval);
        const y = height - padding - (Math.min(cInd, maxY) / maxY) * graphH;
        if (x === 0) ctx.moveTo(padding + x, y);
        else ctx.lineTo(padding + x, y);
      }
      ctx.stroke();

      // Lab marker dot (🧪 Cr: 1.8 mg/dL)
      const labX = padding + graphW * 0.45;
      const labY = height - padding - (cmin * 1.1 / maxY) * graphH;
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(labX, labY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 11px sans-serif";
      ctx.fillText("🧪 Lab Cr: 1.8 mg/dL", labX + 10, labY - 4);
    }

    [doseSlider, intervalSlider, crclSlider].forEach((s) => {
      if (s) s.addEventListener("input", draw);
    });

    window.addEventListener("resize", draw);
    draw();
  }

  /* ---------- 3. Selector de Estratos VFG y Prior Mixto ---------- */
  function initVFGStrata() {
    const chips = document.querySelectorAll(".vfg-stratum-chip");
    const labelEl = document.getElementById("vfgSelectedLabel");
    const weightEl = document.getElementById("vfgLocalWeight");
    const formulaEl = document.getElementById("vfgFormulaDisplay");

    if (!chips.length) return;

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");

        const range = chip.getAttribute("data-range");
        const count = parseInt(chip.getAttribute("data-count") || "0", 10);
        const isLocalActive = count >= 10;
        const weight = isLocalActive ? Math.min(0.85, (count / 40).toFixed(2)) : 0.0;

        if (labelEl) labelEl.textContent = `Estrato: VFG ${range} mL/min (${count} pacientes)`;
        if (weightEl) weightEl.textContent = isLocalActive ? `w_local = ${(weight * 100).toFixed(0)}% (Aprendizaje Activo)` : `w_local = 0% (Requiere N ≥ 10)`;
        if (formulaEl) {
          formulaEl.textContent = isLocalActive
            ? `θ_prior = ${(1 - weight).toFixed(2)} · θ_literatura + ${weight} · θ_local_hospital`
            : `θ_prior = 1.00 · θ_literatura (Sin prior local todavía)`;
        }
      });
    });
  }

  /* ---------- 4. Feature Slider Controller (Recurso de Slide) ---------- */
  function initFeatureSlider() {
    const tabs = document.querySelectorAll(".slider-tab-btn");
    const panels = document.querySelectorAll(".feature-slide-panel");
    const dots = document.querySelectorAll(".slider-dot");
    const prevBtn = document.getElementById("sliderPrevBtn");
    const nextBtn = document.getElementById("sliderNextBtn");

    if (!panels.length) return;

    let currentIndex = 0;

    function goToSlide(index) {
      if (index < 0) index = panels.length - 1;
      if (index >= panels.length) index = 0;
      currentIndex = index;

      tabs.forEach((t, i) => t.classList.toggle("active", i === currentIndex));
      panels.forEach((p, i) => p.classList.toggle("active", i === currentIndex));
      dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => goToSlide(index));
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => goToSlide(index));
    });

    if (prevBtn) prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
  }

  // Initialize Dossier Controllers
  initEmpiricalCalc();
  initPKSimulator();
  initVFGStrata();
  initFeatureSlider();
})();


