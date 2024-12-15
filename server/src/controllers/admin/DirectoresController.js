import Director from '../../models/Director.js';

// Obtener todos los directores
const getDirectores = async (req, res) => {
    try {
        const directores = await Director.find();
        res.json(directores);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los directores" });
    }
};

// Obtener un director por ID
const getDirectorById = async (req, res) => {
    try {
        const director = await Director.findById(req.params.id);
        if (!director) return res.status(404).json({ mensaje: "Director no encontrado" });
        res.json(director);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el director" });
    }
};

// Agregar un nuevo director
const addDirector = async (req, res) => {
    try {
        const newDirector = new Director(req.body);
        await newDirector.save();
        res.status(201).json(newDirector);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al agregar el director" });
    }
};

// Editar un director existente
const updateDirector = async (req, res) => {
    try {
        const updatedDirector = await Director.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDirector) return res.status(404).json({ mensaje: "Director no encontrado" });
        res.json(updatedDirector);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al editar el director" });
    }
};

// Eliminar un director
const deleteDirector = async (req, res) => {
    try {
        const deletedDirector = await Director.findByIdAndDelete(req.params.id);
        if (!deletedDirector) return res.status(404).json({ mensaje: "Director no encontrado" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el director" });
    }
};

export { getDirectores, getDirectorById, addDirector, updateDirector, deleteDirector };