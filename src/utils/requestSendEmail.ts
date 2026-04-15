import { validarInput, limpiarErrores, mostrarErrores } from './input-validation';
import Swal from 'sweetalert2';
import 'toastify-js/src/toastify.css';
import type { InputData } from '../types';
import { requestSendEmail } from '../services/email.service';

const formulario = document.querySelector('.formulario') as HTMLFormElement;
const inputNombre = document.querySelector('.formulario__nombre') as HTMLInputElement;
const inputEmail = document.querySelector('.formulario__correo') as HTMLInputElement;
const inputAsunto = document.querySelector('.formulario__tema') as HTMLInputElement;
const inputMensaje = document.querySelector('.formulario_mensaje') as HTMLTextAreaElement;
const checkboxConsentimiento = document.querySelector('#consentimiento') as HTMLInputElement;
const errorConsentimiento = document.querySelector('#error-consentimiento') as HTMLParagraphElement;

const API_URL = `/api/sendEmail`;

async function sendEmail(e: Event) {
  e.preventDefault();
  const formData = new FormData(formulario);

  const data: InputData = {
    nombre: formData.get('nombre') as string,
    email: formData.get('email') as string,
    asunto: formData.get('asunto') as string,
    mensaje: formData.get('mensaje') as string
  };

  limpiarErrores();
  if (errorConsentimiento) errorConsentimiento.textContent = '';

  if (!checkboxConsentimiento?.checked) {
    if (errorConsentimiento) errorConsentimiento.textContent = 'Debes aceptar el tratamiento de datos personales para continuar.';
    return;
  }

  const errores = validarInput(data);

  if (errores) {
    mostrarErrores(errores);
    return;
  }

  try {
    await requestSendEmail(API_URL, data);
    Swal.fire({
      title: '¡Mensaje enviado!',
      text: 'Te responderemos lo antes posible.',
      icon: 'success',
      confirmButtonColor: '#4CAF50'
    });
    formulario.reset();
    return;
  } catch (error: any) {
    Swal.fire({
      title: 'Error al enviar el mensaje',
      text: error.message,
      icon: 'error',
      confirmButtonColor: '#fd4646ff'
    });
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

checkboxConsentimiento?.addEventListener('change', () => {
  if (errorConsentimiento) errorConsentimiento.textContent = '';
});

inputsConErrores.forEach(({ input, errorId }) => {
  input.addEventListener('input', () => {
    const errorDiv = document.querySelector(`#${errorId}`);
    if (errorDiv) errorDiv.textContent = '';
  });
});
