# PK-Bayes Notifications Worker (Cloudflare)

Worker serverless para procesar webhooks de Stripe y despachar correos transaccionales automáticos con Resend.

## Endpoints:
1. `POST /webhook/stripe`: Escucha `checkout.session.completed`, envía Correo 1 al cliente y alerta a `pabloisaezr@gmail.com`.
2. `POST /notify-activated`: Dispara Correo 2 con credenciales al cliente tras la activación manual.

## Despliegue en 2 minutos:
1. Crear cuenta gratuita en [resend.com](https://resend.com) y obtener API Key (3.000 emails gratis/mes).
2. En Cloudflare Dashboard -> Workers -> Create Worker (o vía `npx wrangler deploy`).
3. Añadir variable secreta `RESEND_API_KEY` en Cloudflare Worker.
4. En Stripe Dashboard -> Webhooks -> Add endpoint -> `https://tu-worker.workers.dev/webhook/stripe` (Evento: `checkout.session.completed`).
