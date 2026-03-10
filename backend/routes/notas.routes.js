import { 
    deleteNota, 
    promedioNota, 
    porcentajeNotas, 
    evaluacionesAprobadas, 
    totalExamenes, 
    tendenciaMaterias, 
    tablaEvaluaciones, 
    // getNotasPorGrupoYMateria,
    ComparativoPeriodos,
    evolucionRendimiento, 
    distribucionCalificaciones,
    createNota,
    updateNota,
    getNotasByDocente
} from "../controllers/notas.controller.js";
import express from 'express';
const router = express.Router();

// router.get("/", getAll);
router.get("/docente/:id", getNotasByDocente );
router.post("/", createNota);
router.put("/:id", updateNota);
router.delete("/:id", deleteNota);
router.get("/promedio/:id", promedioNota);
router.get("/porcentaje/:estudiante_id", porcentajeNotas);
router.get("/aprobadas/:estudiante_id", evaluacionesAprobadas);
router.get("/totalExamenes/:estudiante_id", totalExamenes);
router.get("/tendencia/:id", tendenciaMaterias);
router.get("/tablaExamenes/:id", tablaEvaluaciones);
// router.get("/:grupo_id/:materia_id", getNotasPorGrupoYMateria);
router.get("/comparativo/:id", ComparativoPeriodos);
router.get("/evolucion/:id", evolucionRendimiento);
router.get("/distribucion/:id", distribucionCalificaciones);

export default router;