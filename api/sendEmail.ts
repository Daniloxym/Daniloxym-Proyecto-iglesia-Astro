import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const emailTemplate = `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px;font-family:Arial, sans-serif;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <tr style="background:#b4715b;">
          <td style="padding:20px;text-align:center;">
            <h1 style="color:#ffffff;font-size:24px;margin:0;">Iglesia Nido de Gracia</h1>
            <p style="color:#ffffff;font-size:14px;margin:5px 0 0;">Un lugar de fe y comunidad</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:20px;color:#333333;font-size:16px;line-height:1.5;">
            <p>Hola <strong>pastores</strong>,</p>
            <p>Has recibido un mensaje de <strong>{{name}}</strong>:</p>
            <p style="background:#f9f9f9;padding:15px;border-radius:4px;border:1px solid #e0e0e0;">
              {{message}}
            </p>
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

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { nombre, email, asunto, mensaje } = req.body;

    console.log('Datos recibidos en sendEmail:', { nombre, email, asunto, mensaje });

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

    res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error en sendEmail:', error);
    res.status(500).json({ error: 'Error enviando el correo' });
  }
};
