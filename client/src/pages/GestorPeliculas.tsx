import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
    getPeliculas, addPelicula, updatePelicula, deletePelicula,
} from "../services/PeliculaService";
import { getDirectores } from "../services/DirectorService"; // Importa el servicio de directores exactamente el get
import { getGeneros } from "../services/GeneroService";
import "./styles/GestorDePeliculas.css";
import { Pelicula, Genero, Director, Formulario } from "../types/Pelicula";


function GestorPeliculas() {
    const [peliculas, setPeliculas] = useState<Pelicula[]>([]); // Estado tipado como array de Pelicula
    const [directores, setDirectores] = useState<Director[]>([]); // Estado tipado como array de Director
    const [generos, setGeneros] = useState<Genero[]>([]); // Estado tipado como array de Genero
    const [form, setForm] = useState<Formulario>({
        titulo: "",
        duracion: 0,
        sinopsis: "",
        director_id: "",
        fecha_lanzamiento: new Date(),
        generos: [],
        imagen: "",
    });
    const [editingId, setEditingId] = useState<string | null>(null); //Esto es como
    useEffect(() => {
        // Cargar las películas al montar el componente
        loadPeliculas();
        loadDirectores(); // Cargar los directores
        loadGeneros(); // Función para cargar los géneros
    }, []);
    const loadPeliculas = async () => {
        const data = await getPeliculas();
        setPeliculas(data as unknown as Pelicula[]); // Type assertion
    };
    const loadDirectores = async () => {
        const data = await getDirectores();
        setDirectores(data as Director[]);
    };
    const loadGeneros = async () => {
        const data = await getGeneros(); // Función para obtener los géneros del backend
        setGeneros(data as Genero[]);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verificación de campos obligatorios
        if (!form.director_id || form.generos.length === 0) {
            Swal.fire("Error", "Por favor, selecciona un director y al menos un género.", "error");
            return;
        }

        try {
            const peliculaData = {
                ...form,
            };

            // Actualizar o agregar la película según corresponda
            if (editingId) {
                await updatePelicula(editingId, peliculaData);
                Swal.fire("Actualizado", "Película actualizada con éxito", "success");
                setEditingId(null); // Limpiar estado de edición
            } else {
                await addPelicula(peliculaData);
                Swal.fire("Agregado", "Película agregada con éxito", "success");
            }
        } catch (error) {
            console.error("Error al agregar la película:", error);
            Swal.fire("Error", "Hubo un error al agregar la película.", "error");
        }

        // Restablecer el formulario
        setForm({
            titulo: "",
            duracion: 0,
            sinopsis: "",
            director_id: "",
            generos: [],
            fecha_lanzamiento: new Date(),
            imagen: "",
        });

        loadPeliculas(); // Recargar la lista de películas
    };


    const handleEdit = (pelicula: Pelicula) => {
        if (!pelicula._id) {
            Swal.fire("Error", "ID de película no encontrado", "error");
            return;
        }

        setForm({
            ...pelicula,
            director_id: pelicula.director_id._id,
            generos: pelicula.generos.map((genero) => genero._id),
            fecha_lanzamiento: new Date(pelicula.fecha_lanzamiento),
            imagen: pelicula.imagen,
        });
        setEditingId(pelicula._id);
        Swal.fire("Modo de edición", `Editando: ${pelicula.titulo}`, "info");
    };

    const handleCancelEdit = () => {
        // Limpia el formulario y sale del modo edición
        setForm({
            titulo: "",
            duracion: 0,
            sinopsis: "",
            director_id: "",
            fecha_lanzamiento: new Date(),
            generos: [],
            imagen: "",
        });
        setEditingId(null);
        Swal.fire("Modo edición cancelado", "Has salido del modo edición", "info");
    };


    const handleGenerosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setForm((prevState) => {
            const updatedGeneros = checked
                ? [...prevState.generos, value] // Si el checkbox está marcado, agregamos el género
                : prevState.generos.filter((generoId) => generoId !== value); // Si no está marcado, lo eliminamos
            return { ...prevState, generos: updatedGeneros };
        });
    };

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            await deletePelicula(id);
            Swal.fire("Eliminado", "La película ha sido eliminada.", "success");
            loadPeliculas();
        }
    };

    return (
        <div className="container">
            <h1>Gestión de Películas</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="titulo"
                    placeholder="Título"
                    value={form.titulo}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="duracion"
                    placeholder="Duración (minutos)"
                    value={form.duracion}
                    onChange={handleChange}
                />
                <input
                    name="sinopsis"
                    placeholder="Sinopsis"
                    value={form.sinopsis}
                    onChange={handleChange}
                />
                    <input
    name="imagen"
    placeholder="URL de la imagen"
    value={form.imagen}
    onChange={handleChange} // Esto es para actualizar la URL de la imagen en el estado
/>
                {/* Dropdown para seleccionar el director */}
                <select
                    name="director_id"
                    value={form.director_id}
                    onChange={handleChange}
                >
                    <option value="">Selecciona un director</option>
                    {directores.map((director) => (
                        <option key={director._id} value={director._id}>
                            {director.nombre_director}
                        </option>
                    ))}
                </select>
                <div>
                    <label>Selecciona los géneros:</label>
                    <div className="checkbox-group">
                        {generos.map((genero) => (
                            <div key={genero._id} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    id={genero._id}
                                    value={genero._id}
                                    checked={form.generos.includes(genero._id)}
                                    onChange={handleGenerosChange}
                                />
                                <label htmlFor={genero._id}>
                                    {genero.nombre_genero}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <input
                    type="date"
                    name="fecha_lanzamiento"
                    placeholder="Fecha de Lanzamiento"
                    value={
                        form.fecha_lanzamiento
                            ? new Date(form.fecha_lanzamiento).toISOString().split('T')[0]
                            : ''
                    }
                    onChange={handleChange}
                />

                <button type="submit">
                    {editingId ? "Actualizar" : "Agregar"}
                </button>
                {editingId && (
                    <button type="button" onClick={handleCancelEdit}>
                        Cancelar edición
                    </button>
                )}
            </form>

            <section className="seccionPelicula">
                {peliculas.map((pelicula) => (
                    <article key={pelicula._id} className="pelicula-card">
                        {/* Header Card */}
                        <div className="header-card">
                            <h2>{pelicula.titulo}</h2>
                        </div>
                        {/* Main Card */}
                        
                        <div className="main-card">
                        <img 
    src={pelicula.imagen} 
    alt={pelicula.titulo} 
    className="movie-image" 
/>
                            <p><strong>Duración:</strong> {pelicula.duracion} minutos</p>
                            <p><strong>Sinopsis:</strong> {pelicula.sinopsis}</p>
                            <p>
                                <strong>Director: </strong>
                                {pelicula.director_id.nombre_director}
                            </p>
                            <p><strong>Fecha de Lanzamiento:</strong> {new Date(pelicula.fecha_lanzamiento).toLocaleDateString()}</p>
                            <p>
                                <strong>Géneros: </strong>
                                {pelicula.generos
                                    .map((genero) => genero.nombre_genero)
                                    .join(", ")}
                            </p>
                        </div>
                        {/* Footer Card */}
                        <section className="footer-card">
                            <button
                                className="edit-btn"
                                onClick={() => handleEdit(pelicula)}
                            >
                                Editar
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => {
                                    if (pelicula._id) {
                                        handleDelete(pelicula._id);
                                    } else {
                                        Swal.fire("Error", "ID de la película no válido", "error");
                                    }
                                }}
                            >
                                Eliminar
                            </button>
                        </section>
                    </article>
                ))}
            </section>
        </div>
    );
}

export default GestorPeliculas;
