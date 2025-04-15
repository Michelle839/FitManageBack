import { Router } from "express";
import {buscarPorId} from "../controllers/MembresiaController.js";

const router = Router();

router.get("/:id_m", buscarPorId);

export default router;