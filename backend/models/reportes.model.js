import db from "../config/db.js";

export const Reportes = {
  // 🔹 Obtener todos los reportes de un docente filtrando por grado y materia
  getByDocente: async (docente_id, grado, materia_id) => {
    const [rows] = await db.query(
      `
        SELECT 
            r.id_reporte AS id_reporte,
            e.IdAlumno AS id_alumno,
            u.nombre AS estudiante,
            e.grado,
            m.nombre AS materia,
            r.fecha,
            r.tipo,
            r.descripcion
        FROM reportes r
        INNER JOIN estudiantes e ON r.estudiante_id = e.IdAlumno
        INNER JOIN usuarios u ON e.usuario_id = u.id
        INNER JOIN materias m ON r.materia_id = m.id
        INNER JOIN cursos c ON m.curso_id = c.id
        INNER JOIN docentes d ON c.docente_id = d.id
        WHERE d.usuario_id = ? 
            AND e.grado = ?
            AND m.id = ?
        ORDER BY r.fecha DESC
      `,
      [docente_id, grado, materia_id]
    );
    return rows;
  },

  // 🔹 Crear reporte
  create: async ({ estudiante_id, materia_id, tipo, descripcion }) => {
    const [result] = await db.query(
      `INSERT INTO reportes (estudiante_id, materia_id, fecha, tipo, descripcion)
       VALUES (?, ?, NOW(), ?, ?)`,
      [estudiante_id, materia_id, tipo, descripcion]
    );
    return { id: result.insertId };
  },

  // 🔹 Actualizar reporte
  update: async (id, { tipo, descripcion }) => {
    await db.query(
      `UPDATE reportes SET tipo = ?, descripcion = ? WHERE id = ?`,
      [tipo, descripcion, id]
    );
    return { id, tipo, descripcion };
  },

  // 🔹 Eliminar reporte
  delete: async (id) => {
    await db.query(`DELETE FROM reportes WHERE id = ?`, [id]);
    return { id };
  },
};
