import NotificacionController from "../controllers/NotificacionController.js";

import { Router } from "express";
const router = Router();

router.post("/", NotificacionController.crearNotificacion);
router.get("/:dni", NotificacionController.obtenerNotificaciones);
router.patch("/:id_notificacion", NotificacionController.cambiarEstado);

export default router;