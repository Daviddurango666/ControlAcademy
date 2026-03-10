import React, { useEffect, useState } from "react";
import api from "../services/api";

function ComparativoPeriodos({ usuario }) {
  const [periodos, setPeriodos] = useState([]);

  const cargarComparativo = async () => {
    try {
      const res = await api.get(`/notas/comparativo/${usuario.id}`);
      setPeriodos(res.data);
    } catch (error) {
      console.log("Error al cargar comparativo de periodos:", error);
    }
  };

  useEffect(() => {
    if (usuario) cargarComparativo();
  }, [usuario]);

  return (
    <div className="tablaEvaluaciones">
      <h3>Comparativo de Periodos</h3>
      <table id="tableDetallada">
        <thead>
          <tr>
            <th>Periodo</th>
            <th>Promedio</th>
            <th>Materias Aprobadas</th>
            <th>Materias en Riesgo</th>
          </tr>
        </thead>
        <tbody>
          {periodos.length > 0 ? (
            periodos.map((p, i) => (
              <tr key={i}>
                <td>{p.periodo}</td>
                <td>{p.promedioNotas}</td>
                <td>{p.CantAprobadas}</td>
                <td>{p.CantRiesgo}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay datos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ComparativoPeriodos;
