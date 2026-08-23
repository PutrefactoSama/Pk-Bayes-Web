/**
 * PK-Bayes — Cloudflare Worker para Webhook de Stripe & Notificaciones por Correo
 * -------------------------------------------------------------------------------
 * Este Worker:
 * 1. Escucha eventos de Stripe en POST /webhook/stripe (checkout.session.completed).
 * 2. Envía automáticamente el Correo 1 al cliente (Inscripción recibida + aviso de activación en próximas horas).
 * 3. Envía una alerta de nueva venta/inscripción a pabloisaezr@gmail.com.
 * 4. Provee un endpoint POST /notify-activated para enviar el Correo 2 (Credenciales y acceso listo) cuando tú apruebes la cuenta.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Manejo de CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, stripe-signature",
        },
      });
    }

    // Ruta 1: Webhook de Stripe (Checkout completado)
    if (url.pathname === "/webhook/stripe" && request.method === "POST") {
      try {
        const bodyText = await request.text();
        const event = JSON.parse(bodyText);

        if (event.type === "checkout.session.completed") {
          const session = event.data.object;
          const customerEmail = session.customer_details?.email || session.customer_email;
          const customerName = session.customer_details?.name || "Estimado/a colega";
          const amount = session.amount_total ? (session.amount_total / 100).toFixed(2) : "1350.00";
          const currency = (session.currency || "usd").toUpperCase();

          // 1. Enviar Correo 1 al Cliente (Inscripción recibida)
          if (customerEmail) {
            await sendEmailViaResend({
              apiKey: (env.RESEND_API_KEY || atob("cmVfVHdvUVppRnNfN1NaeFZBNFNxeUZjRFdSN2hLS2VmVzZB")),
              from: env.FROM_EMAIL || "PK-Bayes <onboarding@resend.dev>",
              to: customerEmail,
              subject: "[PK-Bayes] Registro e inscripción recibida — Tu acceso está en proceso",
              html: getEmailTemplateRegistration({
                name: customerName,
                email: customerEmail,
                amount,
                currency,
              }),
            });
          }

          // 2. Enviar Alerta interna al Administrador
          await sendEmailViaResend({
            apiKey: (env.RESEND_API_KEY || atob("cmVfVHdvUVppRnNfN1NaeFZBNFNxeUZjRFdSN2hLS2VmVzZB")),
            from: env.FROM_EMAIL || "PK-Bayes <onboarding@resend.dev>",
            to: env.ADMIN_EMAIL || "pabloisaezr@gmail.com",
            subject: `🚨 [Nueva Inscripción PK-Bayes] ${customerName} (${customerEmail})`,
            html: getEmailTemplateAdminAlert({
              name: customerName,
              email: customerEmail,
              amount,
              currency,
              sessionId: session.id,
            }),
          });

          return new Response(JSON.stringify({ received: true, status: "emails_sent" }), {
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ received: true, ignored_type: event.type }), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Ruta 2: Disparar Correo 2 (Acceso Habilitado)
    if (url.pathname === "/notify-activated" && request.method === "POST") {
      try {
        const authHeader = request.headers.get("Authorization");
        if (env.ADMIN_SECRET && authHeader !== `Bearer ${env.ADMIN_SECRET}`) {
          return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
        }

        const data = await request.json();
        const { email, name, tempPassword } = data;

        if (!email) {
          return new Response(JSON.stringify({ error: "Falta el email" }), { status: 400 });
        }

        await sendEmailViaResend({
          apiKey: (env.RESEND_API_KEY || atob("cmVfVHdvUVppRnNfN1NaeFZBNFNxeUZjRFdSN2hLS2VmVzZB")),
          from: env.FROM_EMAIL || "PK-Bayes <onboarding@resend.dev>",
          to: email,
          subject: "[PK-Bayes] ¡Tu cuenta ya está activa! — Credenciales de acceso",
          html: getEmailTemplateActivated({
            name: name || "Estimado/a colega",
            email,
            tempPassword: tempPassword || "Generada por el administrador",
          }),
        });

        return new Response(JSON.stringify({ success: true, message: "Correo de activación enviado" }), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    return new Response("PK-Bayes Cloudflare Worker Activo", { status: 200 });
  },
};

/**
 * Envío vía Resend API (HTTP REST estándar)
 */
async function sendEmailViaResend({ apiKey, from, to, subject, html }) {
  if (!apiKey) {
    console.warn("Falta RESEND_API_KEY. Configúrala en Cloudflare Worker secrets.");
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Resend API Error: ${res.status} - ${errorText}`);
  }
  return await res.json();
}

/**
 * Plantilla 1: Inscripción Recibida
 */
function getEmailTemplateRegistration({ name, email, amount, currency }) {
  return `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"></head>
  <body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#f8fafc;padding:30px 20px;color:#1e293b;line-height:1.6">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden">
      <div style="background:#0a192f;padding:26px 30px;color:#ffffff">
        <h1 style="margin:0;font-size:22px">PK-Bayes</h1>
        <p style="margin:4px 0 0;font-size:12px;color:#38bdf8;text-transform:uppercase;font-weight:700">Precision Dosing System</p>
      </div>
      <div style="padding:32px 30px">
        <h2 style="font-size:19px;color:#0f172a;margin-top:0">¡Gracias por tu inscripción, ${name}!</h2>
        <p>Hemos recibido correctamente tu solicitud de suscripción al <strong>Plan Completo de PK-Bayes</strong> (${amount} ${currency}/año).</p>
        
        <div style="background:#f0f9ff;border-left:4px solid #0ea5e9;padding:16px 18px;border-radius:6px;margin:24px 0">
          <h3 style="margin:0 0 6px;font-size:15px;color:#0369a1">⏳ ¿Qué ocurre a continuación?</h3>
          <p style="margin:0;font-size:14px;color:#0c4a6e">
            Nuestro equipo técnico y de operaciones clínicas se encuentra configurando y aprovisionando el entorno seguro de tu institución.<br><br>
            <strong>Durante las próximas horas recibirás un segundo correo electrónico</strong> con tus credenciales de acceso activas y las instrucciones para comenzar a operar en la plataforma.
          </p>
        </div>

        <p style="font-size:14px;color:#64748b">
          Si requieres asistencia urgente, puedes responder a este correo o escribir a <a href="mailto:pabloisaezr@gmail.com" style="color:#0ea5e9">pabloisaezr@gmail.com</a>.
        </p>
      </div>
      <div style="background:#f8fafc;padding:16px 30px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;text-align:center">
        © ${new Date().getFullYear()} PK-Bayes Precision Dosing System.
      </div>
    </div>
  </body>
  </html>
  `;
}

/**
 * Plantilla Alerta Administrador
 */
function getEmailTemplateAdminAlert({ name, email, amount, currency, sessionId }) {
  return `
  <!DOCTYPE html>
  <html>
  <body style="font-family:sans-serif;padding:20px;color:#1e293b">
    <h2>🚨 Nueva Inscripción / Pago en PK-Bayes</h2>
    <p>Se ha registrado un nuevo pago para el Plan Completo:</p>
    <ul>
      <li><strong>Nombre / Institución:</strong> ${name}</li>
      <li><strong>Correo Electrónico:</strong> ${email}</li>
      <li><strong>Monto:</strong> ${amount} ${currency}</li>
      <li><strong>Stripe Session ID:</strong> ${sessionId}</li>
    </ul>
    <p>👉 <em>Recuerda habilitar el usuario en la plataforma y enviar el Correo 2 de activación.</em></p>
  </body>
  </html>
  `;
}

/**
 * Plantilla 2: Acceso Habilitado
 */
function getEmailTemplateActivated({ name, email, tempPassword }) {
  return `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"></head>
  <body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#f8fafc;padding:30px 20px;color:#1e293b;line-height:1.6">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden">
      <div style="background:#0a192f;padding:26px 30px;color:#ffffff">
        <h1 style="margin:0;font-size:22px">PK-Bayes</h1>
        <p style="margin:4px 0 0;font-size:12px;color:#10b981;text-transform:uppercase;font-weight:700">Acceso Habilitado · Entorno Clínico Activo</p>
      </div>
      <div style="padding:32px 30px">
        <h2 style="font-size:19px;color:#0f172a;margin-top:0">¡Tu cuenta ya está activa, ${name}!</h2>
        <p>Nos complace informarte que el acceso institucional a **PK-Bayes** ha sido configurado y habilitado con éxito.</p>
        
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:20px;border-radius:10px;margin:24px 0">
          <h3 style="margin:0 0 12px;font-size:15px;color:#15803d">🔐 Tus Credenciales de Acceso:</h3>
          <p style="margin:4px 0;font-size:14px"><strong>Plataforma:</strong> <a href="https://app.pk-bayes.com" style="color:#0ea5e9;font-weight:600">https://app.pk-bayes.com</a></p>
          <p style="margin:4px 0;font-size:14px"><strong>Usuario / Email:</strong> <code>${email}</code></p>
          <p style="margin:4px 0;font-size:14px"><strong>Contraseña Temporal:</strong> <code>${tempPassword}</code></p>
        </div>

        <div style="text-align:center;margin:30px 0">
          <a href="https://app.pk-bayes.com" style="background:#0ea5e9;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:700;font-size:15px;display:inline-block">Entrar a la Plataforma PK-Bayes →</a>
        </div>

        <p style="font-size:14px;color:#64748b">
          Ya puedes comenzar a registrar pacientes, realizar estimaciones bayesianas MAP en tiempo real para vancomicina y descargar datasets PopPK.
        </p>
      </div>
      <div style="background:#f8fafc;padding:16px 30px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;text-align:center">
        © ${new Date().getFullYear()} PK-Bayes Precision Dosing System.
      </div>
    </div>
  </body>
  </html>
  `;
}
