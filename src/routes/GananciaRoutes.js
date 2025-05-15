import { Router } from "express";
import {
  gananciasAnuales,
  gananciasMensuales,
  gananciasPorRango,
  detalleGananciasPorRango
} from "../controllers/GananciaController.js";


const router = Router();

router.get("/anuales", gananciasAnuales);
router.get("/mensuales/:anio", gananciasMensuales);
router.get("/rango", gananciasPorRango);
router.get("/detalle-rango", detalleGananciasPorRango);

export default router;