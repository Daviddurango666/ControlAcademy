import { Materias } from "../models/materias.model.js";

// funciona bien
export const getAll = async (req, res) => {
    const materias = await Materias.getAll();
    materias ? res.json(materias) : res.status(404).json({message: 'No Found'});
};

// funciona bien
export const getById = async (req, res) => {
    const materia = await Materias.getById(req.params.id);
    materia ? res.json(materia) : res.status(404).json( { message: 'No found'});
};

// funciona bien
export const create = async (req, res) => {
    const materia = await Materias.create(req.body);
    res.status(201).json(materia);
};

// funciona bien
export const update = async (req, res) => {
    const materia = await Materias.update(req.params.id, req.body);
    materia ? res.json(materia) : res.status(404).json( {message: 'No found'});
};

// funciona bien
export const deleteMateria = async (req, res) => {
    const result = await Materias.delete(req.params.id);
    res.json(result);
};

// funciona bien
export const cantMateriasDestacadas = async(req,res) => {
    try {
        const {id} = req.params;
        const cant = await Materias.cantMateriasDestacadas(id);

        if(cant.length > 0) {
            res.status(200).json(cant[0]);
        } else {
            res.status(404).json({message: "Quantity no found"});
        }

    } catch(error) {
        console.log("no se obtuvo la cantidad de materias destacadas: ", error);
        res.status(505).json({message: "error en el servidor: ", error: error.message});
    }
}
export const cantMaterias = async(req,res) => {
    try {
        const {id} = req.params;
        const cant = await Materias.cantMaterias(id);

        if(cant.length > 0) {
            res.status(200).json(cant[0]);
        } else {
            res.status(404).json({message: "Quantity no found"});
        }

    } catch(error) {
        console.log("no se obtuvo la cantidad de materias: ", error);
        res.status(505).json({message: "error en el servidor: ", error: error.message});
    }
}

// funciona bien
export const rendimiento = async (req, res) => {
    try {
        const {id} = req.params;
        console.log("ID recibido para rendimiento: ", id)

        const rendimiento = await Materias.rendimiento(id);

        if(rendimiento.length > 0) {
            res.status(200).json(rendimiento);
        } else {
            res.status(404).json({message: "rendimiento no found"});
        }
        
    } catch(error) {
        console.log("no se obtuvo el rendimiento: ", error);
        res.status(505).json({message: "error en el servidor: ", error: error.message});
    }
}

export const materiasDetalle = async (req, res) => {
    try {
        const {id} = req.params;
        console.log("ID recibido para materiasDetalle: ", id)
        const detalle = await Materias.materiasDetalle(id);
        if(detalle.length > 0) {
            res.status(200).json(detalle);
        } else {
            res.status(404).json({message: "detalle no found"});
        }
    } catch(error) {
        console.log("no se obtuvo el detalle de materias: ", error);
        res.status(505).json({message: "error en el servidor: ", error: error.message});
    }
}