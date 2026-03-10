import db from '../config/db.js';

export const Materias = {

    getAll: async () => {
        const [rows] = await db.query("SELECT * FROM materias");
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query("SELECT * FROM materias WHERE id = ?", [id]);
        return rows[0];
    },

    create: async ({nombre, curso_id, clase_virtual}) => {
        const [result] = await db.query('INSERT INTO materias (nombre, curso_id, clase_virtual) VALUES (?, ?, ?)', [nombre, curso_id, clase_virtual]);
        return { id: result.insertId, nombre, curso_id, clase_virtual};
    },

    update: async (id, {nombre, curso_id, clase_virtual}) => {
        await db.query(`UPDATE materias 
            SET nombre = ?, 
            curso_id = ?, 
            clase_virtual = ? 
            WHERE id = ?`, 
            [nombre, curso_id, clase_virtual, id]
        );
            return { id, nombre, curso_id, clase_virtual};
    },

    delete: async (id) => {
        await db.query('DELETE FROM materias WHERE id = ?', [id]);
        return {message : 'Materia Eliminada Correctamente'};
    },

    cantMateriasDestacadas: async (id) => {
        const [rows] = await db.query("SELECT COUNT(*) AS cantidad FROM materias m INNER JOIN notas n ON m.id = n.materia_id INNER JOIN estudiantes es ON n.estudiante_id = es.IdAlumno INNER JOIN usuarios u ON es.usuario_id = u.id WHERE u.id = ? HAVING AVG(n.nota) > 3.5 ", [id]);
        return rows;
    },

    cantMaterias: async (id) => {
        const [rows] = await db.query("SELECT COUNT(*) AS cantidad FROM materias m INNER JOIN notas n ON m.id = n.materia_id INNER JOIN estudiantes es ON n.estudiante_id = es.IdAlumno INNER JOIN usuarios u ON es.usuario_id = u.id WHERE u.id = ?", [id]);
        return rows;
    },

    rendimiento: async (id) => {
        const [rows] = await db.query(`SELECT 
                m.nombre AS materia,
                u.nombre AS estudiante,
                du.nombre AS docente,
                ROUND(AVG(n.nota), 1) AS promedio
                FROM materias m
                INNER JOIN notas n ON m.id = n.materia_id
                INNER JOIN estudiantes e ON n.estudiante_id = e.IdAlumno
                INNER JOIN usuarios u ON e.usuario_id = u.id
                INNER JOIN cursos c ON m.curso_id = c.id
                INNER JOIN docentes d ON c.docente_id = d.id
                INNER JOIN usuarios du ON d.usuario_id = du.id
                WHERE u.id = ?
                GROUP BY m.nombre, u.nombre, du.nombre;`, [id])
        return rows;
    },

    materiasDetalle: async (id) => {
        const [rows] = await db.query(`
            SELECT 
                m.nombre ,
                n.nota as calificacion, 
                n.fecha_nota, 
                AVG(n.nota) as promedio, 
                ROUND((AVG(n.nota) / 5) * 100, 1) AS porcentaje 
                FROM notas n 
                INNER JOIN materias m ON n.materia_id = m.id 
                INNER JOIN estudiantes e ON n.estudiante_id = e.IdAlumno 
                WHERE e.usuario_id = ? 
                GROUP BY m.id, m.nombre ORDER BY m.nombre ;`, [id]);
        return rows;
    }
}