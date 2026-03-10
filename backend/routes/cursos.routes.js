import { getAll, getById, create, update, deleteCurso } from "../controllers/cursos.controller.js";
import express from 'express';
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteCurso);

export default router;