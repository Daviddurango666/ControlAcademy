import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/materiaDetalle.css";

const MateriaDetalle = ({ usuario }) => {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const res = await api.get(`/materias/detalle/${usuario.id}`);
        const data = res.data;
        setMaterias(data);
      } catch (error) {
        console.log("Error al cargar los detalles de materias:", error);
      }
    };

    if (usuario.id) fetchMaterias();
  }, [usuario]);

  return (
    <div className="materias-container">
      {materias.map((materia, index) => (
        <div key={index} className="materia-card-detalle">
          <div className="materia-header">
            <div>
              <h3>{materia.nombre}</h3>
              <p>
                Promedio:{" "}
                <strong className={materia.promedio >= 3 ? "aprobado" : "reprobado"}>
                  {parseFloat(materia.promedio).toFixed(1)}
                </strong>
              </p>
            </div>
            <div className="porcentaje-total">
              <span>{materia.porcentaje}%</span>
              <p>Porcentaje asignatura para estudio docente</p>
            </div>
          </div>

          <div className="barra-progreso">
            <progress value={materia.porcentaje} max="100"></progress>
          </div>

          <div className="calificaciones-section">
            <h4>Calificaciones</h4>
            <div className="lista-calificaciones">
            {(materia.calificaciones || []).map((nota, i) => (
                <div key={i} className="card-calificacion">
                <p className="Porcentaje">{nota.porcentaje}%</p>
                <h3
                    className={`porcentaje-nota ${
                    nota.calificacion >= 4.5
                        ? "sobresaliente"
                        : nota.calificacion >= 3
                        ? "aprobado"
                        : "reprobado"
                    }`}
                >
                    {((nota.calificacion / 5) * 100).toFixed(1)}%
                </h3>
                <p className="nota">Nota: {nota.calificacion}</p>
                <p className="nombre-eval">{nota.nombreEvaluacion}</p>
                <p className="fecha">{nota.fecha}</p>
                <span
                    className={`estado ${
                    nota.calificacion >= 4.5
                        ? "sobresaliente"
                        : nota.calificacion >= 3
                        ? "aprobado"
                        : "reprobado"
                    }`}
                >
                    {nota.calificacion >= 4.5
                    ? "Sobresaliente"
                    : nota.calificacion >= 3
                    ? "Aprobado"
                    : "Reprobado"}
                </span>
                </div>
              ))}
            </div>
          </div>

          <div className="materia-footer">
            <span>Total Porcentaje Calificado: {materia.porcentaje}%</span>
            <span className="promedio-final">
              Promedio: {parseFloat(materia.promedio).toFixed(1)}{" "}
              <span
                className={`badge ${
                  materia.promedio >= 4.5
                    ? "excelente"
                    : materia.promedio >= 3
                    ? "aprobado"
                    : "reprobado"
                }`}
              >
                {materia.promedio >= 4.5
                  ? "Excelente"
                  : materia.promedio >= 3
                  ? "Aprobado"
                  : "Reprobado"}
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MateriaDetalle;
