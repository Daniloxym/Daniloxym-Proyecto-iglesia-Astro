import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const { nombre, email, asunto, mensaje } = data;

    const { error } = await resend.emails.send({
      from: "info@nidogracia.org", // dominio verificado en Resend
      to: "pastores@nidodegracia.org",
      subject: asunto,
      html: `
        <h2>Nuevo mensaje desde el formulario</h2>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mensaje:</b></p>
        <p>${mensaje}</p>
      `,
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Excepción en API:", err);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
  }
};
