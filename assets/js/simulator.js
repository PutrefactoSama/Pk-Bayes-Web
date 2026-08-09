/**
 * PK-Bayes — Simulador ilustrativo de dosificación (Vancomicina)
 * ---------------------------------------------------------------
 * Modelo simplificado de 1 compartimento con infusión intermitente,
 * evaluado en estado estacionario (ecuaciones tipo Sawchuk-Zaske).
 * Objetivo: mostrar el CONCEPTO del simulador real de PK-Bayes
 * (que internamente usa estimación bayesiana MAP y modelos de
 * 1–2 compartimentos de la literatura). Este widget es SOLO
 * educativo/comercial — no debe usarse para decisiones clínicas.
 *
 *   Cmax,ss = [Dosis / (Tinf · CL)] · (1 − e^(−k·Tinf)) / (1 − e^(−k·τ))
 *   Cmin,ss = Cmax,ss · e^(−k·(τ − Tinf))
 *   k = CL / Vd
 */
(function () {
  "use strict";

  const NS = "http://www.w3.org/2000/svg";
  const TARGET_LOW = 15;
  const TARGET_HIGH = 20;

  function el(tag, attrs) {
    const node = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach((k) => node.setAttribute(k, attrs[k]));
    return node;
  }

  function computeCurve(dose, tau, cl, vd) {
    const k = cl / vd;
    const tinf = dose > 1500 ? 1.5 : 1;
    const r0 = dose / tinf;
    const denom = 1 - Math.exp(-k * tau);
    const cmax = (r0 / cl) * (1 - Math.exp(-k * tinf)) / denom;
    const cmin = cmax * Math.exp(-k * (tau - tinf));

    const cycle = [];
    const step = tau / 90;
    for (let t = 0; t <= tau + 1e-9; t += step) {
      let c;
      if (t <= tinf) {
        c = cmin * Math.exp(-k * t) + (r0 / cl) * (1 - Math.exp(-k * t));
      } else {
        c = cmax * Math.exp(-k * (t - tinf));
      }
      cycle.push([t, c]);
    }
    return { k, tinf, cmax, cmin, cycle };
  }

  function renderChart(svg, data, tau) {
    svg.innerHTML = "";
    const W = 640, H = 320;
    const padL = 46, padR = 18, padT = 20, padB = 36;
    const cycles = 3;
    const xMax = tau * cycles;
    const yMax = Math.max(data.cmax * 1.3, TARGET_HIGH * 1.25);

    const x = (t) => padL + (t / xMax) * (W - padL - padR);
    const y = (c) => H - padB - (c / yMax) * (H - padT - padB);

    // Fondo
    svg.appendChild(el("rect", { x: 0, y: 0, width: W, height: H, fill: "transparent" }));

    // Banda de rango objetivo ilustrativo
    svg.appendChild(el("rect", {
      x: padL, y: y(TARGET_HIGH), width: W - padL - padR, height: y(TARGET_LOW) - y(TARGET_HIGH),
      fill: "var(--green)", opacity: "0.12",
    }));
    [TARGET_LOW, TARGET_HIGH].forEach((v) => {
      svg.appendChild(el("line", { x1: padL, x2: W - padR, y1: y(v), y2: y(v), stroke: "var(--green)", "stroke-width": 1, "stroke-dasharray": "4 4", opacity: 0.55 }));
    });
    const labelHigh = document.createElementNS(NS, "text");
    labelHigh.setAttribute("x", W - padR); labelHigh.setAttribute("y", y(TARGET_HIGH) - 5);
    labelHigh.setAttribute("text-anchor", "end"); labelHigh.setAttribute("font-size", "10"); labelHigh.setAttribute("fill", "var(--green)");
    labelHigh.textContent = `${TARGET_HIGH} mg/L`;
    svg.appendChild(labelHigh);

    // Ejes
    svg.appendChild(el("line", { x1: padL, x2: W - padR, y1: H - padB, y2: H - padB, stroke: "var(--border-strong)", "stroke-width": 1 }));
    svg.appendChild(el("line", { x1: padL, x2: padL, y1: padT, y2: H - padB, stroke: "var(--border-strong)", "stroke-width": 1 }));

    // Marcas eje X (horas) — 3 ciclos
    for (let i = 0; i <= cycles; i++) {
      const t = i * tau;
      const tx = x(t);
      svg.appendChild(el("line", { x1: tx, x2: tx, y1: H - padB, y2: H - padB + 5, stroke: "var(--border-strong)" }));
      const lbl = document.createElementNS(NS, "text");
      lbl.setAttribute("x", tx); lbl.setAttribute("y", H - padB + 18);
      lbl.setAttribute("text-anchor", i === 0 ? "start" : (i === cycles ? "end" : "middle"));
      lbl.setAttribute("font-size", "10"); lbl.setAttribute("fill", "var(--text-muted)");
      lbl.textContent = `${Math.round(t)}h`;
      svg.appendChild(lbl);
    }
    // Marcas eje Y
    [0, TARGET_LOW, TARGET_HIGH, Math.round(yMax)].forEach((v) => {
      const ly = y(v);
      const lbl = document.createElementNS(NS, "text");
      lbl.setAttribute("x", padL - 8); lbl.setAttribute("y", ly + 3);
      lbl.setAttribute("text-anchor", "end"); lbl.setAttribute("font-size", "10"); lbl.setAttribute("fill", "var(--text-muted)");
      lbl.textContent = v;
      svg.appendChild(lbl);
    });

    // Curva (repetida en los N ciclos, patrón periódico en estado estacionario)
    let d = "";
    for (let c = 0; c < cycles; c++) {
      data.cycle.forEach(([t, conc], i) => {
        const px = x(c * tau + t), py = y(conc);
        d += (c === 0 && i === 0 ? "M" : "L") + px.toFixed(1) + "," + py.toFixed(1) + " ";
      });
    }
    svg.appendChild(el("path", { d, fill: "none", stroke: "var(--teal)", "stroke-width": 2.5, "stroke-linejoin": "round" }));

    // Área bajo la curva (suave)
    const areaD = d + `L${x(xMax).toFixed(1)},${y(0)} L${x(0).toFixed(1)},${y(0)} Z`;
    const area = el("path", { d: areaD, fill: "var(--teal)", opacity: "0.06" });
    svg.insertBefore(area, svg.querySelector("path"));

    // Marcadores pico/valle en el último ciclo
    const lastCycleStart = (cycles - 1) * tau;
    svg.appendChild(el("circle", { cx: x(lastCycleStart + data.tinf), cy: y(data.cmax), r: 4, fill: "var(--primary)" }));
    svg.appendChild(el("circle", { cx: x(lastCycleStart + tau), cy: y(data.cmin), r: 4, fill: "var(--red)" }));
  }

  function fmt(n, unit) { return n.toFixed(1) + " " + unit; }

  function classify(cmin) {
    if (cmin < 10) return "bad";
    if (cmin < TARGET_LOW) return "warn";
    if (cmin <= TARGET_HIGH) return "ok";
    return "bad";
  }

  function initSimulator(root) {
    const svg = root.querySelector("[data-chart]");
    const ctrls = {
      dose: root.querySelector('[data-ctrl="dose"]'),
      interval: root.querySelector('[data-ctrl="interval"]'),
      cl: root.querySelector('[data-ctrl="cl"]'),
      vd: root.querySelector('[data-ctrl="vd"]'),
    };
    const outs = {
      dose: root.querySelector('[data-out="dose"]'),
      interval: root.querySelector('[data-out="interval"]'),
      cl: root.querySelector('[data-out="cl"]'),
      vd: root.querySelector('[data-out="vd"]'),
      peak: root.querySelector('[data-out="peak"]'),
      trough: root.querySelector('[data-out="trough"]'),
    };

    function update() {
      const dose = parseFloat(ctrls.dose.value);
      const tau = parseFloat(ctrls.interval.value);
      const cl = parseFloat(ctrls.cl.value);
      const vd = parseFloat(ctrls.vd.value);

      outs.dose.textContent = dose + " mg";
      outs.interval.textContent = tau + " h";
      outs.cl.textContent = cl.toFixed(1) + " L/h";
      outs.vd.textContent = vd + " L";

      const data = computeCurve(dose, tau, cl, vd);
      renderChart(svg, data, tau);

      outs.peak.textContent = fmt(data.cmax, "mg/L");
      outs.trough.textContent = fmt(data.cmin, "mg/L");
      outs.trough.className = "v " + classify(data.cmin);
      outs.peak.className = "v " + (data.cmax > 40 ? "bad" : "ok");
    }

    Object.values(ctrls).forEach((c) => c && c.addEventListener("input", update));
    update();
  }

  document.querySelectorAll("[data-pk-simulator]").forEach(initSimulator);
})();
