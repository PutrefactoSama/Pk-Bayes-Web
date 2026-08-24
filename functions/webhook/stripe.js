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
      const sessionId = session.id || "N/A";

      const resendKey = env.RESEND_API_KEY || (typeof atob !== "undefined" ? atob("cmVfVHdvUVppRnNfN1NaeFZBNFNxeUZjRFdSN2hLS2VmVzZB") : "");

      // 1. Correo 1: Al Cliente (Inmediato tras pagar)
      if (email && resendKey) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: env.FROM_EMAIL || "PK-Bayes <onboarding@resend.dev>",
            to: email,
            subject: "[PK-Bayes] Confirmación de suscripción y próximos pasos para tu acceso",
            html: `
              <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;color:#1e293b;line-height:1.6">
                <div style="background:#0a192f;padding:26px 30px;color:#ffffff">
                  <h1 style="margin:0;font-size:22px;letter-spacing:-0.5px">PK-Bayes</h1>
                  <p style="margin:4px 0 0;font-size:12px;color:#38bdf8;text-transform:uppercase;font-weight:700;letter-spacing:0.05em">Precision Dosing System · Clinical MAP Workstation</p>
                </div>
                <div style="padding:32px 30px">
                  <p style="font-size:16px;margin-top:0">Estimado/a <strong>${name}</strong>,</p>
                  <p>Bienvenido/a y gracias por confiar en <strong>PK-Bayes</strong> para la optimización y monitoreo terapéutico en tu práctica clínica.</p>
                  <p>Te confirmamos que hemos recibido correctamente el pago de <strong>$1.350 USD/año</strong> correspondiente a tu suscripción al <strong>Plan Completo</strong>.</p>
                  
                  <div style="background:#f0f9ff;border-left:4px solid #0ea5e9;padding:18px 20px;border-radius:8px;margin:24px 0">
                    <h3 style="margin:0 0 8px;font-size:15px;color:#0369a1">⏳ ¿Qué ocurre a continuación?</h3>
                    <p style="margin:0;font-size:14px;color:#0c4a6e;line-height:1.55">
                      Para garantizar la máxima seguridad y rendimiento, nuestro equipo técnico se encuentra configurando y aislando tu entorno institucional. Este proceso toma algunas horas. Una vez finalizado, recibirás un segundo correo con tus credenciales de acceso listas para operar en nuestra plataforma.
                    </p>
                  </div>

                  <p style="font-size:14px;color:#334155">
                    Entendemos la importancia de contar con tu herramienta operativa a la brevedad. Si tienes alguna duda durante este proceso de configuración, estamos a tu entera disposición:
                  </p>

                  <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:16px 20px;border-radius:8px;margin:18px 0;font-size:14px">
                    <p style="margin:4px 0">📱 <strong>WhatsApp (Soporte Directo):</strong> <a href="https://wa.me/56988627558" style="color:#0ea5e9;font-weight:600;text-decoration:none">+56 9 8862 7558</a></p>
                    <p style="margin:4px 0">✉️ <strong>Correo Electrónico:</strong> <a href="mailto:pabloisaezr@gmail.com" style="color:#0ea5e9;font-weight:600;text-decoration:none">pabloisaezr@gmail.com</a></p>
                  </div>

                  <!-- Advertencia No Responder -->
                  <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:8px;padding:14px 16px;margin:24px 0;font-size:13px;color:#9f1239">
                    <p style="margin:0 0 4px;font-weight:700">⚠️ Por favor no responder a este correo automático.</p>
                    <p style="margin:0;color:#881337;line-height:1.5">
                      En caso de dudas, consultas o requerimientos, por favor comunicarse directamente a:<br>
                      • <strong>Correo Electrónico:</strong> <a href="mailto:pabloisaezr@gmail.com" style="color:#be123c;font-weight:600;text-decoration:none">pabloisaezr@gmail.com</a><br>
                      • <strong>WhatsApp:</strong> <a href="https://wa.me/56988627558" style="color:#be123c;font-weight:600;text-decoration:none">+56 9 8862 7558</a>
                    </p>
                  </div>

                  <p style="margin-top:28px;margin-bottom:4px">Atentamente,</p>
                  <p style="font-weight:700;color:#0a192f;margin-top:0">El equipo de PK-Bayes</p>
                </div>
                <div style="background:#f8fafc;padding:16px 30px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;text-align:center">
                  © ${new Date().getFullYear()} PK-Bayes Precision Dosing System. Todos los derechos reservados.
                </div>
              </div>
            `,
          }),
        });
      }

      // 2. Correo 2: Alerta Interna para Ti (Pablo)
      if (resendKey) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: env.FROM_EMAIL || "PK-Bayes <onboarding@resend.dev>",
            to: env.ADMIN_EMAIL || "pabloisaezr@gmail.com",
            subject: `🟢 NUEVA VENTA - PK-Bayes: ${name}`,
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px;color:#1e293b">
                <h2 style="color:#16a34a;margin-top:0">¡Nueva suscripción confirmada!</h2>
                <p style="font-size:15px">Tienes un entorno pendiente de activación.</p>
                
                <h3 style="font-size:15px;color:#0f172a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:20px">👤 Datos del Cliente:</h3>
                <ul style="list-style:none;padding-left:0;font-size:14px;line-height:1.8">
                  <li><strong>Nombre / Institución:</strong> ${name}</li>
                  <li><strong>Correo electrónico:</strong> <a href="mailto:${email}">${email}</a></li>
                </ul>

                <h3 style="font-size:15px;color:#0f172a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:20px">💳 Detalles del Pago:</h3>
                <ul style="list-style:none;padding-left:0;font-size:14px;line-height:1.8">
                  <li><strong>Monto:</strong> $1.350 USD (Plan Completo - Anual)</li>
                  <li><strong>ID de Transacción (Stripe):</strong> <code>${sessionId}</code></li>
                </ul>

                <div style="background:#fefce8;border:1px solid #fef08a;padding:16px;border-radius:8px;margin-top:24px">
                  <h4 style="margin:0 0 8px;color:#854d0e">⚡ Acción Requerida:</h4>
                  <ol style="margin:0;padding-left:20px;font-size:13px;color:#713f12;line-height:1.6">
                    <li>Crear el usuario en la base de datos/sistema de autenticación.</li>
                    <li>Generar contraseña temporal.</li>
                    <li>Enviar el "Correo 3" de Activación.</li>
                  </ol>
                </div>

                <!-- Advertencia No Responder -->
                <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:8px;padding:12px 14px;margin-top:20px;font-size:12px;color:#9f1239">
                  <strong>⚠️ Mensaje automático del sistema PK-Bayes.</strong> No responder a este remitente.
                </div>
              </div>
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
