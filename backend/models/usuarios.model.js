import db from "../config/db.js";

export const usuarios = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM usuarios");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
  },

  create: async ({nombre, email, password, rol}) => {
    const [result] = await db.query(
      "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
      [nombre, email, password, rol]
    );
    return { id: result.insertId, nombre, email, password, rol };
  },

  update: async (id, { nombre, email, password, rol }) => {
    await db.query(
      "UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol = ? WHERE id = ?",
      [nombre, email, password, rol, id]
    );
    return { id, nombre, email, password, rol };
  },

  delete: async (id) => {
    await db.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return { message: "Usuario eliminado" };
  },

  getByIdAndPassword: async (id, password) => {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE id = ? AND password = ?", [id, password]);
    return rows[0];
  },
}; 
