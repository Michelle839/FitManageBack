import membresia from "../models/Membresia.js";

export async function listarMembresias() {
    try {
        const membresias = await membresia.findAll();
        return membresias;
    } catch (error) {
        throw new Error("Error al obtener las membresías: " + error.message);
    }
}

export async function crearMembresia(nuevaMembresia) {
    try {
        const nueva = await membresia.create(nuevaMembresia);
        return nueva;
    } catch (error) {
        throw new Error("Error al crear la membresía: " + error.message);
    }
};

export async function buscarPorId(id_membresia) {
    return await membresia.findByPk(id_membresia);
};