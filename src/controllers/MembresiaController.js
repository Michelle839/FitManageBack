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