export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    const { email, name, tempPassword } = data;

    if (!email) {
      return new Response(JSON.stringify({ error: "Falta el email" }), { status: 400 });
    }

    if (env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: env.FROM_EMAIL || "PK-Bayes <onboarding@resend.dev>",
          to: email,
          subject: "[PK-Bayes] ¡Tu cuenta ya está activa! — Credenciales de acceso",
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px">
              <h1 style="color:#0a192f;margin-top:0">PK-Bayes</h1>
              <h2>¡Tu cuenta ya está activa, ${name || "colega"}!</h2>
              <p>El acceso institucional a PK-Bayes ha sido habilitado con éxito.</p>
              <div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:16px;border-radius:8px;margin:20px 0">
                <p style="margin:4px 0"><strong>Plataforma:</strong> <a href="https://app.pk-bayes.com">https://app.pk-bayes.com</a></p>
                <p style="margin:4px 0"><strong>Usuario / Email:</strong> <code>${email}</code></p>
                <p style="margin:4px 0"><strong>Contraseña Temporal:</strong> <code>${tempPassword || "Generada por el administrador"}</code></p>
              </div>
              <p><a href="https://app.pk-bayes.com" style="background:#0ea5e9;color:#fff;padding:10px 20px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block">Entrar a PK-Bayes →</a></p>
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
