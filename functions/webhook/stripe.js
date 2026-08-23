export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const bodyText = await request.text();
    const event = JSON.parse(bodyText);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.customer_details?.email || session.customer_email;
      const name = session.customer_details?.name || "Estimado/a colega";
      const amount = session.amount_total ? (session.amount_total / 100).toFixed(2) : "1350.00";
      const currency = (session.currency || "usd").toUpperCase();

      // 1. Correo al Cliente (Inscripción recibida)
      if (email && env.RESEND_API_KEY) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: env.FROM_EMAIL || "PK-Bayes <onboarding@resend.dev>",
            to: email,
            subject: "[PK-Bayes] Registro e inscripción recibida — Tu acceso está en proceso",
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px">
                <h1 style="color:#0a192f;margin-top:0">PK-Bayes</h1>
                <p style="color:#0ea5e9;font-weight:bold;text-transform:uppercase;font-size:12px">Precision Dosing System</p>
                <h2>¡Gracias por tu inscripción, ${name}!</h2>
                <p>Hemos recibido correctamente tu pago de <strong>$${amount} ${currency}/año</strong> para el Plan Completo.</p>
                <div style="background:#f0f9ff;border-left:4px solid #0ea5e9;padding:14px 16px;border-radius:6px;margin:20px 0">
                  <h3 style="margin:0 0 6px;color:#0369a1">⏳ ¿Qué ocurre a continuación?</h3>
                  <p style="margin:0;font-size:14px;color:#0c4a6e">
                    Nuestro equipo se encuentra configurando el entorno institucional.<br><br>
                    <strong>Durante las próximas horas recibirás un segundo correo</strong> con tus credenciales de acceso activas para operar en <a href="https://app.pk-bayes.com">app.pk-bayes.com</a>.
                  </p>
                </div>
                <p style="font-size:13px;color:#64748b">Si tienes consultas urgentes, escríbenos a <a href="mailto:pabloisaezr@gmail.com">pabloisaezr@gmail.com</a>.</p>
              </div>
            `,
          }),
        });
      }

      // 2. Alerta interna a Pablo (Administrador)
      if (env.RESEND_API_KEY) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: env.FROM_EMAIL || "PK-Bayes <onboarding@resend.dev>",
            to: env.ADMIN_EMAIL || "pabloisaezr@gmail.com",
            subject: `🚨 [Nueva Venta PK-Bayes] ${name} (${email})`,
            html: `
              <h2>🚨 Nueva Inscripción / Pago en PK-Bayes</h2>
              <ul>
                <li><strong>Cliente / Institución:</strong> ${name}</li>
                <li><strong>Correo:</strong> ${email}</li>
                <li><strong>Monto:</strong> $${amount} ${currency}</li>
                <li><strong>Stripe Session:</strong> ${session.id}</li>
              </ul>
              <p>👉 Recuerda dar de alta su cuenta en la plataforma y enviarle sus credenciales.</p>
            `,
          }),
        });
      }

      return new Response(JSON.stringify({ ok: true, status: "emails_sent" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, ignored: event.type }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
