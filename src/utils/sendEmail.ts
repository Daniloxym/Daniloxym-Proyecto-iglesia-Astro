const formulario = document.querySelector('.formulario') as HTMLFormElement;
const mensajeRespuesta = document.querySelector('.formulario__confirmacion') as HTMLDivElement;

async function sendEmail(e: Event) {
  e.preventDefault();
  const formData = new FormData(formulario);

  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const result = await res.json();
    console.log('Correo enviado:', result);
    // mensajeRespuesta.textContent = '¡Mensaje enviado con éxito!';
    // mensajeRespuesta.style.color = 'green';
    // formulario.reset();
    // return;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    mensajeRespuesta.style.visibility = 'visible';
    mensajeRespuesta.textContent =
      'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.';
    mensajeRespuesta.style.color = 'red';
    formulario.reset();
    setTimeout(() => (mensajeRespuesta.style.visibility = 'hidden'), 5000);
    return;
  }
}

formulario.addEventListener('submit', sendEmail);
