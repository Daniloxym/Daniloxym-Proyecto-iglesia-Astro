import type { InputData } from '../types';

export async function requestSendEmail(API_URL: string, data: InputData) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    if (res.status === 429)
      throw new Error('Demasiadas solicitudes. Por favor, inténtalo más tarde.');

    throw new Error('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
  }
}
