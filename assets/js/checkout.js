/**
 * PK-Bayes — Checkout con Stripe (integración sin backend)
 * ---------------------------------------------------------------
 * Usa Stripe.js "redirectToCheckout" con Price IDs predefinidos.
 * Solo necesita la clave PÚBLICA (pk_...) — nunca una clave secreta.
 * Ref: https://stripe.com/docs/payments/checkout/client
 *
 * Si PKBAYES_CONFIG todavía tiene los valores de ejemplo, se muestra
 * un aviso in situ explicando qué falta configurar, en vez de
 * intentar un cobro real o fallar sin explicación.
 */
(function () {
  "use strict";

  function isPlaceholder(value) {
    return !value || /TU_CLAVE|_ID_PLAN_|price_ID|pk_live_TU/.test(value);
  }

  async function startCheckout(planKey, button) {
    const cfg = window.PKBAYES_CONFIG;
    const plan = cfg && cfg.PRICES ? cfg.PRICES[planKey] : null;

    if (!cfg || isPlaceholder(cfg.STRIPE_PUBLISHABLE_KEY) || !plan || isPlaceholder(plan.id)) {
      window.pkbayesToast(
        "Stripe todavía no está configurado",
        "Añade tu clave pública y los Price ID de cada plan en assets/js/config.js para activar el cobro real."
      );
      return;
    }

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Redirigiendo a pago seguro…";

    try {
      if (!window.Stripe) {
        throw new Error("Stripe.js no se cargó (revisa tu conexión o bloqueadores de script).");
      }
      const stripe = window.Stripe(cfg.STRIPE_PUBLISHABLE_KEY);
      const base = location.href.replace(/[^/]*$/, "");
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: plan.id, quantity: 1 }],
        mode: plan.mode || "subscription",
        successUrl: base + (cfg.successPath || "gracias.html") + "?session_id={CHECKOUT_SESSION_ID}",
        cancelUrl: base + (cfg.cancelPath || "precios.html"),
      });
      if (error) throw error;
    } catch (err) {
      console.error("[PK-Bayes checkout]", err);
      window.pkbayesToast("No se pudo iniciar el pago", err.message || "Inténtalo de nuevo en unos minutos.");
      button.disabled = false;
      button.textContent = originalText;
    }
  }

  document.addEventListener("click", (ev) => {
    const btn = ev.target.closest("[data-checkout-plan]");
    if (!btn) return;
    ev.preventDefault();
    startCheckout(btn.getAttribute("data-checkout-plan"), btn);
  });
})();
