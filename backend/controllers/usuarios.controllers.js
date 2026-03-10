import { usuarios } from "../models/usuarios.model.js";
import jwt from "jsonwebtoken";

// funciona bien
export const getAll = async (req, res) => {
    const usuario = await usuarios.getAll();
    res.json(usuario);
};

// funciona bien
export const getById = async (req, res) => {
    const usuario = await usuarios.getById(req.params.id);
    usuario ? res.json(usuario) : res.status(404).json( { message: 'No found'});
};

// funciona bien
export const create = async (req, res) => {
    try {
        const {nombre, email, password, rol} = req.body;
        
        if(!nombre || !email || !password || !rol) {
            res.status(400).json({message: "Faltan datos Obligatorios"});
        }

        const result = await usuarios.create({nombre, email, password, rol});
        res.status(201).json(result);
    } catch(error) {
        res.status(500).json({ message: "Error interno del servidor" });
        console.log("error al conectar la API: ", error.message); 
    }
};

// funciona bien
export const update = async (req, res) => {
    const usuario = await usuarios.update(req.params.id, req.body);
    res.json(usuario);  
};

// funciona bien
export const deleteUsuario = async (req, res) => {
    const result = await usuarios.delete(req.params.id);
    res.json(result);
};

// funciona bien
export const login = async (req, res) => {
    try {
        const {id, password } = req.body;
        console.log("Datos recibidos en login: ", req.body);
        if(!id || !password) {
            return res.status(400).json( {message: 'Faltan Campos'});
        }
        const user = await usuarios.getByIdAndPassword(id, password);
        if(!user) {
            return res.status(401).json({message: 'ID o Contraseña incorrecta'});
        }

        // generar token web json
        const token = jwt.sign(
            { 
                id: user.id, 
                nombre: user.nombre, 
                rol: user.rol,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.json({
            message: "Login Exitoso",
            user: {
                id: user.id,
                nombre: user.nombre, 
                rol: user.rol,
            },
            token,
        });

        console.log("id: ", user.id, "rol: ", user.rol);
    } catch(error) {
        res.status(500).json({message: "Error en el servidor", error: error.message});
    }
}

