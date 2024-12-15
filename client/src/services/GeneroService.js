const API_URL = "http://localhost:5000/admin/generos"; // URL base para la API de géneros

// Función para obtener todos los géneros
export const getGeneros = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

// Función para agregar un nuevo género
export const addGenero = async (genero) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genero),
    });
    return await response.json();
};

// Función para actualizar un género
export const updateGenero = async (id, genero) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genero),
    });
    return await response.json();
};

// Función para eliminar un género
export const deleteGenero = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};
