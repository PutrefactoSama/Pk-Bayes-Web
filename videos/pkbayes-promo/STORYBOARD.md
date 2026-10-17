---
format: 1920x1080
duration: 60s
message: "La dosis estándar trata al promedio. En la UCI, PK-Bayes individualiza la farmacocinética en tiempo real con inferencia bayesiana MAP."
arc: Hook -> Context -> Solution -> Zenith Workstation -> Multi-Drug Atlas -> Institutional ROI
audience: Intensivistas, Infectólogos PROA y Farmacéuticos Clínicos de Hospitales
mode: autonomous
music: cinematic-ambient
---

## Frame 1: La Ilusión de la Dosis Fija

- scene: Tres pacientes en UCI reciben la misma dosis fija de 1000mg q12h y divergen en pantalla hacia zonas terapéuticas opuestas
- duration: 6.816s
- poster: 4s
- transition_in: cut
- status: animated
- voiceover: "La dosis estándar trata al promedio. Pero en cuidados intensivos, ningún paciente es el promedio."
- asset_candidates: assets/logo-icon-256.png
- src: compositions/frames/01-hook.html

La apertura establece el conflicto clínico central: la dosificación fija basada en promedios falla en el paciente crítico. Tres curvas cinéticas divergen desde un mismo punto de infusión.

## Frame 2: Triage Crítico: Elena Morales UCI-04

- scene: Ficha clínica longitudinal de Elena Morales con sepsis y función renal en rápido descenso (eGFR 26 mL/min)
- duration: 10.608s
- poster: 5s
- transition_in: crossfade
- status: animated
- voiceover: "Elena Morales, 63 años, UCI. Sepsis y función renal en rápido descenso. Un ajuste a ciegas arriesga toxicidad o fallo terapéutico."
- asset_candidates: assets/01-dashboard.png; assets/08-zenith-minimalist-dashboard.png
- src: compositions/frames/02-context.html

Presentación del caso real en UCI. Mostramos la ficha de inspección rápida, el censo de camas críticas y el vector de aclaramiento renal nativo en caída.

## Frame 3: Motor Bayesiano MAP e Inferencia

- scene: Densidad de probabilidad bayesiana donde el prior poblacional ancho se contrae hacia el posterior individual tras una muestra TDM
- duration: 10.032s
- poster: 6s
- transition_in: crossfade
- status: animated
- voiceover: "Con una sola muestra en sangre, el motor bayesiano MAP de PK-Bayes contrasta el referente poblacional y recalcula los parámetros individuales en menos de 25 milisegundos."
- asset_candidates: assets/05-estimacion.png
- src: compositions/frames/03-bayes-engine.html

Demostración del motor Stan / MAP. Visualización de la contracción bayesiana (shrinkage) de CL y Vd alrededor del punto medido en sangre.

## Frame 4: Estación Zenith: Diana Posológica

- scene: Consola Zenith activa con la curva de 48 horas en meta, indicador circular PTA 96% y recomendación de 750mg cada 12 horas
- duration: 10.848s
- poster: 6s
- transition_in: crossfade
- status: animated
- voiceover: "La estación Zenith proyecta la dosis óptima: 750 miligramos cada 12 horas. Probabilidad en diana del 96 por ciento, protegiendo la función renal."
- asset_candidates: assets/08-zenith-minimalist-dashboard.png
- src: compositions/frames/04-zenith-workstation.html

El núcleo operativo de la plataforma: tarjeta de pauta posológica recomendada, corredor AUC24 485 mg·h/L y nivel valle predicho de 16.2 ug/mL.

## Frame 5: Catálogo Farmacocinético de Precisión

- scene: Bento visual mostrando Vancomicina, Fenitoína con saturación Michaelis-Menten y corrección Sheiner-Tozer, Aminoglucósidos y Tacrolimus
- duration: 8.856s
- poster: 5s
- transition_in: crossfade
- status: animated
- voiceover: "No solo vancomicina. Cinética no lineal de Michaelis-Menten y corrección de albúmina para fenitoína, aminoglucósidos y tacrolimus."
- asset_candidates: assets/07-estacion-suiza-fenitoina.png; assets/03-funcion-renal.png
- src: compositions/frames/05-drug-atlas.html

Amplitud terapéutica: visualización interactiva de cinética saturable hepática y barras dinámicas de fracción libre no unida por hipoalbuminemia.

## Frame 6: Impacto Asistencial, Trazabilidad y Cierre

- scene: Pista de auditoría FDA 21 CFR Part 11, interoperabilidad FHIR R4 y llamada a la acción para piloto institucional
- duration: 8.928s
- poster: 4s
- transition_in: crossfade
- status: animated
- voiceover: "Trazabilidad normativa, interoperabilidad FHIR y menor estancia en UCI. Solicita tu piloto clínico institucional en pk-bayes.com."
- asset_candidates: assets/10-exportacion.png; assets/logo-icon-256.png
- src: compositions/frames/06-closing-cta.html

Cierre de autoridad clínica: SaMD Class II, validación formal y enlace a la prueba gratuita hospitalaria.
