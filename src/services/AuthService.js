import Administrador from "../models/Administrador.js";
import Cliente from "../models/Cliente.js";
import bcrypt from "bcrypt";

export async function authenticateUser(DNI, contraseña, role) {
  let usuario = null;
  console.log("rol resibido:", role); // Depuración

  // Buscar en la tabla correspondiente según el rol
  if (role === "Administrador") {
    usuario = await Administrador.findByPk(DNI);
  } else if (role === "Cliente") {
    usuario = await Cliente.findByPk(DNI);
  } else {
    throw new Error("Rol no válido");
  }

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  const isValid = bcrypt.compareSync(contraseña, usuario.contraseña);
  if (!isValid) {
    throw new Error("Contraseña incorrecta");
  }
  return usuario;
}
