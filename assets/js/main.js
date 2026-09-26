/**
 * PK-Bayes — Interacciones generales del sitio
 * Menú móvil, resaltado de enlace activo, animaciones al hacer scroll,
 * acordeón de preguntas frecuentes y toast de aviso.
 */
(function () {
  "use strict";

  const i18nT = (key) =>
    (window.PKBAYES_I18N && window.PKBAYES_I18N.t ? window.PKBAYES_I18N.t(key) : key);

  // Los datasets interactivos guardan claves i18n ("wb.regimen_p1") en los campos con
  // texto y valores literales ("16.2 µg/mL") en los numéricos. setVal distingue por la
  // forma de la cadena: si es clave, traduce y deja el marcador data-i18n puesto para
  // que el motor la reaplique cuando el usuario cambie de idioma sin volver a pulsar.
  const I18N_KEY_RE = /^[a-z][a-z0-9]*\.[a-z0-9_]+$/;

  function setVal(el, value) {
    if (!el) return;
    if (I18N_KEY_RE.test(value)) {
      el.setAttribute("data-i18n", value);
      el.textContent = i18nT(value);
    } else {
      el.removeAttribute("data-i18n");
      el.textContent = value;
    }
  }

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
        '<button class="t-close" data-i18n-aria-label="ui.toast_close" aria-label="' +
        i18nT("ui.toast_close") + '">×</button>';
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
    const isGuidedTour = document.querySelector(".app-tour-wrapper")?.classList.contains("guided-tour");

    function goToSlide(idx) {
      tourTabs.forEach((tab, i) => {
        tab.classList.toggle("active", i === idx);
        tab.setAttribute("aria-selected", String(i === idx));
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
        tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        if (!isGuidedTour) startAutoTour();
      });
      tab.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const next = (i + direction + tourTabs.length) % tourTabs.length;
        tourTabs[next].focus();
        goToSlide(next);
      });
    });

    const wrapper = document.querySelector(".app-tour-wrapper");
    if (wrapper && !isGuidedTour) {
      wrapper.addEventListener("mouseenter", stopAutoTour);
      wrapper.addEventListener("mouseleave", startAutoTour);
    }

    goToSlide(0);
    if (!isGuidedTour && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) startAutoTour();
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

        const t = (window.PKBAYES_I18N && window.PKBAYES_I18N.t) || ((k) => k);
        if (labelEl) {
          labelEl.textContent = t("js.vfg_stratum_label")
            .replace("{range}", range)
            .replace("{count}", count);
        }
        if (weightEl) {
          weightEl.textContent = isLocalActive
            ? t("js.vfg_weight_active").replace("{pct}", (weight * 100).toFixed(0))
            : t("js.vfg_weight_inactive");
        }
        if (formulaEl) {
          formulaEl.textContent = isLocalActive
            ? t("js.vfg_formula_active").replace("{a}", (1 - weight).toFixed(2)).replace("{b}", weight)
            : t("js.vfg_formula_inactive");
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

  /* ---------- Visor de pantallas y navegación por secciones ---------- */
  function initProductScreens() {
    const screenLinks = document.querySelectorAll("[data-screen-lightbox]");
    if (!screenLinks.length) return;

    const lightbox = document.createElement("div");
    lightbox.className = "screen-lightbox";
    lightbox.hidden = true;
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    // El visor se crea desde JS, después de que el motor i18n ya recorrió el DOM: se le
    // pone el texto del idioma vigente y además el marcador data-i18n-aria-label, para
    // que se vuelva a traducir cuando el usuario cambie de idioma con el visor ya creado.
    const t = (window.PKBAYES_I18N && window.PKBAYES_I18N.t) || ((k) => k);
    lightbox.setAttribute("data-i18n-aria-label", "a11y.vista_ampliada_de_pk_bayes");
    lightbox.setAttribute("aria-label", t("a11y.vista_ampliada_de_pk_bayes"));
    lightbox.innerHTML = '<div class="screen-lightbox-dialog"><button class="screen-lightbox-close" type="button" data-i18n-aria-label="a11y.cerrar_vista_ampliada" aria-label="' +
      t("a11y.cerrar_vista_ampliada") + '">×</button><img alt=""></div>';
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");
    const closeButton = lightbox.querySelector("button");
    let returnFocus = null;

    function closeLightbox() {
      lightbox.hidden = true;
      document.body.classList.remove("lightbox-open");
      lightboxImage.removeAttribute("src");
      if (returnFocus) returnFocus.focus();
    }

    screenLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const sourceImage = link.querySelector("img");
        const altText = sourceImage ? sourceImage.alt : (link.getAttribute("data-alt") || link.getAttribute("aria-label") || "PK-Bayes");
        returnFocus = link;
        lightboxImage.src = link.getAttribute("href");
        lightboxImage.alt = altText;
        lightbox.hidden = false;
        document.body.classList.add("lightbox-open");
        closeButton.focus();
      });
    });

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
    });

    const sectionLinks = Array.from(document.querySelectorAll(".function-subnav a"));
    const sections = document.querySelectorAll("[data-function-section]");
    if (!("IntersectionObserver" in window) || !sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      sectionLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
    }, { rootMargin: "-28% 0px -58% 0px", threshold: [0, .1, .25] });
    sections.forEach((section) => observer.observe(section));
  }

  /* ---------- Selector de Paradigma Clínico (Cockpit 3.0 vs Gabinete Suizo) ---------- */
  function initModeSwitcher() {
    const btnCockpit = document.getElementById("btn-mode-cockpit");
    const btnSwiss = document.getElementById("btn-mode-swiss");
    const viewCockpit = document.getElementById("workstation-cockpit-view");
    const viewSwiss = document.getElementById("workstation-swiss-view");

    if (!btnCockpit || !btnSwiss || !viewCockpit || !viewSwiss) return;

    btnCockpit.addEventListener("click", () => {
      btnCockpit.classList.add("active");
      btnCockpit.setAttribute("aria-selected", "true");
      btnSwiss.classList.remove("active");
      btnSwiss.setAttribute("aria-selected", "false");
      viewCockpit.style.display = "block";
      viewSwiss.style.display = "none";
    });

    btnSwiss.addEventListener("click", () => {
      btnSwiss.classList.add("active");
      btnSwiss.setAttribute("aria-selected", "true");
      btnCockpit.classList.remove("active");
      btnCockpit.setAttribute("aria-selected", "false");
      viewCockpit.style.display = "none";
      viewSwiss.style.display = "block";
    });
  }

  /* ---------- Zenith Dashboard Interactivo (Apple Health + Linear Style) ---------- */
  function initZenithDashboard() {
    const btnA = document.getElementById("posology-btn-a");
    const btnB = document.getElementById("posology-btn-b");
    const btnC = document.getElementById("posology-btn-c");
    if (!btnA || !btnB || !btnC) return;

    const kpiPta = document.getElementById("zenith-kpi-pta");
    const ringPath = document.getElementById("zenith-ring-path");
    const kpiAuc = document.getElementById("zenith-kpi-auc");
    const corridorDot = document.getElementById("zenith-corridor-dot");
    const kpiCmin = document.getElementById("zenith-kpi-cmin");
    const curveLine = document.getElementById("zenith-curve-line");
    const curveGlow = document.getElementById("zenith-curve-glow");

    const scenarios = {
      a: {
        pta: "96%",
        ptaColor: "#059669",
        ringDash: "96, 100",
        ringStroke: "#059669",
        auc: "485",
        dotLeft: "52%",
        dotBg: "#059669",
        cmin: "16.2",
        cminColor: "#0f172a",
        curveStroke: "#2563eb",
        curveD: "M 50,210 C 70,45 100,38 150,90 C 200,140 240,172 260,175 C 280,48 310,40 360,92 C 410,142 450,174 470,176 C 490,50 520,42 570,94 C 620,144 660,175 680,178 C 700,52 730,45 780,96 C 830,146 850,176 870,178",
        glowD: "M 50,210 C 70,45 100,38 150,90 C 200,140 240,172 260,175 C 280,48 310,40 360,92 C 410,142 450,174 470,176 C 490,50 520,42 570,94 C 620,144 660,175 680,178 C 700,52 730,45 780,96 C 830,146 850,176 870,178 L 870,215 L 50,215 Z"
      },
      b: {
        pta: "62%",
        ptaColor: "#dc2626",
        ringDash: "62, 100",
        ringStroke: "#dc2626",
        auc: "642",
        dotLeft: "85%",
        dotBg: "#dc2626",
        cmin: "24.1",
        cminColor: "#dc2626",
        curveStroke: "#dc2626",
        curveD: "M 50,205 C 70,20 100,15 150,65 C 200,110 240,135 260,138 C 280,22 310,18 360,68 C 410,112 450,137 470,140 C 490,25 520,20 570,70 C 620,115 660,139 680,142 C 700,28 730,22 780,72 C 830,118 850,140 870,142",
        glowD: "M 50,205 C 70,20 100,15 150,65 C 200,110 240,135 260,138 C 280,22 310,18 360,68 C 410,112 450,137 470,140 C 490,25 520,20 570,70 C 620,115 660,139 680,142 C 700,28 730,22 780,72 C 830,118 850,140 870,142 L 870,215 L 50,215 Z"
      },
      c: {
        pta: "98%",
        ptaColor: "#2563eb",
        ringDash: "98, 100",
        ringStroke: "#2563eb",
        auc: "492",
        dotLeft: "54%",
        dotBg: "#2563eb",
        cmin: "18.2",
        cminColor: "#0f172a",
        curveStroke: "#059669",
        curveD: "M 50,210 C 80,145 120,132 180,132 C 280,132 400,132 500,132 C 600,132 750,132 870,132",
        glowD: "M 50,210 C 80,145 120,132 180,132 C 280,132 400,132 500,132 C 600,132 750,132 870,132 L 870,215 L 50,215 Z"
      }
    };

    function applyScenario(key) {
      const s = scenarios[key];
      if (!s) return;

      [btnA, btnB, btnC].forEach((b) => b.classList.remove("active"));
      const activeBtn = key === "a" ? btnA : key === "b" ? btnB : btnC;
      activeBtn.classList.add("active");

      if (kpiPta) {
        kpiPta.textContent = s.pta;
        kpiPta.style.color = s.ptaColor;
      }
      if (ringPath) {
        ringPath.setAttribute("stroke-dasharray", s.ringDash);
        ringPath.setAttribute("stroke", s.ringStroke);
      }
      if (kpiAuc) {
        kpiAuc.textContent = s.auc;
      }
      if (corridorDot) {
        corridorDot.style.left = s.dotLeft;
        corridorDot.style.background = s.dotBg;
      }
      if (kpiCmin) {
        kpiCmin.textContent = s.cmin;
        kpiCmin.style.color = s.cminColor;
      }
      if (curveLine) {
        curveLine.setAttribute("d", s.curveD);
        curveLine.setAttribute("stroke", s.curveStroke);
      }
      if (curveGlow) {
        curveGlow.setAttribute("d", s.glowD);
      }
    }

    btnA.addEventListener("click", () => applyScenario("a"));
    btnB.addEventListener("click", () => applyScenario("b"));
    btnC.addEventListener("click", () => applyScenario("c"));
  }

  /* ---------- Interactive Clinical Workbench (funcionalidades.html) ---------- */
  function initWorkbenchConsoles() {
    // 1. Patient Triage
    const patientItems = document.querySelectorAll("[data-wb-patient]");
    const detailName = document.getElementById("wb-detail-name");
    const detailDrug = document.getElementById("wb-detail-drug");
    const detailTrough = document.getElementById("wb-detail-trough");
    const detailAuc = document.getElementById("wb-detail-auc");
    const detailBadge = document.getElementById("wb-detail-badge");

    const patientData = {
      // name/drug/badge viajan como clave i18n; trough/auc son valores que no se traducen.
      p1: { name: "wb.triage_patient_1", drug: "wb.regimen_p1", trough: "16.2 µg/mL", auc: "485 mg·h/L", badge: "wb.badge_target_96", cls: "wb-badge-green" },
      p2: { name: "wb.triage_patient_2", drug: "wb.regimen_p2", trough: "24.5 µg/mL", auc: "680 mg·h/L", badge: "wb.triage_status_warn", cls: "wb-badge-red" },
      p3: { name: "wb.triage_patient_3", drug: "wb.regimen_p3", trough: "18.4 µg/mL", auc: "390 mg·h/L", badge: "wb.triage_status_target", cls: "wb-badge-green" },
      p4: { name: "wb.triage_patient_4", drug: "wb.regimen_p4", trough: "0.8 µg/mL", auc: "410 mg·h/L", badge: "wb.triage_status_target", cls: "wb-badge-blue" }
    };

    patientItems.forEach((btn) => {
      btn.addEventListener("click", () => {
        patientItems.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const id = btn.getAttribute("data-wb-patient");
        const p = patientData[id];
        if (!p) return;
        setVal(detailName, p.name);
        setVal(detailDrug, p.drug);
        setVal(detailTrough, p.trough);
        setVal(detailAuc, p.auc);
        if (detailBadge) {
          setVal(detailBadge, p.badge);
          detailBadge.className = "wb-badge-pill " + p.cls;
        }
      });
    });

    // 2. Renal Clearance Simulator
    const rfBtns = document.querySelectorAll("[data-wb-rf]");
    const nativeBar = document.getElementById("wb-clearance-native");
    const dialBar = document.getElementById("wb-clearance-dialysis");
    const clNatVal = document.getElementById("wb-cl-native");
    const clDialVal = document.getElementById("wb-cl-dial");
    const clTotVal = document.getElementById("wb-cl-total");
    const thalfVal = document.getElementById("wb-thalf-val");

    const rfData = {
      native: { natW: "45%", dialW: "0%", natCl: "2.1 L/h", dialCl: "0.0 L/h", totCl: "2.1 L/h", thalf: "18.2 h" },
      hd: { natW: "15%", dialW: "55%", natCl: "0.6 L/h", dialCl: "2.8 L/h (Intermitente)", totCl: "3.4 L/h", thalf: "6.5 h (En Filtro)" },
      crrt: { natW: "10%", dialW: "50%", natCl: "0.4 L/h", dialCl: "2.2 L/h (CVVHDF 2000 mL/h)", totCl: "2.6 L/h", thalf: "14.8 h" }
    };

    rfBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        rfBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.getAttribute("data-wb-rf");
        const d = rfData[mode];
        if (!d) return;
        if (nativeBar) nativeBar.style.width = d.natW;
        if (dialBar) dialBar.style.width = d.dialW;
        if (clNatVal) clNatVal.textContent = d.natCl;
        if (clDialVal) clDialVal.textContent = d.dialCl;
        if (clTotVal) clTotVal.textContent = d.totCl;
        if (thalfVal) thalfVal.textContent = d.thalf;
      });
    });

    // 3. Bayesian MAP Step Simulator
    const bayesBtns = document.querySelectorAll("[data-wb-bayes]");
    const bayesPrior = document.getElementById("wb-bayes-prior");
    const bayesSample = document.getElementById("wb-bayes-sample");
    const bayesPost = document.getElementById("wb-bayes-post");

    bayesBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        bayesBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const step = btn.getAttribute("data-wb-bayes");
        if (step === "prior") {
          if (bayesPrior) bayesPrior.style.opacity = "1";
          if (bayesSample) bayesSample.style.opacity = "0.2";
          if (bayesPost) bayesPost.style.opacity = "0.2";
        } else if (step === "sample") {
          if (bayesPrior) bayesPrior.style.opacity = "0.6";
          if (bayesSample) bayesSample.style.opacity = "1";
          if (bayesPost) bayesPost.style.opacity = "0.3";
        } else {
          if (bayesPrior) bayesPrior.style.opacity = "0.4";
          if (bayesSample) bayesSample.style.opacity = "1";
          if (bayesPost) bayesPost.style.opacity = "1";
        }
      });
    });

    // 4. PopPK Export Preview Selector
    const formatBtns = document.querySelectorAll("[data-wb-format]");
    const codeBlock = document.getElementById("wb-code-text");

    const datasets = {
      csv: "ID,TIME,DV,AMT,RATE,ECOL,AGE,WT,SCR,CLCR\n101,0.0,.,1000,1000,0,63,72.5,1.8,26.4\n101,12.0,15.2,.,.,0,63,72.5,1.8,26.4\n101,12.0,.,750,750,0,63,72.5,1.7,28.1\n101,24.0,16.2,.,.,0,63,72.5,1.7,28.1",
      nonmem: "$INPUT ID TIME DV AMT RATE ECOL AGE WT SCR CLCR\n$DATA dataset_pk_bayes.csv IGNORE=@\n$SUBROUTINES ADVAN3 TRANS4\n$PK\n CL = THETA(1)*(CLCR/70)**THETA(2)*EXP(ETA(1))\n V1 = THETA(3)*(WT/70)**THETA(4)*EXP(ETA(2))\n$ESTIMATION METHOD=COND INTERACTION MAXEVAL=9999",
      monolix: "<DATAFILE>\n[FILEINFO]\nfile='dataset_pk_bayes.csv'\ndelimiter=comma\nheader={ID,TIME,DV,AMT,RATE,ECOL,AGE,WT,SCR,CLCR}\n[CONTENT]\nID = {use=identifier}\nTIME = {use=time}\nDV = {use=observation, name=y, type=continuous}\nAMT = {use=amount}",
      python: "import pandas as pd\nimport nlmixr2\n\ndf = pd.read_csv('dataset_pk_bayes.csv')\nprint(f'Cohort size: {df[\"ID\"].nunique()} patients, Total TDM obs: {len(df[df[\"DV\"].notna()])}')"
    };

    formatBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        formatBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const fmt = btn.getAttribute("data-wb-format");
        if (codeBlock && datasets[fmt]) {
          codeBlock.textContent = datasets[fmt];
        }
      });
    });
  }

  /* ---------- Pharmacokinetic Drug Atlas (farmacos.html) ---------- */
  function initDrugAtlas() {
    const drugBtns = document.querySelectorAll("[data-atlas-drug]");
    if (!drugBtns.length) return;

    const drugTitle = document.getElementById("atlas-drug-title");
    const modelTag = document.getElementById("atlas-model-tag");
    const paramVd = document.getElementById("atlas-param-vd");
    const paramCl = document.getElementById("atlas-param-cl");
    const paramThalf = document.getElementById("atlas-param-thalf");
    const paramTarget = document.getElementById("atlas-param-target");
    const curveLine = document.getElementById("atlas-curve-line");
    const curveGlow = document.getElementById("atlas-curve-glow");

    const drugProfiles = {
      vanco: {
        title: "atlas.title_vanco",
        model: "atlas.model_vanco_val",
        vd: "0.72 L/kg",
        cl: "2.1 L/h",
        thalf: "14.2 h",
        target: "atlas.target_vanco",
        d: "M 50,210 C 70,45 100,38 150,90 C 200,140 240,172 260,175 C 280,48 310,40 360,92 C 410,142 450,174 470,176 C 490,50 520,42 570,94 C 620,144 660,175 680,178 C 700,52 730,45 780,96 C 830,146 850,176 870,178",
        glow: "M 50,210 C 70,45 100,38 150,90 C 200,140 240,172 260,175 C 280,48 310,40 360,92 C 410,142 450,174 470,176 C 490,50 520,42 570,94 C 620,144 660,175 680,178 C 700,52 730,45 780,96 C 830,146 850,176 870,178 L 870,215 L 50,215 Z",
        stroke: "#0284c7"
      },
      feni: {
        title: "atlas.title_feni",
        model: "atlas.model_feni_val",
        vd: "0.65 L/kg",
        cl: "atlas.cl_feni",
        thalf: "atlas.thalf_feni",
        target: "atlas.target_feni",
        d: "M 50,210 C 90,80 140,65 240,68 C 340,70 440,70 540,70 C 640,70 740,70 870,70",
        glow: "M 50,210 C 90,80 140,65 240,68 C 340,70 440,70 540,70 C 640,70 740,70 870,70 L 870,215 L 50,215 Z",
        stroke: "#d97706"
      },
      ami: {
        title: "atlas.title_ami",
        model: "atlas.model_ami_val",
        vd: "0.26 L/kg",
        cl: "atlas.cl_ami",
        thalf: "2.4 h",
        target: "atlas.target_ami",
        d: "M 50,210 C 60,20 80,15 110,60 C 140,140 180,210 260,212 C 270,20 290,15 320,60 C 350,140 390,210 470,212 C 480,20 500,15 530,60 C 560,140 600,210 680,212 C 690,20 710,15 740,60 C 770,140 810,210 870,212",
        glow: "M 50,210 C 60,20 80,15 110,60 C 140,140 180,210 260,212 C 270,20 290,15 320,60 C 350,140 390,210 470,212 C 480,20 500,15 530,60 C 560,140 600,210 680,212 C 690,20 710,15 740,60 C 770,140 810,210 870,212 L 870,215 L 50,215 Z",
        stroke: "#2563eb"
      },
      tacro: {
        title: "atlas.title_tacro",
        model: "atlas.model_tacro_val",
        vd: "1.10 L/kg",
        cl: "atlas.cl_tacro",
        thalf: "12.0 h",
        target: "atlas.target_tacro",
        d: "M 50,210 C 70,130 110,140 160,155 C 210,165 240,170 260,172 C 280,130 310,140 360,155 C 410,165 440,170 470,172 C 490,130 520,140 570,155 C 620,165 650,170 680,172 C 700,130 730,140 780,155 C 830,165 850,170 870,172",
        glow: "M 50,210 C 70,130 110,140 160,155 C 210,165 240,170 260,172 C 280,130 310,140 360,155 C 410,165 440,170 470,172 C 490,130 520,140 570,155 C 620,165 650,170 680,172 C 700,130 730,140 780,155 C 830,165 850,170 870,172 L 870,215 L 50,215 Z",
        stroke: "#7c3aed"
      }
    };

    drugBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        drugBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const key = btn.getAttribute("data-atlas-drug");
        const p = drugProfiles[key];
        if (!p) return;
        // Los textos con palabras viajan como clave i18n: se traducen ahora y se deja
        // el marcador data-i18n puesto, para que el motor los vuelva a traducir si el
        // usuario cambia de idioma con otro fármaco ya seleccionado.
        setVal(drugTitle, p.title);
        setVal(modelTag, p.model);
        setVal(paramVd, p.vd);
        setVal(paramCl, p.cl);
        setVal(paramThalf, p.thalf);
        setVal(paramTarget, p.target);
        if (curveLine) {
          curveLine.setAttribute("d", p.d);
          curveLine.setAttribute("stroke", p.stroke);
        }
        if (curveGlow) curveGlow.setAttribute("d", p.glow);
      });
    });

    // Sheiner-Tozer Albumin Slider for Phenytoin
    const albSlider = document.getElementById("atlas-alb-slider");
    const albVal = document.getElementById("atlas-alb-val");
    const feniCorr = document.getElementById("atlas-feni-corr");

    if (albSlider && albVal && feniCorr) {
      albSlider.addEventListener("input", (e) => {
        const alb = parseFloat(e.target.value);
        albVal.textContent = alb.toFixed(1) + " g/dL";
        // Sheiner-Tozer: C_corr = 10 / (0.2 * alb + 0.1)
        const corr = (10 / (0.2 * alb + 0.1)).toFixed(1);
        feniCorr.textContent = corr + " µg/mL";
        if (corr > 20) {
          feniCorr.style.color = "#dc2626";
        } else {
          feniCorr.style.color = "#059669";
        }
      });
    }
  }

  /* ---------- Clinical Cases Simulator (ejemplos.html) ---------- */
  function initClinicalCases() {
    const stageBtns = document.querySelectorAll("[data-case-stage]");
    const caseCurve = document.getElementById("case-curve-line");
    const caseGlow = document.getElementById("case-curve-glow");
    const caseBadge = document.getElementById("case-status-badge");
    const caseStat = document.getElementById("case-kpi-stat");

    if (!stageBtns.length) return;

    stageBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        stageBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const stage = btn.getAttribute("data-case-stage");
        if (stage === "before") {
          // Toxic elevated accumulation curve
          if (caseCurve) {
            caseCurve.setAttribute("d", "M 50,205 C 70,20 100,15 150,65 C 200,110 240,135 260,138 C 280,22 310,18 360,68 C 410,112 450,137 470,140 C 490,25 520,20 570,70 C 620,115 660,139 680,142 C 700,28 730,22 780,72 C 830,118 850,140 870,142");
            caseCurve.setAttribute("stroke", "#dc2626");
          }
          if (caseGlow) {
            caseGlow.setAttribute("d", "M 50,205 C 70,20 100,15 150,65 C 200,110 240,135 260,138 C 280,22 310,18 360,68 C 410,112 450,137 470,140 C 490,25 520,20 570,70 C 620,115 660,139 680,142 C 700,28 730,22 780,72 C 830,118 850,140 870,142 L 870,215 L 50,215 Z");
          }
          if (caseBadge) {
            setVal(caseBadge, "case.badge_nephro");
            caseBadge.className = "wb-badge-pill wb-badge-red";
          }
          if (caseStat) {
            setVal(caseStat, "case.stat_empiric");
            caseStat.style.color = "#dc2626";
          }
        } else {
          // Bayesian adjusted optimal curve
          if (caseCurve) {
            caseCurve.setAttribute("d", "M 50,210 C 70,45 100,38 150,90 C 200,140 240,172 260,175 C 280,48 310,40 360,92 C 410,142 450,174 470,176 C 490,50 520,42 570,94 C 620,144 660,175 680,178 C 700,52 730,45 780,96 C 830,146 850,176 870,178");
            caseCurve.setAttribute("stroke", "#059669");
          }
          if (caseGlow) {
            caseGlow.setAttribute("d", "M 50,210 C 70,45 100,38 150,90 C 200,140 240,172 260,175 C 280,48 310,40 360,92 C 410,142 450,174 470,176 C 490,50 520,42 570,94 C 620,144 660,175 680,178 C 700,52 730,45 780,96 C 830,146 850,176 870,178 L 870,215 L 50,215 Z");
          }
          if (caseBadge) {
            setVal(caseBadge, "case.badge_target_96");
            caseBadge.className = "wb-badge-pill wb-badge-green";
          }
          if (caseStat) {
            setVal(caseStat, "case.stat_map");
            caseStat.style.color = "#059669";
          }
        }
      });
    });
  }

  /* ---------- Hospital ROI & Clinical Impact Calculator (precios.html) ---------- */
  function initRoiCalculator() {
    const slider = document.getElementById("roi-beds-slider");
    const bedsDisplay = document.getElementById("roi-beds-display");
    const akiDisplay = document.getElementById("roi-aki-display");
    const daysDisplay = document.getElementById("roi-days-display");
    const savingsDisplay = document.getElementById("roi-savings-display");

    if (!slider) return;

    function update() {
      const beds = parseInt(slider.value, 10);
      if (bedsDisplay) bedsDisplay.textContent = beds + " " + i18nT("roi.beds_unit");
      const aki = Math.round(beds * 1.4);
      const days = Math.round(beds * 4.2);
      const savings = Math.round(aki * 14500);

      if (akiDisplay) akiDisplay.textContent = aki;
      if (daysDisplay) daysDisplay.textContent = days;
      if (savingsDisplay) savingsDisplay.textContent = "$" + savings.toLocaleString("en-US");
    }

    slider.addEventListener("input", update);
    // bedsDisplay se arma concatenando número + unidad, así que no lo puede reaplicar el
    // motor por data-i18n: se recalcula cuando cambia el idioma.
    window.addEventListener("pkbayes_language_changed", update);
    update();
  }

  // Initialize Dossier Controllers
  initEmpiricalCalc();
  initPKSimulator();
  initVFGStrata();
  initFeatureSlider();
  initProductScreens();
  initModeSwitcher();
  initZenithDashboard();
  initWorkbenchConsoles();
  initDrugAtlas();
  initClinicalCases();
  initRoiCalculator();
})();
