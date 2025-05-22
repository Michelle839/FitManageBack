import AsistenciaController from "../controllers/AsistenciaController.js";

import { Router } from "express";
const router = Router();

router.post("/", AsistenciaController.registrarAsistencia);

export default router;
