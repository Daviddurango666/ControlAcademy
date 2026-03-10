import db from '../config/db.js';

export const Estudiantes = {

    getAll: async () => {
        const [rows] = await db.query("SELECT * FROM estudiantes");
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query("SELECT * FROM estudiantes WHERE idAlumno = ?", [id]);
        return rows[0];
    },

    create: async ({usuario_id, grado, grupo}) => {
        const [result] = await db.query('INSERT INTO estudiantes (usuario_id, grado, grupo) VALUES (?, ?, ?)', [usuario_id, grado, grupo]);
        return { id: result.insertId, usuario_id, grado, grupo };
    },

    update: async (idAlumno, {usuario_id, grado, grupo}) => {
        await db.query('UPDATE estudiantes SET usuario_id = ?, grado = ?, grupo = ? WHERE idAlumno = ?', [usuario_id, grado, grupo, idAlumno]);
            return { idAlumno, usuario_id, grado, grupo};
    },

    delete: async (id) => {
        await db.query('DELETE FROM estudiantes WHERE idAlumno = ?', [id]);
        return {message : 'Estudiante Eliminado Correctamente'};
    },
    ranking: async(id) => {
        const [rows] = await db.query(`SELECT ranking FROM ( SELECT e.IdAlumno, e.usuario_id, AVG(n.nota) AS promedio, RANK() OVER (ORDER BY AVG(n.nota) DESC) AS ranking FROM estudiantes e INNER JOIN notas n ON e.IdAlumno = n.estudiante_id GROUP BY e.IdAlumno, e.usuario_id ) AS subconsulta WHERE subconsulta.usuario_id = ?`, [id]);
        return rows[0];
    },
    mejoras: async (id) => {
        const [rows] = await db.query(`SELECT 
                e.usuario_id,
                COUNT(m.id) AS mejorar, 
                AVG(n.nota) AS promedio
                FROM materias m 
                INNER JOIN notas n ON m.id = n.materia_id 
                INNER JOIN estudiantes e ON n.estudiante_id = e.IdAlumno
                WHERE e.usuario_id = 1038927151
                GROUP BY e.usuario_id
                HAVING AVG(n.nota) < 3.0;`, [id]);
        return rows[0] || 0;
    },
    tablaranking: async(id) => {
        const [rows] = await db.query(`
            SELECT 
            u.id,
            u.nombre,
            e.grado,
            e.grupo,
            ROUND(AVG(n.nota), 2) AS promedio,
            RANK() OVER (
                PARTITION BY e.grado, e.grupo
                ORDER BY AVG(n.nota) DESC
            ) AS ranking_grupo
            FROM estudiantes e
            INNER JOIN notas n ON e.IdAlumno = n.estudiante_id
            INNER JOIN usuarios u ON e.usuario_id = u.id
            WHERE e.grado = (
                SELECT grado FROM estudiantes WHERE usuario_id = ?
            ) AND e.grupo = (
                SELECT grupo FROM estudiantes WHERE usuario_id = ?
            )
            GROUP BY u.id, u.nombre, e.grado, e.grupo
            ORDER BY ranking_grupo;`, [id]);
        return rows;
    }
}