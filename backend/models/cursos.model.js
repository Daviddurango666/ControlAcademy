import db from '../config/db.js';

export const Cursos = {

    getAll: async () => {
        const [rows] = await db.query("SELECT * FROM cursos");
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query("SELECT * FROM cursos WHERE id = ?", [id]);
        return rows[0];
    },

    create: async ({nombre, descripcion, docente_id}) => {
        const [result] = await db.query('INSERT INTO cursos (nombre, descripcion, docente_id) VALUES (?, ?, ?)', [nombre, descripcion, docente_id]);
        return { id: result.insertId, nombre, descripcion, docente_id};
    },

    update: async (id, {nombre, descripcion, docente_id}) => {
        await db.query('UPDATE cursos SET nombre = ?, descripcion = ?, docente_id = ? WHERE id = ?', [nombre, descripcion, docente_id, id]);
            return { id, nombre, descripcion, docente_id};
    },

    delete: async (id) => {
        await db.query('DELETE FROM cursos WHERE id = ?', [id]);
        return {message : 'Curso Eliminado Correctamente'};
    },
}