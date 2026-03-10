import React, { useEffect, useState } from "react";
import api from "../services/api.js";

function TablaAsistenciaDocentes({ usuario }) {
    const [asistencias, setAsistencias] = useState([]);

    const cargarTabAsistencias = async () => {
        try {
            const res = await api.get(`/docentes/tablaAsistencia/${usuario.id}`);
            console.log(res.data);
            const data = res.data;
            setAsistencias(data);
        } catch (error) {
            console.log("Error al cargar la tabla de asistencias: ", error);
        }
    };

    useEffect(() => {
        cargarTabAsistencias();
    }, [usuario]);
    
    return (
  <div className="tablaAsistencias">
    <table id="tableDetallada">
      <thead>
        <tr>
          <th>ID estudiante</th>
          <th>Nombre</th>
          <th>Fecha</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(asistencias) && asistencias.map((item, index) => (
          <tr key={index}>
            <td>{item.idEstudiante}</td>
            <td>{item.NombreEstudiante}</td>
            <td>{item.fechaAsistencia}</td>
            <td>{item.estadoAsistencia}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default TablaAsistenciaDocentes;
