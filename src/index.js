import express from "express";
import Cliente from "./models/Cliente.js";
import Administrador from "./models/Administrador.js";
import Membresia from "./models/Membresia.js";
import Pago from "./models/Pago.js";
import Suscripcion from "./models/Suscripcion.js";
import Asistencia from "./models/Asistencia.js";
import db from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";
import clienteRoutes from "./routes/ClienteRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import membresiaRoutes from "./routes/MembresiaRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const port = 3000;

db.authenticate()
  .then(() => console.log("Databse connection successful"))
  .catch((error) => console.log("Connection error: ", error));

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hola Mundo desde mi primera API en Node.js!");
});

app.use("/clientes", clienteRoutes);
app.use("/auth", authRoutes);
app.use("/membresias",membresiaRoutes);
