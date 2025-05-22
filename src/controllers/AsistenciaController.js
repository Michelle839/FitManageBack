import AsistenciaService from "../services/AsistenciaService.js";

async function registrarAsistencia(req, res) {
    try {
        const asistencia = await AsistenciaService.registrarAsistencia(req.body.id_cliente)
        res.status(200).json(asistencia);
    } catch (error) {
         res.status(error.statusCode || 500).json({
            message: error.message || "Error interno del servidor",
          });
    }
}

export default {registrarAsistencia};