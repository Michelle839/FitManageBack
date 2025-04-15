import membresia from "../models/Membresia.js";

export async function buscarPorId(id_membresia) {
    return await membresia.findByPk(id_membresia);
}