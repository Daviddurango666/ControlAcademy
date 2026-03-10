import React, { useEffect, useState } from "react";
import api from "../services/api.js";

function TablaReqAtencion({ usuario }) {

    const [atencion, setReqAtencion] = useState([]);

    const cargarTablReAtencion = async () => {
        try {
            const res = await api.get(`/docentes/tablaReqAtencion/${usuario.id}`);
            console.log(res);
            const data = res.data;
            setReqAtencion(data);
        } catch (error) {
            console.log("Error al cargar la tabla de estudiantes que requieren atencion: ", error);
        }
    };

    useEffect(() => {
        cargarTablReAtencion();
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
                    {atencion.length > 0 ? (
                        atencion.map((item, index) => (
                        <tbody key={index}>
                            <td>{item.id ?? '--'}</td>
                            <td>{item.nombre ?? '--'}</td>
                            <td>{item.grado ?? '--'}</td>
                            <td>{item.grupo ?? '--'}</td>
                            <td>{item.promedio ?? '--'}</td>
                        </tbody>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>-- No hay estudiantes que requieran atención --</td>
                        </tr>
                    )
                }
                </table>
        </div>
    );
}

export default TablaReqAtencion;
