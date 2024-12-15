import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import About from './pages/About';
import Contact from './pages/Contact';
import GestorPeliculas from './pages/GestorPeliculas';
import Header from './components/header';

function App() {
  return (
    <Router>
      <Header />  {/* Importamos el componente Header en app */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gestorpeliculas" element={<GestorPeliculas />} />
      </Routes>
    </Router>
  );
}

export default App;