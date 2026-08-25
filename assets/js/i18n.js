/**
 * PK-Bayes — Motor de Internacionalización (i18n)
 * Soporta: Español (es), English (en), 中文 (zh), 日本語 (ja)
 */
(function () {
  "use strict";

  const STORAGE_KEY = "pkbayes_lang";
  const SUPPORTED_LANGS = ["es", "en", "zh", "ja"];

  const LANG_NAMES = {
    es: "Español",
    en: "English",
    zh: "中文",
    ja: "日本語"
  };

  const LANG_FLAGS = {
    es: "🇪🇸",
    en: "🇺🇸",
    zh: "🇨🇳",
    ja: "🇯🇵"
  };

  const I18N = {
    es: {
      "nav.home": "Inicio",
      "nav.features": "Funcionalidades",
      "nav.drugs": "Fármacos y modelos",
      "nav.cases": "Casos clínicos",
      "nav.login": "Acceso clientes",
      "nav.cta": "Empezar ahora",
      "nav.trial": "Probar 14 días gratis",
      "common.free_trial": "Probar 14 días gratis",
      "common.see_capabilities": "Ver capacidades clínicas",
      "common.active": "Activo",
      "common.roadmap": "Próximamente",
      "common.in_dev": "En desarrollo",
      "common.live": "EN VIVO",
      "common.verified": "Verificado",
      "common.transparent": "Transparente",
      "common.details": "Ver detalles →",

      "hero.eyebrow": "Software de Apoyo a la Decisión Clínica (CDSS) & Medicina de Precisión",
      "hero.title": "Plataforma de Dosificación Farmacocinética de Precisión y Estimación Bayesiana MAP en Tiempo Real",
      "hero.lead": "PK-Bayes optimiza la monitorización terapéutica (TDM) de estrecho margen para <strong>Vancomicina</strong> (activo bajo consenso ASHP/IDSA 2020: AUC24/CIM 400–600 mg·h/L) y avanza en el desarrollo de <strong>Fenitoína</strong>. Combina estimación bayesiana MAP, resolución numérica de ODEs (RK45) ante cambios continuos de función renal (AKI) y aprendizaje adaptativo institucional.",
      "hero.btn_trial": "Probar 14 días gratis",
      "hero.btn_compare": "Ver ventajas y comparativa",
      "hero.stat1_num": "< 100 ms",
      "hero.stat1_label": "Tiempo de cálculo MAP",
      "hero.stat2_num": "400–600",
      "hero.stat2_label": "mg·h/L diana AUC24",
      "hero.stat3_num": "1 Clic",
      "hero.stat3_label": "Export PopPK NONMEM",
      "hero.stat4_num": "$1.350",
      "hero.stat4_label": "USD/año Plan Completo",

      "app.what_is_eyebrow": "Tecnología y Fundamento",
      "app.what_is_title": "¿Qué es PK-Bayes y cómo transforma la dosificación clínica?",
      "app.what_is_lead": "Una estación de trabajo clínica avanzada que integra farmacometría matemática de vanguardia, algoritmos numéricos de alto rendimiento y una interfaz intuitiva para individualizar la terapia en cada paciente.",
      "app.card1_title": "Estimación Bayesiana MAP Multivariada",
      "app.card1_desc": "Combina la información poblacional previa (priors) con las concentraciones séricas observadas, minimizando la función objetivo para calcular los parámetros individuales (CL, Vd, t1/2, AUC24) en menos de 100 ms.",
      "app.card2_title": "Cinética Continua ODE (RK45) ante AKI",
      "app.card2_desc": "A diferencia de fórmulas estáticas, modela cambios dinámicos de función renal (Cr: 1.0 → 5.0 → 10.0 mg/dL) y hemodiálisis mediante ecuaciones diferenciales con estricta preservación de masa.",
      "app.card3_title": "Muestreo TDM Flexible sin Restricciones",
      "app.card3_desc": "Elimina la rigidez de extraer muestras únicamente en el valle exacto pre-dosis. El motor sitúa matemáticamente cualquier nivel extraído en cualquier momento del intervalo con total precisión.",

      "benefits.eyebrow": "Propuesta de Valor Integral",
      "benefits.title": "Beneficios Clínicos, Operativos y de Investigación",
      "benefits.lead": "Diseñado para farmacéuticos clínicos, infectólogos, intensivistas y equipos de investigación farmacocinética.",
      "benefits.clinical_title": "Beneficios Clínicos",
      "benefits.clinical_1": "Maximización de la eficacia terapéutica (AUC24/CIM ≥ 400–600 mg·h/L) en infecciones graves por MRSA.",
      "benefits.clinical_2": "Reducción radical de la nefrotoxicidad inducida por vancomicina y detección temprana de AKI.",
      "benefits.clinical_3": "Dosificación segura en pacientes críticos (UCI), sépticos, obesos con IMC elevado y en hemodiálisis.",
      "benefits.operational_title": "Beneficios Operativos",
      "benefits.operational_1": "Decisiones farmacocinéticas en segundos directamente a pie de cama del paciente.",
      "benefits.operational_2": "Simulador interactivo What-If para proyectar y validar dosis antes de la administración.",
      "benefits.operational_3": "Auditoría clínica inmutable por paciente con trazabilidad completa de cambios por usuario.",
      "benefits.research_title": "Beneficios de Investigación",
      "benefits.research_1": "Generación automatizada de bases de datos PopPK estructuradas en 1 clic para NONMEM y Monolix.",
      "benefits.research_2": "Ahorro de semanas de transcripción manual de registros clínicos y planillas de enfermería.",
      "benefits.research_3": "Calibración de Priors Institucionales Propios (RMSE, MAE, Bias) para aprendizaje hospitalario continuo.",

      "compare.eyebrow": "Ventaja Competitiva",
      "compare.title": "Comparativa Frontal: ¿Por qué elegir PK-Bayes?",
      "compare.lead": "Transparencia absoluta en capacidades clínicas, tecnología matemática y costo real de adopción.",
      "compare.col_feature": "Capacidad / Criterio",
      "compare.col_legacy": "Nomogramas / Excel",
      "compare.col_foreign": "Suites Extranjeras ($15k–$50k)",
      "compare.col_pkbayes": "PK-Bayes",
      "compare.row1_title": "Costo y Modelo de Precios",
      "compare.row1_legacy": "Gratis (pero riesgoso clínicamente)",
      "compare.row1_foreign": "$15.000–$50.000+ USD/año con contratos opacos",
      "compare.row1_pkbayes": "$1.350 USD/año con 14 días de prueba gratis",
      "compare.row2_title": "Motor Bayesiano MAP en Tiempo Real",
      "compare.row2_legacy": "✕ No disponible (cálculos estáticos)",
      "compare.row2_foreign": "✓ Sí (< 500 ms)",
      "compare.row2_pkbayes": "✓ Sí (< 100 ms ultrarrápido)",
      "compare.row3_title": "Cinética Continua ODE (RK45) ante AKI",
      "compare.row3_legacy": "✕ Asume función renal constante",
      "compare.row3_foreign": "Parcial / Aproximaciones por tramos",
      "compare.row3_pkbayes": "✓ Continuo con preservación de masa",
      "compare.row4_title": "Generación de Datasets PopPK (NONMEM/Monolix)",
      "compare.row4_legacy": "✕ Inexistente (semanas de trabajo manual)",
      "compare.row4_foreign": "✕ No incluido o módulo cerrado",
      "compare.row4_pkbayes": "✓ Integrado en 1 clic (Plan Completo)",
      "compare.row5_title": "Calibración de Priors Locales (RMSE/MAE/Bias)",
      "compare.row5_legacy": "✕ No disponible",
      "compare.row5_foreign": "✕ Requiere consultoría costosa",
      "compare.row5_pkbayes": "✓ Benchmarking y calibración continua",
      "compare.row6_title": "Soporte Multi-Idioma Nativo",
      "compare.row6_legacy": "N/A",
      "compare.row6_foreign": "✕ Casi exclusivamente en inglés",
      "compare.row6_pkbayes": "✓ Español, Inglés, Chino y Japonés",

      "problem.eyebrow": "El desafío clínico",
      "problem.title": "La variabilidad farmacocinética exige precisión matemática",
      "problem.sub": "Fármacos críticos de estrecho margen como la <strong>vancomicina</strong> presentan una farmacocinética altamente variable. En pacientes con sepsis, daño renal fluctuante (AKI) o hemodiálisis, los nomogramas rígidos y las hojas de cálculo fallan a menudo, aumentando la estancia hospitalaria y la morbimortalidad.",
      "problem.card1_title": "Subdosificación y Fracaso Terapéutico",
      "problem.card1_desc": "Un cálculo empírico conservador produce concentraciones subterapéuticas (AUC24 < 400 mg·h/L): la infección bacteriana avanza sin control y aumenta el riesgo de selección de cepas resistentes.",
      "problem.card2_title": "Toxicidad y Daño Renal Agudo",
      "problem.card2_desc": "La acumulación de vancomicina desencadena lesión renal aguda (IRA/AKI). PK-Bayes permite controlar con precisión el rango objetivo de AUC24 (400–600 mg·h/L) para minimizar el daño nefrótico.",
      "problem.card3_title": "Rigidez de Muestreo TDM",
      "problem.card3_desc": "Los nomogramas tradicionales quedan inutilizados si la muestra no se extrae en el minuto exacto del valle. PK-Bayes admite niveles extraídos en cualquier momento del intervalo sin perder precisión.",

      "workflow.eyebrow": "Flujo Clínico Inteligente",
      "workflow.title": "De los datos del paciente a la dosis óptima en 4 pasos",
      "workflow.step1_title": "Ingreso y Biometría",
      "workflow.step1_desc": "Demografía, función renal dinámica (Cockcroft-Gault, CKD-EPI) y comorbilidades a pie de cama.",
      "workflow.step2_title": "Registro TDM",
      "workflow.step2_desc": "Ingreso de dosis administradas y niveles plasmáticos séricos extraídos a cualquier hora.",
      "workflow.step3_title": "Ajuste MAP en < 100 ms",
      "workflow.step3_desc": "Resolución numérica de ODEs y estimación Bayesiana Maximum A Posteriori individualizada.",
      "workflow.step4_title": "Simulación What-If",
      "workflow.step4_desc": "Proyección interactiva de regímenes, optimización de AUC24/CIM (400–600) y exportación clínica.",

      "bento.eyebrow": "Capacidades de la Plataforma",
      "bento.title": "Tecnología farmacométrica avanzada en una interfaz moderna",
      "bento.card1_title": "Estimación Bayesiana MAP Multivariada",
      "bento.card1_desc": "Calcula el perfil farmacocinético individual (CL, V1, Q, V2, t1/2, AUC24) en menos de 100 ms.",
      "bento.card2_title": "Vancomicina: Consenso ASHP 2020",
      "bento.card2_desc": "Dosificación guiada por AUC24/CIM (400–600 mg·h/L) con modelos de 2 compartimentos (Goti 2018 BSV 30%).",
      "bento.card3_title": "Cinética Renal Dinámica (ODEs RK45)",
      "bento.card3_desc": "Resuelve numéricamente la curva temporal con preservación de masa en A1(t) y A2(t) ante Falla Renal Aguda (AKI).",
      "bento.card4_title": "Próximamente: Fenitoína",
      "bento.card4_desc": "Alcances en desarrollo: modelado de saturación hepática (Michaelis-Menten) y corrección de fracción libre por Sheiner-Tozer.",
      "bento.card5_title": "Dashboard Longitudinal de Cohortes",
      "bento.card5_desc": "Gráficos pareados dosis vs niveles, multiselección sincronizada por paciente, filtros UCI y cálculo de IC95%.",
      "bento.card6_title": "Bases de Datos PopPK para NONMEM y Monolix",
      "bento.card6_desc": "Automatiza la construcción y estructuración de la base de datos de pacientes para modelado farmacocinético poblacional.",

      "pricing.eyebrow": "Precios Transparentes",
      "pricing.title": "Prueba PK-Bayes gratis, luego elige el plan para tu institución",
      "pricing.lead": "Democratizamos la dosificación bayesiana de precisión: sin presupuestos opacos ni permanencias abusivas. Comienza con 14 días gratis con acceso completo.",
      "pricing.plan_free_name": "Prueba Gratuita",
      "pricing.plan_free_price": "0 USD",
      "pricing.plan_free_period": "/ 14 días",
      "pricing.plan_free_desc": "Acceso completo a las herramientas clínicas durante 14 días sin costo, para validar la precisión y el flujo de trabajo con tu equipo.",
      "pricing.plan_free_btn": "Iniciar prueba gratis (14 días)",
      "pricing.plan_comp_name": "Institucional Completo",
      "pricing.plan_comp_price": "1.350 USD",
      "pricing.plan_comp_period": "/ año",
      "pricing.plan_comp_desc": "Licencia anual completa con acceso ilimitado para toda la institución, todos los módulos clínicos y exportación de datos.",
      "pricing.plan_comp_btn": "Suscribir Plan Completo ($1.350 USD/año)",
      "pricing.plan_comp_ribbon": "Plan Completo",

      "footer.desc": "Plataforma clínica de dosificación farmacocinética de precisión y optimización bayesiana MAP en tiempo real.",
      "footer.product": "Producto",
      "footer.access": "Acceso",
      "footer.security": "Seguridad y Rigor",
      "footer.rights": "Todos los derechos reservados."
    },

    en: {
      "nav.home": "Home",
      "nav.features": "Features",
      "nav.drugs": "Drugs & Models",
      "nav.cases": "Clinical Cases",
      "nav.login": "Client Portal",
      "nav.cta": "Get Started",
      "nav.trial": "Start 14-Day Free Trial",
      "common.free_trial": "Start 14-Day Free Trial",
      "common.see_capabilities": "View Clinical Capabilities",
      "common.active": "Active",
      "common.roadmap": "Coming Soon",
      "common.in_dev": "In Development",
      "common.live": "LIVE",
      "common.verified": "Verified",
      "common.transparent": "Transparent",
      "common.details": "View details →",

      "hero.eyebrow": "Clinical Decision Support Software (CDSS) & Precision Medicine",
      "hero.title": "Precision Pharmacokinetic Dosing & Real-Time MAP Bayesian Platform",
      "hero.lead": "PK-Bayes transforms narrow therapeutic index drug monitoring (TDM) for <strong>Vancomycin</strong> (active under 2020 ASHP/IDSA consensus: AUC24/MIC 400–600 mg·h/L) and advancing development for <strong>Phenytoin</strong>. Combines Maximum A Posteriori (MAP) Bayesian estimation, continuous RK45 ODE solving during acute renal changes (AKI), and adaptive institutional learning.",
      "hero.btn_trial": "Start 14-day free trial",
      "hero.btn_compare": "View advantages & comparison",
      "hero.stat1_num": "< 100 ms",
      "hero.stat1_label": "MAP compute time",
      "hero.stat2_num": "400–600",
      "hero.stat2_label": "mg·h/L target AUC24",
      "hero.stat3_num": "1-Click",
      "hero.stat3_label": "PopPK export NONMEM",
      "hero.stat4_num": "$1,350",
      "hero.stat4_label": "USD/year Full Plan",

      "app.what_is_eyebrow": "Technology & Foundations",
      "app.what_is_title": "What is PK-Bayes and how does it transform clinical dosing?",
      "app.what_is_lead": "An advanced clinical workstation integrating cutting-edge pharmacometrics, high-performance numerical algorithms, and an intuitive UI to individualize treatment for every patient.",
      "app.card1_title": "Multivariate MAP Bayesian Estimation",
      "app.card1_desc": "Combines prior population models with observed serum concentrations, minimizing the objective function to fit individual parameters (CL, Vd, t1/2, AUC24) in under 100 ms.",
      "app.card2_title": "Continuous RK45 ODE Kinetics in AKI",
      "app.card2_desc": "Unlike static formulas, dynamically models fluctuating renal function (Cr: 1.0 → 5.0 → 10.0 mg/dL) and hemodialysis via differential equations with mass preservation.",
      "app.card3_title": "Unrestricted Flexible TDM Sampling",
      "app.card3_desc": "Eliminates the rigid requirement of exact pre-dose trough sampling. Mathematically places serum levels drawn at any timestamp across the interval with precision.",

      "benefits.eyebrow": "Comprehensive Value Proposition",
      "benefits.title": "Clinical, Operational & Research Benefits",
      "benefits.lead": "Designed for clinical pharmacists, infectious disease specialists, intensivist teams, and pharmacometrics researchers.",
      "benefits.clinical_title": "Clinical Benefits",
      "benefits.clinical_1": "Maximizes therapeutic efficacy (AUC24/MIC ≥ 400–600 mg·h/L) in severe MRSA bacteremia.",
      "benefits.clinical_2": "Radically prevents vancomycin-induced nephrotoxicity and enables early AKI detection.",
      "benefits.clinical_3": "Safe, tailored dosing in ICU critical care, sepsis, high-BMI obesity, and hemodialysis.",
      "benefits.operational_title": "Operational Benefits",
      "benefits.operational_1": "Pharmacokinetic recommendations delivered in seconds directly at the bedside.",
      "benefits.operational_2": "Interactive What-If simulator to simulate and validate regimens prior to administration.",
      "benefits.operational_3": "Immutable clinical audit log per patient with full traceability of user actions.",
      "benefits.research_title": "Research Benefits",
      "benefits.research_1": "1-click automated generation of standardized PopPK datasets for NONMEM and Monolix.",
      "benefits.research_2": "Eliminates weeks of manual data entry from EHR charts and nursing flowsheets.",
      "benefits.research_3": "Calibration of institutional priors (RMSE, MAE, Bias) for continuous hospital learning.",

      "compare.eyebrow": "Competitive Advantage",
      "compare.title": "Direct Benchmark: Why Choose PK-Bayes?",
      "compare.lead": "Complete transparency in clinical capabilities, mathematical rigor, and true adoption cost.",
      "compare.col_feature": "Feature / Capability",
      "compare.col_legacy": "Nomograms / Excel",
      "compare.col_foreign": "Foreign Suites ($15k–$50k)",
      "compare.col_pkbayes": "PK-Bayes",
      "compare.row1_title": "Cost & Licensing Model",
      "compare.row1_legacy": "Free (clinically risky)",
      "compare.row1_foreign": "$15,000–$50,000+ USD/yr with opaque lock-in",
      "compare.row1_pkbayes": "$1,350 USD/year with full 14-day trial",
      "compare.row2_title": "Real-Time MAP Bayesian Engine",
      "compare.row2_legacy": "✕ None (static calculations)",
      "compare.row2_foreign": "✓ Yes (< 500 ms)",
      "compare.row2_pkbayes": "✓ Yes (< 100 ms ultra-fast)",
      "compare.row3_title": "Dynamic ODE Kinetics in AKI (RK45)",
      "compare.row3_legacy": "✕ Assumes static renal clearance",
      "compare.row3_foreign": "Partial / Piecewise approximations",
      "compare.row3_pkbayes": "✓ Continuous with mass preservation",
      "compare.row4_title": "PopPK Dataset Generator (NONMEM/Monolix)",
      "compare.row4_legacy": "✕ None (weeks of manual work)",
      "compare.row4_foreign": "✕ Closed module or not included",
      "compare.row4_pkbayes": "✓ Built-in 1-click export (Full Plan)",
      "compare.row5_title": "Institutional Prior Calibration (RMSE/MAE)",
      "compare.row5_legacy": "✕ None",
      "compare.row5_foreign": "✕ Requires expensive consulting",
      "compare.row5_pkbayes": "✓ Continuous local benchmarking",
      "compare.row6_title": "Native Multi-Language Support",
      "compare.row6_legacy": "N/A",
      "compare.row6_foreign": "✕ Almost exclusively English",
      "compare.row6_pkbayes": "✓ Spanish, English, Chinese & Japanese",

      "problem.eyebrow": "The Clinical Challenge",
      "problem.title": "Pharmacokinetic Variability Demands Mathematical Rigor",
      "problem.sub": "Critical narrow-index drugs like <strong>vancomycin</strong> show immense PK variability. In patients with sepsis, fluctuating renal failure (AKI), or hemodialysis, static nomograms and spreadsheets fail, increasing hospital stay and morbidity.",
      "problem.card1_title": "Underdosing & Therapeutic Failure",
      "problem.card1_desc": "Conservative empirical dosing leads to subtherapeutic exposure (AUC24 < 400 mg·h/L), allowing infection progression and antimicrobial resistance selection.",
      "problem.card2_title": "Toxicity & Acute Kidney Injury (AKI)",
      "problem.card2_desc": "Vancomycin accumulation induces acute renal damage. PK-Bayes precisely controls target AUC24 exposure (400–600 mg·h/L) to minimize nephrotoxicity risk.",
      "problem.card3_title": "Rigid TDM Sampling Constraints",
      "problem.card3_desc": "Traditional nomograms fail if blood samples miss the exact trough time. PK-Bayes fits serum levels drawn at any point during the dosing interval with full mathematical precision.",

      "workflow.eyebrow": "Intelligent Clinical Workflow",
      "workflow.title": "From Patient Data to Optimal Dosing in 4 Steps",
      "workflow.step1_title": "Admission & Biometrics",
      "workflow.step1_desc": "Demographics, dynamic renal function (Cockcroft-Gault, CKD-EPI), and bedside clinical data.",
      "workflow.step2_title": "TDM Record",
      "workflow.step2_desc": "Enter administered doses and serum concentration levels drawn at any timestamp.",
      "workflow.step3_title": "MAP Fitting in < 100 ms",
      "workflow.step3_desc": "Numerical ODE solving and individualized Maximum A Posteriori Bayesian estimation.",
      "workflow.step4_title": "What-If Simulation",
      "workflow.step4_desc": "Interactive regimen forecasting, AUC24/MIC target attainment (400–600), and clinical reporting.",

      "bento.eyebrow": "Platform Capabilities",
      "bento.title": "Advanced Pharmacometric Technology with a Modern Clinical UI",
      "bento.card1_title": "Multivariate MAP Bayesian Fitting",
      "bento.card1_desc": "Estimates individualized PK parameters (CL, V1, Q, V2, t1/2, AUC24) in under 100 ms.",
      "bento.card2_title": "Vancomicina: 2020 Consensus Guidelines",
      "bento.card2_desc": "AUC24/MIC-guided dosing (400–600 mg·h/L) using validated 2-compartment models (Goti 2018 BSV 30%).",
      "bento.card3_title": "Dynamic Renal Kinetics (RK45 ODEs)",
      "bento.card3_desc": "Numerically integrates non-steady-state curves preserving mass across compartments during Acute Kidney Injury (AKI).",
      "bento.card4_title": "Coming Soon: Phenytoin Module",
      "bento.card4_desc": "In development: saturable hepatic Michaelis-Menten kinetics (Vmax, Km) and Sheiner-Tozer free fraction correction.",
      "bento.card5_title": "Longitudinal Cohort Dashboard",
      "bento.card5_desc": "Synchronized paired charts (doses vs levels), patient multi-selection, ICU filters, and real-time 95% CI bands.",
      "bento.card6_title": "PopPK Datasets for NONMEM & Monolix",
      "bento.card6_desc": "Automates patient database generation and structuring for population pharmacometric research and clinical trials.",

      "pricing.eyebrow": "Transparent Pricing",
      "pricing.title": "Try PK-Bayes for Free, Then Choose Your Institution Plan",
      "pricing.lead": "Democratizing precision Bayesian dosing: no opaque five-figure quotes or vendor lock-in. Start with a full-access 14-day free trial.",
      "pricing.plan_free_name": "Free Trial",
      "pricing.plan_free_price": "0 USD",
      "pricing.plan_free_period": "/ 14 days",
      "pricing.plan_free_desc": "Full access to all clinical dosing tools for 14 days at no cost, to validate clinical workflows with your team.",
      "pricing.plan_free_btn": "Start 14-Day Free Trial",
      "pricing.plan_comp_name": "Full Institutional Plan",
      "pricing.plan_comp_price": "1,350 USD",
      "pricing.plan_comp_period": "/ year",
      "pricing.plan_comp_desc": "Complete annual institutional license with unlimited clinical users, all clinical modules, and PopPK dataset export.",
      "pricing.plan_comp_btn": "Subscribe Full Plan ($1,350 USD/year)",
      "pricing.plan_comp_ribbon": "All-Inclusive",

      "footer.desc": "Real-time clinical precision pharmacokinetic dosing and MAP Bayesian optimization platform for vancomycin (active) and expanding pipeline.",
      "footer.product": "Product",
      "footer.access": "Access",
      "footer.security": "Security & Science",
      "footer.rights": "All rights reserved."
    },

    zh: {
      "nav.home": "首页",
      "nav.features": "核心功能",
      "nav.drugs": "药物与模型",
      "nav.cases": "临床案例",
      "nav.login": "用户登录",
      "nav.cta": "立即体验",
      "nav.trial": "免费试用 14 天",
      "common.free_trial": "免费试用 14 天",
      "common.see_capabilities": "查看临床功能",
      "common.active": "已上线",
      "common.roadmap": "即将推出",
      "common.in_dev": "开发中",
      "common.live": "实时运行",
      "common.verified": "已验证",
      "common.transparent": "透明定价",
      "common.details": "查看详情 →",

      "hero.eyebrow": "临床决策支持软件 (CDSS) 与精准医疗",
      "hero.title": "精准药代动力学剂量与实时 MAP 贝叶斯估算平台",
      "hero.lead": "PK-Bayes 针对治疗窗狭窄药物（万古霉素已上线，符合 ASHP/IDSA 2020 共识：AUC24/MIC 400–600 mg·h/L；苯妥英钠开发中）优化治疗药物监测 (TDM)。结合 MAP 贝叶斯估算、急性肾损伤 (AKI) 质量守恒常微分方程 (ODE RK45) 数值解以及院内自适应人群学习。",
      "hero.btn_trial": "免费试用 14 天",
      "hero.btn_compare": "查看竞争优势与对比",
      "hero.stat1_num": "< 100 ms",
      "hero.stat1_label": "MAP 估算耗时",
      "hero.stat2_num": "400–600",
      "hero.stat2_label": "mg·h/L 目标 AUC24",
      "hero.stat3_num": "1 键导出",
      "hero.stat3_label": "PopPK 数据集 NONMEM",
      "hero.stat4_num": "$1,350",
      "hero.stat4_label": "USD/年 完整机构版",

      "app.what_is_eyebrow": "核心技术与原理",
      "app.what_is_title": "什么是 PK-Bayes 以及它如何变革临床给药？",
      "app.what_is_lead": "集成前沿药计量学、高性能数值算法与直观界面的临床工作站，为每位患者实现个体化精准给药。",
      "app.card1_title": "多变量 MAP 贝叶斯估算",
      "app.card1_desc": "将先验人群模型与实测血药浓度相结合，在不到 100 毫秒内求解个体药代参数（CL、Vd、t1/2、AUC24）。",
      "app.card2_title": "AKI 动态连续 ODE 动力学 (RK45)",
      "app.card2_desc": "区别于静态公式，通过严格质量守恒微分方程准确模拟急性肾功能剧烈波动（肌酐：1.0 → 5.0 → 10.0 mg/dL）与透析过程。",
      "app.card3_title": "灵活 TDM 采样时间",
      "app.card3_desc": "摆脱严格预定谷浓度采血限制，可在给药间隔任意时刻采血并精确拟合。",

      "benefits.eyebrow": "全方位价值主张",
      "benefits.title": "临床、运营与科研三重优势",
      "benefits.lead": "专为临床药师、感染科专家、重症监护团队及药代动力学科研人员打造。",
      "benefits.clinical_title": "临床获益",
      "benefits.clinical_1": "最大化严重 MRSA 感染的治疗达标率 (AUC24/MIC ≥ 400–600 mg·h/L)。",
      "benefits.clinical_2": "显著降低万古霉素诱导的肾毒性风险，实现 AKI 早期监护。",
      "benefits.clinical_3": "在 ICU 重症、脓毒症、肥胖 (BMI ≥ 30) 及血液透析患者中实现安全精准给药。",
      "benefits.operational_title": "运营获益",
      "benefits.operational_1": "在患者床旁数秒内获取精准给药建议。",
      "benefits.operational_2": "交互式 What-If 模拟器，在给药前预测并验证调整方案。",
      "benefits.operational_3": "患者级不可篡改临床审计追踪，记录所有操作与数据变更。",
      "benefits.research_title": "科研与教学获益",
      "benefits.research_1": "一键自动构建符合 NONMEM 和 Monolix 标准的 PopPK 结构化数据集。",
      "benefits.research_2": "彻底告别数周繁琐的人工病历与护理单转录工作。",
      "benefits.research_3": "校准本院先验人群参数 (RMSE、MAE、Bias)，实现医院持续学习进化。",

      "compare.eyebrow": "竞争优势",
      "compare.title": "全方位对比：为何选择 PK-Bayes？",
      "compare.lead": "临床能力、数学严谨性与真实采用成本的完全透明对比。",
      "compare.col_feature": "功能 / 特性",
      "compare.col_legacy": "传统列线图 / Excel",
      "compare.col_foreign": "国外商业软件 ($1.5万–$5万美元)",
      "compare.col_pkbayes": "PK-Bayes",
      "compare.row1_title": "价格与采购模式",
      "compare.row1_legacy": "免费（但临床风险极高）",
      "compare.row1_foreign": "$15,000–$50,000+ USD/年 且合同封闭",
      "compare.row1_pkbayes": "$1,350 USD/年 享14天全功能试用",
      "compare.row2_title": "实时 MAP 贝叶斯引擎",
      "compare.row2_legacy": "✕ 无（静态公式计算）",
      "compare.row2_foreign": "✓ 支持（< 500 ms）",
      "compare.row2_pkbayes": "✓ 支持（< 100 ms 极速运算）",
      "compare.row3_title": "AKI 连续 ODE 动力学 (RK45)",
      "compare.row3_legacy": "✕ 假设肾清除率恒定不变",
      "compare.row3_foreign": "部分支持 / 分段近似",
      "compare.row3_pkbayes": "✓ 严格质量守恒连续积分",
      "compare.row4_title": "PopPK 数据集生成器 (NONMEM/Monolix)",
      "compare.row4_legacy": "✕ 无（需数周手工整理）",
      "compare.row4_foreign": "✕ 闭源或未包含在基础包",
      "compare.row4_pkbayes": "✓ 一键原生导出（完整版标配）",
      "compare.row5_title": "本院先验校准 (RMSE/MAE/Bias)",
      "compare.row5_legacy": "✕ 不支持",
      "compare.row5_foreign": "✕ 需昂贵定制咨询服务",
      "compare.row5_pkbayes": "✓ 持续本地化对标与校准",
      "compare.row6_title": "原生多语言支持",
      "compare.row6_legacy": "不适用",
      "compare.row6_foreign": "✕ 几乎仅限英文界面",
      "compare.row6_pkbayes": "✓ 西班牙语、英语、中文和日语",

      "problem.eyebrow": "临床挑战",
      "problem.title": "药代动力学的高度个体差异需要严谨数学支持",
      "problem.sub": "像<strong>万古霉素</strong>这样治疗指数狭窄的关键药物具有极大的药代变异性。在脓毒症、急性肾功能波动 (AKI) 或血液透析患者中，传统列线图和电子表格计算往往失准，导致住院周期延长和死亡率上升。",
      "problem.card1_title": "剂量不足与治疗失败",
      "problem.card1_desc": "保守的经验给药常导致亚治疗血药浓度 (AUC24 < 400 mg·h/L)，导致感染失控并诱发耐药菌株产生。",
      "problem.card2_title": "蓄积毒性与急性肾损伤 (AKI)",
      "problem.card2_desc": "药物过量蓄积会引发不可逆的肾损伤。PK-Bayes 协助精准锁定目标 AUC24 (400–600 mg·h/L)，大幅降低肾毒性风险。",
      "problem.card3_title": "严苛的 TDM 采血时间要求",
      "problem.card3_desc": "若未在严格的预定谷值时间采血，传统列线图将彻底失效。PK-Bayes 支持在给药间隔任意时刻采血并精确解析。",

      "workflow.eyebrow": "智能化临床工作流",
      "workflow.title": "从患者数据到最优剂量的 4 步流程",
      "workflow.step1_title": "录入与生物特征",
      "workflow.step1_desc": "床旁录入患者人口统计学信息、动态肾功能指标 (Cockcroft-Gault, CKD-EPI) 与合并症。",
      "workflow.step2_title": "TDM 监测记录",
      "workflow.step2_desc": "录入历史给药明细及在任意时间点测得的血药浓度数值。",
      "workflow.step3_title": "100 ms 内 MAP 拟合",
      "workflow.step3_desc": "高精度数值求解常微分方程组 (ODEs)，瞬间完成个体化 MAP 贝叶斯估算。",
      "workflow.step4_title": "What-If 智能模拟",
      "workflow.step4_desc": "交互式预测不同方案稳态血药浓度，优化 AUC24/MIC (400–600) 达标并导出临床报告。",

      "bento.eyebrow": "平台核心能力",
      "bento.title": "领先的药计量学技术融合现代临床交互体验",
      "bento.card1_title": "多变量 MAP 贝叶斯估算",
      "bento.card1_desc": "在 100 毫秒内计算个体药代动力学参数（CL、V1、Q、V2、t1/2、AUC24）。",
      "bento.card2_title": "万古霉素：2020 共识指南",
      "bento.card2_desc": "基于 AUC24/MIC 引导给药 (400–600 mg·h/L)，采用双室模型 (Goti 2018 BSV 30%)。",
      "bento.card3_title": "动态肾脏动力学 (RK45 ODEs)",
      "bento.card3_desc": "在急性肾损伤 (AKI) 期间通过质量守恒常微分方程高精度数值积分模拟浓度时变曲线。",
      "bento.card4_title": "即将上线：苯妥英钠模块",
      "bento.card4_desc": "开发中：饱和肝代谢动力学 (Michaelis-Menten Vmax, Km) 与 Sheiner-Tozer 游离分数校正。",
      "bento.card5_title": "队列纵向监测看板",
      "bento.card5_desc": "剂量与浓度同步联动图表、多患者高亮对比、ICU 筛选与 95% 置信区间拟合带。",
      "bento.card6_title": "PopPK 数据集生成器",
      "bento.card6_desc": "自动构建和标准化患者药代数据集，直供 NONMEM 与 Monolix 开展群体药代研究。",

      "pricing.eyebrow": "透明定价",
      "pricing.title": "免费试用 PK-Bayes，为您的机构选择合适方案",
      "pricing.lead": "让精准贝叶斯剂量普惠每一家医院：告别数万美元的昂贵黑盒合同。从 14 天全功能免费试用开始。",
      "pricing.plan_free_name": "免费试用",
      "pricing.plan_free_price": "0 USD",
      "pricing.plan_free_period": "/ 14 天",
      "pricing.plan_free_desc": "14 天内无限制使用全部临床剂量工具，便于您的团队评估临床工作流与估算精度。",
      "pricing.plan_free_btn": "开启 14 天免费试用",
      "pricing.plan_comp_name": "机构完整版",
      "pricing.plan_comp_price": "1,350 USD",
      "pricing.plan_comp_period": "/ 年",
      "pricing.plan_comp_desc": "全机构不限用户数、涵盖全部临床模块与 PopPK 数据集一键导出的年度授权。",
      "pricing.plan_comp_btn": "订阅完整版 ($1,350 USD/年)",
      "pricing.plan_comp_ribbon": "全功能尊享",

      "footer.desc": "专为万古霉素（已上线）及后续管线药物打造的实时精准临床药代动力学剂量与 MAP 贝叶斯优化工作站。",
      "footer.product": "产品中心",
      "footer.access": "用户通道",
      "footer.security": "科学与安全",
      "footer.rights": "保留所有权利。"
    },

    ja: {
      "nav.home": "ホーム",
      "nav.features": "機能一覧",
      "nav.drugs": "薬剤・モデル",
      "nav.cases": "臨床事例",
      "nav.login": "ログイン",
      "nav.cta": "今すぐ試す",
      "nav.trial": "14日間無料トライアル",
      "common.free_trial": "14日間無料トライアル",
      "common.see_capabilities": "臨床機能を見る",
      "common.active": "稼働中",
      "common.roadmap": "近日公開",
      "common.in_dev": "開発中",
      "common.live": "稼働中",
      "common.verified": "検証済み",
      "common.transparent": "透明な価格",
      "common.details": "詳細を見る →",

      "hero.eyebrow": "臨床意思決定支援ソフトウェア (CDSS) & プレシジョン・メディシン",
      "hero.title": "精密薬物動態投与設計 & リアルタイム MAP ベイズ推定プラットフォーム",
      "hero.lead": "PK-Bayes は治療域の狭い薬剤（バンコマイシン稼働中、ASHP/IDSA 2020 ガイドライン準拠：AUC24/MIC 400–600 mg·h/L、フェニトイン開発中）の TDM を最適化します。MAP ベイズ推定、急性腎障害 (AKI) 時の質量保存型常微分方程式 (RK45 ODE) 数値解析、施設適応型母集団学習を融合。",
      "hero.btn_trial": "14日間無料トライアルを開始",
      "hero.btn_compare": "強みと競合比較を見る",
      "hero.stat1_num": "< 100 ms",
      "hero.stat1_label": "MAP 推定速度",
      "hero.stat2_num": "400–600",
      "hero.stat2_label": "mg·h/L 目標 AUC24",
      "hero.stat3_num": "1 クリック",
      "hero.stat3_label": "PopPK データ NONMEM",
      "hero.stat4_num": "$1,350",
      "hero.stat4_label": "USD/年 完全プラン",

      "app.what_is_eyebrow": "技術と基礎理論",
      "app.what_is_title": "PK-Bayes とは？ どのように臨床投与設計を変革するのか？",
      "app.what_is_lead": "最先端のファーマコメトリクス、高性能数値計算、直感的なインターフェースを融合し、各患者に最適化された個別化医療を実現する臨床ワークステーションです。",
      "app.card1_title": "多変量 MAP ベイズ推定",
      "app.card1_desc": "事前の母集団パラメータと実測血中濃度をベイズ統計で統合し、100 ミリ秒未満で個別動態パラメータ（CL, Vd, t1/2, AUC24）を算出します。",
      "app.card2_title": "AKI における連続 RK45 ODE 動態解析",
      "app.card2_desc": "静的な計算式とは異なり、急性腎機能変動（クレアチニン：1.0 → 5.0 → 10.0 mg/dL）や血液透析を厳密な質量保存型常微分方程式で連続解析します。",
      "app.card3_title": "柔軟な TDM 採血タイミング",
      "app.card3_desc": "厳密なトラフ採血時間に縛られる必要はありません。投与間隔内のどの時点の血中濃度データでも数学的厳密さをもって正確に適合します。",

      "benefits.eyebrow": "総合的な価値提案",
      "benefits.title": "臨床・運用・研究の 3 つのメリット",
      "benefits.lead": "病棟薬剤師、感染症専門医、集中治療 (ICU) チーム、薬物動態研究者のために設計されています。",
      "benefits.clinical_title": "臨床上のメリット",
      "benefits.clinical_1": "重症 MRSA 感染症における治療有効性の最大化 (AUC24/MIC ≥ 400–600 mg·h/L)。",
      "benefits.clinical_2": "バンコマイシン誘発性腎毒性の根本的予防と AKI の早期発見・モニタリング。",
      "benefits.clinical_3": "ICU 重症患者、敗血症、高 BMI 肥満患者、血液透析患者における安全な投与設計。",
      "benefits.operational_title": "運用上のメリット",
      "benefits.operational_1": "患者のベッドサイドですぐに最適な投与推奨を数秒で算出。",
      "benefits.operational_2": "投与前に複数の投与計画を検証できるインタラクティブな What-If シミュレーター。",
      "benefits.operational_3": "全操作と変更履歴を完全に記録する患者別不可変監査ログ。",
      "benefits.research_title": "研究・アカデミアのメリット",
      "benefits.research_1": "NONMEM や Monolix で即座に使用可能な標準化 PopPK データセットを 1 クリックで自動生成。",
      "benefits.research_2": "カルテや看護記録からの膨大な手作業転記・データクレンジング作業を完全撤廃。",
      "benefits.research_3": "自施設データに基づく事前パラメータ校正 (RMSE, MAE, Bias) による院内学習の進化。",

      "compare.eyebrow": "競争上の優位性",
      "compare.title": "直接比較：なぜ PK-Bayes が選ばれるのか？",
      "compare.lead": "臨床能力、数学的厳密性、導入コストにおける完全な透明性。",
      "compare.col_feature": "機能 / 項目",
      "compare.col_legacy": "ノモグラム / Excel",
      "compare.col_foreign": "海外商用ソフト ($15k–$50k)",
      "compare.col_pkbayes": "PK-Bayes",
      "compare.row1_title": "価格体系とライセンス",
      "compare.row1_legacy": "無料（ただし臨床リスク大）",
      "compare.row1_foreign": "$15,000–$50,000+ USD/年（不透明な長期契約）",
      "compare.row1_pkbayes": "$1,350 USD/年（14日間無料体験可能）",
      "compare.row2_title": "リアルタイム MAP ベイズエンジン",
      "compare.row2_legacy": "✕ なし（静的簡易計算）",
      "compare.row2_foreign": "✓ あり（< 500 ms）",
      "compare.row2_pkbayes": "✓ あり（< 100 ms 超高速）",
      "compare.row3_title": "AKI 連続 ODE 動態 (RK45)",
      "compare.row3_legacy": "✕ 腎クリアランス一定を仮定",
      "compare.row3_foreign": "一部対応 / 区分近似",
      "compare.row3_pkbayes": "✓ 厳密な質量保存型連続積分",
      "compare.row4_title": "PopPK データセット自動生成 (NONMEM/Monolix)",
      "compare.row4_legacy": "✕ なし（数週間の手作業が必要）",
      "compare.row4_foreign": "✕ 未搭載または高額オプション",
      "compare.row4_pkbayes": "✓ 完全プランに標準搭載（1クリック）",
      "compare.row5_title": "自施設 Prior パラメータ校正 (RMSE/MAE)",
      "compare.row5_legacy": "✕ なし",
      "compare.row5_foreign": "✕ 高額な個別コンサルが必要",
      "compare.row5_pkbayes": "✓ 継続的なローカルベンチマーク校正",
      "compare.row6_title": "ネイティブ多言語対応",
      "compare.row6_legacy": "対象外",
      "compare.row6_foreign": "✕ ほぼ英語のみ",
      "compare.row6_pkbayes": "✓ スペイン語、英語、中国語、日本語",

      "problem.eyebrow": "臨床現場の課題",
      "problem.title": "大きな薬物動態の個体間変動には数学的精密さが不可欠です",
      "problem.sub": "<strong>バンコマイシン</strong>のような狭小治療域薬は極めて大きな個体間変動を示します。敗血症、急性腎機能変動 (AKI)、血液透析患者では、従来のノモグラムや簡易計算シートでは誤差が大きく、入院期間の長期化や予後悪化を招きます。",
      "problem.card1_title": "過小投与と治療不全",
      "problem.card1_desc": "控えめな経験的投与は有効血中濃度未満 (AUC24 < 400 mg·h/L) を引き起こし、感染症の進行や耐性菌の出現リスクを高めます。",
      "problem.card2_title": "過剰蓄積と急性腎障害 (AKI)",
      "problem.card2_desc": "過剰蓄積は不可逆的な腎障害を引き起こします。PK-Bayes は目標 AUC24 範囲 (400–600 mg·h/L) を厳密に制御し、腎毒性を最小限に抑えます。",
      "problem.card3_title": "厳格な TDM 採血時間の制約",
      "problem.card3_desc": "正確なトラフ時間に採血できない場合、従来のノモグラムは無効になります。PK-Bayes は投与間隔内のどの時点の採血データでも正確に適合可能です。",

      "workflow.eyebrow": "インテリジェント臨床ワークフロー",
      "workflow.title": "患者データから最適投与設計までの 4 ステップ",
      "workflow.step1_title": "患者情報 & 生体計測",
      "workflow.step1_desc": "基本情報、動的腎機能指標 (Cockcroft-Gault, CKD-EPI)、併存疾患をベッドサイドで入力。",
      "workflow.step2_title": "TDM 投与・測定記録",
      "workflow.step2_desc": "投与履歴と任意のタイミングで測定された血中濃度データを入力。",
      "workflow.step3_title": "100 ms 以内の MAP 適合",
      "workflow.step3_desc": "常微分方程式 (ODE) を数値的に解き、個別化された MAP ベイズ推定を即座に完了。",
      "workflow.step4_title": "What-If シミュレーション",
      "workflow.step4_desc": "複数の投与レジメンを対話的に予測し、AUC24/MIC 目標 (400–600) を達成してレポート出力。",

      "bento.eyebrow": "プラットフォーム機能",
      "bento.title": "高度なファーマコメトリクスと洗練された臨床インターフェース",
      "bento.card1_title": "多変量 MAP ベイズ推定",
      "bento.card1_desc": "個別の薬物動態パラメータ (CL, V1, Q, V2, t1/2, AUC24) を 100 ミリ秒未満で算出。",
      "bento.card2_title": "バンコマイシン：2020 コンセンサス",
      "bento.card2_desc": "AUC24/MIC 誘導投与 (400–600 mg·h/L) に対応し、2コンパートメントモデル (Goti 2018 BSV 30%) を採用。",
      "bento.card3_title": "動的腎動態解析 (RK45 ODEs)",
      "bento.card3_desc": "急性腎障害 (AKI) においても質量保存型常微分方程式で非定常状態曲線を連続積分。",
      "bento.card4_title": "近日公開：フェニトインモジュール",
      "bento.card4_desc": "開発中：飽和型肝代謝速度論 (Michaelis-Menten) および Sheiner-Tozer による遊離型補正。",
      "bento.card5_title": "コホート縦断ダッシュボード",
      "bento.card5_desc": "投与量と血中濃度の同期連動グラフ、複数患者ハイライト、ICU フィルタ、95% 信頼区間帯。",
      "bento.card6_title": "PopPK データセット自動生成",
      "bento.card6_desc": "母集団薬物動態解析のため、患者データを自動構築・標準化して NONMEM や Monolix に出力。",

      "pricing.eyebrow": "透明な料金体系",
      "pricing.title": "無料で PK-Bayes を体験し、施設に最適なプランを選択",
      "pricing.lead": "高額な契約や囲い込みを排し、精密ベイズ投与設計をすべての施設へ。14日間のフルアクセス無料体験から始められます。",
      "pricing.plan_free_name": "無料トライアル",
      "pricing.plan_free_price": "0 USD",
      "pricing.plan_free_period": "/ 14 日間",
      "pricing.plan_free_desc": "14日間すべての臨床機能を無料でご利用いただけます。チームで精度とワークフローを検証可能です。",
      "pricing.plan_free_btn": "無料トライアルを開始 (14日間)",
      "pricing.plan_comp_name": "施設完全プラン",
      "pricing.plan_comp_price": "1,350 USD",
      "pricing.plan_comp_period": "/ 年",
      "pricing.plan_comp_desc": "全施設無制限ユーザー、全臨床モジュール、PopPK データセット出力を含む年間包括ライセンス。",
      "pricing.plan_comp_btn": "完全プランに申し込む ($1,350 USD/年)",
      "pricing.plan_comp_ribbon": "包括プラン",

      "footer.desc": "バンコマイシン（稼働中）および開発中パイプラインのためのリアルタイム精密薬物動態投与設計 & MAP ベイズ最適化臨床プラットフォーム。",
      "footer.product": "製品情報",
      "footer.access": "アクセス",
      "footer.security": "科学とセキュリティ",
      "footer.rights": "All rights reserved."
    }
  };

  function getCurrentLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGS.includes(saved)) {
      return saved;
    }
    const browserLang = (navigator.language || navigator.userLanguage || "es").slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGS.includes(browserLang)) {
      return browserLang;
    }
    return "es";
  }

  function applyLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = "es";
    document.documentElement.lang = lang;

    const dict = I18N[lang] || I18N.es;
    const fallbackDict = I18N.es;

    // Actualizar elementos data-i18n (texto plano)
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const translation = dict[key] || fallbackDict[key];
      if (translation !== undefined) {
        el.textContent = translation;
      }
    });

    // Actualizar elementos data-i18n-html (markup enriquecido)
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const translation = dict[key] || fallbackDict[key];
      if (translation !== undefined) {
        el.innerHTML = translation;
      }
    });

    // Actualizar placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const translation = dict[key] || fallbackDict[key];
      if (translation !== undefined) {
        el.setAttribute("placeholder", translation);
      }
    });

    // Actualizar selector en header (solo texto del idioma sin emoji de bandera)
    document.querySelectorAll(".lang-current-label").forEach((el) => {
      el.textContent = LANG_NAMES[lang];
    });

    document.querySelectorAll(".lang-item").forEach((item) => {
      const itemLang = item.getAttribute("data-lang");
      item.classList.toggle("active", itemLang === lang);
    });

    // Despachar evento personalizado
    window.dispatchEvent(new CustomEvent("pkbayes_language_changed", { detail: { lang } }));
  }

  function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    applyLanguage(lang);
  }

  function initLanguageDropdowns() {
    document.querySelectorAll(".lang-selector").forEach((selector) => {
      const btn = selector.querySelector(".lang-btn");
      const menu = selector.querySelector(".lang-dropdown");
      if (!btn || !menu) return;

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = selector.classList.contains("open");
        document.querySelectorAll(".lang-selector.open").forEach((s) => s.classList.remove("open"));
        if (!isOpen) selector.classList.add("open");
      });

      menu.querySelectorAll(".lang-item").forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          const selected = item.getAttribute("data-lang");
          setLanguage(selected);
          selector.classList.remove("open");
        });
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".lang-selector.open").forEach((s) => s.classList.remove("open"));
    });
  }

  // Inicialización inmediata al cargar el DOM
  const initialLang = getCurrentLang();
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      applyLanguage(initialLang);
      initLanguageDropdowns();
    });
  } else {
    applyLanguage(initialLang);
    initLanguageDropdowns();
  }

  // Exponer API global
  window.PKBAYES_I18N = {
    setLanguage,
    getCurrentLang,
    SUPPORTED_LANGS,
    LANG_NAMES,
    LANG_FLAGS
  };
})();
