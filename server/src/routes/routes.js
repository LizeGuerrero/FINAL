// Cuando creo este archivo para las rutas y pego las rutas igualmente queda sin funcionar porque no lo he conectado con la aplicación. Para conectarla con la aplicación debo importar una parte del modulo de express, la parte del enrutamiento, para ello usamos la parte del modulo llamada routher.
import{Router} from 'express';

// Para usar sus metodos los metodos lo guardamos en constante.
const router = Router();

// Ahora como la lógica y procesos quedarán a cargo de este archivo y de los metodos de sus modulos. (El modulo Router importado) cambiabos en el código: expres.get('/', (req,res) => res.render('home')); la parte de expres por router.



// Ahora para poder usar esta porción de código con el código de la aplicación index.js, exportamos por defecto el modulo router ya configurado.

export default router; // Posteriormente importamos en el index el modulo router exportado.
