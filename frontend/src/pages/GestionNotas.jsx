import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/gestionNotas.css";
import "../styles/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faChartColumn,
  faCalendarAlt,
  faUsers,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function GestionNotas() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  const [grados, setGrados] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [notas, setNotas] = useState([]);
  const [gradoSeleccionado, setGradoSeleccionado] = useState("");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  
  const [form, setForm] = useState({ id: null, estudiante_id: "", nota: "", evaluacion: "", periodo: "", porcentaje: "" });
  const isEditing = form.id !== null;
  
  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) setUsuario(JSON.parse(userData));
    else navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (!usuario) return;
    api.get(`/docentes/grados/${usuario.id}`).then((res) => setGrados(res.data));
  }, [usuario]);

  useEffect(() => {
    if (!usuario || !gradoSeleccionado) return;
    api
      .get(`/docentes/materias/${usuario.id}`, { params: { grado: gradoSeleccionado } })
      .then((res) => setMaterias(res.data));
  }, [usuario, gradoSeleccionado]);

  const buscarNotas = async () => {
    if (!usuario || !gradoSeleccionado || !materiaSeleccionada) return;
    try {
      const res = await api.get(`/notas/docente/${usuario.id}`, {
        params: { grado: gradoSeleccionado, materia: materiaSeleccionada },
      });
      setNotas(res.data);
    } catch (error) {
      console.error("Error al cargar notas:", error);
    }
  };

  const guardarNota = async () => {
    if (!form.estudiante_id || !form.nota) return alert("Completa los campos");

    try {
      if (isEditing) {
        await api.put(`/notas/${form.id}`, { nota: form.nota, periodo: form.periodo, fecha_nota: new Date(), evaluacion: form.evaluacion, porcentaje: form.porcentaje });
        alert("✅ Nota actualizada");
      } else {
        await api.post(`/notas`, {
          estudiante_id: form.estudiante_id,
          materia_id: materiaSeleccionada,
          nota: form.nota,
          periodo: form.periodo,
          fecha_nota: new Date(),
          evaluacion: form.evaluacion,
          porcentaje: form.porcentaje,
        });
        alert("✅ Nota creada");
      }
      setForm({ id: null, estudiante_id: "", nota: "" });
      buscarNotas();
    } catch (error) {
      console.error("Error al guardar nota:", error);
    }
  };

  const eliminarNota = async (id) => {
    if (!window.confirm("¿Eliminar esta nota?")) return;
    try {
      await api.delete(`/notas/${id}`);
      alert("🗑️ Nota eliminada");
      buscarNotas();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const editarNota = (n) => setForm({ id: n.id_nota, estudiante_id: n.id_alumno, nota: n.nota });

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
            <li className="active" onClick={() => navigate("/gestionNotas")}>
              <FontAwesomeIcon icon={faBookOpen} className="Icon" /> Gestión de
              Notas
            </li>
            <li
              className="inactive"
              onClick={() => navigate("/gestionAsistencias")}
            >
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
          <h2 className="welcome">Gestión de Notas</h2>
          <h4 className="info">
            Administra las calificaciones de tus estudiantes por grupo y materia
          </h4>
        </div>

        <div className="filtros">
          <select value={gradoSeleccionado} onChange={(e) => setGradoSeleccionado(e.target.value)}>
            <option value="">Grado</option>
            {grados.map((g) => (
              <option key={g.grado} value={g.grado}>{g.grado}</option>
            ))}
          </select>
          <select value={materiaSeleccionada} onChange={(e) => setMateriaSeleccionada(e.target.value)}>
            <option value="">Materia</option>
            {materias.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>
          <button onClick={buscarNotas}>Buscar</button>
        </div>

        <table className="tableDetallada">
          <thead>
            <tr>
              <th>ID</th>
              <th>Estudiante</th>
              <th>Nota</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {notas.map((n) => (
              <tr key={n.id}>
                <td>{n.id_alumno}</td>
                <td>{n.estudiante}</td>
                <td>{n.nota}</td>
                <td>
                  <button className="btn-accion" onClick={() => editarNota(n)}><FontAwesomeIcon icon={faPencil}/></button>
                  <button className="btn-accion" onClick={() => eliminarNota(n.id_nota)}><FontAwesomeIcon icon={faTrash}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="formCrud">
          <h3>{isEditing ? "Editar Nota" : "Agregar Nota"}</h3>
          <input
            type="text"
            placeholder="ID del estudiante"
            value={form.estudiante_id}
            onChange={(e) => setForm({ ...form, estudiante_id: e.target.value })}
            disabled={isEditing}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Nota"
            value={form.nota}
            onChange={(e) => setForm({ ...form, nota: e.target.value })}
          />
          <input
            type="text"
            placeholder="Evaluacion"
            value={form.evaluacion}
            onChange={(e) => setForm({ ...form, evaluacion: e.target.value })}
          />
          <input
            type="number"
            step="1"
            placeholder="Periodo"
            value={form.periodo}
            onChange={(e) => setForm({ ...form, periodo: e.target.value })}
          />
          <input
            type="number"
            step="1"
            placeholder="Porcentaje"
            value={form.porcentaje}
            onChange={(e) => setForm({ ...form, porcentaje: e.target.value })}
          />
          <button onClick={() => guardarNota()}>{isEditing ? "Actualizar" : "Guardar"}</button>
        </div>
      </main>
    </div>
  );
}

export default GestionNotas;
