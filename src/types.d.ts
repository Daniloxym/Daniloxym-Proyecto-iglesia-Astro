export interface Predicas {
  id: string;
  title: string;
  preacher: string;
  date: string;
  thumbnail: string;
}

export interface InputData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}
export type Errors = {
  errorName?: string;
  errorEmail?: string;
  errorAsunto?: string;
  errorMensaje?: string;
};
