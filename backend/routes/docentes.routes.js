import { 
    getAll, 
    getById,
    create, 
    update, 
    deleteDocente, 
    cantAsignaturas, 
    cantEstudiantes,
    virtualClass,
    top10asistencias,
    estudiantesDestacados,
    EstuReqAtencion,
    tablaReqAtencion,
    tablaEstDestacados,
    notas,
    gradosGrupos,
    materiasPorGrado,
    obtenerAsistencias,
    actualizarAsistencia,
    // actualizarNota
} from "../controllers/docentes.controller.js";
import express from 'express';
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteDocente);
router.get("/cantAsig/:id", cantAsignaturas);
router.get("/cantEstudiantes/:id", cantEstudiantes);
router.get("/virtualClass/:id", virtualClass);
router.get("/tablaAsistencia/:id", top10asistencias);
router.get("/estudiantesDestacados/:id", estudiantesDestacados);
router.get("/estudiantesReqAtencion/:id", EstuReqAtencion);
router.get("/tablaReqAtencion/:id", tablaReqAtencion);
router.get("/tablaEstDestacados/:id", tablaEstDestacados);
router.get("/grados/:id", gradosGrupos);
router.get("/materias/:id", materiasPorGrado);
router.get("/notas/:id", notas);
router.get("/asistencias/:id", obtenerAsistencias);
router.put("/asistencias/:id", actualizarAsistencia);
// router.put("/notas/:id", actualizarNota);
export default router;