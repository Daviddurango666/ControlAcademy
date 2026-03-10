import React, { useEffect, useState } from "react";
import api from "../services/api.js";

function TablaAsistencias({ usuario }) {
    const [asistencias, setAsistencias] = useState([]);

    const cargarTabAsistencias = async () => {
        try {
            const res = await api.get(`/asistencias/tablaAsistencias/${usuario.id}`);
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
          <th>Fecha</th>
          <th>Estado</th>
          <th>Observaciones</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(asistencias) && asistencias.map((item, index) => (
          <tr key={index}>
            <td>{item.fecha}</td>
            <td>{item.estado}</td>
            <td>{item.observacion ? item.observacion != null : '--'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default TablaAsistencias;
