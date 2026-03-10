import { Asistencias } from "../models/asistencias.model.js";
// FUNCIONA BIEN
export const getAll = async (req, res) => {
    const asistencias = await Asistencias.getAll();
    asistencias ? res.json(asistencias) : res.status(404).json({message: 'No Found'});
};

// FUNCIONA BIEN
export const getById = async (req, res) => {
    const asistencia = await Asistencias.getById(req.params.id);
    asistencia ? res.json(asistencia) : res.status(404).json( { message: 'No found'});
};

// funciona bien
export const create = async (req, res) => {
    try {
        const asistencia = await Asistencias.create(req.body);
        res.status(201).json(asistencia);
    }catch(error) {
        console.error("error al crear la asistencia: ", error);
    }
};

// funciona bien
export const update = async (req, res) => {
    const asistencia = await Asistencias.update(req.params.id, req.body);
    asistencia ? res.json(asistencia) : res.status(404).json( {message: 'No found'});
};

// funciona bien
export const deleteAsistencia = async (req, res) => {
    const result = await Asistencias.delete(req.params.id);
    res.json(result);
};

// export const getAsistenciasByStudent = async (req, res) => {
//     const estudianteId = req.params.estudianteId;
//     const asistencias = await Asistencias.getAsistenciasByStudent(estudianteId);
//     asistencias ? res.json(asistencias) : res.status(404).json({message: "no found asistencias"});
// }

// funciona bien
export const getAsistenciasTardanza = async (req, res) => {
    try {
        const {IdEstudiante} = req.params;

        if(!IdEstudiante) {
            res.status(400).json({message: "el usuario no existe"});
        }

        const tardanza = await Asistencias.getAsistenciasTardanza(IdEstudiante);
        if(tardanza != undefined || !tardanza) {
            res.json(tardanza).status(200);
        } else {
            res.status(404).json({messsage: 'no found tardanzas'});
        }
    } catch(error) {
        console.log("error al conectar la api. ", error.message);
    }
}

// funciona bien
export const getAsistenciasPresencia = async (req, res) => {
    try {
        const {IdEstudiante} = req.params;

        if(!IdEstudiante) {
            res.status(400).json({message: "el usuario no existe"});
        }
        const presencia = await Asistencias.getAsistenciasPresencia(IdEstudiante);

        if(presencia != undefined || !presencia) {
            res.json(presencia).status(200);
        } else {
            res.status(404).json({messsage: 'no found presencias'});
        }
    } catch(error) {
        console.log("error al conectar la api. ", error.message);
    }
}

// funciona bien
export const getAsistenciasAusencia = async (req, res) => {
    try {
        const {IdEstudiante} = req.params;

        if(!IdEstudiante) {
            res.status(400).json({message: "el usuario no existe"});
        }
        const ausencia = await Asistencias.getAsistenciasAusencia(IdEstudiante);

        if(ausencia != undefined || !ausencia) {
            res.json(ausencia).status(200);
        } else {
            res.status(404).json({messsage: 'no found ausencias'});
        }
    } catch(error) {
        console.log("error al conectar la api. ", error.message);
    }
}

// funciona bien
export const getResumenAsistencias = async (req, res) => {
    try {
        const {id} = req.params;
        console.log("el id del estudiante es: ", id );
        
        const resumen = await Asistencias.getResumenAsistencias(id );
        console.log("el resumen obtenido es: ", resumen);
        
        if(!resumen || resumen.length === 0) {
            return res.status(404).json({message: "resumen de asistencias no encontrado"});
        }
        
        res.json(resumen);
        
    } catch(error) {
        console.error("Error al obtener el resumen de asistencias: ", error);
        res.status(500).json({message: "error en el servidor"});
    }
}

// funciona bien
export const getPorcentajeAsistencias = async (req, res) => {
    try {
        const usuario_id = req.params.id;
        const porcentaje = await Asistencias.getPorcentajeAsistencias(usuario_id);
        
        res.json({porcentaje})
    } catch(error) {
        console.log("error al calcular el porcentaje de asistencia: ", error);
        res.status(500).json({message: "Error al calcular el porcentaje"});
    }
}

export const getAsistenciasPorMes = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await Asistencias.getAsistenciasPorMes(id);

        const labels = data.map(row => row.nombre_mes);
        const presente = data.map(row => row.presente);
        const ausente = data.map(row => row.ausente);
        const tardanza = data.map(row => row.tardanza);

        res.json({ labels, presente, ausente, tardanza });
    }catch(error) {
        console.log("no se pudo obtener la informacion de la asistencia por mes: ", error.message);
        console.log("error al conectar la api. ", error.message);
        res.status(500).json({message: "Error al obtener la asistencia"});

    }
}

export const getResumenAsistenciasPorcentaje = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Asistencias.getResumenAsistenciasPorcentaje(id);

        if (!data || data.total === 0) {
            return res.status(404).json({ message: "No hay datos de asistencia" });
        }

        // Calcular porcentajes
        const porcentajePresente = ((data.presente / data.total) * 100).toFixed(1);
        const porcentajeAusente = ((data.ausente / data.total) * 100).toFixed(1);
        const porcentajeTardanza = ((data.tardanza / data.total) * 100).toFixed(1);

        res.json({
            labels: ["Presente", "Ausente", "Tardanza"],
            data: [porcentajePresente, porcentajeAusente, porcentajeTardanza]
        });
    } catch (error) {
        console.error("Error al obtener resumen de asistencias:", error);
        res.status(500).json({ error: "Error al obtener resumen de asistencias" });
    }
}

export const TablaAsistencias = async (req,res) => {
    try {
        const {id} = req.params;
        const tabla = await Asistencias.TablaAsistencias(id);
        res.json(tabla);
    }catch(error) {
        console.log("error al obtener informacion para la tabla de asistencias");
        res.status(500).json({message: "Error interno del servidor"});
    }
}