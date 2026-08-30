# PK-Bayes — Sitio web (marketing + puerta de pago)

Sitio estático (HTML/CSS/JS puro, sin build ni frameworks) que presenta PK-Bayes,
explica sus funcionalidades con ejemplos clínicos, y sirve de **puerta de entrada
de pago** antes de acceder a la aplicación real en:

```
https://pk-bayes-frontend.onrender.com
```

## Estructura

```
index.html            → Home: hero, problema, cómo funciona, funcionalidades, fármacos, precios (teaser)
funcionalidades.html   → Las 6 funcionalidades explicadas en detalle, con simulador interactivo
farmacos.html          → Modelos PK de vancomicina y fenitoína, priors institucionales
ejemplos.html          → 3 casos clínicos sintéticos paso a paso (timeline) + simulador
precios.html           → 3 planes + checkout de Stripe + FAQ
acceso.html            → Puerta de entrada para clientes existentes → app real
gracias.html           → Página de éxito tras el pago (success_url de Stripe)
cancelado.html         → Página si el usuario cancela el pago (cancel_url de Stripe)
assets/css/styles.css  → Todo el sistema de diseño (paleta clínica oficial)
assets/js/config.js    → ⚠️ ÚNICO archivo que necesitas editar para activar pagos reales
assets/js/main.js      → Navegación, animaciones, acordeón FAQ, menú móvil
assets/js/checkout.js  → Integración de Stripe Checkout (sin backend)
assets/js/simulator.js → Simulador PK interactivo (matemática 1-compartimento, ilustrativo)
assets/js/i18n.js      → Motor de traducción (ES/EN/ZH/JA) + geolocalización de idioma
```

No hay build ni dependencias — puedes abrir `index.html` directamente en el navegador,
o desplegarlo en cualquier hosting estático.

## 1. Conectar el pago real (Stripe)

Este sitio usa **Stripe Checkout "client-only"**: no necesita backend ni servidor propio,
solo tu clave **pública** de Stripe y los "Price ID" de cada plan.

1. Crea una cuenta en [stripe.com](https://stripe.com) si no la tienes.
2. En el Dashboard → **Productos**, crea un producto para "Piloto Clínico" (y otro para
   "Hospitalario" si quieres venderlo también por checkout en vez de solo por contacto).
   Cada producto necesita un **precio recurrente** (para modo `subscription`) o de pago
   único (para modo `payment`).
3. Copia el **Price ID** de cada plan (empieza por `price_...`).
4. Ve a **Desarrolladores → Claves API** y copia tu **clave publicable** (empieza por `pk_...`,
   nunca copies la clave secreta `sk_...` aquí).
5. Abre [`assets/js/config.js`](assets/js/config.js) y sustituye:

```js
STRIPE_PUBLISHABLE_KEY: "pk_live_TU_CLAVE_PUBLICA_AQUI",
PRICES: {
  piloto: { id: "price_ID_PLAN_PILOTO_CLINICO", mode: "subscription" },
  hospitalario: { id: "price_ID_PLAN_HOSPITALARIO", mode: "subscription" },
},
```

6. En el Dashboard de Stripe, configura las URLs de éxito/cancelación de tu Checkout
   (o dejar que el sitio las pase dinámicamente, que es lo que ya hace `checkout.js`
   apuntando a `gracias.html` y `precios.html` de tu dominio publicado).

Hasta que rellenes esos valores, el botón de pago mostrará un aviso ("Stripe todavía
no está configurado") en vez de fallar en silencio o cobrar por error.

> **Nota:** el checkout "client-only" es válido para precios fijos y simples. Si más
> adelante necesitas cupones dinámicos, impuestos por país, facturación B2B compleja o
> verificación server-side de la compra, lo natural es añadir un pequeño backend
> (Stripe recomienda una Cloud Function/endpoint que cree la sesión de Checkout).

## 2. Cambiar la URL de la app / el email de contacto

También en `assets/js/config.js`:

```js
APP_URL: "https://pk-bayes-frontend.onrender.com",
CONTACT_EMAIL: "pabloisaezr@gmail.com",
```

Todos los botones "Entrar a PK-Bayes" (`data-app-link`) y los enlaces de contacto
(`data-contact-email`) del sitio se actualizan automáticamente desde aquí.

## 3. Precios mostrados

El plan Piloto Clínico está fijado en **1.000 USD / año** (fase de prueba del modelo).
Los demás importes en `precios.html` siguen siendo **precios de referencia** propuestos
porque la especificación técnica del software no incluía tarifas comerciales completas
para el resto de planes. Edítalos directamente en el HTML de
`precios.html` cuando definas tus precios finales.

## 4. Desplegar

Al ser un sitio 100% estático, puedes desplegarlo en cualquiera de estas opciones sin
configuración adicional:

- **Netlify / Vercel**: arrastra la carpeta o conéctala a un repositorio Git.
- **GitHub Pages**: sube la carpeta a un repo y activa Pages sobre la rama principal.
- **Render (Static Site)**: ya usas Render para el frontend de la app — puedes crear
  ahí mismo un segundo servicio de tipo "Static Site" apuntando a esta carpeta.

No hay variables de entorno de servidor que configurar: toda la configuración vive en
`assets/js/config.js`.

## 5. Aviso clínico

El simulador interactivo (`assets/js/simulator.js`) usa una ecuación simplificada de
1 compartimento con fines **educativos y comerciales** — no es el motor bayesiano real
de PK-Bayes ni debe usarse para decisiones clínicas. Los casos clínicos de
`ejemplos.html` usan pacientes y valores **sintéticos**. Este aviso ya está incluido
como texto visible en el propio sitio; consérvalo si añades más ejemplos.

## 6. Idiomas y geolocalización

El sitio está completamente traducido a **Español, English, 中文 y 日本語** mediante
`assets/js/i18n.js`. Todo el texto visible (incluyendo `<title>`, meta descripción y
strings generados dinámicamente por `main.js`/`checkout.js`) usa claves de traducción
(`data-i18n`, `data-i18n-html`, `data-i18n-placeholder`, `data-i18n-title`, `data-i18n-desc`)
resueltas contra un diccionario único con paridad de claves garantizada en los 4 idiomas.

El idioma se detecta automáticamente con el mismo criterio que usa la app clínica
(`pk-bayes` frontend), en cascada y sin bloquear el primer render:

1. **Preferencia guardada** (`localStorage`, si el usuario ya eligió idioma manualmente).
2. **Zona horaria del dispositivo** (`Intl.DateTimeFormat`, instantáneo y sin permisos).
3. **Idioma del navegador** (`navigator.languages`).
4. **Geolocalización por IP** (`api.country.is`, en segundo plano, con timeout de 2s) —
   solo se consulta si ninguna señal anterior fue confiable, para evitar el "flash" de
   que la página cambie de idioma sola tras cargar.

Una vez que el usuario elige un idioma manualmente desde el selector del header, esa
elección se recuerda y ya no es sobrescrita por la detección automática. Para traducir
texto nuevo, agrega la clave a los 4 bloques (`es`/`en`/`zh`/`ja`) de `I18N` en `i18n.js`
y usa `data-i18n="clave"` en el HTML, o `window.PKBAYES_I18N.t("clave")` desde JS.
