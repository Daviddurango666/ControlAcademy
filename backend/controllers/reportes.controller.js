import { Reportes } from "../models/reportes.model.js";

export const getByDocente = async (req, res) => {
  try {
    const { id } = req.params;
    const { grado, materia } = req.query;
    const data = await Reportes.getByDocente(id, grado, materia);
    res.json(data);
  } catch (error) {
    console.error("❌ Error al obtener reportes:", error);
    res.status(500).json({ error: "Error al obtener reportes" });
  }
};

export const create = async (req, res) => {
  try {
    const nuevo = await Reportes.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("❌ Error al crear reporte:", error);
    res.status(500).json({ error: "Error al crear reporte" });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await Reportes.update(id, req.body);
    res.json(actualizado);
  } catch (error) {
    console.error("❌ Error al actualizar reporte:", error);
    res.status(500).json({ error: "Error al actualizar reporte" });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Reportes.delete(id);
    res.json({ message: "Reporte eliminado" });
  } catch (error) {
    console.error("❌ Error al eliminar reporte:", error);
    res.status(500).json({ error: "Error al eliminar reporte" });
  }
};
