import { Router } from "express";
import { listar, crear } from "../controllers/MembresiaController.js";

const router = Router();

router.get("/", listar);
router.post("/", crear);

export default router;