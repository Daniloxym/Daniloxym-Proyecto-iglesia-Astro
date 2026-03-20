import { z } from 'zod';

export const inputSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  email: z.string().email('El correo electrónico no es válido.'),
  asunto: z.string().min(3, 'El asunto debe tener al menos 3 caracteres.'),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres.')
});
