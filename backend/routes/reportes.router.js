import express from "express";
import { getByDocente, create, update, remove } from "../controllers/reportes.controller.js";

const router = express.Router();

router.get("/docente/:id", getByDocente);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
