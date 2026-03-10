import React, { useEffect, useState } from "react";
import api from "../services/api.js";

function TablaEstudiantesDestacados({ usuario }) {

    const [atencion, setReqAtencion] = useState([]);

    const cargarTablExamenes = async () => {
        try {
            const res = await api.get(`/docentes/tablaEstDestacados/${usuario.id}`);
            console.log(res);
            const data = res.data;
            setReqAtencion(data);
        } catch (error) {
            console.log("Error al cargar la tabla de estudiantes que requieren atencion: ", error);
        }
    };

    useEffect(() => {
        cargarTablExamenes();
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
                    {atencion.map((item, index) => (
                    <tbody key={index}>
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.grado }</td>
                        <td>{item.grupo}</td>
                        <td>{item.promedio}</td>
                    </tbody>
                    ))}
                </table>
        </div>
    );
}

export default TablaEstudiantesDestacados;
