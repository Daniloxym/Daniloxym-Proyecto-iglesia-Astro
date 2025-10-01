import type { input } from 'astro:schema';
import { validarInput, limpiarErrores, mostrarErrores } from './input-validation';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

interface InputData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

const formulario = document.querySelector('.formulario') as HTMLFormElement;
// const mensajeRespuesta = document.querySelector('.formulario__confirmacion') as HTMLDivElement;
const inputNombre = document.querySelector('.formulario__nombre') as HTMLInputElement;
const inputEmail = document.querySelector('.formulario__correo') as HTMLInputElement;
const inputAsunto = document.querySelector('.formulario__tema') as HTMLInputElement;
const inputMensaje = document.querySelector('.formulario_mensaje') as HTMLTextAreaElement;

async function sendEmail(e: Event) {
  e.preventDefault();
  const formData = new FormData(formulario);

  const data = Object.fromEntries(formData.entries()) as { [key: string]: string };

  limpiarErrores();

  const errores = validarInput(data);

  if (errores.errorName || errores.errorEmail || errores.errorAsunto || errores.errorMensaje) {
    mostrarErrores(errores);
    return;
  }

  try {
    const res = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      if (res.status === 429) throw new Error('Intentar de nuevo en 10 minutos');

      throw new Error(
        'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.'
      );
    }

    // const result = await res.json();

    Toastify({
      text: '¡Mensaje enviado con éxito!',
      duration: 3000,
      close: true,
      gravity: 'top', // `top` or `bottom`
      position: 'center', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: 'linear-gradient(135deg, #4CAF50, #45A049)'
      },
      onClick: function () {} // Callback after click
    }).showToast();

    formulario.reset();
    return;
  } catch (error: any) {
    Toastify({
      text: error.message,
      duration: 3000,
      close: true,
      className: 'toast-error',
      gravity: 'top', // `top` or `bottom`
      position: 'center', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: 'linear-gradient(135deg, #F44336, #D32F2F)'
      },
      onClick: function () {} // Callback after click
    }).showToast();
    // console.error('Error al enviar el correo:', error);
    // mensajeRespuesta.style.display = 'block';
    // mensajeRespuesta.textContent =
    //   'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.';
    // mensajeRespuesta.style.color = 'red';
    formulario.reset();
    return;
  }
}

formulario.addEventListener('submit', sendEmail);

const inputsConErrores: { input: HTMLInputElement | HTMLTextAreaElement; errorId: string }[] = [
  { input: inputNombre, errorId: 'error-nombre' },
  { input: inputEmail, errorId: 'error-email' },
  { input: inputAsunto, errorId: 'error-asunto' },
  { input: inputMensaje, errorId: 'error-mensaje' }
];

inputsConErrores.forEach(({ input, errorId }) => {
  input.addEventListener('input', () => {
    const errorDiv = document.querySelector(`#${errorId}`) as HTMLDivElement | null;
    if (errorDiv) errorDiv.textContent = '';
  });
});
