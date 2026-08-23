/**
 * PK-Bayes — Configuración central del sitio
 * ---------------------------------------------------------------
 * Edita este archivo para conectar los pagos de Stripe y la app clínica.
 *
 * OPCIÓN A (Recomendada - Stripe Payment Link):
 * 1) Ve a https://dashboard.stripe.com/payment-links
 * 2) Crea un enlace de pago para "Plan Completo PK-Bayes ($1.350 USD/año recurrente)"
 * 3) Pega la URL generada en STRIPE_PAYMENT_LINK (ej: "https://buy.stripe.com/...")
 *
 * OPCIÓN B (Stripe Checkout Client-Only con Price ID):
 * 1) Pega tu clave pública en STRIPE_PUBLISHABLE_KEY ("pk_live_..." o "pk_test_...")
 * 2) Pega el Price ID de tu producto en PRICES.plan_completo.id ("price_...")
 */
window.PKBAYES_CONFIG = {
  // URL real de la aplicación clínica PK-Bayes
  APP_URL: "https://app.pk-bayes.com",

  // Email de contacto comercial / soporte
  CONTACT_EMAIL: "pabloisaezr@gmail.com",

  // OPCIÓN A: Enlace de pago directo de Stripe (Payment Link)
  // Si tienes un Payment Link de Stripe, pégalo aquí:
  STRIPE_PAYMENT_LINK: "",

  // OPCIÓN B: Checkout con Stripe.js
  STRIPE_PUBLISHABLE_KEY: "pk_live_TU_CLAVE_PUBLICA_AQUI",

  PRICES: {
    plan_completo: {
      id: "price_1U7faR191OQzNkCPVWuSVqmA",
      mode: "subscription",
    },
  },

  // Páginas de redirección tras el checkout
  successPath: "gracias.html",
  cancelPath: "precios.html",
};
