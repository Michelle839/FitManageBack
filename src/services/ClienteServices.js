import cliente from "../models/Cliente.js";


export async function listar() {
    return await cliente.findAll();
};

export async function buscarPorCedula(dni) {
    return await cliente.findByPk(dni);
};

export async function registrarCliente(datosCliente) {
    return await cliente.create(datosCliente);
};