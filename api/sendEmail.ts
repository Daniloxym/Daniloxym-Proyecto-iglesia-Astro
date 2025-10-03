import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const emailTemplate = `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;font-family:Arial, sans-serif; padding: 20px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <tr style="background:#b4715b;">
          <td style="padding:20px;text-align:center;">
            <h1 style="color:#ffffff;font-size:24px;margin:0;">Iglesia Bautista Reformada Nido de Gracia</h1>
            <p style="color:#ffffff;font-size:14px;margin:5px 0 0;">Un lugar de fe y comunidad</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:20px;color:#333333;font-size:16px;line-height:1.5;">
            <p>Hola <strong>pastores</strong>,</p>
            <p>Has recibido un mensaje de <strong>{{name}}</strong>:</p>
           <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background:#f9f9f9;border:1px solid #e0e0e0;">
              <tr>
                  <td style="padding:15px;border-radius:4px;">
                      {{message}}
                  </td>
              </tr>
            </table>
            <p>Correo del remitente: <strong>{{email}}</strong> </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr style="background:#f4f4f4;">
          <td style="padding:15px;text-align:center;font-size:12px;color:#777;">
            © 2025 Iglesia Nido de Gracia. Todos los derechos reservados.<br>
            <a href="https://nidodegracia.org" style="color:#b4715b;text-decoration:none;">nidodegracia.org</a>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
`;

const InputSchema = z.object({
  nombre: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  email: z
    .string()
    .email('El correo electrónico no es válido')
    .max(255, 'El correo electrónico es demasiado largo'),
  asunto: z
    .string()
    .min(3, 'El asunto debe tener al menos 3 caracteres')
    .max(100, 'El asunto es demasiado largo'),
  mensaje: z
    .string()
    .min(3, 'El mensaje debe tener al menos 3 caracteres')
    .max(1000, 'El mensaje es demasiado largo')
});

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const result = InputSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Datos inválidos'
      });
    }

    const { nombre, email, asunto, mensaje } = result.data;

    const html = emailTemplate
      .replace('{{name}}', nombre)
      .replace('{{email}}', email)
      .replace('{{message}}', mensaje);

    const data = await resend.emails.send({
      from: 'info@nidodegracia.org',
      to: 'pastores@nidodegracia.org',
      replyTo: email,
      subject: `${asunto} - Mensaje de ${nombre}`,
      html
    });

    res.status(200).json({ message: 'Correo enviado con éxito'});
  } catch (error) {
    console.error('Error en sendEmail:', error);
    res.status(500).json({ error: 'Error enviando el correo' });
  }
};
