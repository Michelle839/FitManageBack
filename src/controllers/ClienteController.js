import {
  listar as listarClientes, buscarPorCedula as buscarPCedula,
  registrarCliente as registrarCliente
} from "../services/ClienteServices.js";
import bcrypt from "bcrypt";

export async function listar(req, res) {
  try {
    const clientes = await listarClientes();
    res.json(clientes);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ message: "Error al obtener clientes", error: error.message });
  }
}

export async function buscarPorCedula(req, res) {
  try {
    const { id } = req.params; 
    const cliente = await buscarPCedula(id); 

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json(cliente); 
  } catch (error) {
    res.status(500).json({ message: "Error al buscar cliente" });
  }
}

export async function registrar(req, res) {
  try {
    const { DNI, nombre, telefono, email, edad, peso, altura, contraseña } = req.body;

    if (!DNI || !nombre || !telefono || !email || !edad || !peso || !altura || !contraseña) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    
    const clienteExistente = await buscarPCedula(DNI);
    if (clienteExistente) {
      return res.status(400).json({ message: "El cliente ya está registrado" });
    }

   
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
    const nuevoCliente = await registrarCliente({ DNI, nombre, telefono, email, edad, peso, altura, contraseña: hashedPassword });

    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error("Error al registrar cliente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
