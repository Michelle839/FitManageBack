import {listar as listarClientes, buscarPorCedula as buscarPCedula} from "../services/ClienteServices.js";

export async function listar(req, res) {
    try {
        const clientes = await listarClientes();
        res.json(clientes);
    } catch (error) {
        console.error("Error al obtener clientes:", error); // Imprime el error en la consola
        res.status(500).json({ message: "Error al obtener clientes", error: error.message });
    }
}

export async function buscarPorCedula(req, res) {
    try {
      const { id } = req.params; // Obtiene el ID desde la URL
      const cliente = await buscarPCedula(id); //se ejecuta la funcion de service
  
      if (!cliente) {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }
  
      res.json(cliente); // Devuelve el cliente en formato JSON
    } catch (error) {
      res.status(500).json({ message: "Error al buscar cliente" });
    }
  }