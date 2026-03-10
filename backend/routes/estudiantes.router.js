import { getAll, getById, create, update, deleteEstudiante, ranking, mejoras, tablaranking } from "../controllers/estudiantes.controller.js";
import express from 'express';
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteEstudiante);
router.get("/ranking/:id", ranking);
router.get("/mejoras/:id", mejoras);
router.get("/tablaRanking/:id", tablaranking);

export default router;