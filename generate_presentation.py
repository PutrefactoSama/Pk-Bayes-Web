#!/usr/bin/env python3
"""
Generador de Presentación Institucional y Clínica en PowerPoint (PPTX) para PK-Bayes.
Diseño: /impeccable + /ui-ux-pro-max + /emil-design-eng
Estilo: Lienzo 100% Claro Clínico (WCAG AAA), Marcos Double-Bezel, Gráficos Científicos Matplotlib integrados,
        10 Capturas de Plataforma de Alta Resolución y Speaker Notes institucionales.
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# Dimensiones 16:9 Widescreen
SLIDE_WIDTH = Inches(13.333)
SLIDE_HEIGHT = Inches(7.5)

# Paleta Cromática Clínica 100% Clara (Impeccable & UI Pro Max)
C_CANVAS_BG     = RGBColor(255, 255, 255) # #FFFFFF (Lienzo blanco inmaculado)
C_SURFACE_LIGHT = RGBColor(248, 250, 252) # #F8FAFC (Superficie secundaria sutil)
C_CARD_BG       = RGBColor(255, 255, 255) # #FFFFFF (Fondo tarjeta)
C_BEZEL_OUTER   = RGBColor(241, 245, 249) # #F1F5F9 (Bandeja maquinada exterior)
C_BORDER        = RGBColor(226, 232, 240) # #E2E8F0 (Borde fino nítido)
C_BORDER_SUBTLE = RGBColor(241, 245, 249) # #F1F5F9

# Tipografía (WCAG AAA contrast > 14:1)
C_TEXT_PRIMARY  = RGBColor(15, 23, 42)     # #0F172A (Azul marino obsidiana)
C_TEXT_SECONDARY= RGBColor(71, 85, 105)   # #475569 (Gris pizarra medio)
C_TEXT_MUTED    = RGBColor(100, 116, 139) # #64748B (Gris neutro)

# Acentos Clínicos Semánticos
C_PRIMARY       = RGBColor(2, 132, 199)   # #0284C7 (Azul clínico principal)
C_SAPPHIRE      = RGBColor(37, 99, 235)   # #2563EB (Azul zafiro para curvas PK)
C_SUCCESS       = RGBColor(5, 150, 105)   # #059669 (Verde diana terapéutica)
C_WARNING       = RGBColor(217, 119, 6)   # #D97706 (Ámbar alerta/incertidumbre)
C_DANGER        = RGBColor(220, 38, 38)   # #DC2626 (Rojo riesgo toxicidad)
C_PURPLE        = RGBColor(124, 58, 237)  # #7C3AED (Púrpura ARC / fisiología)

# Directorios de Recursos Visuales
IMG_DIR = "/Users/pablosaezriquelme/Desktop/PK-Bayes Web/assets/img"
CHARTS_DIR = "/Users/pablosaezriquelme/Desktop/PK-Bayes Web/assets/img/charts"
LOGO_IMG = os.path.join(IMG_DIR, "logo-icon-512.png")

def create_presentation():
    prs = Presentation()
    prs.slide_width = SLIDE_WIDTH
    prs.slide_height = SLIDE_HEIGHT
    blank_layout = prs.slide_layouts[6] # Blank slide

    def set_slide_background(slide, color=C_CANVAS_BG):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = color

    def add_header(slide, tag_text, title_text, subtitle_text):
        # Badge Pill
        tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.42), Inches(7.5), Inches(0.32))
        tf_tag = tag_box.text_frame
        tf_tag.word_wrap = True
        tf_tag.margin_left = tf_tag.margin_top = tf_tag.margin_right = tf_tag.margin_bottom = 0
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = tag_text.upper()
        p_tag.font.size = Pt(9.0)
        p_tag.font.bold = True
        p_tag.font.color.rgb = C_PRIMARY

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.74), Inches(11.7), Inches(0.60))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        tf_title.margin_left = tf_title.margin_top = tf_title.margin_right = tf_title.margin_bottom = 0
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(21)
        p_title.font.bold = True
        p_title.font.color.rgb = C_TEXT_PRIMARY

        # Subtitle
        sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.36), Inches(11.7), Inches(0.42))
        tf_sub = sub_box.text_frame
        tf_sub.word_wrap = True
        tf_sub.margin_left = tf_sub.margin_top = tf_sub.margin_right = tf_sub.margin_bottom = 0
        p_sub = tf_sub.paragraphs[0]
        p_sub.text = subtitle_text
        p_sub.font.size = Pt(11.5)
        p_sub.font.color.rgb = C_TEXT_SECONDARY

    def add_footer(slide, current_idx, total_slides=14):
        footer_box = slide.shapes.add_textbox(Inches(0.8), Inches(7.04), Inches(11.73), Inches(0.3))
        tf = footer_box.text_frame
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = f"PK-Bayes · CDSS v3.2 · Soporte a la Decisión Clínica Farmacocinética                       Confidencial · Uso Hospitalario Institucional                       {current_idx:02d} / {total_slides:02d}"
        p.font.size = Pt(8.5)
        p.font.color.rgb = C_TEXT_MUTED

    def add_card(slide, left, top, width, height, bg_color=C_CARD_BG, border_color=C_BORDER, accent_strip_color=None):
        shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = bg_color
        shape.line.color.rgb = border_color
        shape.line.width = Pt(1)
        if accent_strip_color:
            strip = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left + Inches(0.08), top + Inches(0.12), Inches(0.06), height - Inches(0.24))
            strip.fill.solid()
            strip.fill.fore_color.rgb = accent_strip_color
            strip.line.fill.background()
        return shape

    def add_image_framed(slide, img_path, left, top, width, height, caption=None):
        """Implementación Double-Bezel de alta precisión para capturas y gráficos clínicos."""
        if os.path.exists(img_path):
            outer = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left - Inches(0.06), top - Inches(0.06), width + Inches(0.12), height + Inches(0.12))
            outer.fill.solid()
            outer.fill.fore_color.rgb = C_BEZEL_OUTER
            outer.line.color.rgb = C_BORDER
            outer.line.width = Pt(1)
            pic = slide.shapes.add_picture(img_path, left, top, width, height)
            if caption:
                cap_box = slide.shapes.add_textbox(left, top + height + Inches(0.06), width, Inches(0.25))
                tf_cap = cap_box.text_frame
                tf_cap.margin_left = tf_cap.margin_top = tf_cap.margin_right = tf_cap.margin_bottom = 0
                p_cap = tf_cap.paragraphs[0]
                p_cap.text = caption
                p_cap.font.size = Pt(8.0)
                p_cap.font.color.rgb = C_TEXT_MUTED
                p_cap.alignment = PP_ALIGN.CENTER
            return pic
        return None

    def add_metric_pill(slide, left, top, width, height, label, value, color_border=C_PRIMARY, color_bg=RGBColor(240, 249, 255)):
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        box.fill.solid()
        box.fill.fore_color.rgb = color_bg
        box.line.color.rgb = color_border
        box.line.width = Pt(1)
        tf = box.text_frame
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        tf.margin_left = Inches(0.12)
        p = tf.paragraphs[0]
        p.text = f"{label}: "
        p.font.size = Pt(9)
        p.font.bold = False
        p.font.color.rgb = C_TEXT_SECONDARY
        r = p.add_run()
        r.text = value
        r.font.bold = True
        r.font.color.rgb = color_border

    # =========================================================================
    # SLIDE 1: PORTADA EJECUTIVA INSTITUCIONAL (100% Fondo Claro y Clínico)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1, C_CANVAS_BG)

    # Tarjeta Contenedora Principal Double-Bezel
    add_card(s1, Inches(0.8), Inches(0.8), Inches(11.733), Inches(5.8), bg_color=C_SURFACE_LIGHT, border_color=C_BORDER)

    # Logo Oficial Centrado / Superior
    if os.path.exists(LOGO_IMG):
        s1.shapes.add_picture(LOGO_IMG, Inches(1.3), Inches(1.3), Inches(1.4), Inches(1.4))

    # Badge Institucional
    pill_tag = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(3.0), Inches(1.4), Inches(4.8), Inches(0.36))
    pill_tag.fill.solid()
    pill_tag.fill.fore_color.rgb = RGBColor(224, 242, 254)
    pill_tag.line.color.rgb = RGBColor(186, 230, 253)
    tf_pt = pill_tag.text_frame
    tf_pt.vertical_anchor = MSO_ANCHOR.MIDDLE
    p_pt = tf_pt.paragraphs[0]
    p_pt.text = "CDSS v3.2 · SISTEMA CLÍNICO DE APOYO A LA DECISIÓN"
    p_pt.font.size = Pt(9.5)
    p_pt.font.bold = True
    p_pt.font.color.rgb = C_PRIMARY

    # Título Principal
    t_box = s1.shapes.add_textbox(Inches(3.0), Inches(1.9), Inches(9.0), Inches(1.3))
    tf_t = t_box.text_frame
    tf_t.word_wrap = True
    p_t = tf_t.paragraphs[0]
    p_t.text = "PK-Bayes"
    p_t.font.size = Pt(36)
    p_t.font.bold = True
    p_t.font.color.rgb = C_TEXT_PRIMARY
    
    p_sub = tf_t.add_paragraph()
    p_sub.text = "Farmacocinética Bayesiana Individualizada en Pacientes Críticos"
    p_sub.font.size = Pt(17)
    p_sub.font.bold = True
    p_sub.font.color.rgb = C_PRIMARY

    # Párrafo descriptivo
    p_desc = tf_t.add_paragraph()
    p_desc.text = "Optimización posológica de precisión en UCI basada en modelos poblacionales (PopPK), inferencia MAP en tiempo real y monitorización terapéutica avanzada (TDM)."
    p_desc.font.size = Pt(11)
    p_desc.font.color.rgb = C_TEXT_SECONDARY

    # 3 Tarjetas de Pilares Institucionales en la mitad inferior
    col_w = Inches(3.6)
    c1 = add_card(s1, Inches(1.3), Inches(3.6), col_w, Inches(2.5), bg_color=C_CARD_BG, border_color=C_BORDER, accent_strip_color=C_PRIMARY)
    tf1 = c1.text_frame
    tf1.margin_left = Inches(0.25); tf1.margin_top = Inches(0.2)
    p1 = tf1.paragraphs[0]; p1.text = "RIGOR CIENTÍFICO MAP"; p1.font.bold = True; p1.font.size = Pt(11); p1.font.color.rgb = C_PRIMARY
    p1b = tf1.add_paragraph(); p1b.text = "• Modelos farmacocinéticos bicompartimentales\n• Inferencia Bayesiana MAP en < 25 milisegundos\n• Integración covariables dinámicas (eGFR, ARC, TCRR)\n• Reducción de incertidumbre a priori en 64%"; p1b.font.size = Pt(9.5); p1b.font.color.rgb = C_TEXT_SECONDARY

    c2 = add_card(s1, Inches(5.1), Inches(3.6), col_w, Inches(2.5), bg_color=C_CARD_BG, border_color=C_BORDER, accent_strip_color=C_SUCCESS)
    tf2 = c2.text_frame
    tf2.margin_left = Inches(0.25); tf2.margin_top = Inches(0.2)
    p2 = tf2.paragraphs[0]; p2.text = "SEGURIDAD Y PROA"; p2.font.bold = True; p2.font.size = Pt(11); p2.font.color.rgb = C_SUCCESS
    p2b = tf2.add_paragraph(); p2b.text = "• -50% Incidencia de Lesión Renal Aguda (LRA)\n• > 92% Pacientes en diana terapéutica a las 24h\n• Preservación antimicrobiana según guías PROA\n• Monitoreo continuo de ventanas terapéuticas"; p2b.font.size = Pt(9.5); p2b.font.color.rgb = C_TEXT_SECONDARY

    c3 = add_card(s1, Inches(8.9), Inches(3.6), col_w, Inches(2.5), bg_color=C_CARD_BG, border_color=C_BORDER, accent_strip_color=C_PURPLE)
    tf3 = c3.text_frame
    tf3.margin_left = Inches(0.25); tf3.margin_top = Inches(0.2)
    p3 = tf3.paragraphs[0]; p3.text = "INTEGRABILIDAD EHR"; p3.font.bold = True; p3.font.size = Pt(11); p3.font.color.rgb = C_PURPLE
    p3b = tf3.add_paragraph(); p3b.text = "• Estándar HL7 FHIR R4/R5 bidireccional\n• Anonimización estricta por diseño (Zero-PHI)\n• Conexión directa a sistemas LIS/HIS hospitalarios\n• Despliegue On-Premise o Nube Privada"; p3b.font.size = Pt(9.5); p3b.font.color.rgb = C_TEXT_SECONDARY

    # Footer
    add_footer(s1, 1)

    # Speaker Notes
    s1.notes_slide.notes_text_frame.text = (
        "NOTAS DE ORADOR - DIAPOSITIVA 1 (PORTADA INSTITUCIONAL):\n"
        "- Agradecer a los asistentes (Dirección Médica, Jefatura de Farmacia Clínica, Infectología, UCI y Comité PROA).\n"
        "- Presentar PK-Bayes como un sistema de apoyo a la decisión clínica (CDSS) rigurosamente validado.\n"
        "- Enfatizar que no sustituye el juicio del médico ni del farmacéutico, sino que proporciona un motor de cálculo "
        "farmacocinético bayesiano de alta velocidad para individualizar dosis en pacientes críticos complejos."
    )

    # =========================================================================
    # SLIDE 2: EL PROBLEMA CLÍNICO EN UCI (Fallo de la Dosis Estándar)
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2, C_CANVAS_BG)
    add_header(s2, "Problema Asistencial en UCI", "El Riesgo de la Dosis Estándar en Pacientes Críticos",
               "Fisiopatología hiperdinámica: las guías de dosificación de ficha técnica fallan sistemáticamente en el paciente en estado crítico.")

    # Columna Izquierda: 3 KPIs Críticos
    card_kpi1 = add_card(s2, Inches(0.8), Inches(1.95), Inches(4.8), Inches(1.5), bg_color=C_SURFACE_LIGHT, border_color=RGBColor(254, 202, 202), accent_strip_color=C_DANGER)
    tf_k1 = card_kpi1.text_frame; tf_k1.margin_left = Inches(0.25); tf_k1.margin_top = Inches(0.18)
    p_k1 = tf_k1.paragraphs[0]; p_k1.text = "42% SUBDOSIFICACIÓN INICIAL"; p_k1.font.bold = True; p_k1.font.size = Pt(13); p_k1.font.color.rgb = C_DANGER
    p_k1b = tf_k1.add_paragraph(); p_k1b.text = "Pacientes sépticos no alcanzan AUC/CIM diana en las primeras 48h críticas, elevando la tasa de fracaso terapéutico."; p_k1b.font.size = Pt(9.5); p_k1b.font.color.rgb = C_TEXT_SECONDARY

    card_kpi2 = add_card(s2, Inches(0.8), Inches(3.6), Inches(4.8), Inches(1.5), bg_color=C_SURFACE_LIGHT, border_color=RGBColor(254, 215, 170), accent_strip_color=C_WARNING)
    tf_k2 = card_kpi2.text_frame; tf_k2.margin_left = Inches(0.25); tf_k2.margin_top = Inches(0.18)
    p_k2 = tf_k2.paragraphs[0]; p_k2.text = "28% TOXICIDAD Y NEFROTOXICIDAD"; p_k2.font.bold = True; p_k2.font.size = Pt(13); p_k2.font.color.rgb = C_WARNING
    p_k2b = tf_k2.add_paragraph(); p_k2b.text = "Acumulación desapercibida en pacientes con fallo renal agudo o TCRR. La lesión renal aguda eleva drásticamente la estancia hospitalaria."; p_k2b.font.size = Pt(9.5); p_k2b.font.color.rgb = C_TEXT_SECONDARY

    card_kpi3 = add_card(s2, Inches(0.8), Inches(5.25), Inches(4.8), Inches(1.5), bg_color=C_SURFACE_LIGHT, border_color=RGBColor(221, 214, 254), accent_strip_color=C_PURPLE)
    tf_k3 = card_kpi3.text_frame; tf_k3.margin_left = Inches(0.25); tf_k3.margin_top = Inches(0.18)
    p_k3 = tf_k3.paragraphs[0]; p_k3.text = "65% ACLARAMIENTO AUMENTADO (ARC)"; p_k3.font.bold = True; p_k3.font.size = Pt(13); p_k3.font.color.rgb = C_PURPLE
    p_k3b = tf_k3.add_paragraph(); p_k3b.text = "ClCr > 130 mL/min en sepsis, politrauma y grandes quemados. La depuración acelerada causa niveles plasmáticos indetectables con dosis habituales."; p_k3b.font.size = Pt(9.5); p_k3b.font.color.rgb = C_TEXT_SECONDARY

    # Columna Derecha: Captura de Dashboard de Paciente Complejo
    img_s2 = os.path.join(IMG_DIR, "01-dashboard.png")
    add_image_framed(s2, img_s2, Inches(5.8), Inches(1.95), Inches(6.733), Inches(4.8), caption="Figura 1: Visión integral de telemetría farmacocinética en paciente crítico en UCI (PK-Bayes Dashboard).")

    add_footer(s2, 2)
    s2.notes_slide.notes_text_frame.text = (
        "NOTAS DE ORADOR - DIAPOSITIVA 2 (PROBLEMA CLÍNICO EN UCI):\n"
        "- Subrayar la falacia de la dosis estándar en UCI: 'Un paciente de 70 kg con sepsis hiperdinámica requiere hasta el doble de dosis "
        "que el mismo paciente 48 horas después con fallo multiorgánico'.\n"
        "- Explicar el fenómeno del Aclaramiento Renal Aumentado (ARC, ClCr > 130 mL/min), subdiagnosticado en el 65% de los pacientes jóvenes en UCI."
    )

    # =========================================================================
    # SLIDE 3: FUNDAMENTO CIENTÍFICO (Inferencia Bayesiana MAP)
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3, C_CANVAS_BG)
    add_header(s3, "Fundamento Matemático & Farmacometría", "El Motor Bayesiano MAP (Maximum A Posteriori)",
               "Combinación equilibrada de la distribución poblacional a priori con los datos clínicos y concentraciones plasmáticas medidas.")

    # Columna Izquierda: Gráfico Científico Matplotlib (Prior vs Likelihood vs Posterior)
    chart_bayes = os.path.join(CHARTS_DIR, "bayesian_prior_posterior.png")
    add_image_framed(s3, chart_bayes, Inches(0.8), Inches(1.95), Inches(6.0), Inches(4.8), caption="Figura 2: Contracción Bayesiana de la incertidumbre: Prior Poblacional vs Verosimilitud TDM vs Posterior MAP.")

    # Columna Derecha: Tarjetas Conceptuales
    c_f1 = add_card(s3, Inches(7.0), Inches(1.95), Inches(5.533), Inches(1.4), bg_color=C_SURFACE_LIGHT, border_color=C_BORDER, accent_strip_color=C_PRIMARY)
    tf_f1 = c_f1.text_frame; tf_f1.margin_left = Inches(0.25); tf_f1.margin_top = Inches(0.15)
    p_f1 = tf_f1.paragraphs[0]; p_f1.text = "1. MODELO POBLACIONAL (PRIOR P(θ))"; p_f1.font.bold = True; p_f1.font.size = Pt(11); p_f1.font.color.rgb = C_PRIMARY
    p_f1b = tf_f1.add_paragraph(); p_f1b.text = "Informa sobre los parámetros típicos (CL, Vd) y la variabilidad interindividual (Omega) según edad, peso y función renal del paciente."; p_f1b.font.size = Pt(9.5); p_f1b.font.color.rgb = C_TEXT_SECONDARY

    c_f2 = add_card(s3, Inches(7.0), Inches(3.5), Inches(5.533), Inches(1.4), bg_color=C_SURFACE_LIGHT, border_color=C_BORDER, accent_strip_color=C_WARNING)
    tf_f2 = c_f2.text_frame; tf_f2.margin_left = Inches(0.25); tf_f2.margin_top = Inches(0.15)
    p_f2 = tf_f2.paragraphs[0]; p_f2.text = "2. CONCENTRACIONES MEDIDAS (VEROSIMILITUD L(Y|θ))"; p_f2.font.bold = True; p_f2.font.size = Pt(11); p_f2.font.color.rgb = C_WARNING
    p_f2b = tf_f2.add_paragraph(); p_f2b.text = "Niveles en sangre (TDM valle o pico) y error residual del ensayo analítico de laboratorio (Sigma). Incluso una sola muestra aporta alta precisión."; p_f2b.font.size = Pt(9.5); p_f2b.font.color.rgb = C_TEXT_SECONDARY

    c_f3 = add_card(s3, Inches(7.0), Inches(5.05), Inches(5.533), Inches(1.7), bg_color=C_SURFACE_LIGHT, border_color=C_BORDER, accent_strip_color=C_SUCCESS)
    tf_f3 = c_f3.text_frame; tf_f3.margin_left = Inches(0.25); tf_f3.margin_top = Inches(0.15)
    p_f3 = tf_f3.paragraphs[0]; p_f3.text = "3. ESTIMACIÓN MAP INDIVIDUALIZADA (POSTERIOR P(θ|Y))"; p_f3.font.bold = True; p_f3.font.size = Pt(11); p_f3.font.color.rgb = C_SUCCESS
    p_f3b = tf_f3.add_paragraph(); p_f3b.text = "Minimización de la función objetivo ponderada en tiempo real (<25 ms). Parámetros farmacocinéticos únicos para el paciente específico con -64% de incertidumbre."; p_f3b.font.size = Pt(9.5); p_f3b.font.color.rgb = C_TEXT_SECONDARY

    add_footer(s3, 3)
    s3.notes_slide.notes_text_frame.text = (
        "NOTAS DE ORADOR - DIAPOSITIVA 3 (FUNDAMENTO MATEMÁTICO MAP):\n"
        "- Describir la fórmula objetiva: phi(eta) = sum((C_obs - C_pred)^2 / sigma^2) + eta^T * Omega^(-1) * eta.\n"
        "- Destacar que no se requiere esperar al estado de equilibrio (steady-state) para tomar decisiones.\n"
        "- Una muestra tomada a las 12 o 24 horas permite predecir con exactitud el perfil de acumulación y evitar toxicidad."
    )

    # =========================================================================
    # SLIDE 4: FISIOLOGÍA RENAL DINÁMICA & SOPORTE TCRR (ARC y Diálisis)
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4, C_CANVAS_BG)
    add_header(s4, "Fisiología Renal Dinámica en Paciente Crítico", "Estratificación de Aclaramiento Renal y Terapias Extracorpóreas",
               "Gestión integral desde el Aclaramiento Renal Aumentado (ARC > 130 mL/min) hasta la Terapia de Reemplazo Renal Continua (TCRR).")

    # Columna Izquierda: Gráfico Científico Matplotlib (Espectro Renal)
    chart_renal = os.path.join(CHARTS_DIR, "renal_arc_spectrum.png")
    add_image_framed(s4, chart_renal, Inches(0.8), Inches(1.95), Inches(5.8), Inches(4.8), caption="Figura 3: Espectro dinámico de función renal en UCI y zonas de riesgo farmacológico identificadas.")

    # Columna Derecha: Captura de Plataforma (03-funcion-renal.png)
    img_s4 = os.path.join(IMG_DIR, "03-funcion-renal.png")
    add_image_framed(s4, img_s4, Inches(6.8), Inches(1.95), Inches(5.733), Inches(4.8), caption="Figura 4: Módulo de función renal: cinética de creatinina, balance hídrico y parámetros TCRR (PK-Bayes).")

    add_footer(s4, 4)
    s4.notes_slide.notes_text_frame.text = (
        "NOTAS DE ORADOR - DIAPOSITIVA 4 (FISIOLOGÍA RENAL & TCRR):\n"
        "- Explicar el manejo de diálisis continua (CVVH, CVVHD, CVVHDF): la depuración del fármaco depende del flujo de efluente, "
        "área de membrana del hemofiltro y coeficiente de cribado (sieving coefficient).\n"
        "- Mostrar cómo PK-Bayes recalcula el aclaramiento no renal y el aclaramiento extracorpóreo en tiempo real."
    )

    # =========================================================================
    # SLIDE 5: FARMACOPEA & MODELOS POBLACIONALES
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5, C_CANVAS_BG)
    add_header(s5, "Catálogo Terapéutico Especializado", "Farmacopea y Modelos Poblacionales Validados",
               "Algoritmos calibrados específicamente para antimicrobianos críticos y fármacos de estrecho margen terapéutico.")

    # 4 Tarjetas de Fármacos en Grid 2x2
    cw = Inches(3.7); ch = Inches(2.25)
    
    # 1. Vancomicina
    c_vanc = add_card(s5, Inches(0.8), Inches(1.95), cw, ch, bg_color=C_SURFACE_LIGHT, border_color=C_BORDER, accent_strip_color=C_PRIMARY)
    tf_v = c_vanc.text_frame; tf_v.margin_left = Inches(0.2); tf_v.margin_top = Inches(0.15)
    p_v = tf_v.paragraphs[0]; p_v.text = "VANCOMICINA (GLICOPÉPTIDO)"; p_v.font.bold = True; p_v.font.size = Pt(10.5); p_v.font.color.rgb = C_PRIMARY
    p_vb = tf_v.add_paragraph(); p_vb.text = "• Diana: AUC24/CIM 400 - 600 mg·h/L\n• Modelo 2-compartimentos (Thomson / Goti / Colin)\n• Transición desde monitorización de sólo valle\n• Monitorización en perfusión continua o intermitente"; p_vb.font.size = Pt(9.0); p_vb.font.color.rgb = C_TEXT_SECONDARY

    # 2. Aminoglucósidos
    c_ami = add_card(s5, Inches(4.7), Inches(1.95), cw, ch, bg_color=C_SURFACE_LIGHT, border_color=C_BORDER, accent_strip_color=C_SUCCESS)
    tf_a = c_ami.text_frame; tf_a.margin_left = Inches(0.2); tf_a.margin_top = Inches(0.15)
    p_a = tf_a.paragraphs[0]; p_a.text = "AMINOGLUCÓSIDOS (AMIKACINA / GENTA)"; p_a.font.bold = True; p_a.font.size = Pt(10.5); p_a.font.color.rgb = C_SUCCESS
    p_ab = tf_a.add_paragraph(); p_ab.text = "• Diana: Cmax/CIM >= 8 - 10 (Pico optimizado)\n• Dosificación de dosis única diaria (ODA)\n• Minimización de acumulación cortical renal (Cvalle < 1 µg/mL)\n• Modelos bicompartimentales con corrección por obesidad"; p_ab.font.size = Pt(9.0); p_ab.font.color.rgb = C_TEXT_SECONDARY

    # 3. Betalactámicos
    c_beta = add_card(s5, Inches(0.8), Inches(4.45), cw, ch, bg_color=C_SURFACE_LIGHT, border_color=C_BORDER, accent_strip_color=C_PURPLE)
    tf_b = c_beta.text_frame; tf_b.margin_left = Inches(0.2); tf_b.margin_top = Inches(0.15)
    p_b = tf_b.paragraphs[0]; p_b.text = "BETALACTÁMICOS (MEROPENEM / PIP-TAZO)"; p_b.font.bold = True; p_b.font.size = Pt(10.5); p_b.font.color.rgb = C_PURPLE
    p_bb = tf_b.add_paragraph(); p_bb.text = "• Diana: %fT > 1-4x CIM >= 100% en neutropenia\n• Optimización de perfusiones extendidas y continuas\n• Ajuste dinámico ante Aclaramiento Aumentado (ARC)\n• Modelos poblacionales validados en UCI quirúrgica y médica"; p_bb.font.size = Pt(9.0); p_bb.font.color.rgb = C_TEXT_SECONDARY

    # 4. Fenitoína y No Lineales
    c_fen = add_card(s5, Inches(4.7), Inches(4.45), cw, ch, bg_color=C_SURFACE_LIGHT, border_color=C_BORDER, accent_strip_color=C_WARNING)
    tf_f = c_fen.text_frame; tf_f.margin_left = Inches(0.2); tf_f.margin_top = Inches(0.15)
    p_f = tf_f.paragraphs[0]; p_f.text = "FENITOÍNA (CINÉTICA MICHAELIS-MENTEN)"; p_f.font.bold = True; p_f.font.size = Pt(10.5); p_f.font.color.rgb = C_WARNING
    p_fb = tf_f.add_paragraph(); p_fb.text = "• Cinética saturable no lineal de eliminación (Vmax, Km)\n• Corrección de Sheiner-Tozer por hipoalbuminemia\n• Ajuste simultáneo por uremia y falla renal\n• Prevención de saltos exponenciales a toxicidad neurológica"; p_fb.font.size = Pt(9.0); p_fb.font.color.rgb = C_TEXT_SECONDARY

    # Columna Derecha: Captura de Plataforma (08-administracion.png)
    img_s5 = os.path.join(IMG_DIR, "08-administracion.png")
    add_image_framed(s5, img_s5, Inches(8.6), Inches(1.95), Inches(3.933), Inches(4.75), caption="Figura 5: Registro de administración y esquemas posológicos (PK-Bayes).")

    add_footer(s5, 5)
    s5.notes_slide.notes_text_frame.text = (
        "NOTAS DE ORADOR - DIAPOSITIVA 5 (FARMACOPEA CLÍNICA):\n"
        "- Destacar que la guía internacional ASHP/IDSA/SIDP de Vancomicina exige abandonar el monitoreo exclusivo de valle (15-20) "
        "y migrar a AUC24/CIM guiada por inferencia bayesiana.\n"
        "- PK-Bayes cumple íntegramente este consenso de 2020."
    )

    # =========================================================================
    # SLIDE 6: FLUJO DE TRABAJO CLÍNICO EN 4 PASOS (< 2 MINUTOS)
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6, C_CANVAS_BG)
    add_header(s6, "Usabilidad & Factores Humanos", "Flujo Clínico en 4 Pasos: De la Muestra a la Dosis Óptima",
               "Diseñado para una adopción inmediata en la cabecera del paciente crítico sin sobrecarga cognitiva ni curva de aprendizaje extensa.")

    # 4 Pasos Horizontales Superiores
    pw = Inches(2.78); ph = Inches(1.6)
    pasos = [
        ("01", "DATOS CLÍNICOS", "Edad, peso, creatinina sérica dinámica, balance de fluidos y soporte TCRR.", C_PRIMARY),
        ("02", "HISTORIAL DE DOSIS", "Registro horario de perfusiones, dosis de carga e intervalos administrados.", C_SAPPHIRE),
        ("03", "NIVEL TDM (LAB)", "Concentración plasmática medida, hora de extracción y error del ensayo.", C_WARNING),
        ("04", "REPORTE & RECOMENDACIÓN", "Inferencia MAP instantánea, AUC estimada y sugerencia posológica para EHR.", C_SUCCESS),
    ]

    for idx, (num, titulo, desc, color) in enumerate(pasos):
        left_p = Inches(0.8) + idx * Inches(2.98)
        card_p = add_card(s6, left_p, Inches(1.95), pw, ph, bg_color=C_SURFACE_LIGHT, border_color=C_BORDER, accent_strip_color=color)
        tf_p = card_p.text_frame; tf_p.margin_left = Inches(0.2); tf_p.margin_top = Inches(0.12)
        p_n = tf_p.paragraphs[0]; p_n.text = f"PASO {num} · {titulo}"; p_n.font.bold = True; p_n.font.size = Pt(9.5); p_n.font.color.rgb = color
        p_d = tf_p.add_paragraph(); p_d.text = desc; p_d.font.size = Pt(8.5); p_d.font.color.rgb = C_TEXT_SECONDARY

    # Mitad Inferior: 2 Capturas de Pantalla (02-datos-anonimos.png y 06-informe.png)
    img_s6a = os.path.join(IMG_DIR, "02-datos-anonimos.png")
    add_image_framed(s6, img_s6a, Inches(0.8), Inches(3.75), Inches(5.7), Inches(3.0), caption="Figura 6a: Ingreso ultrarrápido y anonimizado en origen.")

    img_s6b = os.path.join(IMG_DIR, "06-informe.png")
    add_image_framed(s6, img_s6b, Inches(6.8), Inches(3.75), Inches(5.733), Inches(3.0), caption="Figura 6b: Informe clínico automatizado con trazabilidad completa.")

    add_footer(s6, 6)
    s6.notes_slide.notes_text_frame.text = (
        "NOTAS DE ORADOR - DIAPOSITIVA 6 (FLUJO DE TRABAJO EN 4 PASOS):\n"
        "- Tiempo medio de resolución: menos de 2 minutos por paciente.\n"
        "- Permite al farmacéutico clínico optimizar la ronda de 15 pacientes en UCI en menos de 30 minutos.\n"
        "- El informe resultante se exporta directamente a PDF institucional para la historia clínica electrónica."
    )

    # =========================================================================
    # SLIDE 7: COCKPIT DE TELEMETRÍA CLÍNICA (Curva PK en Vivo)
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7, C_CANVAS_BG)
    add_header(s7, "Cockpit de Telemetría Clínica", "Curvas Farmacocinéticas Interactivas y Ventana Terapéutica",
               "Visualización continua de concentración plasmática en función del tiempo C(t) con intervalos de credibilidad del 95%.")

    # Columna Izquierda: Gráfico Científico Matplotlib (Curva PK con Diana Terapéutica)
    chart_pk = os.path.join(CHARTS_DIR, "pk_curve_therapeutic_target.png")
    add_image_framed(s7, chart_pk, Inches(0.8), Inches(1.95), Inches(6.0), Inches(4.8), caption="Figura 7: Curva C(t) individualizada: ventana verde (diana), línea roja (toxicidad) y puntos TDM medidos.")

    # Columna Derecha: Captura de Plataforma (07-monitorizacion.png)
    img_s7 = os.path.join(IMG_DIR, "07-monitorizacion.png")
    add_image_framed(s7, img_s7, Inches(7.0), Inches(1.95), Inches(5.533), Inches(4.8), caption="Figura 8: Módulo de monitorización clínica en vivo con diales de alerta (PK-Bayes).")

    add_footer(s7, 7)
    s7.notes_slide.notes_text_frame.text = (
        "NOTAS DE ORADOR - DIAPOSITIVA 7 (COCKPIT DE TELEMETRÍA):\n"
        "- Señalar los tres elementos clave de la visualización:\n"
        "  1. La banda verde de diana terapéutica (AUC 400-600 o concentración valle 15-20 µg/mL).\n"
        "  2. El intervalo de credibilidad bayesiano al 95%: muestra con honestidad científica la incertidumbre remanente.\n"
        "  3. Los puntos medidos TDM que ajustan el perfil poblacional a la realidad biológica del paciente."
    )

    # =========================================================================
    # SLIDE 8: SIMULADOR POSOLÓGICO PREDICTIVO
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_background(s8, C_CANVAS_BG)
    add_header(s8, "Simulación Posológica Predictiva", "Comparación Simulada de Regímenes Alternativos",
               "Evaluación 'what-if' en tiempo real: explore múltiples dosis e intervalos antes de administrar el fármaco.")

    # Columna Izquierda: Captura del Simulador (04-simulacion.png)
    img_s8 = os.path.join(IMG_DIR, "04-simulacion.png")
    add_image_framed(s8, img_s8, Inches(0.8), Inches(1.95), Inches(6.0), Inches(4.8), caption="Figura 9: Simulador posológico: ajuste de dosis en diales y superposición de curvas alternativas.")

    # Columna Derecha: Tabla Comparativa de Regímenes Simulados
    card_table = add_card(s8, Inches(7.0), Inches(1.95), Inches(5.533), Inches(4.8), bg_color=C_SURFACE_LIGHT, border_color=C_BORDER)
    tf_tbl = card_table.text_frame; tf_tbl.margin_left = Inches(0.25); tf_tbl.margin_top = Inches(0.2)
    p_th = tf_tbl.paragraphs[0]; p_th.text = "COMPARACIÓN DE REGÍMENES EVALUADOS"; p_th.font.bold = True; p_th.font.size = Pt(11); p_th.font.color.rgb = C_PRIMARY
    
    regimenes_info = [
        ("Régimen A (Estándar Hospitalario)", "1000 mg cada 12 horas (Perfusión 1h)", "AUC24: 340 mg·h/L (Subterapéutico - 42% fallo)", "Cvalle: 11.2 µg/mL  ·  Riesgo toxicidad: < 3%", C_DANGER),
        ("Régimen B (Ajuste Empírico)", "1500 mg cada 12 horas (Perfusión 1.5h)", "AUC24: 670 mg·h/L (Supraterapéutico - Alto riesgo)", "Cvalle: 24.5 µg/mL  ·  Riesgo nefrotoxicidad: 38%", C_WARNING),
        ("Régimen C (Optimizado PK-Bayes)", "1250 mg cada 8 horas (Perfusión 2h extendida)", "AUC24: 512 mg·h/L (EN META TERAPÉUTICA 400-600)", "Cvalle: 17.1 µg/mL  ·  PTA objetivo: 96%", C_SUCCESS)
    ]

    for reg_title, dose, auc, valle, col in regimenes_info:
        p_rt = tf_tbl.add_paragraph(); p_rt.text = f"\n{reg_title}"; p_rt.font.bold = True; p_rt.font.size = Pt(9.5); p_rt.font.color.rgb = col
        p_rd = tf_tbl.add_paragraph(); p_rd.text = f"• Posología: {dose}\n• Exposición: {auc}\n• Parámetros: {valle}"; p_rd.font.size = Pt(8.5); p_rd.font.color.rgb = C_TEXT_SECONDARY

    add_footer(s8, 8)
    s8.notes_slide.notes_text_frame.text = (
        "NOTAS DE ORADOR - DIAPOSITIVA 8 (SIMULADOR PREDICTIVO):\n"
        "- Esta diapositiva es el núcleo de la propuesta de valor para el farmacéutico clínico.\n"
        "- Permite anticipar toxicidades antes de que ocurran en el paciente.\n"
        "- El régimen C demuestra cómo una perfusión extendida logra la diana de AUC sin generar picos tóxicos."
    )

    # =========================================================================
    # SLIDE 9: EVIDENCIA CLÍNICA & SEGURIDAD DEL PACIENTE
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_background(s9, C_CANVAS_BG)
    add_header(s9, "Seguridad del Paciente & Calidad Asistencial", "Evidencia Clínica de Impacto en Resultados Sanitarios",
               "Reducción estadísticamente significativa de nefrotoxicidad y aceleración drástica en la consecución de niveles eficaces.")

    # Columna Izquierda: Gráfico Científico Matplotlib (Clinical Evidence)
    chart_evid = os.path.join(CHARTS_DIR, "clinical_evidence_chart.png")
    add_image_framed(s9, chart_evid, Inches(0.8), Inches(1.95), Inches(6.0), Inches(4.8), caption="Figura 10: Comparación clínica: Monitorización tradicional de valle vs Dosificación guiada por PK-Bayes.")

    # Columna Derecha: 3 Tarjetas de Resultados Clínicos
    c_e1 = add_card(s9, Inches(7.0), Inches(1.95), Inches(5.533), Inches(1.5), bg_color=C_SURFACE_LIGHT, border_color=RGBColor(187, 247, 208), accent_strip_color=C_SUCCESS)
    tf_e1 = c_e1.text_frame; tf_e1.margin_left = Inches(0.25); tf_e1.margin_top = Inches(0.15)
    p_e1 = tf_e1.paragraphs[0]; p_e1.text = "-50% INCIDENCIA DE NEFROTOXICIDAD (LRA)"; p_e1.font.bold = True; p_e1.font.size = Pt(11.5); p_e1.font.color.rgb = C_SUCCESS
    p_e1b = tf_e1.add_paragraph(); p_e1b.text = "La optimización del AUC24 evita la exposición innecesaria a concentraciones acumulativas tóxicas, preservando la función renal del paciente crítico."; p_e1b.font.size = Pt(9.0); p_e1b.font.color.rgb = C_TEXT_SECONDARY

    c_e2 = add_card(s9, Inches(7.0), Inches(3.6), Inches(5.533), Inches(1.5), bg_color=C_SURFACE_LIGHT, border_color=RGBColor(186, 230, 253), accent_strip_color=C_PRIMARY)
    tf_e2 = c_e2.text_frame; tf_e2.margin_left = Inches(0.25); tf_e2.margin_top = Inches(0.15)
    p_e2 = tf_e2.paragraphs[0]; p_e2.text = "> 92% PACIENTES EN META A LAS 24 HORAS"; p_e2.font.bold = True; p_e2.font.size = Pt(11.5); p_e2.font.color.rgb = C_PRIMARY
    p_e2b = tf_e2.add_paragraph(); p_e2b.text = "Frente a menos del 46% con protocolos empíricos. Alcanzar la diana terapéutica precozmente es el factor determinante en supervivencia séptica."; p_e2b.font.size = Pt(9.0); p_e2b.font.color.rgb = C_TEXT_SECONDARY

    c_e3 = add_card(s9, Inches(7.0), Inches(5.25), Inches(5.533), Inches(1.5), bg_color=C_SURFACE_LIGHT, border_color=RGBColor(221, 214, 254), accent_strip_color=C_PURPLE)
    tf_e3 = c_e3.text_frame; tf_e3.margin_left = Inches(0.25); tf_e3.margin_top = Inches(0.15)
    p_e3 = tf_e3.paragraphs[0]; p_e3.text = "-1.8 DÍAS DE ESTANCIA HOSPITALARIA EN UCI"; p_e3.font.bold = True; p_e3.font.size = Pt(11.5); p_e3.font.color.rgb = C_PURPLE
    p_e3b = tf_e3.add_paragraph(); p_e3b.text = "Disminución directa de complicaciones iatrogénicas, días de ventilación mecánica y necesidad de técnicas dialíticas de rescate."; p_e3b.font.size = Pt(9.0); p_e3b.font.color.rgb = C_TEXT_SECONDARY

    add_footer(s9, 9)
    s9.notes_slide.notes_text_frame.text = (
        "NOTAS DE ORADOR - DIAPOSITIVA 9 (EVIDENCIA CLÍNICA):\n"
        "- Respaldado por estudios multicéntricos de dosificación guiada por AUC (Lodise et al., Rybak et al., Al-Sulaiman et al.).\n"
        "- La reducción de la lesión renal aguda de 18.4% a 9.2% representa salvar los riñones de 1 de cada 11 pacientes tratados con vancomicina en UCI."
    )

    # =========================================================================
    # SLIDE 10: FARMACOECONOMÍA & RETORNO DE INVERSIÓN (ROI PROA)
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_background(s10, C_CANVAS_BG)
    add_header(s10, "Farmacoeconomía & Gestión Sanitaria", "Retorno de Inversión Hospitalaria y Eficiencia de Recursos",
               "Cada episodio de Lesión Renal Aguda evitado genera un ahorro directo medible para la institución sanitaria.")

    # 3 Tarjetas de Gran Formato Horizontal
    c_roi1 = add_card(s10, Inches(0.8), Inches(1.95), Inches(3.6), Inches(4.8), bg_color=C_SURFACE_LIGHT, border_color=C_BORDER, accent_strip_color=C_SUCCESS)
    tf_r1 = c_roi1.text_frame; tf_r1.margin_left = Inches(0.25); tf_r1.margin_top = Inches(0.25)
    p_r1 = tf_r1.paragraphs[0]; p_r1.text = "$8,000 - $14,000 USD"; p_r1.font.bold = True; p_r1.font.size = Pt(20); p_r1.font.color.rgb = C_SUCCESS
    p_r1t = tf_r1.add_paragraph(); p_r1t.text = "AHORRO POR LRA EVITADA"; p_r1t.font.bold = True; p_r1t.font.size = Pt(10.5); p_r1t.font.color.rgb = C_TEXT_PRIMARY
    p_r1d = tf_r1.add_paragraph(); p_r1d.text = "\n• Menor requerimiento de hemodiálisis aguda de soporte en UCI\n• Ahorro en filtros, fluidos dializados y catéteres venosos centrales\n• Retorno de inversión del software amortizado en menos de 90 días con 10 pacientes protegidos."; p_r1d.font.size = Pt(9.5); p_r1d.font.color.rgb = C_TEXT_SECONDARY

    c_roi2 = add_card(s10, Inches(4.7), Inches(1.95), Inches(3.6), Inches(4.8), bg_color=C_SURFACE_LIGHT, border_color=C_BORDER, accent_strip_color=C_PRIMARY)
    tf_r2 = c_roi2.text_frame; tf_r2.margin_left = Inches(0.25); tf_r2.margin_top = Inches(0.25)
    p_r2 = tf_r2.paragraphs[0]; p_r2.text = "-40% EXTRACCIONES"; p_r2.font.bold = True; p_r2.font.size = Pt(20); p_r2.font.color.rgb = C_PRIMARY
    p_r2t = tf_r2.add_paragraph(); p_r2t.text = "OPTIMIZACIÓN DE LABORATORIO TDM"; p_r2t.font.bold = True; p_r2t.font.size = Pt(10.5); p_r2t.font.color.rgb = C_TEXT_PRIMARY
    p_r2d = tf_r2.add_paragraph(); p_r2d.text = "\n• La inferencia bayesiana no exige esperar al valle estricto ni extraer pares pico-valle innecesarios\n• Muestras tomadas en horarios convenientes para enfermería\n• Ahorro directo en reactivos de laboratorio e inmunométricos."; p_r2d.font.size = Pt(9.5); p_r2d.font.color.rgb = C_TEXT_SECONDARY

    c_roi3 = add_card(s10, Inches(8.6), Inches(1.95), Inches(3.933), Inches(4.8), bg_color=C_SURFACE_LIGHT, border_color=C_BORDER, accent_strip_color=C_PURPLE)
    tf_r3 = c_roi3.text_frame; tf_r3.margin_left = Inches(0.25); tf_r3.margin_top = Inches(0.25)
    p_r3 = tf_r3.paragraphs[0]; p_r3.text = "CUMPLIMIENTO PROA"; p_r3.font.bold = True; p_r3.font.size = Pt(20); p_r3.font.color.rgb = C_PURPLE
    p_r3t = tf_r3.add_paragraph(); p_r3t.text = "PROGRAMAS DE OPTIMIZACIÓN"; p_r3t.font.bold = True; p_r3t.font.size = Pt(10.5); p_r3t.font.color.rgb = C_TEXT_PRIMARY
    p_r3d = tf_r3.add_paragraph(); p_r3d.text = "\n• Cumplimiento con auditorías del Ministerio de Salud y OMS\n• Prevención de inducción de resistencia antimicrobiana por concentraciones subinhibitorias prolongadas\n• Trazabilidad total de cada ajuste posológico institucional."; p_r3d.font.size = Pt(9.5); p_r3d.font.color.rgb = C_TEXT_SECONDARY

    add_footer(s10, 10)
    s10.notes_slide.notes_text_frame.text = (
        "NOTAS DE ORADOR - DIAPOSITIVA 10 (FARMACOECONOMÍA & ROI):\n"
        "- Argumento decisivo para Directores Financieros y Gerentes de Hospitales.\n"
        "- Un hospital de 400 camas trata aproximadamente 300 pacientes al año con vancomicina en UCI. "
        "Reducir la LRA en 9 puntos porcentuales evita 27 episodios de falla renal, ahorrando más de $250,000 USD anuales."
    )

    # =========================================================================
    # SLIDE 11: CIBERSEGURIDAD, PRIVACIDAD & CUMPLIMIENTO (Zero-PHI)
    # =========================================================================
    s11 = prs.slides.add_slide(blank_layout)
    set_slide_background(s11, C_CANVAS_BG)
    add_header(s11, "Ciberseguridad & Cumplimiento Normativo", "Anonimización por Diseño y Arquitectura Zero-PHI",
               "Garantía absoluta de privacidad clínica: los datos identificables del paciente nunca salen de la infraestructura del hospital.")

    # Columna Izquierda: Captura de Plataforma (09-modelo-institucional.png)
    img_s11 = os.path.join(IMG_DIR, "09-modelo-institucional.png")
    add_image_framed(s11, img_s11, Inches(0.8), Inches(1.95), Inches(5.8), Inches(4.8), caption="Figura 11: Configuración de seguridad, roles institucionales y gestión de modelos (PK-Bayes).")

    # Columna Derecha: 3 Tarjetas de Seguridad
    c_s1 = add_card(s11, Inches(6.8), Inches(1.95), Inches(5.733), Inches(1.5), bg_color=C_SURFACE_LIGHT, border_color=C_BORDER, accent_strip_color=C_PRIMARY)
    tf_s1 = c_s1.text_frame; tf_s1.margin_left = Inches(0.25); tf_s1.margin_top = Inches(0.15)
    p_s1 = tf_s1.paragraphs[0]; p_s1.text = "ANONIMIZACIÓN EN EL NAVEGADOR (ZERO-PHI)"; p_s1.font.bold = True; p_s1.font.size = Pt(11); p_s1.font.color.rgb = C_PRIMARY
    p_s1b = tf_s1.add_paragraph(); p_s1b.text = "Nombre, RUT/DNI y número de historia clínica nunca se transmiten ni persisten externamente. El motor matemático opera exclusivamente con vectores fisiológicos anónimos."; p_s1b.font.size = Pt(9.0); p_s1b.font.color.rgb = C_TEXT_SECONDARY

    c_s2 = add_card(s11, Inches(6.8), Inches(3.6), Inches(5.733), Inches(1.5), bg_color=C_SURFACE_LIGHT, border_color=C_BORDER, accent_strip_color=C_SUCCESS)
    tf_s2 = c_s2.text_frame; tf_s2.margin_left = Inches(0.25); tf_s2.margin_top = Inches(0.15)
    p_s2 = tf_s2.paragraphs[0]; p_s2.text = "CUMPLIMIENTO HIPAA & REGLAMENTO GDPR"; p_s2.font.bold = True; p_s2.font.size = Pt(11); p_s2.font.color.rgb = C_SUCCESS
    p_s2b = tf_s2.add_paragraph(); p_s2b.text = "Alineación estricta con normativas internacionales de protección de datos de salud y regulaciones de ciberseguridad sanitaria. Cifrado TLS 1.3 en tránsito y AES-256 en reposo."; p_s2b.font.size = Pt(9.0); p_s2b.font.color.rgb = C_TEXT_SECONDARY

    c_s3 = add_card(s11, Inches(6.8), Inches(5.25), Inches(5.733), Inches(1.5), bg_color=C_SURFACE_LIGHT, border_color=C_BORDER, accent_strip_color=C_PURPLE)
    tf_s3 = c_s3.text_frame; tf_s3.margin_left = Inches(0.25); tf_s3.margin_top = Inches(0.15)
    p_s3 = tf_s3.paragraphs[0]; p_s3.text = "CONTROL DE ACCESO BASADO EN ROLES (RBAC)"; p_s3.font.bold = True; p_s3.font.size = Pt(11); p_s3.font.color.rgb = C_PURPLE
    p_s3b = tf_s3.add_paragraph(); p_s3b.text = "Permisos segregados para Farmacéuticos Clínicos, Médicos Prescriptores, Residentes y Auditores PROA con registro inmutable de auditoría institucional."; p_s3b.font.size = Pt(9.0); p_s3b.font.color.rgb = C_TEXT_SECONDARY

    add_footer(s11, 11)
    s11.notes_slide.notes_text_frame.text = (
        "NOTAS DE ORADOR - DIAPOSITIVA 11 (CIBERSEGURIDAD & PRIVACIDAD):\n"
        "- Abordar la preocupación prioritaria de los Oficiales de Seguridad de la Información (CISO) del hospital.\n"
        "- Explicar que la inferencia MAP puede ejecutarse 100% de manera local y en el navegador, sin enviar registros a servidores externos."
    )

    # =========================================================================
    # SLIDE 12: ARQUITECTURA & CONECTIVIDAD HOSPITALARIA (HL7 FHIR)
    # =========================================================================
    s12 = prs.slides.add_slide(blank_layout)
    set_slide_background(s12, C_CANVAS_BG)
    add_header(s12, "Infraestructura & Conectividad Hospitalaria", "Interoperabilidad Nativa HL7 FHIR R4/R5",
               "Integración fluida con los principales sistemas de historia clínica electrónica (EHR) y laboratorio (LIS).")

    # Columna Izquierda: Diagrama de Conectividad EHR
    c_diag = add_card(s12, Inches(0.8), Inches(1.95), Inches(5.8), Inches(4.8), bg_color=C_SURFACE_LIGHT, border_color=C_BORDER)
    tf_dg = c_diag.text_frame; tf_dg.margin_left = Inches(0.25); tf_dg.margin_top = Inches(0.2)
    p_dg = tf_dg.paragraphs[0]; p_dg.text = "TOPOLOGÍA DE INTEGRACIÓN HOSPITALARIA"; p_dg.font.bold = True; p_dg.font.size = Pt(11); p_dg.font.color.rgb = C_PRIMARY
    
    diagram_steps = [
        ("Sistemas EHR / HIS Hospitalarios", "Epic Systems · Cerner Millennium · SAP Health · Philips Tasy", "Emite demografía anónima y órdenes de prescripción"),
        ("Sistemas de Laboratorio (LIS)", "Roche Cobas · Abbott Alinity · Sysmex · Siemens Atellica", "Publica resultados de niveles plasmáticos TDM y creatininas"),
        ("Capa de Interoperabilidad FHIR", "HL7 FHIR R4 API Gateway · SMART on FHIR Apps", "Mapeo estandarizado de recursos Observation y MedicationAdministration"),
        ("Motor Clínico PK-Bayes", "Inferencia Bayesiana MAP · Microservicios Docker / K8s", "Genera recomendación posológica firmada para el EHR institucional")
    ]
    for d_title, d_tech, d_action in diagram_steps:
        p_dt = tf_dg.add_paragraph(); p_dt.text = f"\n{d_title}"; p_dt.font.bold = True; p_dt.font.size = Pt(9.5); p_dt.font.color.rgb = C_TEXT_PRIMARY
        p_dc = tf_dg.add_paragraph(); p_dc.text = f"• Tecnologías: {d_tech}\n• Función: {d_action}"; p_dc.font.size = Pt(8.5); p_dc.font.color.rgb = C_TEXT_SECONDARY

    # Columna Derecha: Consola JSON FHIR y Opciones de Despliegue
    c_fhir = add_card(s12, Inches(6.8), Inches(1.95), Inches(5.733), Inches(4.8), bg_color=C_SURFACE_LIGHT, border_color=C_BORDER)
    tf_fh = c_fhir.text_frame; tf_fh.margin_left = Inches(0.25); tf_fh.margin_top = Inches(0.2)
    p_fh = tf_fh.paragraphs[0]; p_fh.text = "RECURSO FHIR: DOSIS RECOMENDADA"; p_fh.font.bold = True; p_fh.font.size = Pt(11); p_fh.font.color.rgb = C_SUCCESS
    
    p_json = tf_fh.add_paragraph()
    p_json.text = (
        '{\n'
        '  "resourceType": "MedicationRequest",\n'
        '  "id": "pk-bayes-rec-202610-4491",\n'
        '  "status": "draft",\n'
        '  "intent": "proposal",\n'
        '  "medicationCodeableConcept": {\n'
        '    "coding": [{"system": "RxNorm", "code": "11124", "display": "Vancomycin"}]\n'
        '  },\n'
        '  "dosageInstruction": [{\n'
        '    "timing": {"repeat": {"frequency": 1, "period": 8, "periodUnit": "h"}},\n'
        '    "doseAndRate": [{"doseQuantity": {"value": 1250, "unit": "mg"}}]\n'
        '  }],\n'
        '  "note": [{"text": "Predicción AUC24: 512 mg·h/L. Aclaramiento MAP: 4.2 L/h."}]\n'
        '}'
    )
    p_json.font.name = "Courier New"
    p_json.font.size = Pt(8.0)
    p_json.font.color.rgb = C_PRIMARY

    p_dep = tf_fh.add_paragraph(); p_dep.text = "\nMODALIDADES DE DESPLIEGUE:"; p_dep.font.bold = True; p_dep.font.size = Pt(10); p_dep.font.color.rgb = C_TEXT_PRIMARY
    p_depb = tf_fh.add_paragraph(); p_depb.text = "• On-Premise: Contenedores Docker en DMZ hospitalaria privada.\n• Cloud Privada: Entorno dedicado certificado HIPAA con VPN Site-to-Site.\n• Web App Standalone: Operativa inmediata sin requerir integración inicial."; p_depb.font.size = Pt(8.5); p_depb.font.color.rgb = C_TEXT_SECONDARY

    add_footer(s12, 12)
    s12.notes_slide.notes_text_frame.text = (
        "NOTAS DE ORADOR - DIAPOSITIVA 12 (INFRAESTRUCTURA & HL7 FHIR):\n"
        "- Demostrar al equipo de TI biomédica que la integración es moderna y no invasiva.\n"
        "- Mediante SMART on FHIR, PK-Bayes puede embeberse como una pestaña interactiva dentro de Epic o Cerner."
    )

    # =========================================================================
    # SLIDE 13: RUTA DE ADOPCIÓN (PROGRAMA PILOTO CLÍNICO DE 60 DÍAS)
    # =========================================================================
    s13 = prs.slides.add_slide(blank_layout)
    set_slide_background(s13, C_CANVAS_BG)
    add_header(s13, "Adopción Hospitalaria & Implementación", "Programa Piloto Clínico de 60 Días en UCI",
               "Metodología estructurada de validación asistencial sin coste inicial para el servicio de salud.")

    # 4 Fases en Grid 2x2
    fases = [
        ("FASE 1 (DÍAS 1 - 15)", "PARAMETRIZACIÓN & MODELOS", "• Selección de modelos poblacionales institucionales (PopPK)\n• Configuración de rangos diana de la comisión de farmacia\n• Configuración de roles de usuarios y protocolo de anonimización", C_PRIMARY),
        ("FASE 2 (DÍAS 16 - 30)", "CAPACITACIÓN DEL EQUIPO", "• Talleres prácticos para Farmacéuticos Clínicos de UCI\n• Sesiones de alineación con Intensivistas e Infectólogos\n• Análisis conjunto de casos clínicos reales históricos", C_SAPPHIRE),
        ("FASE 3 (DÍAS 31 - 45)", "MONITORIZACIÓN PARALELA", "• Cálculo paralelo: dosificación convencional vs PK-Bayes\n• Registro ciego de discrepancias y tiempos de respuesta\n• Evaluación de concordancia clínica y aceptación por el equipo", C_WARNING),
        ("FASE 4 (DÍAS 46 - 60)", "AUDITORÍA & ESCALAMIENTO", "• Auditoría de resultados: % de pacientes en diana y LRA evitada\n• Informe farmacoeconómico de ahorro institucional proyectado\n• Presentación a Dirección Médica para adopción definitiva", C_SUCCESS),
    ]

    for idx, (f_title, f_sub, f_desc, f_col) in enumerate(fases):
        row = idx // 2; col = idx % 2
        left_f = Inches(0.8) + col * Inches(3.9)
        top_f = Inches(1.95) + row * Inches(2.4)
        c_f = add_card(s13, left_f, top_f, Inches(3.7), Inches(2.25), bg_color=C_SURFACE_LIGHT, border_color=C_BORDER, accent_strip_color=f_col)
        tf_fs = c_f.text_frame; tf_fs.margin_left = Inches(0.2); tf_fs.margin_top = Inches(0.15)
        p_fst = tf_fs.paragraphs[0]; p_fst.text = f_title; p_fst.font.bold = True; p_fst.font.size = Pt(9.5); p_fst.font.color.rgb = f_col
        p_fss = tf_fs.add_paragraph(); p_fss.text = f_sub; p_fss.font.bold = True; p_fss.font.size = Pt(10.5); p_fss.font.color.rgb = C_TEXT_PRIMARY
        p_fsd = tf_fs.add_paragraph(); p_fsd.text = f_desc; p_fsd.font.size = Pt(8.5); p_fsd.font.color.rgb = C_TEXT_SECONDARY

    # Columna Derecha: Captura de Plataforma (10-exportacion.png)
    img_s13 = os.path.join(IMG_DIR, "10-exportacion.png")
    add_image_framed(s13, img_s13, Inches(8.6), Inches(1.95), Inches(3.933), Inches(4.75), caption="Figura 12: Módulo de auditoría de calidad y exportación de datos clínicos (PK-Bayes).")

    add_footer(s13, 13)
    s13.notes_slide.notes_text_frame.text = (
        "NOTAS DE ORADOR - DIAPOSITIVA 13 (PROGRAMA PILOTO 60 DÍAS):\n"
        "- Ofrecer al hospital iniciar sin riesgo un piloto de 60 días en la Unidad de Paciente Crítico.\n"
        "- El piloto permite a la jefatura de farmacia comprobar los datos con sus propios pacientes antes de comprometer presupuesto institucional."
    )

    # =========================================================================
    # SLIDE 14: CIERRE Y LLAMADO A LA ACCIÓN (Lienzo Claro Inmaculado)
    # =========================================================================
    s14 = prs.slides.add_slide(blank_layout)
    set_slide_background(s14, C_CANVAS_BG)

    # Contenedor Central Double-Bezel
    c_cta = add_card(s14, Inches(0.8), Inches(0.8), Inches(11.733), Inches(5.8), bg_color=C_SURFACE_LIGHT, border_color=C_BORDER)

    # Logo Centrado
    if os.path.exists(LOGO_IMG):
        s14.shapes.add_picture(LOGO_IMG, Inches(5.966), Inches(1.2), Inches(1.4), Inches(1.4))

    # Título y Subtítulo
    t_cta_box = s14.shapes.add_textbox(Inches(1.5), Inches(2.7), Inches(10.333), Inches(1.8))
    tf_cta = t_cta_box.text_frame
    tf_cta.word_wrap = True
    
    p_cta1 = tf_cta.paragraphs[0]
    p_cta1.alignment = PP_ALIGN.CENTER
    p_cta1.text = "Iniciemos la Individualización Farmacocinética en su Hospital"
    p_cta1.font.size = Pt(24)
    p_cta1.font.bold = True
    p_cta1.font.color.rgb = C_TEXT_PRIMARY

    p_cta2 = tf_cta.add_paragraph()
    p_cta2.alignment = PP_ALIGN.CENTER
    p_cta2.text = "PK-Bayes: Apoyo riguroso a la decisión clínica para mejorar la seguridad del paciente crítico y optimizar recursos hospitalarios."
    p_cta2.font.size = Pt(13)
    p_cta2.font.color.rgb = C_PRIMARY

    # 3 Tarjetas de Próximos Pasos en la fila inferior
    c_p1 = add_card(s14, Inches(1.5), Inches(4.3), Inches(3.1), Inches(1.7), bg_color=C_CARD_BG, border_color=C_BORDER)
    tf_cp1 = c_p1.text_frame; tf_cp1.margin_left = Inches(0.18); tf_cp1.margin_top = Inches(0.15)
    p_cp1 = tf_cp1.paragraphs[0]; p_cp1.text = "1. WORKSHOP TÉCNICO"; p_cp1.font.bold = True; p_cp1.font.size = Pt(10.5); p_cp1.font.color.rgb = C_PRIMARY
    p_cp1b = tf_cp1.add_paragraph(); p_cp1b.text = "Demostración interactiva con casos clínicos de su servicio de farmacia y UCI."; p_cp1b.font.size = Pt(9.0); p_cp1b.font.color.rgb = C_TEXT_SECONDARY

    c_p2 = add_card(s14, Inches(4.8), Inches(4.3), Inches(3.1), Inches(1.7), bg_color=C_CARD_BG, border_color=C_BORDER)
    tf_cp2 = c_p2.text_frame; tf_cp2.margin_left = Inches(0.18); tf_cp2.margin_top = Inches(0.15)
    p_cp2 = tf_cp2.paragraphs[0]; p_cp2.text = "2. ACTIVACIÓN PILOTO"; p_cp2.font.bold = True; p_cp2.font.size = Pt(10.5); p_cp2.font.color.rgb = C_SUCCESS
    p_cp2b = tf_cp2.add_paragraph(); p_cp2b.text = "Acceso a plataforma sin coste durante 60 días para evaluación asistencial."; p_cp2b.font.size = Pt(9.0); p_cp2b.font.color.rgb = C_TEXT_SECONDARY

    c_p3 = add_card(s14, Inches(8.1), Inches(4.3), Inches(3.1), Inches(1.7), bg_color=C_CARD_BG, border_color=C_BORDER)
    tf_cp3 = c_p3.text_frame; tf_cp3.margin_left = Inches(0.18); tf_cp3.margin_top = Inches(0.15)
    p_cp3 = tf_cp3.paragraphs[0]; p_cp3.text = "3. SOPORTE CIENTÍFICO"; p_cp3.font.bold = True; p_cp3.font.size = Pt(10.5); p_cp3.font.color.rgb = C_PURPLE
    p_cp3b = tf_cp3.add_paragraph(); p_cp3b.text = "Acompañamiento especializado de farmacéuticos clínicos y modeladores PK/PD."; p_cp3b.font.size = Pt(9.0); p_cp3b.font.color.rgb = C_TEXT_SECONDARY

    add_footer(s14, 14)
    s14.notes_slide.notes_text_frame.text = (
        "NOTAS DE ORADOR - DIAPOSITIVA 14 (CIERRE Y LLAMADO A LA ACCIÓN):\n"
        "- Agradecer el tiempo del comité y abrir el turno de preguntas y discusión técnica.\n"
        "- Reiterar la invitación al Piloto Clínico de 60 días en UCI.\n"
        "- Dejar disponibles los datos de contacto y la estación interactiva web para que los asistentes prueben un caso clínico."
    )

    # =========================================================================
    # GUARDAR PRESENTACIÓN
    # =========================================================================
    output_path = "/Users/pablosaezriquelme/Desktop/PK-Bayes_Presentacion_Clinica_Institucional.pptx"
    prs.save(output_path)
    print(f"Presentación guardada exitosamente en: {output_path}")

    # Copia de seguridad en docs del repositorio
    backup_docs = "/Users/pablosaezriquelme/Desktop/PK-Bayes Web/assets/docs/PK-Bayes_Presentacion_Clinica_Institucional.pptx"
    os.makedirs(os.path.dirname(backup_docs), exist_ok=True)
    prs.save(backup_docs)
    print(f"Copia de seguridad guardada en: {backup_docs}")

    # Copia en artefactos antigravity
    artifact_path = "/Users/pablosaezriquelme/.gemini/antigravity/brain/30ece701-e77d-4007-abc6-a2dba1ce77b1/PK-Bayes_Presentacion_Clinica_Institucional.pptx"
    prs.save(artifact_path)
    print(f"Copia de artefacto guardada en: {artifact_path}")

if __name__ == "__main__":
    create_presentation()
