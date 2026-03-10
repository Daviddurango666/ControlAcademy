import db from '../config/db.js';

export const Docentes = {

    getAll: async () => {
        const [rows] = await db.query("SELECT * FROM docentes");
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query("SELECT * FROM docentes WHERE usuario_id = ?", [id]);
        return rows[0];
    },

    create: async ({usuario_id, especialidad}) => {
        const [result] = await db.query('INSERT INTO docentes (usuario_id, especialidad) VALUES (?, ?)', [usuario_id, especialidad]);
        return { id: result.insertId, usuario_id, especialidad };
    },

    update: async (id, {usuario_id, especialidad}) => {
        await db.query(`
            UPDATE docentes 
            SET usuario_id = ?, 
            especialidad = ? 
            WHERE usuario_id = ?`, 
            [usuario_id, especialidad, id]
        );
        return { id, usuario_id, especialidad};
    },

    delete: async (id) => {
        await db.query(`
            DELETE FROM docentes 
            WHERE usuario_id = ?`, 
            [id]);
        return {message : 'Docente Eliminado Correctamente'};
    },

    cantAsignaturas: async(id) => {
        const [rows] = await db.query(`
            SELECT COUNT(mat.id) as cantidad_asig 
            FROM docentes doc 
            INNER JOIN cursos cur ON doc.id = cur.docente_id 
            INNER JOIN materias mat ON cur.id = mat.curso_id 
            WHERE doc.usuario_id = ?`, 
            [id]);
        return rows;
    },

    cantEstudiantes: async (id) => {
        const [rows] = await db.query(`SELECT COUNT(DISTINCT e.IdAlumno) AS totalEstudiantes
            FROM docentes d
            INNER JOIN usuarios u ON d.usuario_id = u.id
            INNER JOIN cursos cr ON d.id = cr.docente_id
            INNER JOIN materias mat ON cr.id = mat.curso_id
            INNER JOIN notas n ON mat.id = n.materia_id
            INNER JOIN estudiantes e ON n.estudiante_id = e.IdAlumno
            WHERE d.usuario_id = ?`, 
            [id]);
        return rows;
    },

    virtualClass: async (id) => {
        const [rows] = await db.query(`
            SELECT COUNT(m.clase_virtual) as totalVirtual 
            FROM docentes d 
            INNER JOIN cursos c ON D.id = c.docente_id 
            INNER JOIN materias m ON c.id = m.curso_id 
            WHERE d.usuario_id = ? and m.clase_virtual = TRUE;`
            , [id]);
        return rows;
    },

    top10asistencias: async(id) => {
        const [rows] = await db.query(`
            SELECT 
            u.id as idEstudiante, 
            u.nombre as NombreEstudiante, 
            DATE(a.fecha) as fechaAsistencia, 
            a.estado as estadoAsistencia 
            FROM docentes d 
            INNER JOIN cursos c ON c.docente_id = d.id 
            INNER JOIN materias m ON m.curso_id = c.id 
            INNER JOIN asistencias a ON a.materia_id = m.id 
            INNER JOIN estudiantes e ON a.estudiante_id = e.IdAlumno 
            INNER JOIN usuarios u ON e.usuario_id = u.id 
            WHERE d.usuario_id = ? 
            ORDER BY a.fecha DESC 
            LIMIT 10`, [id]);
        return rows;
    }, 
    estudiantesDestacados: async(id) => {
        const [rows] = await db.query(`SELECT COUNT(*) AS destacados FROM ( SELECT e.IdAlumno, AVG(n.nota) AS promedio FROM estudiantes e INNER JOIN notas n ON e.IdAlumno = n.estudiante_id INNER JOIN materias m ON n.materia_id = m.id INNER JOIN cursos c ON m.curso_id = c.id INNER JOIN docentes d ON c.docente_id = d.id WHERE d.usuario_id = ? GROUP BY e.IdAlumno HAVING AVG(n.nota) >= 4.0 ) AS subconsulta;`, [id]);
        return rows[0];
    },
    EstuReqAtencion: async(id) => {
        const [rows] = await db.query(`
            SELECT COUNT(*) AS requieren_atencion
            FROM (
            SELECT 
                e.IdAlumno,
                AVG(n.nota) AS promedio
            FROM estudiantes e
            INNER JOIN notas n ON e.IdAlumno = n.estudiante_id
            INNER JOIN materias m ON n.materia_id = m.id
            INNER JOIN cursos c ON m.curso_id = c.id
            INNER JOIN docentes d ON c.docente_id = d.id
            WHERE d.usuario_id = ?
            GROUP BY e.IdAlumno
            HAVING AVG(n.nota) < 3.0
            ) AS subconsulta;`, [id]);
        return rows[0];
    },
    tablaReqAtencion: async(id) => {
        const [rows] = await db.query(`
            SELECT 
            u.id,
            u.nombre,
            e.grado, e.grupo,
            ROUND(AVG(n.nota), 2) AS promedio
            FROM estudiantes e
            INNER JOIN notas n ON e.IdAlumno = n.estudiante_id
            INNER JOIN materias m ON n.materia_id = m.id
            INNER JOIN cursos c ON m.curso_id = c.id
            INNER JOIN docentes d ON c.docente_id = d.id
            INNER JOIN usuarios u ON e.usuario_id = u.id
            WHERE d.usuario_id = ?
            GROUP BY u.id, u.nombre, e.grado, e.grupo
            HAVING AVG(n.nota) < 3.0
            ORDER BY promedio ASC;`, [id]);
        return rows;
    },
    tablaEstDestacados: async(id) => {
        const [rows] = await db.query(`
            SELECT 
            u.id,
            u.nombre,
            e.grado, e.grupo,
            ROUND(AVG(n.nota), 2) AS promedio
            FROM estudiantes e
            INNER JOIN notas n ON e.IdAlumno = n.estudiante_id
            INNER JOIN materias m ON n.materia_id = m.id
            INNER JOIN cursos c ON m.curso_id = c.id
            INNER JOIN docentes d ON c.docente_id = d.id
            INNER JOIN usuarios u ON e.usuario_id = u.id
            WHERE d.usuario_id = ?
            GROUP BY u.id, u.nombre, e.grado, e.grupo
            HAVING AVG(n.nota) >= 4.0
            ORDER BY promedio ASC;`, [id]);
        return rows;
    },
    getGradosPorDocente: async (idDocente) => {
        const [rows] = await db.query(`
        SELECT DISTINCT e.grado
        FROM cursos c
        INNER JOIN materias m ON c.id = m.curso_id
        INNER JOIN notas n ON m.id = n.materia_id
        INNER JOIN estudiantes e ON e.IdAlumno = n.estudiante_id
        INNER JOIN docentes d ON c.docente_id = d.id
        WHERE d.usuario_id = ?
        ORDER BY e.grado ASC
        `, [idDocente]);
        return rows;
    },

    getMateriasPorGrado: async (idDocente, grado) => {
        const [rows] = await db.query(`
        SELECT DISTINCT m.id, m.nombre
        FROM materias m
        INNER JOIN cursos c ON m.curso_id = c.id
        INNER JOIN estudiantes e ON e.grado = ?
        INNER JOIN docentes d ON c.docente_id = d.id
        WHERE d.usuario_id = ?
        ORDER BY m.nombre ASC
        `, [grado, idDocente]);
        return rows;
    },

    getNotasPorFiltro: async (idDocente, grado, materiaId) => {
        const [rows] = await db.query(`
        SELECT 
            e.IdAlumno AS id_alumno,
            u.nombre AS estudiante,
            e.grado,
            m.nombre AS materia,
            n.nota
        FROM notas n
        INNER JOIN materias m ON n.materia_id = m.id
        INNER JOIN cursos c ON m.curso_id = c.id
        INNER JOIN estudiantes e ON e.IdAlumno = n.estudiante_id
        INNER JOIN usuarios u ON e.usuario_id = u.id
        INNER JOIN docentes d ON c.docente_id = d.id
        WHERE d.usuario_id = ? AND e.grado = ? AND m.id = ?
        `, [idDocente, grado, materiaId]);
        return rows;
    },
    rankingEstudiantes: async (id) => {
        const [rows] = await db.query(`
            SELECT 
            u.nombre AS estudiante, 
            e.grado, 
            e.grupo, 
            m.nombre AS materia, 
            ROUND(AVG(n.nota), 2) AS promedio
            FROM estudiantes e
            INNER JOIN notas n ON e.IdAlumno = n.estudiante_id
            INNER JOIN materias m ON n.materia_id = m.id
            INNER JOIN cursos c ON m.curso_id = c.id
            INNER JOIN docentes d ON c.docente_id = d.id
            INNER JOIN usuarios u ON e.usuario_id = u.id
            WHERE u.id = ?
            GROUP BY u.nombre, e.grado, e.grupo, m.nombre
            HAVING promedio >= 4.5
            ORDER BY promedio DESC;`, [id])
        return rows;
    }, 
    obtenerAsistencias: async (idDocente, grado, materia) => {
  const [rows] = await db.query(`
    SELECT 
      a.id AS id_asistencia,
      e.IdAlumno AS id_alumno,
      u.nombre AS estudiante,
      e.grado,
      m.id as id_materia,
      m.nombre AS materia,
      DATE_FORMAT(a.fecha, '%Y-%m-%d') AS fecha,
      a.estado
    FROM asistencias a
    INNER JOIN estudiantes e ON e.IdAlumno = a.estudiante_id
    INNER JOIN usuarios u ON e.usuario_id = u.id
    INNER JOIN materias m ON a.materia_id = m.id
    INNER JOIN cursos c ON m.curso_id = c.id
    INNER JOIN docentes d ON c.docente_id = d.id
    WHERE d.usuario_id = ? AND e.grado = ? AND m.id = ?
    ORDER BY a.fecha DESC;
  `, [idDocente, grado, materia]);
  return rows;
},

actualizarAsistencia: async (idAsistencia, estado) => {
  const [result] = await db.query(
    `UPDATE asistencias SET estado = ? WHERE id = ?`,
    [estado, idAsistencia]
  );
  return result;
},
}
