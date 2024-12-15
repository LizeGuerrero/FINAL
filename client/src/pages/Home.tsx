import { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Importamos SweetAlert2
import { getPeliculas } from "../services/PeliculaService";
import "./styles/Home.css";
import { Pelicula } from "../types/Pelicula";

// Define the Pelicula type


const Home = () => {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);

  // Cargar las películas al montar el componente
  useEffect(() => {
    loadPeliculas();
  }, []);

  const loadPeliculas = async () => {
    try {
      const data = await getPeliculas();
      setPeliculas(data as unknown as Pelicula[]);
    } catch (error) {
      console.error("Error al cargar películas:", error);
    }
  };

  // Función para mostrar detalles de la película
  const showDetails = (pelicula: Pelicula) => {
    Swal.fire({
      title: pelicula.titulo,
      html: `
        <p><strong>Duración:</strong> ${pelicula.duracion} minutos</p>
        <p><strong>Sinopsis:</strong> ${pelicula.sinopsis}</p>
        <p><strong>Fecha de Lanzamiento:</strong> ${new Date(pelicula.fecha_lanzamiento).toLocaleDateString()}</p>
      `,
      imageUrl: pelicula.imagenes ? pelicula.imagenes[0].url : "", // Si tiene imagen, la muestra
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Imagen de la película',
      confirmButtonText: 'Cerrar',
    });
  };

  return (
    <section className="container">
      <h1>Sobre Películas</h1>
      <div className="peliculas-grid">
        {peliculas.length === 0 ? (
          <p>No hay películas disponibles en este momento.</p>
        ) : (
          peliculas.map((pelicula) => (
            <div key={pelicula._id} className="pelicula-card" onClick={() => showDetails(pelicula)}>
              {/* Header Card */}
              <div className="header-card">
                <h2>{pelicula.titulo}</h2>
              </div>

              {/* Main Card */}
              <div className="main-card">
                <p className="duracion"><strong>Duración:</strong> {pelicula.duracion} minutos</p>
                <p className="sinopsis"><strong>Sinopsis:</strong> {pelicula.sinopsis}</p>
                <p className="generos"><strong>Géneros:</strong>{pelicula.generos.map((genero) => genero.nombre_genero).join(", ")}
                </p>
              </div>

              {/* Footer Card */}
              <div className="footer-card">
                <p><strong>Fecha de Lanzamiento:</strong> {new Date(pelicula.fecha_lanzamiento).toLocaleDateString()}</p>

              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Home;
