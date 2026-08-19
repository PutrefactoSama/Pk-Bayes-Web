/**
 * PK-Bayes — Configuración central del sitio
 * ---------------------------------------------------------------
 * Edita SOLO este archivo para conectar pagos reales y la app.
 * No hace falta tocar ningún otro .html o .js del sitio.
 *
 * 1) APP_URL           → ya está configurada con tu app real.
 * 2) STRIPE_PUBLISHABLE_KEY → tu clave PÚBLICA de Stripe (empieza por "pk_").
 *                        Sácala de https://dashboard.stripe.com/apikeys
 *                        (NUNCA pegues aquí una clave secreta "sk_...").
 * 3) PRICES            → el "Price ID" de cada plan, creado en
 *                        https://dashboard.stripe.com/products
 *
 * Mientras STRIPE_PUBLISHABLE_KEY siga con el valor de ejemplo,
 * los botones de pago mostrarán un aviso explicando que falta
 * configurar Stripe, en lugar de fallar en silencio.
 */
window.PKBAYES_CONFIG = {
  // URL real de la aplicación clínica PK-Bayes (dominio propio; sin sesión activa muestra el login)
  APP_URL: "https://app.pk-bayes.com",

  // Email de contacto comercial / soporte (usado en mailto: de "Contactar ventas", "Solicitar demo", etc.)
  CONTACT_EMAIL: "pabloisaezr@gmail.com",

  // --- Stripe (checkout sin backend, client-only) ---
  STRIPE_PUBLISHABLE_KEY: "pk_live_TU_CLAVE_PUBLICA_AQUI",

  // Price IDs de Stripe (Dashboard → Producto → Precios). mode: "payment" (pago único) o "subscription".
  PRICES: {
    piloto: {
      id: "price_ID_PLAN_PILOTO_CLINICO",
      mode: "subscription",
    },
    hospitalario: {
      id: "price_ID_PLAN_HOSPITALARIO",
      mode: "subscription",
    },
  },

  // A dónde redirige Stripe tras el pago (deben ser URLs absolutas de tu dominio publicado)
  successPath: "gracias.html",
  cancelPath: "precios.html",
};
