import { inputSchema } from '../schema/input.schema';
import type { InputData, Errors } from '../types';

const errorName = document.querySelector('#error-nombre') as HTMLDivElement;
const errorEmail = document.querySelector('#error-email') as HTMLDivElement;
const errorAsunto = document.querySelector('#error-asunto') as HTMLDivElement;
const errorMensaje = document.querySelector('#error-mensaje') as HTMLDivElement;

export function validarInput({ nombre, email, asunto, mensaje }: InputData): Errors | undefined {
  const result = inputSchema.safeParse({ nombre, email, asunto, mensaje });

  if (!result.success) {
    const zodErrors = result.error.flatten().fieldErrors;
    return {
      errorName: zodErrors.nombre ? zodErrors.nombre[0] : '',
      errorEmail: zodErrors.email ? zodErrors.email[0] : '',
      errorAsunto: zodErrors.asunto ? zodErrors.asunto[0] : '',
      errorMensaje: zodErrors.mensaje ? zodErrors.mensaje[0] : ''
    };
  }
  return undefined;
}

export function mostrarErrores(errores: Errors | undefined) {
  if (!errores) return;

  errorName.textContent = errores.errorName || '';
  errorEmail.textContent = errores.errorEmail || '';
  errorAsunto.textContent = errores.errorAsunto || '';
  errorMensaje.textContent = errores.errorMensaje || '';
}

export function limpiarErrores() {
  const errores = document.querySelectorAll('.error');
  errores.forEach((e) => (e.textContent = ''));
}
