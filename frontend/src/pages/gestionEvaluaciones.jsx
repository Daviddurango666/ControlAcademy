import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import FiltroGrupoMateria from "../components/FiltroGrupoMateria";
import TablaNotas from "../components/TablaNotas";
import TablaAsistenciaDocentes from "../components/TablaAsistenciaDocente";
import "../styles/dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faChartColumn, faCalendarAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

function GestionEvaluaciones() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [grupos, setGrupos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState("");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      setUsuario(JSON.parse(userData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (usuario) {
      api.get(`/docentes/grupos-materias/${usuario.id}`)
      .then(res => {
        console.log(res);
        setGrupos(res.data.grupos);
        setMaterias(res.data.materias);
      });
    }
  }, [usuario]);

  useEffect(() => {
    if (grupoSeleccionado && materiaSeleccionada) {
      api.get(`/estudiantes?grupo=${grupoSeleccionado}&materia=${materiaSeleccionada}`)
        .then(res => setEstudiantes(res.data));
    }
  }, [grupoSeleccionado, materiaSeleccionada]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!usuario) return null;

  return (
    <div className="body">
      <header>
        <h1 className="logo">ControlAcademy</h1>
        <div className="opciones">
          <span className="rol">{usuario.rol.toUpperCase()}</span>
          <button className="logout" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </header>

      <div className="menu">
        <nav>
          <ul>
            <li className="inactive" onClick={() => navigate("/dashboard")}>
              <FontAwesomeIcon icon={faChartColumn} className="Icon" /> Dashboard
            </li>
            <li className="inactive" onClick={() => navigate("/gestionNotas")}>
              <FontAwesomeIcon icon={faBookOpen} className="Icon" /> Gestión de Notas
            </li>
            <li className="active" onClick={() => navigate("/gestionEvaluaciones")}>
              <FontAwesomeIcon icon={faUsers} className="Icon" /> Gestión de Evaluaciones
            </li>
            <li className="inactive" onClick={() => navigate("/gestionAsistencias")}>
              <FontAwesomeIcon icon={faCalendarAlt} className="Icon" /> Gestión de Asistencias
            </li>
            <li className="inactive" onClick={() => navigate("/gestionReportes")}>
              <FontAwesomeIcon icon={faUsers} className="Icon" /> Gestión de Reportes
            </li>
          </ul>
        </nav>
      </div>

      <main className="main">
        <div className="title">
          <h2 className="welcome">Gestión de Notas</h2>
          <h4 className="info">Administra las calificaciones de tus estudiantes por grupo y materia</h4>
        </div>

        <FiltroGrupoMateria
          grupos={grupos}
          materias={materias}
          grupoSeleccionado={grupoSeleccionado}
          materiaSeleccionada={materiaSeleccionada}
          onGrupoChange={(e) => setGrupoSeleccionado(e.target.value)}
          onMateriaChange={(e) => setMateriaSeleccionada(e.target.value)}
        />

        <TablaNotas
          estudiantes={estudiantes}
          grupo={grupoSeleccionado}
          materia={materiaSeleccionada}
        />

        <div className="charts">
          <div className="chart">
            {/* <TablaAsistenciaDocentes usuario={usuario} /> */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default GestionEvaluaciones;