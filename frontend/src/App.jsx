import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Calificaciones from "./pages/Calificaciones";
import Asistencias from "./pages/Asistencias";
import Reportes from "./pages/Reportes";
import GestionNotas from "./pages/GestionNotas";
import GestionAsistencias from "./pages/GestionAsistencias";
import GestionReportes from "./pages/GestionReportes";
import GestionEvaluaciones from "./pages/gestionEvaluaciones";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calificaciones" element={<Calificaciones />} />
        <Route path="/asistencias" element={<Asistencias />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/gestionNotas" element={<GestionNotas />} />
        <Route path="/gestionAsistencias" element={<GestionAsistencias />} />
        <Route path="/gestionReportes" element={<GestionReportes />} />
        <Route path="/gestionEvaluaciones" element={<GestionEvaluaciones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
