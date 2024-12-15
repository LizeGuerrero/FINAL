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
        <div class="swal-content-container">
          <img 
            src="${pelicula.imagen}"
            alt="${pelicula.titulo}"
            class="swal-image"
          />
          <div class="swal-details">
            <p><strong>Duración:</strong> ${pelicula.duracion} minutos</p>
            <p><strong>Sinopsis:</strong> ${pelicula.sinopsis}</p>
            <p><strong>Fecha de Lanzamiento:</strong> ${new Date(pelicula.fecha_lanzamiento).toLocaleDateString()}</p>
          </div>
        </div>
      `,
      showCloseButton: true,
      confirmButtonText: 'Cerrar',
      customClass: {
        popup: 'custom-swal-container',
      },
    });
  
    // Agregar estilos dinámicos
    const styles = document.createElement('style');
    styles.innerHTML = `
      .custom-swal-container {
        max-width: 850px; /* Ancho máximo del contenedor */
        width: 90%; /* Ancho adaptable */
      }
  
      .swal-content-container {
        display: flex;
        align-items: center;
        gap: 20px;
        flex-wrap: wrap; /* Permite que el contenido se reorganice en pantallas pequeñas */
      }
  
      .swal-image {
        width: 350px;
        height: 500px;
        border-radius: 8px;
        object-fit: cover;
      }
  
      .swal-details {
        flex: 1; /* El texto ocupará el espacio restante */
      }
  
      /* Diseño responsivo para pantallas pequeñas */
      @media (max-width: 768px) {
        .swal-content-container {
          flex-direction: column; /* Coloca la imagen y el texto en una columna */
          align-items: center;
          text-align: center; /* Centra el texto */
        }
  
        .swal-image {
          width: 100%; /* Ajusta la imagen al ancho disponible */
          height: auto; /* Mantén la proporción de la imagen */
        }
  
        .swal-details {
          margin-top: 20px; /* Añade espacio entre la imagen y el texto */
        }
      }
    `;
    document.head.appendChild(styles);
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
              <img 
    src={pelicula.imagen} 
    alt={pelicula.titulo} 
    className="movie-image" 
/>
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
