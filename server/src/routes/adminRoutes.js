/* import { Router } from 'express';
import {getGeneros,
  getGeneroById,
  addGenero,
  updateGenero,
  deleteGenero
} from '../controllers/admin/GenerosController';

import { getPeliculas,
  getPeliculaById,
  addPelicula,
  updatePelicula,
  deletePelicula } from '../controllers/admin/PeliculasController';

const router = Router();

// Importar los controladores
const controladorPelis ={
  getPeliculas,
  getPeliculaById,
  addPelicula,
  updatePelicula,
  deletePelicula
} = require('../controllers/admin/PeliculasController');

const {
  getGeneros,
  getGeneroById,
  addGenero,
  updateGenero,
  deleteGenero
} = require('../controllers/admin/GenerosController');

const {
  getDirectores,
  getDirectorById,
  addDirector,
  updateDirector,
  deleteDirector
} = require('../controllers/admin/DirectoresController');

const {
  getImagenes,
  getImagenById,
  addImagen,
  updateImagen,
  deleteImagen
} = require('../controllers/admin/ImagenesController');  // Importamos el controlador de imágenes

// Rutas para películas
router.get('/peliculas', getPeliculas);             // Obtener todas las películas
router.get('/peliculas/:id', getPeliculaById);      // Obtener una película por ID
router.post('/peliculas', addPelicula);             // Agregar una nueva película
router.put('/peliculas/:id', updatePelicula);       // Editar una película existente
router.delete('/peliculas/:id', deletePelicula);    // Eliminar una película

// Rutas para géneros
router.get('/generos', getGeneros);                 // Obtener todos los géneros
router.get('/generos/:id', getGeneroById);          // Obtener un género por ID
router.post('/generos', addGenero);                 // Agregar un nuevo género
router.put('/generos/:id', updateGenero);           // Editar un género existente
router.delete('/generos/:id', deleteGenero);        // Eliminar un género

// Rutas para directores
router.get('/directores', getDirectores);           // Obtener todos los directores
router.get('/directores/:id', getDirectorById);     // Obtener un director por ID
router.post('/directores', addDirector);            // Agregar un nuevo director
router.put('/directores/:id', updateDirector);      // Editar un director existente
router.delete('/directores/:id', deleteDirector);   // Eliminar un director

// Rutas para imágenes
router.get('/imagenes', getImagenes);               // Obtener todas las imágenes
router.get('/imagenes/:id', getImagenById);         // Obtener una imagen por ID
router.post('/imagenes', addImagen);                // Agregar una nueva imagen
router.put('/imagenes/:id', updateImagen);          // Editar una imagen existente
router.delete('/imagenes/:id', deleteImagen);       // Eliminar una imagen

export default router; */

import express from 'express';

// Importar los controladores
import {
  getPeliculas,
  getPeliculaById,
  addPelicula,
  updatePelicula,
  deletePelicula
} from '../controllers/admin/PeliculasController.js';

import {
  getGeneros,
  getGeneroById,
  addGenero,
  updateGenero,
  deleteGenero
} from '../controllers/admin/GenerosController.js';

import {
  getDirectores,
  getDirectorById,
  addDirector,
  updateDirector,
  deleteDirector
} from '../controllers/admin/DirectoresController.js';

// Crear una instancia del router
const router = express.Router();

// Rutas para películas
router.get('/peliculas', getPeliculas);             // Obtener todas las películas
router.get('/peliculas/:id', getPeliculaById);      // Obtener una película por ID
router.post('/peliculas', addPelicula);             // Agregar una nueva película
router.put('/peliculas/:id', updatePelicula);       // Editar una película existente
router.delete('/peliculas/:id', deletePelicula);    // Eliminar una película

// Rutas para géneros
router.get('/generos', getGeneros);                 // Obtener todos los géneros
router.get('/generos/:id', getGeneroById);          // Obtener un género por ID
router.post('/generos', addGenero);                 // Agregar un nuevo género
router.put('/generos/:id', updateGenero);           // Editar un género existente
router.delete('/generos/:id', deleteGenero);        // Eliminar un género

// Rutas para directores
router.get('/directores', getDirectores);           // Obtener todos los directores
router.get('/directores/:id', getDirectorById);     // Obtener un director por ID
router.post('/directores', addDirector);            // Agregar un nuevo director
router.put('/directores/:id', updateDirector);      // Editar un director existente
router.delete('/directores/:id', deleteDirector);   // Eliminar un director

export default router;