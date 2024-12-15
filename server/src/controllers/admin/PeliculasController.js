import Pelicula from '../../models/Pelicula.js';
import Genero  from '../../models/Genero.js';
// Obtener todas las películas
const getPeliculas = async (req, res) => {
  try {
      const peliculas = await Pelicula.find()
          .populate("director_id", "nombre_director")
          .populate("generos", "nombre_genero"); // Poblamos los géneros con el nombre

      const peliculasConFechaFormateada = peliculas.map((pelicula) => ({
          ...pelicula.toObject(),
          fecha_lanzamiento: pelicula.fecha_lanzamiento.toISOString().split("T")[0],
          imagen: pelicula.imagen,
      }));

      res.json(peliculasConFechaFormateada);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener las películas" });
  }
};

// Obtener una película por ID
const getPeliculaById = async (req, res) => {
  try {
      const pelicula = await Pelicula.findById(req.params.id)
          .populate("director_id", "nombre_director")
          .populate("generos", "nombre_genero");
      if (!pelicula) return res.status(404).json({ error: "Película no encontrada" });
      res.json(pelicula);
  } catch (error) {
      res.status(500).json({ error: "Error al obtener la película" });
  }
};

// Agregar una nueva película
const addPelicula = async (req, res) => {
  try {
      console.log("Datos recibidos:", req.body); // Verifica los datos enviados
      const generos = await Genero.find({
          _id: { $in: req.body.generos }
      });

      console.log("Géneros encontrados:", generos); // Verifica los géneros encontrados

      const peliculaData = {
          ...req.body, // Esto incluye el campo `imagen` si se envió desde el frontend
          generos: generos.map(g => g._id),
          fecha_lanzamiento: new Date(req.body.fecha_lanzamiento),
      };

      // Verificar que el campo `imagen` está presente y es válido
      if (!peliculaData.imagen || typeof peliculaData.imagen !== "string") {
          return res.status(400).json({ error: "El campo 'imagen' es obligatorio y debe ser un string." });
      }

      const newPelicula = new Pelicula(peliculaData);
      await newPelicula.save();
      res.status(201).json(newPelicula);
  } catch (error) {
      console.error("Error al agregar la película:", error.message);
      res.status(500).json({ error: "Error al agregar la película", details: error.message });
  }
};


// Editar una película existente
const updatePelicula = async (req, res) => {
  try {
      if (req.body.imagen && typeof req.body.imagen !== "string") {
          return res.status(400).json({ error: "El campo 'imagen' debe ser un string válido." });
      }

      const updatedPelicula = await Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedPelicula) return res.status(404).json({ error: "Película no encontrada" });
      res.json(updatedPelicula);
  } catch (error) {
      res.status(500).json({ error: "Error al editar película" });
  }
};


// Eliminar una película
const deletePelicula = async (req, res) => {
  try {
    const deletedPelicula = await Pelicula.findByIdAndDelete(req.params.id);
    if (!deletedPelicula) return res.status(404).json({ error: 'Película no encontrada' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar película' });
  }
};

export { getPeliculas, getPeliculaById, addPelicula, updatePelicula, deletePelicula };