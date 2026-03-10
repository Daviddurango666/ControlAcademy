import db from '../config/db.js';

export const notas = {

    getByDocente: async (docente_id, grado, materia_id) => {
        const [rows] = await db.query(`
            SELECT 
            n.id,
            e.idAlumno AS id_alumno,
            u.nombre AS estudiante,
            e.grado,
            m.nombre AS materia,
            n.nota,
            n.periodo,
            n.fecha_nota,
            n.evaluacion,
            n.porcentaje
            FROM notas n
            INNER JOIN estudiantes e ON n.estudiante_id = e.IdAlumno
            INNER JOIN materias m ON n.materia_id = m.id
            INNER JOIN cursos c ON m.curso_id = c.id
            INNER JOIN docentes d ON c.docente_id = d.id
            INNER JOIN usuarios u ON e.usuario_id = u.id
            WHERE d.usuario_id = ?
            AND e.grado = ?
            AND m.id = ?;
        `, [docente_id, grado, materia_id]);

        return rows;
    },

    // Crear una nueva nota
    create: async ({
        estudiante_id,
        materia_id,
        nota,
        periodo,
        fecha_nota,
        evaluacion,
        porcentaje,
    }) => {
        const [result] = await db.query(
        `
        INSERT INTO notas (estudiante_id, materia_id, nota, periodo, fecha_nota, evaluacion, porcentaje)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
            estudiante_id,
            materia_id,
            nota,
            periodo,
            fecha_nota,
            evaluacion,
            porcentaje,
        ]
        );
        return { id: result.insertId, estudiante_id, materia_id, nota, periodo, fecha_nota, evaluacion, porcentaje };
    },

    // Actualizar una nota
    update: async (id, { nota, periodo, fecha_nota, evaluacion, porcentaje }) => {
        await db.query(
        `
        UPDATE notas 
        SET nota = ?, periodo = ?, fecha_nota = ?, evaluacion = ?, porcentaje = ?
        WHERE id = ?
        `,
        [nota, periodo, fecha_nota, evaluacion, porcentaje, id]
        );
        return { id, nota, periodo, fecha_nota, evaluacion, porcentaje };
    },

    // Eliminar una nota
    delete: async (id) => {
        await db.query(`DELETE FROM notas WHERE id = ?`, [id]);
        return { message: "Nota eliminada correctamente" };
    },

    promedio: async (id) => {
        const [rows] = await db.query("SELECT AVG(nota) AS promedio FROM notas INNER JOIN estudiantes ON notas.estudiante_id = estudiantes.IdAlumno INNER JOIN usuarios ON estudiantes.usuario_id = usuarios.id WHERE usuarios.id= ?", [id]);
        return rows[0];
    },

    porcentajeNotas: async(estudiante_id) => {
        const [rows] = await db.query(`SELECT 
            ROUND((AVG(n.nota) / 5) * 100, 1) AS porcentaje_notas
        FROM notas n
        INNER JOIN estudiantes es ON n.estudiante_id = es.IdAlumno
        WHERE es.usuario_id = ?`, [estudiante_id]);
        return rows[0].porcentaje_notas || 0;
    },
    evaluacionesAprobadas: async (estudiante_id) => {
        const [rows] = await db.query(`SELECT COUNT(*) AS evaluaciones_aprobadas
        FROM notas n
        INNER JOIN estudiantes es ON n.estudiante_id = es.IdAlumno
        WHERE es.usuario_id = ? AND n.nota >= 3.0;`, [estudiante_id]);
        return rows[0];
    },

    totalexamenes : async (estudiante_id) => {
        const [rows] = await db.query(`SELECT COUNT(n.nota) as total_examenes FROM notas n INNER JOIN estudiantes e ON n.estudiante_id = e.IdAlumno WHERE e.usuario_id = ?;`, [estudiante_id]);
        return rows[0];
    },

    getTendenciasNotas: async (id) => {
        const [rows] = await db.query(`SELECT n.periodo, m.nombre as materia, AVG(n.nota) as promedio FROM notas n INNER JOIN estudiantes e ON n.estudiante_id = e.IdAlumno INNER JOIN materias m ON n.materia_id = m.id WHERE e.usuario_id = ? GROUP BY n.periodo, m.nombre ORDER BY n.periodo ASC;`, [id]);
        return rows;
    },
    tablaEvaluaciones: async (id) => {
        const [rows] = await db.query(`SELECT m.nombre as materia, n.evaluacion, n.fecha_nota, n.porcentaje, n.nota FROM notas n INNER JOIN materias m ON n.materia_id = m.id INNER JOIN estudiantes e ON n.estudiante_id = e.IdAlumno WHERE e.usuario_id = ?;`, [id]);
        return rows;
    },

    getNotasPorGrupoYMateria: async (grupo_id, materia_id) => {
        const [rows] = await db.query(
        `SELECT 
            e.IdAlumno AS id_estudiante,
            CONCAT(e.nombres, ' ', e.apellidos) AS estudiante,
            g.nombre AS grupo,
            m.nombre AS materia,
            n.nota AS calificacion
            FROM notas n
            INNER JOIN estudiantes e ON n.estudiante_id = e.IdAlumno
            INNER JOIN grupos g ON e.grupo_id = g.id
            INNER JOIN materias m ON n.materia_id = m.id
            WHERE g.id = ? AND m.id = ?
            ORDER BY e.apellidos, e.nombres`,
        [grupo_id, materia_id]
        );
        return rows;
    },

    // Promedio general del grupo
    getPromedioGrupo: async (grupo_id, materia_id) => {
        const [rows] = await db.query(
        `SELECT ROUND(AVG(n.nota), 2) AS promedio
        FROM notas n
        INNER JOIN estudiantes e ON n.estudiante_id = e.IdAlumno
        WHERE e.grupo_id = ? AND n.materia_id = ?`,
        [grupo_id, materia_id]
        );
        return rows[0];
    },

    // Nota más alta
    getNotaMasAlta: async (grupo_id, materia_id) => {
        const [rows] = await db.query(
        `SELECT MAX(n.nota) AS nota_alta
        FROM notas n
        INNER JOIN estudiantes e ON n.estudiante_id = e.IdAlumno
        WHERE e.grupo_id = ? AND n.materia_id = ?`,
        [grupo_id, materia_id]
        );
        return rows[0];
    },

    // Contar aprobados y reprobados
    getConteoAprobados: async (grupo_id, materia_id) => {
        const [rows] = await db.query(
        `SELECT 
            SUM(CASE WHEN n.nota >= 3 THEN 1 ELSE 0 END) AS aprobados,
            SUM(CASE WHEN n.nota < 3 THEN 1 ELSE 0 END) AS reprobados
        FROM notas n
        INNER JOIN estudiantes e ON n.estudiante_id = e.IdAlumno
        WHERE e.grupo_id = ? AND n.materia_id = ?`,
        [grupo_id, materia_id]
        );
        return rows[0];
    },
    ComparativoPeriodos: async(id) => {
        const [rows] = await db.query(`
            SELECT n.periodo, 
            ROUND(AVG(n.nota), 2) AS promedioNotas, 
            SUM(CASE WHEN n.nota >= 3 THEN 1 ELSE 0 END) AS CantAprobadas, 
            SUM(CASE WHEN n.nota < 3 THEN 1 ELSE 0 END) AS CantRiesgo 
            FROM notas n 
            INNER JOIN materias m ON n.materia_id = m.id 
            INNER JOIN estudiantes e ON n.estudiante_id = e.IdAlumno 
            WHERE e.usuario_id = ? 
            GROUP BY n.periodo 
            ORDER BY n.periodo;`,[id]);
        return rows;
    },
    evolucion: async(id) => {
        const [rows] = await db.query(`
            SELECT n.periodo, 
            ROUND(AVG(n.nota), 2) AS promedioNotas
            FROM notas n 
            INNER JOIN materias m ON n.materia_id = m.id 
            INNER JOIN estudiantes e ON n.estudiante_id = e.IdAlumno 
            WHERE e.usuario_id = ?
            GROUP BY n.periodo 
            ORDER BY n.periodo;`, [id]);
        return rows;
    }, 

    distribucionCalificaciones: async (id) => {
        const [rows] = await db.query(`
            SELECT
            n.periodo,
            SUM(CASE WHEN n.nota >= 4.1 THEN 1 ELSE 0 END) AS CantAprobadas, 
            SUM(CASE WHEN n.nota >= 3 AND n.nota < 4.1 THEN 1 ELSE 0 END) AS CantRiesgo,
            SUM(CASE WHEN n.nota < 3 THEN 1 ELSE 0 END) AS CantReprobadas
            FROM notas n
            INNER JOIN materias m ON n.materia_id = m.id
            INNER JOIN estudiantes e ON n.estudiante_id = e.IdAlumno
            WHERE e.usuario_id = 1038927151
            AND n.periodo = 1
            GROUP BY n.periodo
            ORDER BY n.periodo;`, [id]);
        return rows;
    },
    // getByDocente: async (docente_id, grado, materia_id) => {
    //     const [rows] = await db.query(
    //     `
    //     SELECT 
    //         n.id AS id_nota,
    //         e.IdAlumno AS id_alumno,
    //         u.nombre AS estudiante,
    //         e.grado,
    //         m.nombre AS materia,
    //         n.nota
    //     FROM notas n
    //     INNER JOIN estudiantes e ON n.estudiante_id = e.IdAlumno
    //     INNER JOIN usuarios u ON e.usuario_id = u.id
    //     INNER JOIN materias m ON n.materia_id = m.id
    //     INNER JOIN cursos c ON m.curso_id = c.id
    //     INNER JOIN docentes d ON c.docente_id = d.id
    //     WHERE d.usuario_id = ? 
    //         AND e.grado = ?
    //         AND m.id = ?
    //     ORDER BY u.nombre
    //     `,
    //     [docente_id, grado, materia_id]
    //     );
    //     return rows;
    // },
}