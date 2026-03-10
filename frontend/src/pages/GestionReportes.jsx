import React, { use, useEffect, useState } from "react";
import api from "../services/api";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faBook, faBookOpen, faCalendarAlt, faChartColumn, faChartSimple, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import TablaAsistenciaDocentes from "../components/TablaAsistenciaDocente";

function GestionReportes() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [grados, setGrados] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [reportes, setReportes] = useState([]);
  const [gradoSeleccionado, setGradoSeleccionado] = useState("");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");

  const [form, setForm] = useState({
    id: null,
    estudiante_id: "",
    tipo: "",
    descripcion: "",
  });

  const isEditing = form.id !== null;

  // Cargar usuario
  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) setUsuario(JSON.parse(data));
    else navigate("/");
  }, [navigate]);

  // Cargar grados del docente
  useEffect(() => {
    if (!usuario) return;
    api.get(`/docentes/grados/${usuario.id}`).then((res) => setGrados(res.data));
  }, [usuario]);

  // Cargar materias por grado
  useEffect(() => {
    if (!usuario || !gradoSeleccionado) return;
    api
      .get(`/docentes/materias/${usuario.id}`, { params: { grado: gradoSeleccionado } })
      .then((res) => setMaterias(res.data));
  }, [usuario, gradoSeleccionado]);

  // Leer (Ver reportes)
  const buscarReportes = async () => {
    if (!usuario || !gradoSeleccionado || !materiaSeleccionada) return;
    try {
      const res = await api.get(`/reportes/docente/${usuario.id}`, {
        params: { grado: gradoSeleccionado, materia: materiaSeleccionada },
      });
      setReportes(res.data);
    } catch (err) {
      console.error("Error al cargar reportes:", err);
    }
  };

  // Crear o actualizar
  const guardarReporte = async () => {
    if (!form.estudiante_id || !form.tipo || !form.descripcion) return alert("Completa todos los campos");

    try {
      if (isEditing) {
        await api.put(`/reportes/${form.id}`, {
          tipo: form.tipo,
          descripcion: form.descripcion,
        });
        alert("✅ Reporte actualizado");
      } else {
        await api.post("/reportes", {
          estudiante_id: form.estudiante_id,
          materia_id: materiaSeleccionada,
          tipo: form.tipo,
          descripcion: form.descripcion,
        });
        alert("✅ Reporte creado");
      }
      setForm({ id: null, estudiante_id: "", tipo: "", descripcion: "" });
      buscarReportes();
    } catch (error) {
      console.error("Error al guardar reporte:", error);
    }
  };

  // Eliminar
  const eliminarReporte = async (id) => {
    if (!window.confirm("¿Deseas eliminar este reporte?")) return;
    try {
      await api.delete(`/reportes/${id}`);
      alert("🗑️ Reporte eliminado");
      buscarReportes();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  // Editar
  const editarReporte = (r) => {
    setForm({
      id: r.id_reporte,
      estudiante_id: r.id_alumno,
      tipo: r.tipo,
      descripcion: r.descripcion,
    });
  };

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      setUsuario(JSON.parse(userData));
    } else {
      navigate("/"); // si no hay sesión, vuelve al login
    }
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    navigate("/");
  };
 
  useEffect(()=> {
    
  }, [])
  
  if (!usuario) return null;

  return (
    <>
    <div className='body'>
      <header>
        <h1 className="logo">ControlAcademy</h1>
        <div className="opciones">
          <span className="rol">
            {usuario.rol.toUpperCase()}
          </span>
          <button className="logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Menú dinámico según rol */}
      <div className="menu">
          <nav>
            <ul>    
              <li className="inactive" onClick={() => navigate("/dashboard")}>
                <FontAwesomeIcon icon={faChartColumn} className="Icon" /> Dashboard
              </li>
              <li className="inactive" onClick={() => navigate("/gestionNotas")}>
                <FontAwesomeIcon icon={faBookOpen} className="Icon" /> Gestión de Notas
              </li>
              <li className="inactive" onClick={() => navigate("/gestionAsistencias")}>
                <FontAwesomeIcon icon={faCalendarAlt} className="Icon" /> Gestión de Asistencias
              </li>
              <li className="active" onClick={() => navigate("/gestionReportes")}>
                <FontAwesomeIcon icon={faUsers} className="Icon" /> Gestión de Reportes
              </li>
            </ul>
          </nav>
      </div>

      {/* Principal */}
      <main className="main">
        <div className="title">
          <h2 className="welcome">Gestion de Notas</h2>
          <h4 className="info">
            Administra las calificaciones de tus estudiantes por grupo y materia
          </h4>
        </div>

        <div className="filtros">
          <select value={gradoSeleccionado} onChange={(e) => setGradoSeleccionado(e.target.value)}>
            <option value="">Seleccionar grado</option>
            {grados.map((g, i) => (
              <option key={i} value={g.grado}>
                {g.grado}
              </option>
            ))}
          </select>

          <select value={materiaSeleccionada} onChange={(e) => setMateriaSeleccionada(e.target.value)}>
            <option value="">Seleccionar materia</option>
            {materias.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>

          <button onClick={buscarReportes}>Buscar</button>
        </div>

        <table className="tableDetallada">
          <thead>
            <tr>
              <th>ID</th>
              <th>Estudiante</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((r) => (
              <tr key={r.id_reporte}>
                <td>{r.id_reporte}</td>
                <td>{r.estudiante}</td>
                <td>{r.tipo}</td>
                <td>{r.descripcion}</td>
                <td>
                  <button onClick={() => editarReporte(r)}>✏️</button>
                  <button onClick={() => eliminarReporte(r.id_reporte)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="formCrud">
          <h3>{isEditing ? "Editar reporte" : "Nuevo reporte"}</h3>
          <input
            type="text"
            placeholder="ID del estudiante"
            value={form.estudiante_id}
            onChange={(e) => setForm({ ...form, estudiante_id: e.target.value })}
            disabled={isEditing}
          />
          <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
            <option value="">Seleccionar tipo</option>
            <option value="Académico">Académico</option>
            <option value="Comportamiento">Comportamiento</option>
          </select>
          <textarea
            placeholder="Descripción"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
          <button onClick={guardarReporte}>{isEditing ? "Actualizar" : "Guardar"}</button>
        </div>

        {/* Charts */}
        <div className="charts">
            <div className="chart">
              {/* <h4>Asistencias de Estudiantes</h4>
              <TablaAsistenciaDocentes usuario={usuario}/> */}
            </div>
        </div>
      </main>
    </div>
    </>
  );
}

export default GestionReportes;
