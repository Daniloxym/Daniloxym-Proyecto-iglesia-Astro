import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { name, email, message } = req.body;

    console.log('Cuerpo recibido:', req.body);
    const data = await resend.emails.send({
      from: 'info@nidodegracia.org',
      to: 'daniolip2021@gmail.com',
      subject: `Nuevo mensaje de ${name}`,
      html: `<p>Has recibido un mensaje de <strong>${name}</strong> (${email}):</p><p>${message}</p>`
    });

    console.log('Resultado Resend:', data);

    res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error en sendEmail:', error);
    res.status(500).json({ error: 'Error enviando el correo' });
  }
};
