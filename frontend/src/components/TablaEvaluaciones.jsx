import React, { useEffect, useState } from "react";
import api from "../services/api.js";

function TablaEvaluaciones({ usuario }) {

    const [evaluaciones, setEvaluaciiones] = useState([]);

    const cargarTablExamenes = async () => {
        try {
            const res = await api.get(`/notas/tablaExamenes/${usuario.id}`);
            console.log(res);
            const data = res.data;
            setEvaluaciiones(data);
        } catch (error) {
            console.log("Error al cargar la tabla de examenes: ", error);
        }
    };

    useEffect(() => {
        cargarTablExamenes();
    }, [usuario]);
    
    return (
        <div className="tablaEvaluaciones">
                <table id="tableDetallada">
                    <thead  >
                    <tr>
                        <th>Materia</th>
                        <th>Evaluacion</th>
                        <th>Fecha</th>
                        <th>Porcentaje</th>
                        <th>Calificacion</th>
                        <th>Estado</th>
                    </tr>
                    </thead>
                    {evaluaciones.map((evaluaciones, index) => (
                    <tbody key={index}>
                        <td>{evaluaciones.materia}</td>
                        <td>{evaluaciones.evaluacion}</td>
                        <td>{evaluaciones.fecha_nota}</td>
                        <td>{evaluaciones.porcentaje}</td>
                        <td>{evaluaciones.nota}</td>
                        <td>{evaluaciones.nota >= 3.0 ? 'aprobado': 'reprobado'}</td>
                    </tbody>
                    ))}
                </table>
        </div>
    );
}

export default TablaEvaluaciones;
