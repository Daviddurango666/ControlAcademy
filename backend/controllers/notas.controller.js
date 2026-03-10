import e from "express";
import { Estudiantes } from "../models/estudiantes.model.js";
import { notas } from "../models/notas.model.js";

export const getNotasByDocente = async (req, res) => {
  try {
    const { id } = req.params; // docente id
    const { grado, materia } = req.query;

    const nota = await notas.getByDocente(id, grado, materia);
    res.json(nota);
  } catch (error) {
    console.error("Error al obtener notas:", error);
    res.status(500).json({ message: "Error al obtener las notas" });
  }
};

export const createNota = async (req, res) => {
    try {
        const nuevaNota = await notas.create(req.body);
        res.status(201).json(nuevaNota);
    } catch (error) {
        console.error("Error al crear nota:", error);
        res.status(500).json({ error: "Error al crear nota" });
    }
};

export const updateNota = async (req, res) => {
    try {
        const { id } = req.params;
        const {nota, periodo, fecha_nota, evaluacion, porcentaje} = req.body;
        const notaActualizada = await notas.update(id, {nota, periodo, fecha_nota, evaluacion, porcentaje});
        res.json(notaActualizada);
    } catch (error) {
        console.error("Error al actualizar nota:", error);
        res.status(500).json({ error: "Error al actualizar nota" });
    }
};

export const deleteNota = async (req, res) => {
    try {
        const { id } = req.params;
        await notas.delete(id);
        res.json({ message: "Nota eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar nota:", error);
        res.status(500).json({ error: "Error al eliminar nota" });
    }
};

// funciona bien
export const promedioNota = async (req, res) => {
    try {
        const { id } = req.params;
        const prom = await notas.promedio(id);
        
        if(!prom || prom.promedio === undefined) {
            return res.status(404).json({message: "promedio no encontrado"})
        }
        res.json({promedio: parseFloat(prom.promedio).toFixed(1), id: prom.id});
    } catch(error) {
        console.error("Error al calcular el promedio: ", error);
        res.status(500).json({message: "Error en el servidor", error: error.message});
    }
}

export const porcentajeNotas = async (req, res) => {
    try {
        const { estudiante_id } = req.params;
        const porcentaje = await notas.porcentajeNotas(estudiante_id);
        res.json({ porcentaje: porcentaje });
    } catch (error) {
        console.error("Error al obtener el porcentaje de notas: ", error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
}
export const evaluacionesAprobadas = async (req, res) => {
    try {
        const { estudiante_id } = req.params;
        const total = await notas.evaluacionesAprobadas(estudiante_id);
        res.json({total: total});
    } catch (error) {
        console.error("Error al obtener el total de evaluaciones aprobadas: ", error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
}
export const totalExamenes = async (req, res) => {
    try {
        const {estudiante_id} = req.params;
        const total = await notas.totalexamenes(estudiante_id);
        res.json({total: total});
    }catch(error) {
        console.error("Error al obtener el total de evaluaciones realizadas: ", error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
        
    }
}



export const tendenciaMaterias = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("📘 ID del estudiante:", id);
    
        const data = await notas.getTendenciasNotas(id);
        console.log("📊 Datos crudos:", data);
    
        if (!data || data.length === 0) {
        return res.status(404).json({ message: "No hay notas registradas." });
        }
    
        // 🔹 Agrupar datos por materia
        const materiasMap = {};
        const periodos = [];
    
        data.forEach((item) => {
        if (!periodos.includes(item.periodo)) periodos.push(item.periodo);
        if (!materiasMap[item.materia]) materiasMap[item.materia] = [];
        materiasMap[item.materia].push(item.promedio);
        });
    
        const materias = Object.entries(materiasMap).map(([nombre, promedios]) => ({
        nombre,
        promedios,
        }));
    
        res.json({ periodos, materias });
    } catch (error) {
        console.error("❌ Error al obtener tendencia de notas:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const tablaEvaluaciones = async (req, res) => {
    try {
        const {id} = req.params;
        const tabla = await notas.tablaEvaluaciones(id);
        res.json(tabla);
    }catch(error) {
        console.log("error al obtener informacion para la tabla de evaluaciones");
        res.status(500).json({message: "Error interno del servidor"});
    }
}


// const { grupo_id, materia_id } = req.params;

//     try {
//       const notas = await notas.getNotasPorGrupoYMateria(grupo_id, materia_id);
//       const promedio = await notas.getPromedioGrupo(grupo_id, materia_id);
//       const notaAlta = await notas.getNotaMasAlta(grupo_id, materia_id);
//       const conteo = await notas.getConteoAprobados(grupo_id, materia_id);

//       res.status(200).json({
//         notas,
//         estadisticas: {
//           promedio: promedio?.promedio || 0,
//           notaAlta: notaAlta?.nota_alta || 0,
//           aprobados: conteo?.aprobados || 0,
//           reprobados: conteo?.reprobados || 0,
//         },
//       });
//     } catch (error) {
//       console.error("Error al obtener notas:", error);
//       res.status(500).json({ message: "Error al obtener las notas" });
//     }
// }

export const ComparativoPeriodos = async (req, res) => {
    try {
        const {id} = req.params;
        const comparativo = await notas.ComparativoPeriodos(id);
        res.json(comparativo)
    }catch(error) {
        console.log("error al obtener el comparativo de periodos", error);
        res.status(500).json({message: "Error interno del servidor"});
    }
}

export const evolucionRendimiento = async(req, res) => {
    try {
        const {id} = req.params;
        const evolucion = await notas.evolucion(id);
        res.json(evolucion);
    }catch(error) {
        console.log("error al obtener la evolucion de rendimiento", error);
        res.status(500).json({message: "Error interno del servidor"});
    }
}

export const distribucionCalificaciones = async (req, res) => {
    try {
        const {id} = req.params;
        const distribucion = await notas.distribucionCalificaciones(id);
        res.json(distribucion);
    }catch(error) {
        console.log("error al obtener la evolucion de rendimiento", error);
        res.status(500).json({message: "Error interno del servidor"});
    }
}