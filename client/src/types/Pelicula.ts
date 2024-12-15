export interface Pelicula {
    _id?: string; // or mongoose.Types.ObjectId, depending on your setup
    titulo: string;
    duracion: number;
    sinopsis: string;
    director_id: Director;
    generos: Genero[]; // Or more complex types if needed
    fecha_lanzamiento: Date;
}

export interface Director {
    _id: string;
    nombre_director: string;
}
export interface Genero {
    _id: string;
    nombre_genero: string;
}
export interface Formulario {
    _id?: string;
    titulo: string;
    duracion: number;
    sinopsis: string;
    director_id: string;
    fecha_lanzamiento: Date;
    generos: string[]; // Array de IDs de géneros
}

export interface Imagen {
    url: string;
  }