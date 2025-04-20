import { authenticateUser } from "../services/AuthService.js";

export async function login(req, res) {
  try {
    const { DNI, contraseña } = req.body;

    if (!DNI || !contraseña) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const { usuario, role } = await authenticateUser(DNI, contraseña);

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

    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message });
  }
}
