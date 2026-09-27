---
name: PK-Bayes Precision Clinical Design System
description: Fusion of Apple Pro Health & Framer Interactive Telemetry for High-Complexity Clinical Pharmacometrics
colors:
  primary: "#0284c7"
  primary-deep: "#0369a1"
  primary-electric: "#2563eb"
  accent-cyan: "#0ea5e9"
  accent-cyan-light: "#e0f2fe"
  accent-emerald: "#059669"
  accent-emerald-light: "#ecfdf5"
  accent-emerald-soft: "#dcfce7"
  accent-amber: "#d97706"
  accent-amber-light: "#fffbeb"
  accent-amber-soft: "#fef3c7"
  accent-purple: "#7c3aed"
  accent-purple-light: "#faf5ff"
  accent-teal: "#0d9488"
  accent-teal-light: "#f0fdfa"
  accent-cyan-border: "#bae6fd"
  danger-red: "#dc2626"
  neutral-surface: "#ffffff"
  neutral-subtle: "#f8fafc"
  neutral-border: "#e2e8f0"
  neutral-border-subtle: "#f1f5f9"
  neutral-text: "#091e42"
  neutral-slate-dark: "#334155"
  neutral-muted: "#475569"
  neutral-slate: "#64748b"
  neutral-slate-light: "#cbd5e1"
  neutral-dark-surface: "#0b1329"
  neutral-dark-card: "#0f172a"
  neutral-dark-border: "#1e293b"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  hero:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.5vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.15
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
    fontSize: "clamp(2.05rem, 3.4vw, 3.3rem)"
    fontWeight: 800
  h3:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
    fontSize: "15px"
    lineHeight: 1.6
    letterSpacing: "-0.01em"
  subhead:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
    fontSize: "13.5px"
  small:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
    fontSize: "13px"
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
    fontSize: "11px"
  mono:
    fontFamily: "'SF Mono', 'SFMono-Regular', 'JetBrains Mono', 'Fira Code', ui-monospace, Menlo, Monaco, Consolas, monospace"
    fontSize: "12px"
    letterSpacing: "0.02em"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  base: "10px"
  lg: "12px"
  xl: "16px"
  "2xl": "18px"
  card: "20px"
  "3xl": "24px"
  tray: "26px"
  pill: "9999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "54px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.pill}"
    padding: "13px 26px"
  button-glass:
    backgroundColor: "rgba(255, 255, 255, 0.9)"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.pill}"
    padding: "13px 26px"
  card-workstation:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.xl}"
    padding: "24px 28px"
---

## Overview

PK-Bayes combina la sobriedad, legibilidad y solidez táctil de **Apple Design** (sistemas pro, Apple Health, hardware concentric squircles y tipografía calibrada) con la audacia, micro-canvases en vivo y físicas reactivas de **Framer** (paneles de telemetría oscura, píldoras dinámicas expansibles y carrussels con inercia).

## Colors

- **Primary Clinical Blue (`#0284c7`)**: Acción principal, navegación y ajuste analítico.
- **Electric Sapphire (`#2563eb`)**: Curva continua farmacocinética C(t) e indicadores bayesianos.
- **Therapeutic Target Emerald (`#059669`)**: Rango en meta (AUC 400-600, Cmin 15-20 µg/mL) y cumplimiento regulatorio.
- **Deep Navy Text (`#091e42`)**: Tipografía principal con alto contraste (cumple WCAG AAA).
- **Pro Graphite / Obsidian (`#0b1329`)**: Micro-consolas de telemetría terminal (HL7 FHIR, simulador, MPE).

## Typography

- **Display & Headlines**: SF Pro Display / Inter Grotesk con tracking negativo suave (`-0.02em` a `-0.03em`), peso 800 y colores sólidos (prohibidos los degradados en texto).
- **Body**: SF Pro Text / Inter con longitud óptima de línea (60-70 caracteres) y lectura descansada.
- **Data & Telemetry**: Monospace ('SF Mono', Menlo) reservado estrictamente para parámetros farmacocinéticos, unidades, tiempos y matrices numéricas.

## Layout

- **Macro-espaciado consistente**: Secciones separadas rítmicamente por `54px 0`, evitando vacíos desproporcionados o apiñamiento.
- **Double-Bezel Architecture**: Contenedores principales estructurados como bandeja exterior maquinada (`#f8fafc`) con núcleo interior blanco nítido (`#ffffff`).
- **Apple Asymmetric Bento**: Módulos y pilares organizados en jerarquía funcional, rompiendo cuadrículas repetitivas de tarjetas idénticas.
- **Editorial Split 2-Col**: Formularios y captación de pilotos integrados con propuesta de valor en dos columnas fluidas.

## Elevation & Depth

- **Elevación Física**: Sombras suaves y difusas basadas en desenfoques amplios con tintes neutros (`0 20px 48px -12px rgba(15, 23, 42, 0.08)`).
- **Translucidez Vidrio**: `backdrop-filter: blur(20px) saturate(180%)` aplicado a barras flotantes y botones táctiles.

## Shapes

- **Concentric Squircles**: Radio exterior de 24px con radio interior de 16-18px para transiciones armónicas.
- **Píldoras Hápticas**: Botones de acción y selectores de dosis con radio completo (`rounded-full`) y respuesta física al tacto (`:active scale(0.97)`).

## Components

- **Zenith Clinical Station**: Cockpit principal con lectura instantánea de PTA, AUC y nivel valle con corredores visuales gemelos.
- **Framer Live Showcase**: Carrusel interactivo drag-to-scroll con micro-canvases SVG en tiempo real y píldoras expansibles.
- **Simulator Cockpit**: Banco de pruebas con diales hardware y curva vectorial con iluminación graduada.
- **Drug Comparison Decks**: Tarjetas de alta densidad técnica con modelos bicompartimentales y cinética Michaelis-Menten.

## Do's and Don'ts

### Do's
- Utilizar colores de texto sólidos y de alto contraste (mínimo 4.5:1 para cuerpo, 3:1 para titulares).
- Reservar tipografía monospace exclusivamente para datos, dosis y códigos clínicos.
- Proveer respuesta táctil física en todos los controles interactivos.
- Mantener paridad total en los 4 idiomas de la plataforma (ES, EN, ZH, JA).

### Don'ts
- No utilizar degradados en texto (`background-clip: text`), prohibido por ser un cliché de baja legibilidad.
- No utilizar bordes gruesos laterales en tarjetas (`border-left: 4px`), tell típico de interfaces genéricas.
- No utilizar guiones largos o medios (`—` o `–`).
- No emplear animaciones de propiedades de layout como `width` o `height` (usar `transform` y `opacity`).
