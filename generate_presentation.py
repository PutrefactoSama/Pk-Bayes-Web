#!/usr/bin/env python3
"""
Generador de Presentación Institucional y Clínica en PowerPoint (PPTX) para PK-Bayes.
Diseñado con estándares de alta dirección médica, farmacia clínica y factores humanos.
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

# Paleta Cromática Clínica
C_NAVY_DARK    = RGBColor(10, 25, 47)     # #0A192F (Fondo oscuro elegante)
C_NAVY_SURFACE = RGBColor(16, 37, 66)     # #102542 (Tarjetas sobre fondo oscuro)
C_WHITE        = RGBColor(255, 255, 255) # #FFFFFF
C_BG_LIGHT     = RGBColor(248, 250, 252) # #F8FAFC (Lienzo claro clínico)
C_CARD_BG      = RGBColor(255, 255, 255) # #FFFFFF
C_CARD_BORDER  = RGBColor(226, 232, 240) # #E2E8F0
C_TEXT_DARK    = RGBColor(15, 23, 42)     # #0F172A
C_TEXT_MUTED   = RGBColor(100, 116, 139) # #64748B
C_TEXT_LIGHT   = RGBColor(241, 245, 249) # #F1F5F9
C_BRAND_CYAN   = RGBColor(2, 132, 199)   # #0284C7
C_BRAND_EMERALD= RGBColor(5, 150, 105)   # #059669
C_ACCENT_AMBER = RGBColor(217, 119, 6)   # #D97706
C_ACCENT_ROSE  = RGBColor(225, 29, 72)   # #E11D48
C_PILL_BG      = RGBColor(224, 242, 254) # #E0F2FE
C_PILL_TEXT    = RGBColor(3, 105, 161)   # #0369A1

IMG_DIR = "/Users/pablosaezriquelme/Desktop/PK-Bayes Web/assets/img"
PROD_DIR = "/Users/pablosaezriquelme/Desktop/PK-Bayes Web/assets/img/product"
LOGO_IMG = os.path.join(IMG_DIR, "logo-icon-512.png")

def create_presentation():
    prs = Presentation()
    prs.slide_width = SLIDE_WIDTH
    prs.slide_height = SLIDE_HEIGHT
    blank_layout = prs.slide_layouts[6] # Blank slide

    def set_slide_background(slide, color):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = color

    def add_header(slide, tag_text, title_text, subtitle_text, is_dark=False):
        # Badge Pill
        tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.48), Inches(6.0), Inches(0.35))
        tf_tag = tag_box.text_frame
        tf_tag.word_wrap = True
        tf_tag.margin_left = tf_tag.margin_top = tf_tag.margin_right = tf_tag.margin_bottom = 0
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = tag_text.upper()
        p_tag.font.size = Pt(9.5)
        p_tag.font.bold = True
        p_tag.font.color.rgb = C_BRAND_CYAN if not is_dark else RGBColor(56, 189, 248)

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.78), Inches(11.7), Inches(0.65))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        tf_title.margin_left = tf_title.margin_top = tf_title.margin_right = tf_title.margin_bottom = 0
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = C_TEXT_DARK if not is_dark else C_WHITE

        # Subtitle
        sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.42), Inches(11.7), Inches(0.45))
        tf_sub = sub_box.text_frame
        tf_sub.word_wrap = True
        tf_sub.margin_left = tf_sub.margin_top = tf_sub.margin_right = tf_sub.margin_bottom = 0
        p_sub = tf_sub.paragraphs[0]
        p_sub.text = subtitle_text
        p_sub.font.size = Pt(12)
        p_sub.font.color.rgb = C_TEXT_MUTED if not is_dark else RGBColor(148, 163, 184)

    def add_footer(slide, current_idx, total_slides=14, is_dark=False):
        footer_box = slide.shapes.add_textbox(Inches(0.8), Inches(7.0), Inches(11.73), Inches(0.3))
        tf = footer_box.text_frame
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = f"PK-Bayes · Decision Support System CDSS v3.2                                                Documento Institucional Clínico                                                {current_idx:02d} / {total_slides:02d}"
        p.font.size = Pt(8.5)
        p.font.color.rgb = RGBColor(148, 163, 184) if not is_dark else RGBColor(100, 116, 139)

    def add_card(slide, left, top, width, height, bg_color=C_CARD_BG, border_color=C_CARD_BORDER, accent_strip_color=None):
        shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = bg_color
        shape.line.color.rgb = border_color
        shape.line.width = Pt(1)
        if accent_strip_color:
            strip = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top + Inches(0.12), Inches(0.08), height - Inches(0.24))
            strip.fill.solid()
            strip.fill.fore_color.rgb = accent_strip_color
            strip.line.fill.background()
        return shape

    def add_image_framed(slide, img_path, left, top, width, height):
        if os.path.exists(img_path):
            outer = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left - Inches(0.06), top - Inches(0.06), width + Inches(0.12), height + Inches(0.12))
            outer.fill.solid()
            outer.fill.fore_color.rgb = RGBColor(241, 245, 249)
            outer.line.color.rgb = RGBColor(226, 232, 240)
            outer.line.width = Pt(1)
            slide.shapes.add_picture(img_path, left, top, width, height)

    # =========================================================================
    # SLIDE 1: PORTADA EJECUTIVA INSTITUCIONAL (Dark Canvas)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1, C_NAVY_DARK)

    # Logo
    if os.path.exists(LOGO_IMG):
        s1.shapes.add_picture(LOGO_IMG, Inches(0.9), Inches(1.2), Inches(1.3), Inches(1.3))

    # Badge Pill
    pill = add_card(s1, Inches(2.4), Inches(1.3), Inches(4.3), Inches(0.42), bg_color=RGBColor(16, 42, 77), border_color=RGBColor(30, 64, 110))
    tf_pill = pill.text_frame
    tf_pill.vertical_anchor = MSO_ANCHOR.MIDDLE
    p_pill = tf_pill.paragraphs[0]
    p_pill.text = "SISTEMA DE APOYO A LA DECISIÓN CLÍNICA · CDSS v3.2"
    p_pill.font.size = Pt(9.5)
    p_pill.font.bold = True
    p_pill.font.color.rgb = RGBColor(56, 189, 248)
    p_pill.alignment = PP_ALIGN.CENTER

    # Main Title
    tbox1 = s1.shapes.add_textbox(Inches(0.9), Inches(2.7), Inches(11.5), Inches(1.6))
    tf1 = tbox1.text_frame
    tf1.word_wrap = True
    p1 = tf1.paragraphs[0]
    p1.text = "PK-Bayes"
    p1.font.size = Pt(46)
    p1.font.bold = True
    p1.font.color.rgb = C_WHITE

    p1_sub = tf1.add_paragraph()
    p1_sub.text = "Farmacocinética Bayesiana de Precisión en Paciente Crítico"
    p1_sub.font.size = Pt(24)
    p1_sub.font.bold = True
    p1_sub.font.color.rgb = RGBColor(56, 189, 248)
    p1_sub.space_before = Pt(8)

    # Lead description
    lead_box = s1.shapes.add_textbox(Inches(0.9), Inches(4.5), Inches(8.5), Inches(1.2))
    tf_lead = lead_box.text_frame
    tf_lead.word_wrap = True
    p_lead = tf_lead.paragraphs[0]
    p_lead.text = "Plataforma clínica para la individualización posológica en tiempo real (< 25 ms). Integra modelos farmacocinéticos poblacionales (PopPK), fisiología renal dinámica y concentraciones plasmáticas medidas para maximizar la eficacia terapéutica y prevenir la toxicidad."
    p_lead.font.size = Pt(13.5)
    p_lead.font.color.rgb = RGBColor(203, 213, 225)

    # 3 Feature Pills on right / bottom
    features = [
        ("INFERENCIA BAYESIANA MAP", "Ajuste en < 25 ms con regularización"),
        ("FUNCIÓN RENAL EN UCI", "Modelado dinámico por tramos de ClCr y TCRR"),
        ("GUÍAS ASHP / IDSA / ESCMID", "Optimización AUC24/CIM e infusión continua")
    ]
    for i, (f_title, f_desc) in enumerate(features):
        c = add_card(s1, Inches(0.9 + i*3.9), Inches(5.85), Inches(3.7), Inches(0.9), bg_color=C_NAVY_SURFACE, border_color=RGBColor(30, 58, 95))
        tf_c = c.text_frame
        tf_c.margin_left = tf_c.margin_top = Inches(0.12)
        p_ct = tf_c.paragraphs[0]
        p_ct.text = f_title
        p_ct.font.size = Pt(9.5)
        p_ct.font.bold = True
        p_ct.font.color.rgb = RGBColor(16, 185, 129)
        p_cd = tf_c.add_paragraph()
        p_cd.text = f_desc
        p_cd.font.size = Pt(10)
        p_cd.font.color.rgb = RGBColor(148, 163, 184)

    add_footer(s1, 1, 14, is_dark=True)

    # =========================================================================
    # SLIDE 2: EL DESAFÍO CLÍNICO (El fallo de la dosis estándar)
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2, C_BG_LIGHT)
    add_header(s2, "Problema Clínico & Variabilidad en UCI", 
               "El Límite de la Dosis Fija: 'One Size Does NOT Fit All'",
               "La alta variabilidad farmacocinética interindividual en el paciente crítico convierte la dosificación estándar en una ruleta clínica.")

    # 3 Problem Cards
    card1 = add_card(s2, Inches(0.8), Inches(1.95), Inches(3.7), Inches(4.8))
    tf1 = card1.text_frame
    tf1.margin_left = tf1.margin_top = Inches(0.25)
    tf1.margin_right = Inches(0.2)
    p = tf1.paragraphs[0]
    p.text = "SUBDOSIFICACIÓN INICIAL"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_ACCENT_AMBER
    
    p = tf1.add_paragraph()
    p.text = "42%"
    p.font.size = Pt(38)
    p.font.bold = True
    p.font.color.rgb = C_ACCENT_AMBER
    p.space_after = Pt(8)

    bullets1 = [
        "Fracaso terapéutico en las primeras 48 horas de sepsis severa.",
        "Aparición y selección de cepas resistentes por concentraciones subóptimas.",
        "Aclaramiento Renal Aumentado (ARC > 130 mL/min) no detectado por protocolos estándar.",
        "Mayor mortalidad en shock séptico por retraso en alcanzar dianas farmacodinámicas."
    ]
    for b in bullets1:
        p = tf1.add_paragraph()
        p.text = "• " + b
        p.font.size = Pt(10.5)
        p.font.color.rgb = C_TEXT_MUTED
        p.space_after = Pt(4)

    card2 = add_card(s2, Inches(4.8), Inches(1.95), Inches(3.7), Inches(4.8))
    tf2 = card2.text_frame
    tf2.margin_left = tf2.margin_top = Inches(0.25)
    tf2.margin_right = Inches(0.2)
    p = tf2.paragraphs[0]
    p.text = "SOBREDOSIFICACIÓN & TOXICIDAD"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_ACCENT_ROSE

    p = tf2.add_paragraph()
    p.text = "28%"
    p.font.size = Pt(38)
    p.font.bold = True
    p.font.color.rgb = C_ACCENT_ROSE
    p.space_after = Pt(8)

    bullets2 = [
        "Incidencia de Lesión Renal Aguda (LRA / AKI) asociada a glicopéptidos y aminoglucósidos.",
        "Sobredosis acumulativa inadvertida por deterioro dinámico de la función renal.",
        "Coste añadido de $8,000–$14,000 USD por paciente que requiere soporte dialítico secundario.",
        "Prolongación innecesaria de la estancia en camas críticas de alta complejidad."
    ]
    for b in bullets2:
        p = tf2.add_paragraph()
        p.text = "• " + b
        p.font.size = Pt(10.5)
        p.font.color.rgb = C_TEXT_MUTED
        p.space_after = Pt(4)

    card3 = add_card(s2, Inches(8.8), Inches(1.95), Inches(3.7), Inches(4.8))
    tf3 = card3.text_frame
    tf3.margin_left = tf3.margin_top = Inches(0.25)
    tf3.margin_right = Inches(0.2)
    p = tf3.paragraphs[0]
    p.text = "RETARDOS DEL TDM TRADICIONAL"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_BRAND_CYAN

    p = tf3.add_paragraph()
    p.text = "48–72h"
    p.font.size = Pt(38)
    p.font.bold = True
    p.font.color.rgb = C_BRAND_CYAN
    p.space_after = Pt(8)

    bullets3 = [
        "El método convencional exige esperar al 'estado estacionario' (4.ª o 5.ª dosis) para medir niveles.",
        "Dependencia de niveles valle (Cmin) aislados que no reflejan la verdadera exposición (AUC24).",
        "Ajustes empíricos lineales ('a ojo') que fallan ante cinéticas no lineales o volúmenes cambiantes.",
        "Pérdida de la ventana de oportunidad terapéutica más crítica para el pronóstico del paciente."
    ]
    for b in bullets3:
        p = tf3.add_paragraph()
        p.text = "• " + b
        p.font.size = Pt(10.5)
        p.font.color.rgb = C_TEXT_MUTED
        p.space_after = Pt(4)

    add_footer(s2, 2, 14)

    # =========================================================================
    # SLIDE 3: LA SOLUCIÓN — FARMACOCINÉTICA BAYESIANA EN TIEMPO REAL
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3, C_BG_LIGHT)
    add_header(s3, "Metodología & Fundamento Científico", 
               "La Solución: Inferencia Bayesiana MAP a Pie de Cama",
               "PK-Bayes fusiona el conocimiento poblacional previo con los datos clínicos y niveles medidos del paciente en milisegundos.")

    # Left Column (Concept & Math Triad)
    col_w = Inches(5.6)
    c_triad = add_card(s3, Inches(0.8), Inches(1.95), col_w, Inches(4.8))
    tf_triad = c_triad.text_frame
    tf_triad.margin_left = tf_triad.margin_top = Inches(0.25)
    tf_triad.margin_right = Inches(0.2)

    p = tf_triad.paragraphs[0]
    p.text = "¿CÓMO FUNCIONA EL MOTOR BAYESIANO?"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_BRAND_CYAN

    triad_items = [
        ("1. Prior Poblacional (PopPK)", "Modelos validados en miles de pacientes que definen la distribución estadística típica de Vd, Cl y variabilidad interindividual (IIV / ω²)."),
        ("2. Covariables del Paciente", "Ajuste individualizado según edad, peso real/ajustado, función renal por tramos temporales y terapias de soporte extracorpóreo."),
        ("3. Concentraciones Plasmáticas (TDM)", "Incluso con solo 1 o 2 muestras en tiempos no estándar, el algoritmo calcula la función de verosimilitud de los niveles reales."),
        ("4. Estimación MAP (Maximum A Posteriori)", "Minimiza la función objetivo bayesiana calculando los parámetros individuales (η_i) más probables en menos de 25 milisegundos.")
    ]

    for title, desc in triad_items:
        p_t = tf_triad.add_paragraph()
        p_t.text = title
        p_t.font.size = Pt(11.5)
        p_t.font.bold = True
        p_t.font.color.rgb = C_TEXT_DARK
        p_t.space_before = Pt(8)

        p_d = tf_triad.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(10.5)
        p_d.font.color.rgb = C_TEXT_MUTED

    # Right Column (Visual Mockup of Curve)
    mockup_path = os.path.join(PROD_DIR, "04-simulacion.png")
    if os.path.exists(mockup_path):
        add_image_framed(s3, mockup_path, Inches(6.7), Inches(1.95), Inches(5.8), Inches(3.4))

    # Benefit Card under mockup
    c_ben = add_card(s3, Inches(6.7), Inches(5.5), Inches(5.8), Inches(1.25))
    tf_ben = c_ben.text_frame
    tf_ben.margin_left = tf_ben.margin_top = Inches(0.18)
    p_b1 = tf_ben.paragraphs[0]
    p_b1.text = "VENTAJA CLÍNICA CLAVE"
    p_b1.font.size = Pt(10)
    p_b1.font.bold = True
    p_b1.font.color.rgb = C_BRAND_EMERALD

    p_b2 = tf_ben.add_paragraph()
    p_b2.text = "No requiere esperar al estado estacionario ni extraer muestras exclusivamente en el valle estricto. La predicción es continua, anticipatoria y exacta desde la primera dosis administrada."
    p_b2.font.size = Pt(11)
    p_b2.font.color.rgb = C_TEXT_DARK

    add_footer(s3, 3, 14)

    # =========================================================================
    # SLIDE 4: FISIOLOGÍA RENAL DINÁMICA & DIÁLISIS EN UCI
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4, C_BG_LIGHT)
    add_header(s4, "Fisiología Renal Dinámica en Paciente Crítico", 
               "Modelado de Aclaramiento Renal Cambiante y TCRR",
               "PK-Bayes supera el dogma del 'ClCr estático' mediante tramos temporales fisiológicos y soporte para diálisis continua.")

    # Left: Screenshot of Renal Function
    renal_img = os.path.join(PROD_DIR, "03-funcion-renal.png")
    if os.path.exists(renal_img):
        add_image_framed(s4, renal_img, Inches(0.8), Inches(1.95), Inches(6.0), Inches(4.8))

    # Right: 3 Key Clinical Capabilities
    right_x = Inches(7.1)
    right_w = Inches(5.4)

    cap_items = [
        ("Aclaramiento Segmentado por Tramos", 
         "Permite definir diferentes valores de creatinina y función renal a lo largo del tratamiento. Si el paciente entra en shock y luego recupera perfusión, el modelo calcula la depuración exacta en cada tramo temporal.", 
         C_BRAND_CYAN),
        ("Soporte Completo para TCRR y Hemodiálisis", 
         "Parámetros específicos para hemofiltración venovenosa continua (CVVH), hemodiafiltración (CVVHDF) y diálisis intermitente. Considera tasa de efluente, dosis dialítica y aclaramiento de membrana.", 
         C_BRAND_EMERALD),
        ("Detección de Aclaramiento Aumentado (ARC)", 
         "Identifica pacientes jóvenes o politraumatizados con ClCr > 130 mL/min que subdosifican antibióticos en regímenes estándar, alertando la necesidad de dosis de carga y perfusión extendida.", 
         C_ACCENT_AMBER)
    ]

    for i, (title, desc, color) in enumerate(cap_items):
        c = add_card(s4, right_x, Inches(1.95 + i*1.65), right_w, Inches(1.5))
        tf = c.text_frame
        tf.margin_left = tf.margin_top = Inches(0.18)
        tf.margin_right = Inches(0.15)
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(11.5)
        p.font.bold = True
        p.font.color.rgb = color
        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = C_TEXT_MUTED
        p_d.space_before = Pt(4)

    add_footer(s4, 4, 14)

    # =========================================================================
    # SLIDE 5: CATÁLOGO DE FÁRMACOS Y MODELOS VALIDADOS
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5, C_BG_LIGHT)
    add_header(s5, "Farmacopea & Modelos Poblacionales", 
               "Catálogo de Fármacos de Estrecho Margen Terapéutico",
               "Modelos farmacocinéticos multi-compartimentales rigurosamente contrastados con la literatura internacional.")

    drugs = [
        ("Vancomicina (1 y 2 Compartimentos)", 
         "Consenso ASHP/IDSA 2020",
         "Optimización guiada por AUC24/CIM (400-600 mg·h/L). Modelos de Rodvold, Thomson y Colin. Infusión intermitente y continua para prevención de nefrotoxicidad.",
         C_BRAND_CYAN),
        ("Aminoglucósidos (Amikacina, Gentamicina)", 
         "Dosificación Extendida ODA",
         "Maximización del ratio bactericida Cmax/CIM (> 8-10) con minimización de la acumulación residual en valle (Cmin < 1 mg/L) para protección coclear y renal.",
         C_BRAND_EMERALD),
        ("Betalactámicos en Perfusión Extendida", 
         "Meropenem, Piperacilina/Tazo, Cefepime",
         "Optimización de diana farmacodinámica tiempo sobre CIM (100% fT > CIM y 100% fT > 4x CIM) para infecciones por patógenos multidiorresistentes (BMR).",
         C_ACCENT_AMBER),
        ("Fenitoína (Cinética No Lineal Saturable)", 
         "Michaelis-Menten & Sheiner-Tozer",
         "Modelado de saturación enzimática (Vmax y Km). Corrección obligatoria de concentraciones por hipoalbuminemia y uremia para evitar intoxicación neurológica.",
         C_ACCENT_ROSE)
    ]

    for i, (name, tag, details, tone) in enumerate(drugs):
        r = i // 2
        c = i % 2
        x = Inches(0.8 + c*6.0)
        y = Inches(1.95 + r*2.45)
        card = add_card(s5, x, y, Inches(5.7), Inches(2.3))
        tf = card.text_frame
        tf.margin_left = tf.margin_top = Inches(0.2)
        tf.margin_right = Inches(0.18)

        p = tf.paragraphs[0]
        p.text = tag.upper()
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = tone

        p_name = tf.add_paragraph()
        p_name.text = name
        p_name.font.size = Pt(13.5)
        p_name.font.bold = True
        p_name.font.color.rgb = C_TEXT_DARK

        p_det = tf.add_paragraph()
        p_det.text = details
        p_det.font.size = Pt(10.5)
        p_det.font.color.rgb = C_TEXT_MUTED
        p_det.space_before = Pt(6)

    add_footer(s5, 5, 14)

    # =========================================================================
    # SLIDE 6: FLUJO DE TRABAJO CLÍNICO EN 4 PASOS
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6, C_BG_LIGHT)
    add_header(s6, "Usabilidad & Factores Humanos en Salud", 
               "Flujo de Trabajo Clínico en Menos de 2 Minutos",
               "Diseñado para integrarse de forma natural en la ronda médica de UCI o en la interconsulta de farmacia clínica.")

    steps = [
        ("PASO 01", "Registro del Paciente", 
         "Ingreso seguro y anonimizado. Selección de edad, peso real/ajustado/magro y perfil renal dinámico.", 
         C_BRAND_CYAN),
        ("PASO 02", "Régimen & Muestras TDM", 
         "Registro del esquema administrado (dosis, intervalo, duración infusión) y niveles medidos con hora exacta.", 
         C_BRAND_EMERALD),
        ("PASO 03", "Ajuste Bayesiano Instantáneo", 
         "Cálculo en < 25 ms. Visualización de la curva individual, aclaramiento propio, Vd real y AUC24 proyectado.", 
         C_ACCENT_AMBER),
        ("PASO 04", "Simulación & Recomendación", 
         "Comparador de regímenes alternativos. Selección de la dosis con PTA > 90% y exportación del informe PDF.", 
         RGBColor(99, 102, 241))
    ]

    step_w = Inches(2.78)
    for i, (step_num, step_title, step_desc, step_color) in enumerate(steps):
        x = Inches(0.8 + i*2.98)
        card = add_card(s6, x, Inches(1.95), step_w, Inches(4.8))
        tf = card.text_frame
        tf.margin_left = tf.margin_top = Inches(0.22)
        tf.margin_right = Inches(0.18)

        p = tf.paragraphs[0]
        p.text = step_num
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = step_color

        p_t = tf.add_paragraph()
        p_t.text = step_title
        p_t.font.size = Pt(14)
        p_t.font.bold = True
        p_t.font.color.rgb = C_TEXT_DARK
        p_t.space_before = Pt(4)
        p_t.space_after = Pt(12)

        p_d = tf.add_paragraph()
        p_d.text = step_desc
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = C_TEXT_MUTED
        p_d.line_spacing = 1.2

    add_footer(s6, 6, 14)

    # =========================================================================
    # SLIDE 7: INTERFAZ CLÍNICA Y TELEMETRÍA VISUAL
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7, C_BG_LIGHT)
    add_header(s7, "Cockpit de Telemetría Clínica", 
               "Telemetría Farmacocinética de Alta Resolución",
               "Curvas interactivas, intervalos de credibilidad del 95% y diales semafóricos de riesgo en una sola vista.")

    # Left: Big Screenshot
    dash_img = os.path.join(PROD_DIR, "01-dashboard.png")
    if os.path.exists(dash_img):
        add_image_framed(s7, dash_img, Inches(0.8), Inches(1.95), Inches(6.8), Inches(4.8))

    # Right: Telemetry Explanations
    c_right = add_card(s7, Inches(7.8), Inches(1.95), Inches(4.7), Inches(4.8))
    tf_r = c_right.text_frame
    tf_r.margin_left = tf_r.margin_top = Inches(0.25)
    tf_r.margin_right = Inches(0.2)

    p = tf_r.paragraphs[0]
    p.text = "INDICADORES EN TIEMPO REAL"
    p.font.size = Pt(10.5)
    p.font.bold = True
    p.font.color.rgb = C_BRAND_CYAN

    kpis_exp = [
        ("Curva PK Individual vs. Poblacional", "Contraste visual inmediato entre lo esperado estadísticamente y el perfil cinético real ajustado al paciente."),
        ("Bandas de Incertidumbre Bayesiana", "Intervalos del 95% que muestran la dispersión y certeza estadística de la predicción en cada hora del intervalo."),
        ("Diales Semafóricos de Seguridad", "Evaluación instantánea de probabilidad de éxito (PTA) y banderas de alarma ante riesgo de sobreexposición o acumulación."),
        ("Exportación de Reporte para Ficha Clínica", "Generación de informe en PDF estandarizado con parámetros farmacocinéticos, firma profesional y trazabilidad legal.")
    ]

    for title, desc in kpis_exp:
        p_t = tf_r.add_paragraph()
        p_t.text = title
        p_t.font.size = Pt(11.5)
        p_t.font.bold = True
        p_t.font.color.rgb = C_TEXT_DARK
        p_t.space_before = Pt(8)

        p_d = tf_r.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = C_TEXT_MUTED

    add_footer(s7, 7, 14)

    # =========================================================================
    # SLIDE 8: SIMULADOR POSOLÓGICO PREDICTIVO
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_background(s8, C_BG_LIGHT)
    add_header(s8, "Herramienta de Simulación Posológica", 
               "Comparación de Regímenes Terapéuticos Alternativos",
               "Explore múltiples dosis, intervalos e infusiones continuas antes de redactar la indicación médica definitiva.")

    # Top Split: Explanation Card + Screenshot
    c_top = add_card(s8, Inches(0.8), Inches(1.95), Inches(5.2), Inches(4.8))
    tf_t = c_top.text_frame
    tf_t.margin_left = tf_t.margin_top = Inches(0.25)
    tf_t.margin_right = Inches(0.2)

    p = tf_t.paragraphs[0]
    p.text = "¿CÓMO APOYA LA DECISIÓN MÉDICA?"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_BRAND_EMERALD

    sim_features = [
        ("Simulación de Escenarios en Paralelo", "Compare en una misma pantalla: 1000 mg c/12h vs. 1500 mg c/24h vs. infusión continua de 2000 mg/día."),
        ("Cálculo Preciso de AUC24 en Estado Estacionario", "Proyecta si el régimen alcanzará la ventana diana (400–600 mg·h/L) sin superar niveles de seguridad renal."),
        ("Ajuste por Cambios Fisiológicos Esperados", "Simule el impacto de un cambio en la función renal previsto para las próximas 24h (por ejemplo, suspensión de TCRR)."),
        ("Reducción de Ensayo y Error Clínico", "Elimina la necesidad de esperar varias dosis para comprobar empíricamente si el ajuste fue correcto.")
    ]

    for title, desc in sim_features:
        p_t = tf_t.add_paragraph()
        p_t.text = title
        p_t.font.size = Pt(11.5)
        p_t.font.bold = True
        p_t.font.color.rgb = C_TEXT_DARK
        p_t.space_before = Pt(8)

        p_d = tf_t.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = C_TEXT_MUTED

    # Right: Screenshot of Simulation
    sim_img = os.path.join(PROD_DIR, "05-estimacion.png")
    if os.path.exists(sim_img):
        add_image_framed(s8, sim_img, Inches(6.3), Inches(1.95), Inches(6.2), Inches(4.8))

    add_footer(s8, 8, 14)

    # =========================================================================
    # SLIDE 9: EVIDENCIA CLÍNICA Y SEGURIDAD DEL PACIENTE
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_background(s9, C_BG_LIGHT)
    add_header(s9, "Seguridad del Paciente & Calidad Asistencial", 
               "Impacto Clínico Respaldado por Evidencia Científica",
               "El monitoreo bayesiano guiado por AUC24 ha demostrado superioridad clínica frente a las técnicas convencionales.")

    # 4 Metric Cards
    metrics = [
        ("-50%", "Reducción de Nefrotoxicidad", "Disminución del 45% al 60% en la tasa de Lesión Renal Aguda (LRA / AKI) asociada a vancomicina.", C_BRAND_EMERALD),
        ("< 24h", "Tiempo a Rango Óptimo", "Alcance de la ventana terapéutica diana en la primera jornada, frente a 48–72h con métodos tradicionales.", C_BRAND_CYAN),
        ("+92%", "Probabilidad en Diana (PTA)", "Porcentaje de pacientes que mantienen una exposición óptima durante las primeras 72 horas críticas.", C_ACCENT_AMBER),
        ("-1.8 d", "Estancia en UCI", "Reducción promedio de días de hospitalización en camas críticas para pacientes sépticos complejos.", RGBColor(99, 102, 241))
    ]

    for i, (val, title, desc, tone) in enumerate(metrics):
        x = Inches(0.8 + i*2.98)
        c = add_card(s9, x, Inches(1.95), Inches(2.78), Inches(4.8))
        tf = c.text_frame
        tf.margin_left = tf.margin_top = Inches(0.25)
        tf.margin_right = Inches(0.18)

        p_v = tf.paragraphs[0]
        p_v.text = val
        p_v.font.size = Pt(36)
        p_v.font.bold = True
        p_v.font.color.rgb = tone

        p_t = tf.add_paragraph()
        p_t.text = title
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = C_TEXT_DARK
        p_t.space_before = Pt(8)
        p_t.space_after = Pt(12)

        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(10.5)
        p_d.font.color.rgb = C_TEXT_MUTED
        p_d.line_spacing = 1.25

    add_footer(s9, 9, 14)

    # =========================================================================
    # SLIDE 10: RETORNO DE INVERSIÓN HOSPITALARIA (ROI & PROA)
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_background(s10, C_BG_LIGHT)
    add_header(s10, "Farmacoeconomía & Gestión Sanitaria", 
               "Retorno de Inversión Hospitalaria y Sostenibilidad",
               "La individualización posológica previene complicaciones de alto coste y optimiza las horas del personal médico.")

    roi_cards = [
        ("Prevención de Diálisis y Nefrotoxicidad",
         "Cada episodio de Lesión Renal Aguda en UCI que progresa a terapia de reemplazo renal genera un coste directo de entre $8,000 y $14,000 USD. Prevenir tan solo 3–4 casos al año amortiza completamente la implementación de la plataforma.",
         C_BRAND_EMERALD, "AHORRO DIRECTO"),
        ("Rotación de Camas Críticas de UCI",
         "Disminuir la estancia promedio en 1.8 a 2.3 días por paciente infectado libera camas de alta complejidad para admisiones quirúrgicas o de urgencia, descongestionando el hospital y aumentando la productividad asistencial.",
         C_BRAND_CYAN, "EFICIENCIA OPERATIVA"),
        ("Optimización del Tiempo Farmacéutico",
         "El cálculo bayesiano manual o mediante hojas de cálculo rudimentarias toma entre 25 y 40 minutos por paciente. PK-Bayes reduce este tiempo a menos de 3 minutos, multiplicando por 10 la capacidad de cobertura del equipo PROA.",
         C_ACCENT_AMBER, "PRODUCTIVIDAD CLÍNICA")
    ]

    for i, (title, desc, color, tag) in enumerate(roi_cards):
        x = Inches(0.8 + i*3.98)
        c = add_card(s10, x, Inches(1.95), Inches(3.78), Inches(4.8))
        tf = c.text_frame
        tf.margin_left = tf.margin_top = Inches(0.25)
        tf.margin_right = Inches(0.2)

        p_tag = tf.paragraphs[0]
        p_tag.text = tag
        p_tag.font.size = Pt(10)
        p_tag.font.bold = True
        p_tag.font.color.rgb = color

        p_t = tf.add_paragraph()
        p_t.text = title
        p_t.font.size = Pt(14)
        p_t.font.bold = True
        p_t.font.color.rgb = C_TEXT_DARK
        p_t.space_before = Pt(6)
        p_t.space_after = Pt(12)

        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = C_TEXT_MUTED
        p_d.line_spacing = 1.3

    add_footer(s10, 10, 14)

    # =========================================================================
    # SLIDE 11: SEGURIDAD DE LA INFORMACIÓN Y CUMPLIMIENTO
    # =========================================================================
    s11 = prs.slides.add_slide(blank_layout)
    set_slide_background(s11, C_BG_LIGHT)
    add_header(s11, "Ciberseguridad & Cumplimiento Normativo", 
               "Seguridad de Grado Hospitalario y Privacidad por Diseño",
               "Arquitectura construida bajo estándares internacionales de protección de datos clínicos y ciberseguridad sanitaria.")

    sec_cards = [
        ("Anonimización Rigurosa por Diseño", 
         "No requiere almacenar datos identificatorios directos (nombre o documento de identidad). El motor opera mediante identificadores clínicos anonimizados y transitorios.",
         C_BRAND_CYAN),
        ("Cifrado de Extremo a Extremo", 
         "Cifrado TLS 1.3 para todas las comunicaciones en tránsito y cifrado criptográfico AES-256 en reposo. Claves gestionadas bajo módulos de seguridad dedicados.",
         C_BRAND_EMERALD),
        ("Cumplimiento HIPAA / GDPR / Salud", 
         "Alineación con directrices internacionales de privacidad y leyes de derechos y deberes del paciente. Controles de acceso basados en roles médicos (RBAC).",
         C_ACCENT_AMBER),
        ("Trazabilidad y Auditoría Clínica", 
         "Registro inmutable de auditoría para cada simulación, recomendación y exportación de informe, garantizando transparencia médico-legal ante comités de ética.",
         RGBColor(99, 102, 241))
    ]

    for i, (title, desc, color) in enumerate(sec_cards):
        r = i // 2
        c = i % 2
        x = Inches(0.8 + c*6.0)
        y = Inches(1.95 + r*2.45)
        card = add_card(s11, x, y, Inches(5.7), Inches(2.3))
        tf = card.text_frame
        tf.margin_left = tf.margin_top = Inches(0.2)
        tf.margin_right = Inches(0.18)

        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(13.5)
        p.font.bold = True
        p.font.color.rgb = color

        p_det = tf.add_paragraph()
        p_det.text = desc
        p_det.font.size = Pt(11)
        p_det.font.color.rgb = C_TEXT_MUTED
        p_det.space_before = Pt(8)
        p_det.line_spacing = 1.25

    add_footer(s11, 11, 14)

    # =========================================================================
    # SLIDE 12: INTEROPERABILIDAD Y ARQUITECTURA TÉCNICA
    # =========================================================================
    s12 = prs.slides.add_slide(blank_layout)
    set_slide_background(s12, C_BG_LIGHT)
    add_header(s12, "Infraestructura & Conectividad Hospitalaria", 
               "Interoperabilidad HL7 FHIR y Despliegue Flexible",
               "Capacidad de integrarse sin fricción en el ecosistema informático del hospital, LIS y ficha clínica electrónica.")

    c_left12 = add_card(s12, Inches(0.8), Inches(1.95), Inches(5.7), Inches(4.8))
    tf_l12 = c_left12.text_frame
    tf_l12.margin_left = tf_l12.margin_top = Inches(0.25)
    tf_l12.margin_right = Inches(0.2)

    p = tf_l12.paragraphs[0]
    p.text = "INTEGRACIÓN CON SISTEMAS DE SALUD"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_BRAND_CYAN

    fhirs = [
        ("Estándar HL7 FHIR R4 / R5", "Conectores nativos para recibir resultados de niveles plasmáticos desde el Laboratorio Central (LIS) y datos demográficos desde el HIS/EHR."),
        ("Motor C++ / Stan MCMC en Backend", "Inferencia matemática de alto rendimiento con optimización L-BFGS-B. Respuestas garantizadas en < 25 milisegundos sin congelar la interfaz."),
        ("Arquitectura Web Liviana (Cloud o Local)", "Frontend moderno en React / Vite con diseño 100% responsive para tablets clínicas, ordenadores de carro de UCI y estaciones de farmacia."),
        ("API REST Segura para Servicios Hospitalarios", "Endpoints documentados bajo OpenAPI para integración personalizada con plataformas de prescripción electrónica.")
    ]

    for title, desc in fhirs:
        p_t = tf_l12.add_paragraph()
        p_t.text = title
        p_t.font.size = Pt(11.5)
        p_t.font.bold = True
        p_t.font.color.rgb = C_TEXT_DARK
        p_t.space_before = Pt(8)

        p_d = tf_l12.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = C_TEXT_MUTED

    # Right: Screenshot of Institutional Model
    inst_img = os.path.join(PROD_DIR, "09-modelo-institucional.png")
    if os.path.exists(inst_img):
        add_image_framed(s12, inst_img, Inches(6.8), Inches(1.95), Inches(5.7), Inches(4.8))

    add_footer(s12, 12, 14)

    # =========================================================================
    # SLIDE 13: PROGRAMA DE PILOTO CLÍNICO INSTITUCIONAL
    # =========================================================================
    s13 = prs.slides.add_slide(blank_layout)
    set_slide_background(s13, C_BG_LIGHT)
    add_header(s13, "Adopción Hospitalaria & Implementación", 
               "Ruta de Implementación del Piloto Clínico (60 Días)",
               "Un proceso guiado y estructurado para validar el impacto asistencial y económico sin alterar la rutina del servicio.")

    phases = [
        ("FASE 1 · DÍAS 1–15", "Parametrización & Protocolos", 
         "Configuración de los modelos PopPK preferidos por el comité de farmacia. Definición de dianas terapéuticas institucionales (ej. AUC 400–600 o CIM específica).",
         C_BRAND_CYAN),
        ("FASE 2 · DÍAS 16–30", "Capacitación de Equipos", 
         "Talleres prácticos con casos clínicos reales para farmacéuticos clínicos, médicos de UCI e infectólogos del equipo PROA. Certificación en manejo de la plataforma.",
         C_BRAND_EMERALD),
        ("FASE 3 · DÍAS 31–60", "Piloto Clínico Activo", 
         "Aplicación supervisada en pacientes reales en UCI. Monitorización de indicadores clave: tiempo en alcanzar diana, tasa de toxicidad y concordancia bayesiana.",
         C_ACCENT_AMBER),
        ("FASE 4 · DÍA 60+", "Evaluación & Consolidación", 
         "Presentación del informe de impacto clínico y retorno de inversión a la Dirección Médica y Comité de Farmacia para la adopción institucional definitiva.",
         RGBColor(99, 102, 241))
    ]

    for i, (ph_num, ph_title, ph_desc, ph_color) in enumerate(phases):
        x = Inches(0.8 + i*2.98)
        card = add_card(s13, x, Inches(1.95), Inches(2.78), Inches(4.8))
        tf = card.text_frame
        tf.margin_left = tf.margin_top = Inches(0.22)
        tf.margin_right = Inches(0.18)

        p = tf.paragraphs[0]
        p.text = ph_num
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = ph_color

        p_t = tf.add_paragraph()
        p_t.text = ph_title
        p_t.font.size = Pt(13.5)
        p_t.font.bold = True
        p_t.font.color.rgb = C_TEXT_DARK
        p_t.space_before = Pt(4)
        p_t.space_after = Pt(12)

        p_d = tf.add_paragraph()
        p_d.text = ph_desc
        p_d.font.size = Pt(10.5)
        p_d.font.color.rgb = C_TEXT_MUTED
        p_d.line_spacing = 1.25

    add_footer(s13, 13, 14)

    # =========================================================================
    # SLIDE 14: CIERRE Y LLAMADO A LA ACCIÓN (Dark Canvas)
    # =========================================================================
    s14 = prs.slides.add_slide(blank_layout)
    set_slide_background(s14, C_NAVY_DARK)

    # Logo
    if os.path.exists(LOGO_IMG):
        s14.shapes.add_picture(LOGO_IMG, Inches(0.9), Inches(1.2), Inches(1.3), Inches(1.3))

    # Badge Pill
    pill14 = add_card(s14, Inches(2.4), Inches(1.3), Inches(4.3), Inches(0.42), bg_color=RGBColor(16, 42, 77), border_color=RGBColor(30, 64, 110))
    tf_pill14 = pill14.text_frame
    tf_pill14.vertical_anchor = MSO_ANCHOR.MIDDLE
    p_pill14 = tf_pill14.paragraphs[0]
    p_pill14.text = "MEDICINA DE PRECISIÓN · EVALUACIÓN INSTITUCIONAL"
    p_pill14.font.size = Pt(9.5)
    p_pill14.font.bold = True
    p_pill14.font.color.rgb = RGBColor(56, 189, 248)
    p_pill14.alignment = PP_ALIGN.CENTER

    # Title
    tbox14 = s14.shapes.add_textbox(Inches(0.9), Inches(2.7), Inches(11.5), Inches(1.6))
    tf14 = tbox14.text_frame
    tf14.word_wrap = True
    p14 = tf14.paragraphs[0]
    p14.text = "Inicie el Piloto Clínico de PK-Bayes en su Hospital"
    p14.font.size = Pt(36)
    p14.font.bold = True
    p14.font.color.rgb = C_WHITE

    p14_sub = tf14.add_paragraph()
    p14_sub.text = "De la dosificación empírica al estándar de oro en farmacocinética clínica individualizada."
    p14_sub.font.size = Pt(20)
    p14_sub.font.color.rgb = RGBColor(56, 189, 248)
    p14_sub.space_before = Pt(8)

    # Contact Cards
    actions = [
        ("DEMO EN VIVO INTERACTIVA", "Acceda a la estación de simulación clínica y pruebe casos reales de vancomicina y fenitoína.", "https://pk-bayes.onrender.com"),
        ("SOLICITUD DE PILOTO CLÍNICO", "Coordine una sesión con nuestro equipo farmacocinético para diseñar el piloto en su centro.", "contacto@pk-bayes.com"),
        ("PORTAL Y DOCUMENTACIÓN", "Revise los modelos farmacocinéticos validados, guías clínicas y especificaciones de seguridad.", "Portal Clínico PK-Bayes v3.2")
    ]

    for i, (a_title, a_desc, a_link) in enumerate(actions):
        c = add_card(s14, Inches(0.9 + i*3.9), Inches(4.8), Inches(3.7), Inches(1.9), bg_color=C_NAVY_SURFACE, border_color=RGBColor(30, 58, 95))
        tf_c = c.text_frame
        tf_c.margin_left = tf_c.margin_top = Inches(0.2)
        p_at = tf_c.paragraphs[0]
        p_at.text = a_title
        p_at.font.size = Pt(10.5)
        p_at.font.bold = True
        p_at.font.color.rgb = RGBColor(16, 185, 129)

        p_ad = tf_c.add_paragraph()
        p_ad.text = a_desc
        p_ad.font.size = Pt(10)
        p_ad.font.color.rgb = RGBColor(203, 213, 225)
        p_ad.space_before = Pt(6)

        p_al = tf_c.add_paragraph()
        p_al.text = a_link
        p_al.font.size = Pt(10)
        p_al.font.bold = True
        p_al.font.color.rgb = RGBColor(56, 189, 248)
        p_al.space_before = Pt(8)

    add_footer(s14, 14, 14, is_dark=True)

    # Guardar en Desktop y en Assets Web
    out_desktop = "/Users/pablosaezriquelme/Desktop/PK-Bayes_Presentacion_Clinica_Institucional.pptx"
    out_web = "/Users/pablosaezriquelme/Desktop/PK-Bayes Web/assets/docs/PK-Bayes_Presentacion_Clinica_Institucional.pptx"
    os.makedirs(os.path.dirname(out_web), exist_ok=True)

    prs.save(out_desktop)
    prs.save(out_web)
    print(f"Presentación generada con éxito en:\n1. {out_desktop}\n2. {out_web}")

if __name__ == "__main__":
    create_presentation()
