import { Router } from "express";
import {listar, buscarPorCedula} from "../controllers/ClienteController.js";

const router = Router();

//middleware que me dirá qué método se está pidiendo desde qué URL
router.use((req, res, next) => {
    console.log(`Request method: ${req.method}, Request URL: ${req.originalUrl}`);
    next();
  });

  //obtener todos los clientes
  router.get("/", listar);

  //obtener cliente por dni
  router.get("/:id", buscarPorCedula);
  
export default router;