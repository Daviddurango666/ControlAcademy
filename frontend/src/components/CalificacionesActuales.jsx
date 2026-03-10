import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/CalificacionesActuales.css";

const CalificacionesActuales = ({ usuario }) => {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const res = await api.get(`/materias/rendimiento/${usuario.id}`);
        setMaterias(res.data);
      } catch (error) {
        console.log("Error al cargar el rendimiento de materias:", error);
      }
    };

    if (usuario?.id) fetchMaterias();
  }, [usuario]);

  return (
    <div className="calif-container">
      <h3 style={{fontSize: 18, fontWeight: 600}}>Calificaciones Actuales</h3>
      <div className="lista-materias">
        {materias.map((materia, index) => (
          <div key={index} className="materia-card">
            <div className="materia-info">
              <strong>{materia.materia}</strong>
              <p>Prof. {materia.docente}</p>
            </div>
            <div className="materia-nota">
              <span>{materia.promedio}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalificacionesActuales;
