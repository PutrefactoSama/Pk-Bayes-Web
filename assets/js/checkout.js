/**
 * PK-Bayes — Checkout con Stripe
 * ---------------------------------------------------------------
 * Soporta dos métodos:
 * 1. Stripe Payment Link directo (URL de Checkout alojada por Stripe)
 * 2. Stripe.js redirectToCheckout con Price ID y clave pública
 */
(function () {
  "use strict";

  function isPlaceholder(value) {
    return !value || /TU_CLAVE|_ID_PLAN_|price_ID|pk_live_TU/.test(value);
  }

  async function startCheckout(planKey, button) {
    const cfg = window.PKBAYES_CONFIG;
    const t = (window.PKBAYES_I18N && window.PKBAYES_I18N.t) || ((k) => k);

    // 1. Si existe un Stripe Payment Link directo configurado
    if (cfg && cfg.STRIPE_PAYMENT_LINK && cfg.STRIPE_PAYMENT_LINK.trim() !== "" && !isPlaceholder(cfg.STRIPE_PAYMENT_LINK)) {
      const originalText = button.textContent;
      button.disabled = true;
      button.textContent = t("js.checkout_redirect_stripe");
      window.location.href = cfg.STRIPE_PAYMENT_LINK.trim();
      return;
    }

    const plan = cfg && cfg.PRICES ? cfg.PRICES[planKey] : null;

    // 2. Si no hay Payment Link ni clave configurada, avisar amigablemente
    if (!cfg || isPlaceholder(cfg.STRIPE_PUBLISHABLE_KEY) || !plan || isPlaceholder(plan.id)) {
      window.pkbayesToast(
        t("js.checkout_stripe_config_title"),
        t("js.checkout_stripe_config_desc")
      );
      return;
    }

    // 3. Checkout con Stripe.js
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = t("js.checkout_redirect_secure");

    try {
      if (!window.Stripe) {
        throw new Error(t("js.checkout_stripe_not_loaded"));
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
      window.pkbayesToast(t("js.checkout_failed_title"), err.message || t("js.checkout_failed_desc"));
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
