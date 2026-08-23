export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    const { email, name, tempPassword } = data;

    if (!email) {
      return new Response(JSON.stringify({ error: "Falta el email" }), { status: 400 });
    }

    const resendKey = env.RESEND_API_KEY || (typeof atob !== "undefined" ? atob("cmVfVHdvUVppRnNfN1NaeFZBNFNxeUZjRFdSN2hLS2VmVzZB") : "");

    // 3. Correo 3: Activación (Entrega de credenciales)
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
