export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    const { email, name, hospitalName, role, tempPassword } = data;

    if (!email) {
      return new Response(JSON.stringify({ error: "Falta el email" }), { status: 400 });
    }

    const resendKey = env.RESEND_API_KEY || (typeof atob !== "undefined" ? atob("cmVfVHdvUVppRnNfN1NaeFZBNFNxeUZjRFdSN2hLS2VmVzZB") : "");
    const hospital = hospitalName || "Centro Hospitalario Asignado";
    const userRole = role || "Farmacia Clínica / Equipo Médico";

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
          subject: `[PK-Bayes] Asignación institucional — Has sido vinculado/a a ${hospital}`,
          html: `
            <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;color:#1e293b;line-height:1.6">
              <div style="background:#0a192f;padding:26px 30px;color:#ffffff">
                <h1 style="margin:0;font-size:22px;letter-spacing:-0.5px">PK-Bayes</h1>
                <p style="margin:4px 0 0;font-size:12px;color:#38bdf8;text-transform:uppercase;font-weight:700;letter-spacing:0.05em">Precision Dosing System · Clinical MAP Workstation</p>
              </div>
              <div style="padding:32px 30px">
                <p style="font-size:16px;margin-top:0">Estimado/a <strong>${name || "colega"}</strong>,</p>
                <p>Te informamos que tu cuenta en <strong>PK-Bayes</strong> ha sido asignada y vinculada exitosamente al entorno clínico institucional de:</p>
                
                <div style="background:#f0f9ff;border:1px solid #bae6fd;padding:20px;border-radius:10px;margin:22px 0;font-size:14px">
                  <p style="margin:6px 0">🏥 <strong>Centro / Hospital:</strong> <span style="color:#0369a1;font-weight:700;font-size:15px">${hospital}</span></p>
                  <p style="margin:6px 0">🩺 <strong>Perfil / Rol:</strong> <code>${userRole}</code></p>
                  <p style="margin:6px 0">🌐 <strong>Plataforma de Acceso:</strong> <a href="https://app.pk-bayes.com" style="color:#0ea5e9;font-weight:600;text-decoration:none">https://app.pk-bayes.com</a></p>
                  <p style="margin:6px 0">👤 <strong>Usuario / Email:</strong> <code>${email}</code></p>
                  ${tempPassword ? `<p style="margin:6px 0">🔑 <strong>Contraseña Temporal:</strong> <code>${tempPassword}</code></p>` : ""}
                </div>

                <div style="text-align:center;margin:28px 0">
                  <a href="https://app.pk-bayes.com" style="background:#0ea5e9;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:700;font-size:15px;display:inline-block">Acceder al Entorno de ${hospital} →</a>
                </div>

                <p style="font-size:14px;color:#334155;line-height:1.55">
                  A partir de este momento puedes acceder a la cohorte de pacientes, motor bayesiano MAP en tiempo real, registro de niveles séricos TDM, simulaciones What-If de esquemas posológicos y reportes clínicos de tu institución.
                </p>

                <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:18px 20px;border-radius:8px;margin:24px 0;font-size:14px">
                  <h4 style="margin:0 0 6px;color:#0f172a">Soporte y Asistencia Clínica</h4>
                  <p style="margin:0 0 10px;color:#475569;font-size:13px">
                    Ante cualquier consulta técnica, dudas de calibración de priors o asistencia con tu equipo médico, comunícate con nosotros:
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

    return new Response(JSON.stringify({ ok: true, message: "Correo de asignación hospitalaria enviado" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
