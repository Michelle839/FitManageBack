<<<<<<< HEAD
import {buscarPorId as buscarPId} from "../services/MembresiaService.js";


export async function buscarPorId(req, res) {
    //obtengo el id del path 
    const id = req.params.id_m; //el atributo id debe llamarse igual al que se recibe en routes
    //validar que el id no sea nulo
    if(!id){
        return res.status(400).json({error: "ID vacío o inválido"});
    }
   
    try {
        //busco en la bd
        const membresia = await buscarPId(id); 
        //valido que exista la memebresia
        if(!membresia){
            return res.status(404).json({error: "No se econtró la membresía"});
        }
        //si Sí la encontró
        res.status(200).json({
            error: false, 
            message: "Membresia encontrada",
            membresia
        });
    } catch (error) {
        //console.log(error.message);
        //error por parte del servidor
        res.status(500).json({
            error: true,
            message: error.message
        });
    };
};
=======
import { listarMembresias, crearMembresia } from "../services/MembresiaService.js";

export async function listar(req, res) {
    try {
        const membresias = await listarMembresias();
        res.json(membresias);
    } catch (error) {
        console.error("Error al obtener membresías:", error);
        res.status(500).json({ message: "Error al obtener membresías", error: error.message });
    }
}

export async function crear(req, res) {
    try {
        const { tipo, duracion, precio } = req.body;

        if (!tipo || !duracion || !precio) {
            return res.status(400).json({ message: "Faltan campos requeridos." });
        }

        const nueva = await crearMembresia({ tipo, duracion, precio });
        res.status(201).json(nueva);
    } catch (error) {
        console.error("Error al crear membresía:", error);
        res.status(500).json({ message: "Error al crear membresía", error: error.message });
    }
}
>>>>>>> a5a3f2304e728556b1e2b5ad8f0ee61fd6d9dc06
