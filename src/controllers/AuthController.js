import { authenticateUser } from "../services/AuthService.js";

export async function login(req, res) {
  try {
    const { DNI, contraseña, role } = req.body;

    if (!DNI || !contraseña || !role) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const usuario = await authenticateUser(DNI, contraseña, role);
    return res.json({
      role,
      message: "Inicio de sesión exitoso",
      usuario: {
        DNI: usuario.DNI,
        nombre: usuario.nombre,
      },
    });
  } catch (error) {
    console.error("Error en el login:", error.message);

    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Contraseña incorrecta") {
      return res.status(401).json({ message: error.message });
    }

    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
