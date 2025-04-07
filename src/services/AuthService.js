import Administrador from "../models/Administrador.js";
import Cliente from "../models/Cliente.js";
import bcrypt from "bcrypt";

export async function authenticateUser(DNI, contraseña) {
  let usuario = await Administrador.findByPk(DNI);

  if (usuario) {
    const isValid = bcrypt.compareSync(contraseña, usuario.contraseña);
    if (!isValid) throw new Error("Contraseña incorrecta");
    return { usuario, role: "Administrador" };
  }

  usuario = await Cliente.findByPk(DNI);
  if (usuario) {
    const isValid = bcrypt.compareSync(contraseña, usuario.contraseña);
    if (!isValid) throw new Error("Contraseña incorrecta");
    return { usuario, role: "Cliente" };
  }

  throw new Error("Usuario no encontrado");
}

export async function buscarUsuarioPorCorreo(email) {
  let usuario = await Administrador.findOne({ where: { email } });
  if (usuario) return { usuario, role: "Administrador" };

  usuario = await Cliente.findOne({ where: { email } });
  if (usuario) return { usuario, role: "Cliente" };

  return null;
}
