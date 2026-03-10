import { Docentes } from "../models/docentes.model.js";

// funciona bien
export const getAll = async (req, res) => {
    const docentes = await Docentes.getAll();
    docentes ? res.json(docentes) : res.status(404).json({message: 'No Found'});
};

// funciona bien - id_docente
export const getById = async (req, res) => {
    const docente = await Docentes.getById(req.params.id);
    docente ? res.json(docente) : res.status(404).json( { message: 'No found'});
};
// no creo que sea necesario, el rol de docente se crea en la tabla usuario
// funciona bien
export const create = async (req, res) => {
    try {
        const {usuario_id, especialidad} = req.body;
        
        if(!usuario_id || !especialidad) {
            res.status(400).json({message: "Faltan datos Obligatorios"});
        }

        const result = await Docentes.create({usuario_id, especialidad});
        res.status(201).json(result);
    } catch(error) {
        res.status(500).json({ message: "Error interno del servidor" });
        console.log("error al conectar la API: ", error.message); 
    }
};

// funciona bien - id_usuario
export const update = async (req, res) => {
    const docente = await Docentes.update(req.params.id, req.body);
    docente ? res.json(docente) : res.status(404).json( {message: 'No found'});
};

// funciona bien - id_usuario
export const deleteDocente = async (req, res) => {
    const result = await Docentes.delete(req.params.id);
    res.json(result);
};

// funciona bien - id_usuario
export const cantAsignaturas = async (req, res) => {
    try {
        const {id} = req.params;
        const cant = await Docentes.cantAsignaturas(id);
        if(cant.length > 0) {
            res.status(200).json(cant[0]);
        } else {
            res.status(404).json({message: "no found quantity"});
        }
    } catch(error) {
        console.log("error al conectar la api: ", error);
    }
}

// funciona bien - id_usuario
export const cantEstudiantes = async (req, res) => {
    try {
        const {id} = req.params;
        const cantStudent = await Docentes.cantEstudiantes(id);

        if(cantStudent.length > 0) {
            res.status(200).json(cantStudent[0]);
        } else {
            res.status(404).json({message: "Quantity student no found"});
        }
    } catch(error) {
        console.log("error al conectar la API: ", error);
    }
}
// funciona bien - id_usuario
export const virtualClass = async (req, res) => {
    try {
        const {id} = req.params;
        const clase_virtual = await Docentes.virtualClass(id);

        if(clase_virtual.length > 0) {
            res.status(200).json(clase_virtual[0]);
        } else {
            res.status(404).json({message: "no se obtuvieron clases virtuales"});
        }

    }catch(error) {
        console.log("error al conectar la API: ", error);
    }
}

// funciona bien - id_usuario
export const top10asistencias = async(req, res) => {
    try {
        const {id} = req.params;

        const top10 = await Docentes.top10asistencias(id);

        if(top10.length > 0) {
            res.status(200).json(top10);
        } else {
            res.status(404).json({message: "no se obtuvieron asistencias recientes de estudiantes"});
        }
    }catch(error) {
        console.log("error al conectar la API: ", error);
    }
}

export const estudiantesDestacados = async (req, res) => {
    try {
        const {id} = req.params;
        const destacados = await Docentes.estudiantesDestacados(id);
        res.status(200).json(destacados);
    }catch(error) {
        console.log("error al conectar la API: ", error);
    }
} 

export const EstuReqAtencion = async(req, res) => {
    try {
        const {id} = req.params;
        const atencion = await Docentes.EstuReqAtencion(id);
        res.status(200).json(atencion);
    }catch(error) {
        console.log("error al obtener los estudiantes que requieren atencion: ", error.message);
    }
}

export const tablaReqAtencion = async (req, res) => {
    try {
        const {id} = req.params;
        const atencion = await Docentes.tablaReqAtencion(id);
        res.status(200).json(atencion);
    }catch(error) {
        console.log("error al obtener la tabla de los estudiantes que requieren atencion: ", error.message);

    }
}
export const tablaEstDestacados = async (req, res) => {
    try {
        const {id} = req.params;
        const destacados = await Docentes.tablaEstDestacados(id);
        res.status(200).json(destacados);
    }catch(error) {
        console.log("error al obtener la tabla de los estudiantes destacados: ", error.message);

    }
}

export const gradosGrupos = async (req, res) => {
    try {
      const { id } = req.params;
      const grados = await Docentes.getGradosPorDocente(id);
      res.json(grados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los grados" });
    }
};

export const materiasPorGrado = async (req, res) => {
    try {
      const { id } = req.params;
      const { grado } = req.query;
      const materias = await Docentes.getMateriasPorGrado(id, grado);
      res.json(materias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener las materias" });
    }
};

export const notas = async (req, res) => {
    try {
      const { id } = req.params;
      const { grado, materia } = req.query;
      const notas = await Docentes.getNotasPorFiltro(id, grado, materia);
      res.json(notas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener notas" });
    }
};
    
export const rankingEstudiantes = async(req, res) => {
    try {
        const {id} = req.params;
        const ranking = await Docentes.rankingEstudiantes(id);
        res.json(ranking[0]);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener grupos y materias' });
    }
}

export const obtenerAsistencias = async (req, res) => {
    try {
        const { id } = req.params;
        const { grado, materia } = req.query;
        const data = await Docentes.obtenerAsistencias(id, grado, materia);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener asistencias" });
    }
};

export const actualizarAsistencia = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        await Docentes.actualizarAsistencia(id, estado);
        res.json({ message: "Asistencia actualizada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar asistencia" });
    }
};