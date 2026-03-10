import React from "react";
import api from "../services/api";

function TablaNotas({ estudiantes, materia, grupo }) {
  const handleNotaChange = (id, nota) => {
    api.post("/notas", { estudianteId: id, materia, nota, grupo });
  };

  return (
    <div className="calificaciones">
      <h3>Calificaciones - {materia} ({grupo})</h3>
      <p>{estudiantes.length} Estudiante(s) en este grupo</p>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((est, i) => (
            <tr key={i}>
              <td>{est.nombre}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  defaultValue={est.nota || ""}
                  onBlur={(e) => handleNotaChange(est.id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaNotas;