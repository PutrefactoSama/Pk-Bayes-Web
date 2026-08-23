/**
 * PK-Bayes — Cloudflare Worker para Webhook de Stripe & Notificaciones por Correo
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    const resendKey = env.RESEND_API_KEY || (typeof atob !== "undefined" ? atob("cmVfVHdvUVppRnNfN1NaeFZBNFNxeUZjRFdSN2hLS2VmVzZB") : "");

    // 1. Webhook de Stripe (Checkout completado)
    if (url.pathname === "/webhook/stripe" && request.method === "POST") {
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

          // Correo 1: Al Cliente (Inmediato tras pagar)
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

          // Correo 2: Alerta Interna para Ti
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
                  </div>
                `,
              }),
            });
          }

          return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
        }

        return new Response(JSON.stringify({ ok: true }));
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400 });
      }
    }

    // 2. Correo 3: Activación
    if (url.pathname === "/notify-activated" && request.method === "POST") {
      try {
        const data = await request.json();
        const { email, name, tempPassword } = data;

        if (!email) {
          return new Response(JSON.stringify({ error: "Falta el email" }), { status: 400 });
        }

        if (resendKey) {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${resendKey}`,
            },
            body: JSON.stringify({
              from: env.FROM_EMAIL || "PK-Bayes <onboarding@resend.dev>",
              to: email,
              subject: "[PK-Bayes] Tu entorno clínico está listo — Credenciales de acceso",
              html: `
                <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;color:#1e293b;line-height:1.6">
                  <div style="background:#0a192f;padding:26px 30px;color:#ffffff">
                    <h1 style="margin:0;font-size:22px;letter-spacing:-0.5px">PK-Bayes</h1>
                    <p style="margin:4px 0 0;font-size:12px;color:#10b981;text-transform:uppercase;font-weight:700;letter-spacing:0.05em">Acceso Habilitado · Entorno Clínico Activo</p>
                  </div>
                  <div style="padding:32px 30px">
                    <p style="font-size:16px;margin-top:0">Hola, <strong>${name || "colega"}</strong>,</p>
                    <p>Tu entorno institucional en <strong>PK-Bayes</strong> ha sido configurado con éxito y ya está completamente operativo.</p>
                    <p>A continuación, te compartimos tus credenciales de acceso para que puedas comenzar a utilizar la plataforma:</p>
                    
                    <div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:20px;border-radius:10px;margin:22px 0;font-size:14px">
                      <p style="margin:6px 0">🌐 <strong>Plataforma:</strong> <a href="https://app.pk-bayes.com" style="color:#0ea5e9;font-weight:600;text-decoration:none">https://app.pk-bayes.com</a></p>
                      <p style="margin:6px 0">👤 <strong>Usuario / Email:</strong> <code>${email}</code></p>
                      <p style="margin:6px 0">🔑 <strong>Contraseña temporal:</strong> <code>${tempPassword || "Definida por el administrador"}</code></p>
                      <p style="margin:12px 0 0;font-size:12px;color:#15803d;font-style:italic">
                        (Nota de seguridad: Te recomendamos cambiar esta contraseña temporal desde la configuración de tu perfil al ingresar por primera vez).
                      </p>
                    </div>

                    <div style="text-align:center;margin:28px 0">
                      <a href="https://app.pk-bayes.com" style="background:#0ea5e9;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:700;font-size:15px;display:inline-block">Entrar a la Plataforma PK-Bayes →</a>
                    </div>

                    <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:18px 20px;border-radius:8px;margin:24px 0;font-size:14px">
                      <h4 style="margin:0 0 6px;color:#0f172a">¿Necesitas ayuda con tus primeros pasos?</h4>
                      <p style="margin:0 0 10px;color:#475569;font-size:13px">
                        Nuestro objetivo es que le saques el máximo provecho a los modelos farmacocinéticos desde el primer día. Ante cualquier eventualidad técnica, duda de implementación o si requieres asistencia, comunícate directamente con nosotros:
                      </p>
                      <p style="margin:4px 0">📱 <strong>WhatsApp Directo:</strong> <a href="https://wa.me/56988627558" style="color:#0ea5e9;font-weight:600;text-decoration:none">+56 9 8862 7558</a></p>
                      <p style="margin:4px 0">✉️ <strong>Correo Electrónico:</strong> <a href="mailto:pabloisaezr@gmail.com" style="color:#0ea5e9;font-weight:600;text-decoration:none">pabloisaezr@gmail.com</a></p>
                    </div>

                    <p style="font-weight:600;color:#0f172a;margin-top:24px">Bienvenido/a al siguiente nivel en optimización de dosis.</p>
                    
                    <p style="margin-top:24px;margin-bottom:2px">Atentamente,</p>
                    <p style="font-weight:700;color:#0a192f;margin:0">Pablo Sáez R.</p>
                    <p style="font-size:13px;color:#64748b;margin:0">Director Clínico, PK-Bayes</p>
                  </div>
                  <div style="background:#f8fafc;padding:16px 30px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;text-align:center">
                    © ${new Date().getFullYear()} PK-Bayes Precision Dosing System. Todos los derechos reservados.
                  </div>
                </div>
              `,
            }),
          });
        }

        return new Response(JSON.stringify({ ok: true, message: "Correo de activación enviado" }), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    return new Response("PK-Bayes Worker Activo", { status: 200 });
  },
};
