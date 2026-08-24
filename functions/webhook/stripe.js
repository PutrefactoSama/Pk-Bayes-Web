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

      // Generar contraseña temporal segura automática (ej: PK-9X4K2P!)
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let randomCode = "";
      for (let i = 0; i < 6; i++) {
        randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const tempPassword = `PK-${randomCode}!`;

      // 1. Correo 1 al Cliente: Confirmación de Pago y Aprobación
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
            subject: "[PK-Bayes] ¡Pago exitoso! Tu cuenta está siendo aprobada ⏳",
            html: `
              <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;color:#1e293b;line-height:1.6">
                <div style="background:#0a192f;padding:26px 30px;color:#ffffff">
                  <h1 style="margin:0;font-size:22px;letter-spacing:-0.5px">PK-Bayes</h1>
                  <p style="margin:4px 0 0;font-size:12px;color:#38bdf8;text-transform:uppercase;font-weight:700;letter-spacing:0.05em">Precision Dosing System · Clinical MAP Workstation</p>
                </div>
                <div style="padding:32px 30px">
                  <p style="font-size:16px;margin-top:0">Estimado/a <strong>${name}</strong>,</p>
                  <p>¡Muchas gracias por tu compra y por la confianza en nuestra plataforma!</p>
                  <p>Te confirmamos que hemos recibido tu pago correctamente (<strong>$${amount} ${currency}/año</strong> - Plan Completo).</p>
                  <p>En estos precisos instantes, nuestro sistema está verificando y aprobando tu cuenta.</p>
                  
                  <div style="background:#f0f9ff;border-left:4px solid #0ea5e9;padding:18px 20px;border-radius:8px;margin:24px 0">
                    <h3 style="margin:0 0 8px;font-size:15px;color:#0369a1">⏳ Próximos pasos:</h3>
                    <p style="margin:0;font-size:14px;color:#0c4a6e;line-height:1.55">
                      Deberías recibir un segundo correo con tu clave y las instrucciones de acceso definitivas <strong>durante los próximos 10 minutos</strong>. (Te sugerimos revisar también tu carpeta de Spam o Correo no deseado por si acaso).
                    </p>
                  </div>

                  <p style="font-size:14px;color:#334155">
                    Tu tranquilidad es nuestra prioridad. Si el correo con tus credenciales no llega en el tiempo indicado, o si presentas cualquier eventualidad técnica, no dudes en contactarnos de inmediato. Estamos aquí para ayudarte de forma directa:
                  </p>

                  <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:16px 20px;border-radius:8px;margin:18px 0;font-size:14px">
                    <p style="margin:4px 0">🟢 <strong>WhatsApp (Soporte Directo):</strong> <a href="https://wa.me/56988627558" style="color:#0ea5e9;font-weight:600;text-decoration:none">+56 9 8862 7558</a></p>
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

                  <p style="margin-top:24px;font-weight:600;color:#0f172a">Bienvenido/a a la plataforma.</p>
                  
                  <p style="margin-top:20px;margin-bottom:2px">Atentamente,</p>
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

        // 2. Correo 2 Automático al Cliente: Entrega Inmediata de Clave Temporal y Acceso
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
                  <p style="font-size:16px;margin-top:0">Hola, <strong>${name}</strong>,</p>
                  <p>Tu entorno institucional en <strong>PK-Bayes</strong> ha sido configurado con éxito y ya está completamente operativo.</p>
                  <p>A continuación, te compartimos tus credenciales de acceso para que puedas comenzar a utilizar la plataforma:</p>
                  
                  <div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:20px;border-radius:10px;margin:22px 0;font-size:14px">
                    <p style="margin:6px 0">🌐 <strong>Plataforma:</strong> <a href="https://app.pk-bayes.com" style="color:#0ea5e9;font-weight:600;text-decoration:none">https://app.pk-bayes.com</a></p>
                    <p style="margin:6px 0">👤 <strong>Usuario / Email:</strong> <code>${email}</code></p>
                    <p style="margin:6px 0">🔑 <strong>Contraseña temporal:</strong> <code>${tempPassword}</code></p>
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

                  <!-- Advertencia No Responder -->
                  <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:8px;padding:14px 16px;margin:24px 0;font-size:13px;color:#9f1239">
                    <p style="margin:0 0 4px;font-weight:700">⚠️ Por favor no responder a este correo automático.</p>
                    <p style="margin:0;color:#881337;line-height:1.5">
                      En caso de dudas, consultas o requerimientos, por favor comunicarse directamente a:<br>
                      • <strong>Correo Electrónico:</strong> <a href="mailto:pabloisaezr@gmail.com" style="color:#be123c;font-weight:600;text-decoration:none">pabloisaezr@gmail.com</a><br>
                      • <strong>WhatsApp:</strong> <a href="https://wa.me/56988627558" style="color:#be123c;font-weight:600;text-decoration:none">+56 9 8862 7558</a>
                    </p>
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

      // 3. Alerta Interna para Ti (Pablo) con las credenciales generadas
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
                <h2 style="color:#16a34a;margin-top:0">¡Nueva suscripción confirmada y credenciales enviadas!</h2>
                <p style="font-size:15px">Se ha procesado el pago y despachado automáticamente la clave temporal al cliente.</p>
                
                <h3 style="font-size:15px;color:#0f172a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:20px">👤 Datos del Cliente & Acceso Generado:</h3>
                <ul style="list-style:none;padding-left:0;font-size:14px;line-height:1.8">
                  <li><strong>Nombre / Institución:</strong> ${name}</li>
                  <li><strong>Correo electrónico:</strong> <a href="mailto:${email}">${email}</a></li>
                  <li><strong>Contraseña Temporal Generada:</strong> <code>${tempPassword}</code></li>
                </ul>

                <h3 style="font-size:15px;color:#0f172a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:20px">💳 Detalles del Pago:</h3>
                <ul style="list-style:none;padding-left:0;font-size:14px;line-height:1.8">
                  <li><strong>Monto:</strong> $${amount} ${currency} (Plan Completo - Anual)</li>
                  <li><strong>ID de Transacción (Stripe):</strong> <code>${sessionId}</code></li>
                </ul>

                <div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:16px;border-radius:8px;margin-top:24px">
                  <h4 style="margin:0 0 8px;color:#15803d">✅ Estado Automático:</h4>
                  <p style="margin:0;font-size:13px;color:#166534;line-height:1.6">
                    • Correo de confirmación de pago enviado al cliente.<br>
                    • Correo de credenciales con clave temporal <code>${tempPassword}</code> enviado al cliente.
                  </p>
                </div>

                <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:8px;padding:12px 14px;margin-top:20px;font-size:12px;color:#9f1239">
                  <strong>⚠️ Mensaje automático del sistema PK-Bayes.</strong> No responder a este remitente.
                </div>
              </div>
            `,
          }),
        });
      }

      return new Response(JSON.stringify({ ok: true, status: "emails_sent", temp_password: tempPassword }), {
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
