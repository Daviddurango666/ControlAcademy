import { getAll, getById, create, update, deleteMateria, cantMateriasDestacadas, rendimiento, cantMaterias, materiasDetalle } from "../controllers/materias.controller.js";
import express from 'express';
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteMateria);
router.get("/destacadas/:id", cantMateriasDestacadas);
router.get("/cantidad/:id", cantMaterias);
router.get("/rendimiento/:id", rendimiento);
router.get("/detalle/:id", materiasDetalle);

export default router;