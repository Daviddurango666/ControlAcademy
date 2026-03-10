import React, { useEffect, useState } from "react";
import api from "../services/api.js";

function TablaRanking({ usuario }) {

    const [ranking, setRanking] = useState([]);

    const cargarTablRanking = async () => {
        try {
            const res = await api.get(`/estudiantes/tablaRanking/${usuario.id}`);
            console.log(res);
            const data = res.data;
            setRanking(data.ranking_grupo);
        } catch (error) {
            console.log("Error al cargar la tabla de ranking de estudiantes: ", error);
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
                        <th>Nombre</th>
                        <th>Grado</th>
                        <th>Grupo</th>
                        <th>Promedio</th>
                    </tr>
                    </thead>
                    {ranking.length > 0 ? (
                        ranking.map((item, index) => (
                        <tbody key={index}>
                            <td>{item.id ?? '--'}</td>
                            <td>{item.nombre ?? '--'}</td>
                            <td>{item.grado ?? '--'}</td>
                            <td>{item.grupo ?? '--'}</td>
                            <td>{item.promedio ?? '--'}</td>
                            <td>{item.ranking_grupo ?? '--'}</td>
                        </tbody>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="6" style={{ textAlign: 'center' }}>-- No hay ranking de estudiantes --</td>
                        </tr>
                    )
                }
                </table>
        </div>
    );
}

export default TablaRanking;
