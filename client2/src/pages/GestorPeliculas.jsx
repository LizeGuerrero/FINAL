import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
    getPeliculas,
    addPelicula,
    updatePelicula,
    deletePelicula,
} from "../services/PeliculaService";
import { getDirectores } from "../services/DirectorService"; // Importa el servicio de directores exactamente el get
import { getGeneros } from "../services/GeneroService";
import "./styles/GestorDePeliculas.css";

/**
 * Componente que gestiona la creación, edición y eliminación de películas.
 * El componente utiliza el hook useState para mantener el estado de las películas,
 * directores y géneros. Utiliza el hook useEffect para cargar las películas,
 * directores y géneros al montar el componente. El componente renderiza un formulario
 * para agregar o editar una película, y una lista de películas con sus detalles.
 * El componente también utiliza el servicio getPeliculas para obtener las películas,
 * addPelicula para agregar una nueva película, updatePelicula para editar una
 * película existente y deletePelicula para eliminar una película.
 */
function GestorPeliculas() {
    const [peliculas, setPeliculas] = useState([]); //Esto es como tener una cajita vacía llamada peliculas, donde guardaremos las películas. También tenemos (setPeliculas) que nos permite poner cosas nuevas dentro de esa cajita.
    const [directores, setDirectores] = useState([]); // Estado para los directores
    const [generos, setGeneros] = useState([]); // Estado para los géneros
    const [form, setForm] = useState({
/*Aquí creamos un formulario (como una hoja donde escribimos cosas). Este formulario tiene espacios vacíos para:
titulo: el nombre de la película.
duracion: cuánto dura la película.
sinopsis: una pequeña historia de qué trata.
director_id: quién la dirigió (por ahora no lo sabemos, así que está vacío).
fecha_lanzamiento: el día en que salió la película.
generos: qué tipo de película es (puede tener más de uno).
Y tenemos un botón (setForm) para cambiar lo que está escrito en este formulario.*/
        titulo: "",
        duracion: "",
        sinopsis: "",
        director_id: "",
        fecha_lanzamiento: "",
        generos: [], // Inicializa los géneros
    });
    const [editingId, setEditingId] = useState(null); //Esto es como tener una nota adhesiva para recordar qué película queremos editar. Si no estamos editando nada, se queda vacía (null).

    useEffect(() => {
        // Cargar las películas al montar el componente
        loadPeliculas();
        loadDirectores(); // Cargar los directores
        loadGeneros(); // Función para cargar los géneros
    }, []);

    const loadPeliculas = async () => {
        const data = await getPeliculas();
        setPeliculas(data);
    };
    /**
     * Carga la lista de películas desde el servidor.
     *
     * - Esta función es asíncrona y utiliza `getPeliculas()` para obtener los datos de las películas.
     * - Una vez que los datos han sido recuperados, se almacenan en el estado local `peliculas`
     *   utilizando `setPeliculas(data)`.
     *
     * Pasos:
     * 1. Espera (con `await`) a que la función `getPeliculas()` devuelva la lista de películas.
     * 2. Actualiza el estado `peliculas` con los datos obtenidos.
     *
     * Esto asegura que la lista de películas esté sincronizada con el servidor para su uso en la interfaz.
     */

    const loadDirectores = async () => {
        const data = await getDirectores();
        setDirectores(data);
    };

    const loadGeneros = async () => {
        const data = await getGeneros(); // Función para obtener los géneros del backend
        setGeneros(data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        /**
         * Maneja el envío del formulario para agregar o actualizar una película.
         * - Valida que los campos obligatorios estén completos.
         * - Decide entre agregar una nueva película o actualizar una existente.
         * - Limpia el formulario y recarga la lista de películas.
         */
        e.preventDefault();

        // Validación de datos
        if (!form.director_id || form.generos.length === 0) {
            Swal.fire(
                "Error",
                "Por favor, selecciona un director y al menos un género.",
                "error"
            );
            return;
        }

        try {
            if (editingId) {
                await updatePelicula(editingId, form);
                Swal.fire(
                    "Actualizado",
                    "Película actualizada con éxito",
                    "success"
                );
                setEditingId(null);
            } else {
                const response = await addPelicula(form);
                console.log(response); // Agrega esto para ver la respuesta del backend
                Swal.fire("Agregado", "Película agregada con éxito", "success");
            }
        } catch (error) {
            console.error("Error al agregar la película:", error);
            Swal.fire(
                "Error",
                "Hubo un error al agregar la película.",
                "error"
            );
        }

        // Limpiar el formulario
        setForm({
            titulo: "",
            duracion: "",
            sinopsis: "",
            director_id: "",
            generos: [],
            fecha_lanzamiento: "",
        });

        loadPeliculas();
    };

    const handleEdit = (pelicula) => {
        /*Actualiza el estado del formulario cuando un input cambia.*/
        setForm({
            ...pelicula,
            director_id: pelicula.director_id._id,
            generos: pelicula.generos.map((genero) => genero._id), // Guardamos los IDs de los géneros seleccionados
            fecha_lanzamiento: pelicula.fecha_lanzamiento
                ? pelicula.fecha_lanzamiento.split("T")[0]
                : "",
        });
        setEditingId(pelicula._id);
        Swal.fire("Modo de edición", `Editando: ${pelicula.titulo}`, "info");
    };

    const handleGenerosChange = (e) => {
        const { value, checked } = e.target;

        setForm((prevState) => {
            const updatedGeneros = checked
                ? [...prevState.generos, value] // Si el checkbox está marcado, agregamos el género
                : prevState.generos.filter((generoId) => generoId !== value); // Si no está marcado, lo eliminamos
            return { ...prevState, generos: updatedGeneros };
        });
    };

    const handleDelete = async (id) => {
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
                            ? form.fecha_lanzamiento.slice(0, 10)
                            : ""
                    }
                    onChange={handleChange}
                />

                <button type="submit">
                    {editingId ? "Actualizar" : "Agregar"}
                </button>
            </form>

            <div className="seccionPelicula">
                {peliculas.map((pelicula) => (
                    <article key={pelicula._id} className="peliculaCard">
                        <header className="pelicula-header">
                            <h2>{pelicula.titulo}</h2>
                            <p className="pelicula-fecha">
                                {new Date(
                                    pelicula.fecha_lanzamiento
                                ).toLocaleDateString("es-ES", {
                                    timeZone: "UTC",
                                })}
                            </p>
                        </header>

                        <section className="pelicula-sinopsis">
                            <p>{pelicula.sinopsis}</p>
                        </section>

                        <section className="pelicula-director">
                            <p>
                                <strong>Director: </strong>
                                {pelicula.director_id.nombre_director}
                            </p>
                        </section>

                        <section className="pelicula-generos">
                            <p>
                                <strong>Géneros: </strong>
                                {pelicula.generos
                                    .map((genero) => genero.nombre_genero)
                                    .join(", ")}
                            </p>
                        </section>

                        <footer className="pelicula-actions">
                            <button
                                className="edit-btn"
                                onClick={() => handleEdit(pelicula)}
                            >
                                Editar
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(pelicula._id)}
                            >
                                Eliminar
                            </button>
                        </footer>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default GestorPeliculas;
