import { Router } from "express";
import {
  listar,
  buscarPorCedula,
  registrar,
} from "../controllers/ClienteController.js";

const router = Router();

router.use((req, res, next) => {
  console.log(`Request method: ${req.method}, Request URL: ${req.originalUrl}`);
  next();
});

router.get("/", listar);

router.get("/:id", buscarPorCedula);

//registrar cliente
router.post("/", registrar);

export default router;
