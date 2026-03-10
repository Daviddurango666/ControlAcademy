import React, { useEffect, useState } from "react";
import api from "../services/api";
import '../styles/rendimiento.css';
function RendimientoAcademico({ usuario }) {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const cargarRendimiento = async () => {
      try {
        const res = await api.get(`/materias/rendimiento/${usuario.id}`);
        console.log(res);
        const data = res.data;
        setMaterias(data);
      } catch (error) {
        console.log("Error al cargar el rendimiento de materias: ", error);
      }
    };

    if (usuario?.id) cargarRendimiento();
  }, [usuario]);

  return (
    <div className="rendimientoMaterias">
      {materias.length === 0 ? (
        <p>No hay datos de rendimiento disponibles.</p>
      ) : (
        materias.map((materia, index) => {
          const porcentaje = (materia.promedio / 5) * 100;
          return (
            <div key={index} className="materiaItem">
              <div className="MateriaHeader">
                <span>{materia.materia}</span>
                <span>{materia.promedio}</span>
              </div>
              <progress value={porcentaje} max="100"></progress>
            </div>
          );
        })
      )}
    </div>
  );
}

export default RendimientoAcademico;
