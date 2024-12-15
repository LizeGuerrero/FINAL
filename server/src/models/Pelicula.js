import mongoose from 'mongoose';

// Se crea un const para definir el esquema, por si en el futuro hay que cambiarlo o agregarle algo
const peliculaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    duracion: {
        type: Number, // duración en minutos
        required: true,
    },
    sinopsis: {
        type: String,
        required: true,
    },
    director_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "directores",
        required: true,
    },
    generos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "generos",
    }],
    fecha_lanzamiento: {
        type: Date,
        required: true,
    },
    imagen: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(v); // Expresión regular para URLs de imágenes
            },
            message: "La URL de la imagen no es válida.",
        },
    },
});

const Pelicula = mongoose.model('peliculas', peliculaSchema);

export default Pelicula;