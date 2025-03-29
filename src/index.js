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

dotenv.config();

const app = express();
app.use(express.json());
// Configurar el middleware de CORS. En este caso está para todos los dominios. 
app.use(
  cors({
    origin: "*",
  })
);

const port = 3000;
// Base de datos.
db.authenticate()
  .then(() => console.log("Databse connection successful"))
  .catch((error) => console.log("Connection error: ", error));

  /*
// Para crear las tablas a partir de los modelos
db.sync()
  .then(() => console.log("Database synchronized"))
  .catch((error) => console.log("Error synchronizing database: ", error));
*/

//configuración del puerto
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
  });


  
  //endpoint prueba
  app.get('/', (req, res) => {
    res.send('Hola Mundo desde mi primera API en Node.js!');
  });
  
  //para manejar las peticiones de Clientes
  app.use("/clientes", clienteRoutes);
/*
  //Creación de las tablas 
  async function main(){
    try{
        await db.sync({force: true});
        console.log("Tablas creadas exitosamente B)")
    }catch(error){
      console.log(error.message);
    }
  }*/
  

  //main();