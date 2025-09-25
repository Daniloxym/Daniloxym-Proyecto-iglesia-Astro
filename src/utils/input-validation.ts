interface InputData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

type Errors = Record<keyof InputData, string>;

export function validarInput({ nombre, email, asunto, mensaje }: InputData) {
  const errors = {
    errorName: '',
    errorEmail: '',
    errorAsunto: '',
    errorMensaje: ''
  };

  if (!nombre || nombre.trim().length < 3) {
    errors.errorName = 'El nombre debe tener al menos 3 caracteres.';
  }

  if (!email || !validarEmail(email)) {
    errors.errorEmail = 'El correo electrónico no es válido.';
  }

  if (!asunto || asunto.trim().length < 3) {
    errors.errorAsunto = 'El asunto debe tener al menos 3 caracteres.';
  }

  if (!mensaje || mensaje.trim().length < 10) {
    errors.errorMensaje = 'El mensaje debe tener al menos 10 caracteres.';
  }

  return errors;
}

export function mostrarErrores(errores: ReturnType<typeof validarInput>) {
  if (errores.errorName) {
    const errorName = document.querySelector('#error-nombre') as HTMLDivElement;
    errorName.textContent = errores.errorName;
  }

  if (errores.errorEmail) {
    const errorEmail = document.querySelector('#error-email') as HTMLDivElement;
    errorEmail.textContent = errores.errorEmail;
  }

  if (errores.errorAsunto) {
    const errorAsunto = document.querySelector('#error-asunto') as HTMLDivElement;
    errorAsunto.textContent = errores.errorAsunto;
  }
  if (errores.errorMensaje) {
    const errorMensaje = document.querySelector('#error-mensaje') as HTMLDivElement;
    errorMensaje.textContent = errores.errorMensaje;
  }
}

export function validarEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function limpiarErrores() {
  const errores = document.querySelectorAll('.error');
  errores.forEach((e) => (e.textContent = ''));
}
