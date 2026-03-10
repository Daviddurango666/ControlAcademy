import { Cursos } from "../models/cursos.model.js";

// funciona bien
export const getAll = async (req, res) => {
    const cursos = await Cursos.getAll();
    cursos ? res.json(cursos) : res.status(404).json({message: 'No Found'});
};

// funciona bien - id_curso
export const getById = async (req, res) => {
    const curso = await Cursos.getById(req.params.id);
    curso ? res.json(curso) : res.status(404).json( { message: 'No found'});
};

// funciona bien
export const create = async (req, res) => {
    const curso = await Cursos.create(req.body);
    res.status(201).json(curso);
};

// funciona bien - id_curso
export const update = async (req, res) => {
    const curso = await Cursos.update(req.params.id, req.body);
    curso ? res.json(curso) : res.status(404).json( {message: 'No found'});
};

// funciona bien - id_curso
export const deleteCurso = async (req, res) => {
    const result = await Cursos.delete(req.params.id);
    res.json(result);
};
