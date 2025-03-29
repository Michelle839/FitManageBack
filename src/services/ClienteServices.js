import cliente from "../models/Cliente.js";



        //con export ya se exportan las funciones automaticamente
    async function listar() {
        return await cliente.findAll(); // Obtiene de la bd todos los clientes
    };

    async function buscarPorCedula(dni){
        return await cliente.findByPk(dni);
    };


export default new ClienteService();

