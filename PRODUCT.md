# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users: Farmacéuticos Clínicos, Médicos Intensivistas (UCI), Infectólogos y Nefrólogos en hospitales de alta complejidad.
Secondary users: Comités de Farmacia y Terapéutica, Directores Médicos y Responsables de TI/Informática Médica.

## Product Purpose

PK-Bayes es una plataforma de software de soporte a la decisión clínica (SaMD) diseñada para la individualización y optimización de dosis de fármacos con estrecho margen terapéutico (inicialmente vancomicina y fenitoína), mediante estimación bayesiana MAP (Maximum A Posteriori) y modelos farmacocinéticos poblacionales de alta resolución.

## Positioning

A diferencia del ajuste empírico tradicional o calculadoras lineales estáticas, PK-Bayes integra covariables fisiológicas dinámicas (CrCl, función renal cambiante, hemodiafiltración CVVHDF) con niveles séricos medidos (TDM), resolviendo la estimación bayesiana mediante Stan MCMC y algoritmos L-BFGS-B en menos de 25 ms para maximizar la Probabilidad de Éxito en Diana (PTA) y minimizar la nefrotoxicidad.

## Operating Context

Unidades de Pacientes Críticos (UCI), camas de medicina interna, comités de ajuste posológico, servicios de farmacia clínica hospitalaria e interoperabilidad con sistemas de historia clínica electrónica (HIS/LIS) vía HL7 FHIR R4.

## Capabilities and Constraints

- Modelos poblacionales bicompartimentales (Vancomicina) y cinética de saturación no lineal Michaelis-Menten (Fenitoína con corrección Winter-Tozer por albúmina).
- Simulador posológico dinámico con recálculo instantáneo de curvas C(t), AUC24/CIM, concentraciones valle y pico.
- Cumplimiento regulatorio: FDA 21 CFR Part 11, GAMP 5 Categoría 4, ISO 13485 e ISO 27001, HIPAA & GDPR.
- Soporte multilingüe estricto: 100% de paridad en 4 idiomas (Español, Inglés, Chino, Japonés) verificado por `tools/auditar-i18n.py`.
- Restricción tipográfica: 0 guiones largos o medios (`—` o `–`).

## Brand Commitments

- Nombre de marca: **PK-Bayes**.
- Estética solicitada: Fusión de **Apple Design** (calma clínica, materiales físicos, translucidez calibrada, concentric squircles, legibilidad de datos estilo Apple Health Pro) con **Framer Design** (interactividad audaz, micro-canvases dinámicos en vivo, físicas táctiles, telemetría visual de alta precisión).
