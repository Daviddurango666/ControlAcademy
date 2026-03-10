import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/gestionNotas.css"; // puedes duplicarlo como gestionAsistencias.css si quieres
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faChartColumn,
  faCalendarAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

function GestionAsistencias() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [grados, setGrados] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [asistencias, setAsistencias] = useState([]);

  const [gradoSeleccionado, setGradoSeleccionado] = useState("");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      setUsuario(JSON.parse(userData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Cargar grados del docente
  useEffect(() => {
    const cargarGrados = async () => {
      if (!usuario || !usuario.id) return;
      try {
        const res = await api.get(`/docentes/grados/${usuario.id}`);
        setGrados(res.data || []);
      } catch (error) {
        console.error("Error al cargar grados:", error);
      }
    };
    cargarGrados();
  }, [usuario]);

  // Cargar materias según grado
  useEffect(() => {
    const cargarMaterias = async () => {
      if (!usuario || !usuario.id || !gradoSeleccionado) return;
      try {
        const res = await api.get(`/docentes/materias/${usuario.id}`, {
          params: { grado: gradoSeleccionado },
        });
        setMaterias(res.data || []);
      } catch (error) {
        console.error("Error al cargar materias:", error);
      }
    };
    cargarMaterias();
  }, [usuario, gradoSeleccionado]);

  // Buscar asistencias
  const buscarAsistencias = async () => {
    if (!usuario || !usuario.id || !gradoSeleccionado || !materiaSeleccionada)
      return;
    try {
      const res = await api.get(`/docentes/asistencias/${usuario.id}`, {
        params: { grado: gradoSeleccionado, materia: materiaSeleccionada },
      });
      setAsistencias(res.data || []);
    } catch (error) {
      console.error("Error al buscar asistencias:", error);
    }
  };

  // Registrar o actualizar asistencia
  const actualizarAsistencia = async (idAsistencia, estado) => {
    try {
      await api.put(`/docentes/asistencias/${idAsistencia}`, { estado });
      setAsistencias((prev) =>
        prev.map((a) =>
          a.id_asistencia === idAsistencia ? { ...a, estado } : a
        )
      );
    } catch (error) {
      console.error("Error al actualizar asistencia:", error);
    }
  };

  const guardarAsistencia = async (asistencia) => {
    try {
      await api.post(`/asistencias`, {
        estudiante_id: asistencia.id_alumno,
        materia_id: asistencia.id_materia,
        estado: asistencia.estado,
        observaciones: asistencia.observaciones || "",
      });
      alert("✅ Asistencia guardada correctamente");
    } catch (error) {
      console.error("❌ Error al guardar la asistencia:", error);
      alert("Error al guardar la asistencia");
    }
  };

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
          <button className="logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="menu">
        <nav>
          <ul>
            <li className="inactive" onClick={() => navigate("/dashboard")}>
              <FontAwesomeIcon icon={faChartColumn} className="Icon" /> Dashboard
            </li>
            <li className="inactive" onClick={() => navigate("/gestionNotas")}>
              <FontAwesomeIcon icon={faBookOpen} className="Icon" /> Gestión de
              Notas
            </li>
            <li className="active" onClick={() => navigate("/gestionAsistencias")}>
              <FontAwesomeIcon icon={faCalendarAlt} className="Icon" /> Gestión
              de Asistencias
            </li>
            <li
              className="inactive"
              onClick={() => navigate("/gestionReportes")}
            >
              <FontAwesomeIcon icon={faUsers} className="Icon" /> Gestión de
              Reportes
            </li>
          </ul>
        </nav>
      </div>

      <main className="main">
        <div className="title">
          <h2 className="welcome">Gestión de Asistencias</h2>
          <h4 className="info">
            Registra y actualiza la asistencia de tus estudiantes por grupo y
            materia
          </h4>
        </div>

        <div className="filtros">
          <select
            value={gradoSeleccionado}
            onChange={(e) => setGradoSeleccionado(e.target.value)}
          >
            <option value="">Seleccionar grado</option>
            {Array.isArray(grados) &&
              grados.map((g, i) => (
                <option key={i} value={g.grado}>
                  {g.grado}
                </option>
              ))}
          </select>

          <select
            value={materiaSeleccionada}
            onChange={(e) => setMateriaSeleccionada(e.target.value)}
            disabled={!materias.length}
          >
            <option value="">Seleccionar materia</option>
            {Array.isArray(materias) &&
              materias.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre}
                </option>
              ))}
          </select>

          <button onClick={buscarAsistencias}>Buscar</button>
        </div>
        <table className="tableDetallada"> 
          <thead> 
            <tr> 
              <th>ID Alumno</th> 
              <th>Estudiante</th> 
              <th>Grado</th> 
              <th>Materia</th> 
              <th>Ultima Asistencia</th> 
              <th>Estado</th> 
              <th>Observacion</th> 
              <th>Acciones</th> 
            </tr> 
          </thead> 
          <tbody> 
            {asistencias.length > 0 ? ( asistencias.map((a, i) => ( 
              <tr key={i}> 
              <td>{a.id_alumno}</td> 
              <td>{a.estudiante}</td> 
              <td>{a.grado}</td> 
              <td>{a.materia}</td> 
              <td>{a.fecha}</td> 
              <td> 
                <select 
                value={a.estado} 
                onChange={(e) => actualizarAsistencia(a.id_asistencia, e.target.value) } > 
                <option value="Presente">Presente</option> 
                <option value="Ausente">Ausente</option> 
                <option value="Justificado">Justificado</option> 
                </select> 
              </td> 
              <td> 
                <input type="text" name="observacion" id="observacion" /> 
              </td>
              <td className="accion-table"> 
                <button>Editar</button> 
                <button onClick={() => guardarAsistencia()}>Guardar</button> 
              </td> 
            </tr> 
            )) ) : ( 
            <tr> 
              <td colSpan="8" className="noData"> No hay asistencias registradas </td> 
            </tr> 
            )} 
          </tbody> 
        </table>
      </main>
    </div>
  );
}

export default GestionAsistencias;
