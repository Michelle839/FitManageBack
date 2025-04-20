import { Router } from "express";
import {
  listar,
  crear,
  buscarPorId,
  actualizar,
} from "../controllers/MembresiaController.js";

const router = Router();

router.get("/", listar);
router.post("/", crear);
router.put("/:id_membresia", actualizar);
router.get("/:id_m", buscarPorId);

export default router;
