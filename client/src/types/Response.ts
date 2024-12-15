import { Director, Genero, Pelicula } from "./Pelicula";
export interface DirectorResponse {
    mensaje: string;
    director?: Director;  // En el caso de actualizar o agregar un director
  }

  export interface PeliculaResponse {
    mensaje: string;
    pelicula?: Pelicula;
  }

  export interface GeneroResponse {
    success: boolean;
    message: string;
    data?: Genero; // El género recién creado o actualizado
  }