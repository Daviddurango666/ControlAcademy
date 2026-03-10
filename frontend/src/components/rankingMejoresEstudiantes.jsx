import React, { useEffect, useState } from "react";
import api from "../services/api.js";

function RankingMejoresEstudiantes({ usuario }) {

    const [ranking, setRanking] = useState([]);

    const cargarTablRanking = async () => {
        try {
            const res = await api.get(`/docentes/rankingMejores/${usuario.id}`);
            console.log(res);
            const data = res.data;
            setRanking(data);
        } catch (error) {
            console.log("Error al cargar la tabla de mejores estudiantes: ", error);
        }
    };

    useEffect(() => {
        cargarTablRanking();
    }, [usuario]);
    
    return (
        <div className="tablaEvaluaciones">
                <table id="tableDetallada">
                    <thead>
                    <tr>
                        <th>Id Alumno</th>
                        <th>Grado</th>
                        <th>Grupo</th>
                        <th>Materia</th>
                        <th>Promedio</th> 
                    </tr>
                    </thead>
                    {Array.isArray(ranking) && ranking.map((item, index) => (
                    <tbody key={index}>
                        <td>{item.estudiante}</td>
                        <td>{item.grado }</td>
                        <td>{item.grupo}</td>
                        <td>{item.materia}</td>
                        <td>{item.promedio}</td>
                    </tbody>
                    ))}
                </table>
        </div>
    );
}

export default RankingMejoresEstudiantes;
