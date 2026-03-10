import React, { useEffect, useState } from "react";
import api from "../services/api.js";

function TablaCalificacionesDocentes({ usuario }) {

    const [notas, setNotas] = useState([]);

    const cargarTablNotas = async () => {
        try {
            const res = await api.get(`/notas/tablaExamenes/${usuario.id}`);
            console.log(res);
            const data = res.data;
            setNotas(data);
        } catch (error) {
            console.log("Error al cargar la tabla de examenes: ", error);
        }
    };

    useEffect(() => {
        cargarTablNotas();
    }, [usuario]);
    
    return (
        <div className="tablaEvaluaciones">
                <table id="tableDetallada">
                    <thead  >
                    <tr>
                        <th>ID</th>
                        <th>Estudiante</th>
                        <th>Grupo</th>
                        <th>Calificacion</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    {notas.map((item, index) => (
                    <tbody key={index}>
                        <td>{item.materia}</td>
                        <td>{item.evaluacion}</td>
                        <td>{item.fecha_nota}</td>
                        <td>{item.porcentaje}</td>
                        <td>{item.nota}</td>
                        <td>{item.nota >= 3.0 ? 'aprobado': 'reprobado'}</td>
                    </tbody>
                    ))}
                </table>
        </div>
    );
}

export default TablaCalificacionesDocentes;
