import { getAll, getById, create, update, deleteUsuario, login } from "../controllers/usuarios.controllers.js";
import express from 'express';
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.post("/login", login);
router.put("/:id", update);
router.delete("/:id", deleteUsuario);

export default router;