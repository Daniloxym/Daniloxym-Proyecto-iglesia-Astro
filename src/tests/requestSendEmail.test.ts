import { vi, describe, it, expect, beforeEach } from 'vitest';

// --- Mocks (hoisted automáticamente por Vitest) ---

vi.mock('toastify-js/src/toastify.css', () => ({}));

const {
  mockLimpiarErrores,
  mockValidarInput,
  mockMostrarErrores,
  mockRequestSendEmail,
  mockSwalFire
} = vi.hoisted(() => ({
  mockLimpiarErrores: vi.fn(),
  mockValidarInput: vi.fn(),
  mockMostrarErrores: vi.fn(),
  mockRequestSendEmail: vi.fn(),
  mockSwalFire: vi.fn()
}));

vi.mock('../utils/input-validation', () => ({
  limpiarErrores: mockLimpiarErrores,
  validarInput: mockValidarInput,
  mostrarErrores: mockMostrarErrores
}));

vi.mock('../services/email.service', () => ({
  requestSendEmail: mockRequestSendEmail
}));

vi.mock('sweetalert2', () => ({
  default: { fire: mockSwalFire }
}));

// --- Importar módulo bajo test (luego de los mocks) ---
import { sendEmail } from '../utils/requestSendEmail';

// --- Helpers ---

function getForm() {
  return document.querySelector('.formulario') as HTMLFormElement;
}
function getCheckbox() {
  return document.querySelector('#consentimiento') as HTMLInputElement;
}
function getErrorConsentimiento() {
  return document.querySelector('#error-consentimiento') as HTMLParagraphElement;
}
function setFormValues(values: {
  nombre?: string;
  email?: string;
  asunto?: string;
  mensaje?: string;
}) {
  if (values.nombre !== undefined)
    (document.querySelector('.formulario__nombre') as HTMLInputElement).value = values.nombre;
  if (values.email !== undefined)
    (document.querySelector('.formulario__correo') as HTMLInputElement).value = values.email;
  if (values.asunto !== undefined)
    (document.querySelector('.formulario__tema') as HTMLInputElement).value = values.asunto;
  if (values.mensaje !== undefined)
    (document.querySelector('.formulario_mensaje') as HTMLTextAreaElement).value = values.mensaje;
}
function createEvent() {
  const event = new Event('submit');
  vi.spyOn(event, 'preventDefault');
  return event;
}

// --- Tests ---

describe('sendEmail', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    getForm().reset();
    getCheckbox().checked = false;
    document.querySelectorAll('.error').forEach((el) => (el.textContent = ''));
    mockValidarInput.mockReturnValue(undefined);
    mockRequestSendEmail.mockResolvedValue(undefined);
  });

  it('llama a preventDefault', async () => {
    const event = createEvent();
    await sendEmail(event);
    expect(event.preventDefault).toHaveBeenCalledOnce();
  });

  it('llama a limpiarErrores siempre al enviar', async () => {
    const event = createEvent();
    await sendEmail(event);
    expect(mockLimpiarErrores).toHaveBeenCalledOnce();
  });

  describe('cuando el checkbox NO está marcado', () => {
    it('muestra el mensaje de error de consentimiento', async () => {
      await sendEmail(createEvent());
      expect(getErrorConsentimiento().textContent).toBe(
        'Debes aceptar el tratamiento de datos personales para continuar.'
      );
    });

    it('no llama a requestSendEmail', async () => {
      await sendEmail(createEvent());
      expect(mockRequestSendEmail).not.toHaveBeenCalled();
    });

    it('no llama a validarInput', async () => {
      await sendEmail(createEvent());
      expect(mockValidarInput).not.toHaveBeenCalled();
    });
  });

  describe('cuando el checkbox está marcado pero los datos son inválidos', () => {
    beforeEach(() => {
      getCheckbox().checked = true;
      mockValidarInput.mockReturnValue({
        errorName: 'El nombre es requerido',
        errorEmail: '',
        errorAsunto: '',
        errorMensaje: ''
      });
    });

    it('llama a mostrarErrores con los errores de validación', async () => {
      await sendEmail(createEvent());
      expect(mockMostrarErrores).toHaveBeenCalledOnce();
    });

    it('no llama a requestSendEmail', async () => {
      await sendEmail(createEvent());
      expect(mockRequestSendEmail).not.toHaveBeenCalled();
    });
  });

  describe('cuando el checkbox está marcado y los datos son válidos', () => {
    beforeEach(() => {
      getCheckbox().checked = true;
      setFormValues({
        nombre: 'Juan Pérez',
        email: 'juan@ejemplo.com',
        asunto: 'Consulta',
        mensaje: 'Hola, tengo una pregunta.'
      });
    });

    it('llama a requestSendEmail con los datos del formulario', async () => {
      await sendEmail(createEvent());
      expect(mockRequestSendEmail).toHaveBeenCalledWith('/api/sendEmail', {
        nombre: 'Juan Pérez',
        email: 'juan@ejemplo.com',
        asunto: 'Consulta',
        mensaje: 'Hola, tengo una pregunta.'
      });
    });

    it('muestra Swal de éxito cuando el envío es exitoso', async () => {
      await sendEmail(createEvent());
      expect(mockSwalFire).toHaveBeenCalledWith(expect.objectContaining({ icon: 'success' }));
    });

    it('resetea el formulario tras un envío exitoso', async () => {
      const resetSpy = vi.spyOn(getForm(), 'reset');
      await sendEmail(createEvent());
      expect(resetSpy).toHaveBeenCalledOnce();
    });

    it('muestra Swal de error cuando requestSendEmail lanza una excepción', async () => {
      mockRequestSendEmail.mockRejectedValue({ message: 'Error de red' });
      await sendEmail(createEvent());
      expect(mockSwalFire).toHaveBeenCalledWith(
        expect.objectContaining({ icon: 'error', text: 'Error de red' })
      );
    });

    it('resetea el formulario incluso cuando requestSendEmail lanza una excepción', async () => {
      mockRequestSendEmail.mockRejectedValue({ message: 'Error' });
      const resetSpy = vi.spyOn(getForm(), 'reset');
      await sendEmail(createEvent());
      expect(resetSpy).toHaveBeenCalledOnce();
    });
  });
});
