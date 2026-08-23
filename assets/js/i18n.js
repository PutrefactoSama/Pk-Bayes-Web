/**
 * PK-Bayes — Motor de Internacionalización (i18n)
 * Soporta: Español (es), English (en), 中文 (zh), 日本語 (ja)
 */
(function () {
  "use strict";

  const STORAGE_KEY = "pkbayes_lang";
  const SUPPORTED_LANGS = ["es", "en", "zh", "ja"];

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

      "hero.eyebrow": "Software de Apoyo a la Decisión Clínica (CDSS)",
      "hero.title": "Plataforma de Precisión Farmacocinética y Dosificación Bayesiana en Tiempo Real",
      "hero.lead": "PK-Bayes optimiza la monitorización terapéutica (TDM) de estrecho margen terapéutico para <strong>Vancomicina</strong> (activo) y avanza en el desarrollo de <strong>Fenitoína</strong>. Combina estimación bayesiana MAP, resolución de ecuaciones diferenciales ordinarias (ODEs RK45) con preservación de masa ante cambios de creatinina y aprendizaje poblacional institucional adaptativo.",
      "hero.btn_trial": "Probar 14 días gratis",
      "hero.btn_features": "Ver capacidades clínicas",

      "tour.section_eyebrow": "La Plataforma en Acción",
      "tour.section_title": "Experiencia Clínica Real de Precisión Farmacocinética",
      "tour.section_lead": "Recorre las 5 vistas esenciales de PK-Bayes: desde el triage asistencial y biometría renal hasta la estimación bayesiana MAP y el análisis de cohorte.",
      "tour.tab1_num": "VISTA 01",
      "tour.tab1_title": "Resumen & Dashboard",
      "tour.tab1_sub": "Triage UCI vs Básica",
      "tour.tab2_num": "VISTA 02",
      "tour.tab2_title": "Datos & Biometría",
      "tour.tab2_sub": "Cockcroft-Gault & CKD-EPI",
      "tour.tab3_num": "VISTA 03",
      "tour.tab3_title": "Monitorización PK",
      "tour.tab3_sub": "Curva Continua & AKI",
      "tour.tab4_num": "VISTA 04",
      "tour.tab4_title": "Estimación & What-If",
      "tour.tab4_sub": "Ajuste MAP & Predictor",
      "tour.tab5_num": "VISTA 05",
      "tour.tab5_title": "Evolución Cohorte",
      "tour.tab5_sub": "Dosis vs Niveles (IC95%)",
      
      "tour.slide1_title": "Dashboard Asistencial y Resumen de Pacientes",
      "tour.slide1_desc": "Monitoreo activo multihospital con clasificación automática por gravedad (Sala Básica vs Sala Crítica / UCI), control de fármaco activo y acceso directo a expedientes clínicos con auditoría.",
      "tour.slide2_title": "Demografía, Función Renal Dinámica y Biometría",
      "tour.slide2_desc": "Cálculo instantáneo de CrCl (Cockcroft-Gault), eGFR (CKD-EPI), estratificación en rangos de función renal y normalización antropométrica de IMC, peso ideal y peso ajustado.",
      "tour.slide3_title": "Monitorización PK y Curva ODE con Eventos Renales (AKI)",
      "tour.slide3_desc": "Registro cronológico de dosis administradas, integración de valles TDM y resolución numérica continua por ODEs RK45 reflejando caídas o recuperaciones agudas de función renal (Cr: 1.0 → 5.0 → 10.0 mg/dL).",
      "tour.slide4_title": "Estimación Bayesiana MAP y Predictor What-If en Tiempo Real",
      "tour.slide4_desc": "Ajuste bayesiano Maximum A Posteriori con comparación paramétrica (Poblacional vs Individual: AUC24, Vd, CL, t1/2), semáforo de metas terapéuticas y simulación interactiva de regímenes con alertas de toxicidad.",
      "tour.slide5_title": "Evolución Longitudinal de la Monitorización y Bandas IC95%",
      "tour.slide5_desc": "Análisis agregado de cohorte con gráficos pareados: evolución temporal de dosis administradas (716 eventos) vs concentraciones plasmáticas reales frente al rango diana (15–20 mg/L) con cálculo de media e IC95%.",

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

      "footer.desc": "Plataforma clínica de dosificación farmacocinética de precisión y optimización bayesiana MAP en tiempo real para vancomicina (activo) y nuevos fármacos en desarrollo.",
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

      "hero.eyebrow": "Clinical Decision Support Software (CDSS)",
      "hero.title": "Real-Time Pharmacokinetic Precision & Bayesian Dosing Platform",
      "hero.lead": "PK-Bayes optimizes therapeutic drug monitoring (TDM) for narrow therapeutic index drugs, active for <strong>Vancomycin</strong> and expanding with <strong>Phenytoin</strong>. Combines Maximum A Posteriori (MAP) Bayesian estimation, Runge-Kutta ODE solvers (RK45) with mass preservation during renal changes, and adaptive institutional learning.",
      "hero.btn_trial": "Start 14-day free trial",
      "hero.btn_features": "View clinical capabilities",

      "tour.section_eyebrow": "The Platform in Action",
      "tour.section_title": "Real Clinical Experience in Precision Pharmacokinetics",
      "tour.section_lead": "Explore the 5 essential views of PK-Bayes: from triage and renal biometrics to MAP Bayesian estimation and cohort analysis.",
      "tour.tab1_num": "VIEW 01",
      "tour.tab1_title": "Overview & Dashboard",
      "tour.tab1_sub": "ICU vs Ward Triage",
      "tour.tab2_num": "VIEW 02",
      "tour.tab2_title": "Patient & Biometrics",
      "tour.tab2_sub": "Cockcroft-Gault & CKD-EPI",
      "tour.tab3_num": "VIEW 03",
      "tour.tab3_title": "PK Monitoring",
      "tour.tab3_sub": "Continuous Curve & AKI",
      "tour.tab4_num": "VIEW 04",
      "tour.tab4_title": "Estimation & What-If",
      "tour.tab4_sub": "MAP Fit & Regimen Predictor",
      "tour.tab5_num": "VIEW 05",
      "tour.tab5_title": "Cohort Evolution",
      "tour.tab5_sub": "Dose vs Levels (95% CI)",

      "tour.slide1_title": "Clinical Dashboard & Patient Overview",
      "tour.slide1_desc": "Multi-hospital active monitoring with automated severity categorization (General Ward vs ICU / Critical Care), active drug tracking, and audited clinical records.",
      "tour.slide2_title": "Demographics, Dynamic Renal Function & Biometrics",
      "tour.slide2_desc": "Instant calculation of CrCl (Cockcroft-Gault), eGFR (CKD-EPI), renal stratification ranges, and body composition normalization (BMI, ideal & adjusted body weight).",
      "tour.slide3_title": "PK Monitoring & Continuous ODE Curve with Renal Fluctuations (AKI)",
      "tour.slide3_desc": "Chronological dosing log, TDM trough integration, and continuous Runge-Kutta 45 ODE solving capturing acute renal drops and recoveries (Cr: 1.0 → 5.0 → 10.0 mg/dL).",
      "tour.slide4_title": "Real-Time MAP Bayesian Estimation & What-If Predictor",
      "tour.slide4_desc": "Maximum A Posteriori Bayesian fitting with parametric comparison (Population vs Individual: AUC24, Vd, CL, t1/2), target attainments, and interactive regimen simulations with toxicity warnings.",
      "tour.slide5_title": "Longitudinal Monitoring Evolution & 95% Confidence Intervals",
      "tour.slide5_desc": "Aggregated cohort analytics with paired charts: dose timeline (716 events) vs observed serum concentrations against target range (15–20 mg/L) with real-time 95% CI.",

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
      "bento.card2_title": "Vancomycin: 2020 Consensus Guidelines",
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

      "hero.eyebrow": "临床决策支持系统 (CDSS)",
      "hero.title": "实时药代动力学精准剂量与贝叶斯给药平台",
      "hero.lead": "PK-Bayes 专注于治疗窗狭窄药物的治疗药物监测 (TDM) 优化，现已全面支持 <strong>万古霉素 (Vancomycin)</strong>，并正在研发 <strong>苯妥英 (Phenytoin)</strong>。系统结合最大后验概率 (MAP) 贝叶斯估算、质量守恒常微分方程 (RK45 ODEs) 及机构自适应先验学习。",
      "hero.btn_trial": "免费试用 14 天",
      "hero.btn_features": "查看临床功能",

      "tour.section_eyebrow": "系统功能实景",
      "tour.section_title": "真实的精准药动学临床工作流",
      "tour.section_lead": "全景探索 PK-Bayes 的 5 大核心界面：从床旁分诊与肾功能评估，到 MAP 贝叶斯拟合及队列纵向分析。",
      "tour.tab1_num": "界面 01",
      "tour.tab1_title": "患者概览与看板",
      "tour.tab1_sub": "ICU 与普通病房分诊",
      "tour.tab2_num": "界面 02",
      "tour.tab2_title": "患者数据与体征",
      "tour.tab2_sub": "Cockcroft-Gault 与 CKD-EPI",
      "tour.tab3_num": "界面 03",
      "tour.tab3_title": "PK 浓度监测",
      "tour.tab3_sub": "连续动力学曲线与 AKI",
      "tour.tab4_num": "界面 04",
      "tour.tab4_title": "贝叶斯估算与模拟",
      "tour.tab4_sub": "MAP 拟合与给药方案预测",
      "tour.tab5_num": "界面 05",
      "tour.tab5_title": "队列纵向演变",
      "tour.tab5_sub": "剂量与血药浓度 (95% CI)",

      "tour.slide1_title": "临床看板与患者综合管理",
      "tour.slide1_desc": "支持多院区实时监测，按病情危重度（普通病房 vs 重症 ICU）自动分级，跟踪活性药物，并提供可追溯的临床审计档案。",
      "tour.slide2_title": "人口学特征、动态肾功能与生物测量",
      "tour.slide2_desc": "实时计算肌酐清除率 CrCl (Cockcroft-Gault) 与 eGFR (CKD-EPI)，分级肾功能范围，并标准化 BMI、理想体重和调整体重。",
      "tour.slide3_title": "PK 动力学监测与肾功能波动 (AKI) 连续曲线",
      "tour.slide3_desc": "按时间顺序记录给药历程，整合 TDM 谷浓度测定，并通过 RK45 常微分方程连续求解，精准反映急性肾损伤与恢复历程（Cr: 1.0 → 5.0 → 10.0 mg/dL）。",
      "tour.slide4_title": "实时 MAP 贝叶斯估算与 What-If 方案预测",
      "tour.slide4_desc": "基于最大后验概率的贝叶斯拟合（个体 vs 群体参数：AUC24、Vd、CL、t1/2），显示达标状态及带毒性预警的交互式给药模拟。",
      "tour.slide5_title": "纵向监测演变与 95% 置信区间",
      "tour.slide5_desc": "整合队列双图分析：给药时间历程（716次事件）与实测血药浓度对照目标范围（15–20 mg/L），并动态计算群体均值与 95% 置信区间。",

      "problem.eyebrow": "临床面临的挑战",
      "problem.title": "显著的药动学个体差异需要严谨的数学模型",
      "problem.sub": "像 <strong>万古霉素</strong> 这样的治疗窗狭窄药物具有极高的药动学变异。在脓毒症、急性肾损伤 (AKI) 或血液透析患者中，传统列线图和电子表格极易失效，导致住院时间延长和死亡率上升。",
      "problem.card1_title": "剂量不足与治疗失败",
      "problem.card1_desc": "保守的经验性给药容易导致血药浓度不足 (AUC24 < 400 mg·h/L)，使细菌感染难以控制，并诱导耐药菌株产生。",
      "problem.card2_title": "蓄积毒性与急性肾损伤 (AKI)",
      "problem.card2_desc": "万古霉素过度蓄积会导致急性肾功能衰竭。PK-Bayes 严格调控目标 AUC24 范围 (400–600 mg·h/L)，最大限度降低肾毒性风险。",
      "problem.card3_title": "传统 TDM 采血时间严苛受限",
      "problem.card3_desc": "传统估算法若未在给药前精确采血即宣告作废。PK-Bayes 支持在给药间隔内的任意时刻采血，均可精准拟合动力学曲线。",

      "workflow.eyebrow": "智能化临床流程",
      "workflow.title": "四步实现从患者数据到最优精准剂量",
      "workflow.step1_title": "录入与体征评估",
      "workflow.step1_desc": "床旁录入人口学数据、动态肾功能指标 (Cockcroft-Gault, CKD-EPI) 及临床合并症。",
      "workflow.step2_title": "TDM 采血记录",
      "workflow.step2_desc": "输入实际给药剂量及任意时间点测得的血清药物浓度。",
      "workflow.step3_title": "< 100 ms MAP 拟合",
      "workflow.step3_desc": "常微分方程连续数值求解，瞬间完成个体化最大后验概率贝叶斯估算。",
      "workflow.step4_title": "What-If 剂量模拟",
      "workflow.step4_desc": "实时交互预测给药方案，锁定 AUC24/MIC 靶向目标 (400–600)，生成临床报告。",

      "bento.eyebrow": "平台核心能力",
      "bento.title": "现代临床界面融合前沿药学计算科技",
      "bento.card1_title": "多变量 MAP 贝叶斯拟合引擎",
      "bento.card1_desc": "100 毫秒内极速计算个体药动学参数（CL, V1, Q, V2, t1/2, AUC24）。",
      "bento.card2_title": "万古霉素：2020 国际共识指南",
      "bento.card2_desc": "严格遵循 AUC24/MIC 目标导向给药 (400–600 mg·h/L)，内置二室模型 (Goti 2018 BSV 30%)。",
      "bento.card3_title": "非稳态肾动力学 (RK45 ODEs)",
      "bento.card3_desc": "采用质量守恒算法连续求解常微分方程，完美应对急性肾功能损伤 (AKI) 与恢复期。",
      "bento.card4_title": "即将推出：苯妥英钠模块",
      "bento.card4_desc": "正在研发：米氏方程 (Michaelis-Menten) 饱和动力学及 Sheiner-Tozer 游离分数校正。",
      "bento.card5_title": "队列纵向数据大屏",
      "bento.card5_desc": "剂量与浓度双联图同步渲染、患者多选交叉分析、ICU 筛选及 95% CI 动态区间。",
      "bento.card6_title": "NONMEM 与 Monolix 群体数据集",
      "bento.card6_desc": "一键自动构建和导出符合国际药动学建模标准的结构化群体数据集。",

      "pricing.eyebrow": "透明化定价体系",
      "pricing.title": "免费体验 PK-Bayes，随后选择适合贵机构的方案",
      "pricing.lead": "打破动辄数万美元的不透明高价壁垒，让精准给药技术惠及每一家医院与高校。14 天全功能免费试用。",
      "pricing.plan_free_name": "免费试用版",
      "pricing.plan_free_price": "0 USD",
      "pricing.plan_free_period": "/ 14 天",
      "pricing.plan_free_desc": "14 天内无限制使用全部临床计算与调整工具，方便团队在决策前验证真实工作流。",
      "pricing.plan_free_btn": "开启 14 天免费试用",
      "pricing.plan_comp_name": "机构完整版",
      "pricing.plan_comp_price": "1,350 USD",
      "pricing.plan_comp_period": "/ 年",
      "pricing.plan_comp_desc": "面向医院或大学的全功能年度许可，不限临床用户与患者数量，含全部功能与数据导出。",
      "pricing.plan_comp_btn": "订阅机构完整版 ($1,350 USD/年)",
      "pricing.plan_comp_ribbon": "全功能尊享",

      "footer.desc": "面向万古霉素（已上线）及后续前沿药物的实时精准药动学计算与 MAP 贝叶斯给药决策平台。",
      "footer.product": "产品中心",
      "footer.access": "系统登录",
      "footer.security": "安全合规与科学严谨",
      "footer.rights": "版权所有。"
    },

    ja: {
      "nav.home": "ホーム",
      "nav.features": "機能一覧",
      "nav.drugs": "薬剤・モデル",
      "nav.cases": "臨床症例",
      "nav.login": "ログイン",
      "nav.cta": "今すぐ開始",
      "nav.trial": "14日間無料トライアル",
      "common.free_trial": "14日間無料トライアル",
      "common.see_capabilities": "臨床機能を見る",
      "common.active": "提供中",
      "common.roadmap": "近日公開",
      "common.in_dev": "開発中",
      "common.live": "稼働中",
      "common.verified": "検証済み",
      "common.transparent": "透明な価格",
      "common.details": "詳細を見る →",

      "hero.eyebrow": "臨床意思決定支援システム (CDSS)",
      "hero.title": "リアルタイム薬物動態プレシジョン・ベイジアン投与設計プラットフォーム",
      "hero.lead": "PK-Bayes は治療域の狭い薬剤の TDM（薬物血中濃度モニタリング）を最適化します。<strong>バンコマイシン</strong>に対応し、<strong>フェニトイン</strong>を順次展開。MAP ベイズ推定、質量保存則に基づく常微分方程式（RK45 ODEs）、施設適応型事前確率学習を統合しています。",
      "hero.btn_trial": "14日間無料トライアル",
      "hero.btn_features": "臨床機能を見る",

      "tour.section_eyebrow": "実際のシステム画面",
      "tour.section_title": "高精度な薬物動態ワークステーションの実機体験",
      "tour.section_lead": "ベッドサイドのトリアージから MAP ベイズ推定、コホート解析まで、主要な5つの実画面をご確認いただけます。",
      "tour.tab1_num": "画面 01",
      "tour.tab1_title": "患者一覧・ダッシュボード",
      "tour.tab1_sub": "一般病棟 vs ICU トリアージ",
      "tour.tab2_num": "画面 02",
      "tour.tab2_title": "生体情報・腎機能",
      "tour.tab2_sub": "Cockcroft-Gault & CKD-EPI",
      "tour.tab3_num": "画面 03",
      "tour.tab3_title": "PK モニタリング",
      "tour.tab3_sub": "連続曲線 & 急性腎障害 (AKI)",
      "tour.tab4_num": "画面 04",
      "tour.tab4_title": "ベイズ推定 & シミュレーション",
      "tour.tab4_sub": "MAP 適合 & 最適レジメン予測",
      "tour.tab5_num": "画面 05",
      "tour.tab5_title": "コホート推移",
      "tour.tab5_sub": "投与量 vs 血中濃度 (95% CI)",

      "tour.slide1_title": "患者ダッシュボードと病棟管理",
      "tour.slide1_desc": "重症度（一般病棟 vs ICU/高度治療室）による自動分類、対象薬剤の追跡、監査ログ付きの電子カルテ連携に対応。",
      "tour.slide2_title": "患者背景・動的腎機能評価・生体計測",
      "tour.slide2_desc": "CrCl (Cockcroft-Gault) と eGFR (CKD-EPI) の自動計算、腎機能分類、BMI、理想体重および補正体重を瞬時に算出。",
      "tour.slide3_title": "PK モニタリングと腎機能変動 (AKI) 連続 ODE 曲線",
      "tour.slide3_desc": "投与履歴の時系列管理、TDM トラフ値の統合、RK45 常微分方程式による急性腎機能変動（Cr: 1.0 → 5.0 → 10.0 mg/dL）の連続解析。",
      "tour.slide4_title": "リアルタイム MAP ベイズ推定と What-If レジメン予測",
      "tour.slide4_desc": "最大事後確率 (MAP) 推定によるパラメータ適合（個別 vs 集団：AUC24、Vd、CL、t1/2）、目標達成状況判定、毒性アラート付き予測シミュレーション。",
      "tour.slide5_title": "コホート縦断的推移と 95% 信頼区間",
      "tour.slide5_desc": "投与イベント（716件）と実測血中濃度（目標範囲 15–20 mg/L）の連動グラフ、集団平均値および 95% 信頼区間のリアルタイム算出。",

      "problem.eyebrow": "臨床の課題",
      "problem.title": "薬物動態の個体間変動には厳密な数学的アプローチが必要です",
      "problem.sub": "<strong>バンコマイシン</strong>のような治療域の狭い薬剤は患者ごとの PK 変動が極めて大きくなります。敗血症、変動する急性腎不全 (AKI)、透析患者では、従来のノモグラムや簡易計算表では対応できず、入院期間の長期化や予後悪化につながります。",
      "problem.card1_title": "過小投与と治療失敗",
      "problem.card1_desc": "経験的投与では目標未達 (AUC24 < 400 mg·h/L) となりやすく、感染症の悪化や耐性菌の発現リスクが高まります。",
      "problem.card2_title": "蓄積毒性と急性腎障害 (AKI)",
      "problem.card2_desc": "薬剤の蓄積は重篤な腎毒性を引き起こします。PK-Bayes は目標 AUC24 (400–600 mg·h/L) を高精度に管理し、腎障害リスクを最小化します。",
      "problem.card3_title": "厳密すぎる TDM 採血時間の制約",
      "problem.card3_desc": "従来の計算法はトラフ採血時間からずれると破綻します。PK-Bayes は投与間隔内のどの時点の採血データでも高精度に解析可能です。",

      "workflow.eyebrow": "スマートな臨床ワークフロー",
      "workflow.title": "患者データから最適投与設計までわずか4ステップ",
      "workflow.step1_title": "患者情報・生体計測",
      "workflow.step1_desc": "患者背景、動的腎機能指標 (Cockcroft-Gault, CKD-EPI) をベッドサイドで入力。",
      "workflow.step2_title": "TDM 記録",
      "workflow.step2_desc": "投与量・投与時間、および任意のタイミングで測定された血清濃度を入力。",
      "workflow.step3_title": "100ms 未満の MAP 適合",
      "workflow.step3_desc": "常微分方程式の連続数値解析により、個別化された MAP ベイズ推定を即座に算出。",
      "workflow.step4_title": "What-If シミュレーション",
      "workflow.step4_desc": "対話的な投与計画の予測、AUC24/MIC (400–600) の最適化、臨床レポートの出力。",

      "bento.eyebrow": "プラットフォームの機能",
      "bento.title": "最先端のファーマコメトリクスを直感的な医療 UI で",
      "bento.card1_title": "多変量 MAP ベイズ推定エンジン",
      "bento.card1_desc": "患者個別の薬物動態パラメータ (CL, V1, Q, V2, t1/2, AUC24) を 100 ミリ秒未満で算出。",
      "bento.card2_title": "バンコマイシン：2020 国際ガイドライン",
      "bento.card2_desc": "AUC24/MIC ガイド下投与 (400–600 mg·h/L) に完全準拠。2コンパートメントモデル (Goti 2018 BSV 30%) 搭載。",
      "bento.card3_title": "動的腎動態解析 (RK45 ODEs)",
      "bento.card3_desc": "急性腎障害 (AKI) や回復期におけるコンパートメント間の質量保存則を考慮して連続数値計算。",
      "bento.card4_title": "近日公開：フェニトインモジュール",
      "bento.card4_desc": "開発中：ミカエリス・メンテン飽和速度論および Sheiner-Tozer 式による遊離型濃度補正。",
      "bento.card5_title": "コホート縦断ダッシュボード",
      "bento.card5_desc": "投与量と血中濃度の同期グラフ、複数患者の比較分析、ICU 絞り込み、95% CI 表示。",
      "bento.card6_title": "NONMEM・Monolix 向け PopPK データベース",
      "bento.card6_desc": "集団薬物動態モデリングや臨床研究にそのまま使用できる標準化データセットをワンクリック生成。",

      "pricing.eyebrow": "明確で安心な料金体系",
      "pricing.title": "14日間無料体験の後、施設に最適なプランをお選びいただけます",
      "pricing.lead": "不透明な数百万円単位の見積もりや不要な長期契約を排除。まずはすべての機能を14日間無料でお試しください。",
      "pricing.plan_free_name": "無料トライアル",
      "pricing.plan_free_price": "0 USD",
      "pricing.plan_free_period": "/ 14日間",
      "pricing.plan_free_desc": "導入決定前にチームで臨床ワークフローを検証できるよう、14日間全機能をご利用いただけます。",
      "pricing.plan_free_btn": "14日間無料トライアルを開始",
      "pricing.plan_comp_name": "施設フルプラン",
      "pricing.plan_comp_price": "1,350 USD",
      "pricing.plan_comp_period": "/ 年",
      "pricing.plan_comp_desc": "病院・大学向けの年間フルライセンス。ユーザー数・患者数無制限、全臨床モジュールおよびデータ抽出機能付き。",
      "pricing.plan_comp_btn": "フルプランに申し込む（$1,350 USD/年）",
      "pricing.plan_comp_ribbon": "全機能完備",

      "footer.desc": "バンコマイシン（提供中）および新薬パイプライン向けリアルタイム臨床薬物動態 MAP ベイズ投与設計システム。",
      "footer.product": "製品情報",
      "footer.access": "ログイン",
      "footer.security": "セキュリティ・科学的根拠",
      "footer.rights": "無断転載を禁じます。"
    }
  };

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

  function getCurrentLang() {
    let lang = localStorage.getItem(STORAGE_KEY);
    if (lang && SUPPORTED_LANGS.includes(lang)) return lang;

    const navLang = (navigator.language || navigator.userLanguage || "es").toLowerCase();
    if (navLang.startsWith("en")) return "en";
    if (navLang.startsWith("zh")) return "zh";
    if (navLang.startsWith("ja")) return "ja";
    return "es";
  }

  function applyLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = "es";
    const dict = I18N[lang] || I18N.es;
    const fallbackDict = I18N.es;

    document.documentElement.lang = lang;

    // Actualizar elementos data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const translation = dict[key] || fallbackDict[key];
      if (translation !== undefined) {
        el.textContent = translation;
      }
    });

    // Actualizar elementos data-i18n-html (que contienen markup como <strong>)
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

    // Actualizar selector en header
    document.querySelectorAll(".lang-current-label").forEach((el) => {
      el.textContent = `${LANG_FLAGS[lang]} ${LANG_NAMES[lang]}`;
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
