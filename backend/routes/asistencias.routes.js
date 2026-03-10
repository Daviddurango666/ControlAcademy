import { 
    getAll, 
    getById, 
    create, 
    update, 
    deleteAsistencia, 
    // getAsistenciasByStudent, 
    getAsistenciasTardanza, 
    getAsistenciasPresencia, 
    getAsistenciasAusencia,
    getResumenAsistencias,
    getPorcentajeAsistencias,
    getAsistenciasPorMes, 
    getResumenAsistenciasPorcentaje,
    TablaAsistencias
} from "../controllers/asistencias.controller.js";
import express from 'express';
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteAsistencia);
// router.get("/asistencias/:estudiateId", getAsistenciasByStudent);
router.get("/tardanzas/:IdEstudiante", getAsistenciasTardanza);
router.get("/presencia/:IdEstudiante", getAsistenciasPresencia);
router.get("/ausencia/:IdEstudiante", getAsistenciasAusencia);
router.get("/resumen/:id", getResumenAsistencias);
router.get("/porcentaje/:id", getPorcentajeAsistencias);
router.get("/porMes/:id", getAsistenciasPorMes);
router.get("/resumenPorcentaje/:id", getResumenAsistenciasPorcentaje);
router.get("/tablaAsistencias/:id", TablaAsistencias);

export default router;