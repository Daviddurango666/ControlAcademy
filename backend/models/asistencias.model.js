import db from '../config/db.js';

export const Asistencias = {

    getAll: async () => {
        const [rows] = await db.query("SELECT * FROM asistencias");
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query("SELECT * FROM asistencias WHERE id = ?", [id]);
        return rows[0];
    },

    create: async ({estudiante_id, materia_id, estado, observaciones}) => {
        const [result] = await db.query('INSERT INTO asistencias (estudiante_id, materia_id, fecha, estado, observaciones) VALUES (?, ?, NOW(), ?, ?)', [estudiante_id, materia_id, estado, observaciones]);
        return { id: result.insertId, estudiante_id, materia_id, estado, observaciones, fecha: new Date()};
    },

    update: async (id, {estudiante_id, materia_id, fecha, estado}) => {
        await db.query('UPDATE asistencias SET estudiante_id = ?, materia_id = ?, fecha = ?, estado = ? WHERE id = ?', [estudiante_id, materia_id, fecha, estado, id]);
            return { id, estudiante_id, materia_id, fecha, estado};
    },

    delete: async (id) => {
        await db.query('DELETE FROM asistencias WHERE id = ?', [id]);
        return {message : 'Asistencia Eliminada Correctamente'};
    },

    getAsistenciasTardanza: async (estudiante_id) => {
        const [rows] = await db.query("SELECT COUNT(*) AS 'Tardanzas' FROM asistencias a INNER JOIN estudiantes e ON a.estudiante_id = e.IdAlumno INNER JOIN usuarios u ON e.usuario_id = u.id WHERE u.id = ? AND estado = 'tarde';", [estudiante_id]);
        return rows[0];
    },

    getAsistenciasPresencia: async (estudiante_id) => {
        const [rows] = await db.query("SELECT COUNT(*) AS 'Presencias' FROM asistencias a INNER JOIN estudiantes e ON a.estudiante_id = e.IdAlumno INNER JOIN usuarios u ON e.usuario_id = u.id WHERE u.id = ? AND a.estado = 'presente';", [estudiante_id]);
        return rows[0];
    },

    getAsistenciasAusencia: async (estudiante_id) => {
        const [rows] = await db.query("SELECT COUNT(*) AS 'Ausencias' FROM asistencias a INNER JOIN estudiantes e ON a.estudiante_id = e.IdAlumno INNER JOIN usuarios u ON e.usuario_id = u.id WHERE u.id = ? AND estado = 'Ausente';", [estudiante_id]);
        return rows[0];
    },

    getResumenAsistencias: async (estudiante_id) => {
        const [rows] = await db.query(`
            SELECT 
            n.periodo,
            SUM(CASE WHEN a.estado = 'presente' THEN 1 ELSE 0 END) AS presente,
            SUM(CASE WHEN a.estado = 'ausente' THEN 1 ELSE 0 END) AS ausente,
            SUM(CASE WHEN a.estado = 'tarde' THEN 1 ELSE 0 END) AS tarde
            FROM asistencias a
            INNER JOIN estudiantes es ON a.estudiante_id = es.IdAlumno
            INNER JOIN notas n ON es.IdAlumno = n.estudiante_id
            WHERE es.usuario_id = ?
            GROUP BY n.periodo
            ORDER BY n.periodo ASC;`, 
            [estudiante_id]);
        return rows;
    },
    getPorcentajeAsistencias: async (estudiante_id) => {
        const [rows] = await db.query(`SELECT ROUND( (SUM(CASE WHEN a.estado IN ('presente', 'tarde') THEN 1 ELSE 0 END) / COUNT (a.estado)) * 100, 1) as porcentaje_asistencia FROM asistencias a INNER JOIN estudiantes es ON a.estudiante_id = es.IdAlumno WHERE es.usuario_id = ?`, [estudiante_id]);
        return rows[0].porcentaje_asistencia || 0;
    },
    getAsistenciasPorMes: async (id) => {
        const [rows] = await db.query(`SELECT 
                MONTH(a.fecha) AS mes,
                DATE_FORMAT(a.fecha, '%b') AS nombre_mes,
                SUM(CASE WHEN a.estado = 'presente' THEN 1 ELSE 0 END) AS presente,
                SUM(CASE WHEN a.estado = 'ausente' THEN 1 ELSE 0 END) AS ausente,
                SUM(CASE WHEN a.estado = 'tarde' THEN 1 ELSE 0 END) AS tardanza
            FROM asistencias a
            INNER JOIN estudiantes e ON a.estudiante_id = e.IdAlumno
            WHERE e.usuario_id = ?
            GROUP BY mes, nombre_mes
            ORDER BY mes`, [id]);
        return rows;
    },
    getResumenAsistenciasPorcentaje: async (usuario_id) => {
        const [rows] = await db.query(`
            SELECT 
                SUM(CASE WHEN a.estado = 'presente' THEN 1 ELSE 0 END) AS presente,
                SUM(CASE WHEN a.estado = 'ausente' THEN 1 ELSE 0 END) AS ausente,
                SUM(CASE WHEN a.estado = 'tarde' THEN 1 ELSE 0 END) AS tardanza,
                COUNT(*) AS total
            FROM asistencias a
            INNER JOIN estudiantes e ON a.estudiante_id = e.IdAlumno
            WHERE e.usuario_id = ?;
        `, [usuario_id]);
        return rows[0];
    },
    TablaAsistencias: async (id) => {
        const [rows] = await db.query(`
            SELECT 
                a.fecha as fecha, 
                a.estado as estado, 
                a.observaciones as observacion 
                FROM asistencias a 
                INNER JOIN estudiantes e ON a.estudiante_id = e.IdAlumno 
                INNER JOIN usuarios u ON e.usuario_id = u.id 
                WHERE u.id = ?;`, [id]);
        return rows;
    }

}