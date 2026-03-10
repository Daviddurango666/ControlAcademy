import { Estudiantes } from "../models/estudiantes.model.js";

// funciona bien
export const getAll = async (req, res) => {
    const estudiante = await Estudiantes.getAll();
    estudiante ? res.json(estudiante) : res.status(404).json({message: 'No Found'});
};

// funciona bien - id_estudiante
export const getById = async (req, res) => {
    const estudiante = await Estudiantes.getById(req.params.id);
    estudiante ? res.json(estudiante) : res.status(404).json( { message: 'No found'});
};

// no creo que sirva, el estudiante se crea cuando se crea el usuario (rol) 
export const create = async (req, res) => {
    const estudiante = await Estudiantes.create(req.body);
    res.status(201).json(estudiante);
};

// funciona bien - id_estudiante
export const update = async (req, res) => {
    const estudiante = await Estudiantes.update(req.params.id, req.body);
    estudiante ? res.json(estudiante) : res.status(404).json( {message: 'No found'});
};

// funciona bien
export const deleteEstudiante = async (req, res) => {
    const result = await Estudiantes.delete(req.params.id);
    res.json(result);
};

export const ranking = async (req, res) => {
    try {
        const {id} = req.params;
        const ranking = await Estudiantes.ranking(id);
        res.status(200).json(ranking);
    } catch(error) {
        console.log("error al obtener el ranking: ", error.message);
        res.status(500).json({message: "error al obtener el ranking"});
    }
}

export const mejoras = async (req, res) => {
    try {
        const {id} = req.params;
        const mejoras = await Estudiantes.mejoras(id);
        res.status(200).json(mejoras);
    } catch(error) {
        console.log("error al obtener las mejoras: ", error.message);
        res.status(500).json({message: "error al obtener las mejoras"});
    }
}

export const tablaranking = async (req, res) => {
    try {
        const {id} = req.params;
        const tablaranking = await Estudiantes.tablaranking(id);
        res.status(200).json(tablaranking[0]);
    }catch(error) {
        console.log("error al obtener la tabla ranking: ", error.message);
        res.status(500).json({message: "error al obtener la tabla ranking"});
    }
}
