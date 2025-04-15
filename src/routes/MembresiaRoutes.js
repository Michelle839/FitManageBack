import { Router } from "express";
import { listar, crear, buscarPorId } from "../controllers/MembresiaController.js";

const router = Router();

router.get("/", listar);
router.post("/", crear);
router.get("/:id_m", buscarPorId);

export default router;