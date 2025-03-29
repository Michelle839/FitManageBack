import cliente from "../models/Cliente.js";



        //con export ya se exportan las funciones automaticamente
  export  async function listar() {
        return await cliente.findAll(); // Obtiene de la bd todos los clientes
    };

   export async function buscarPorCedula(dni){
        return await cliente.findByPk(dni);
    };




