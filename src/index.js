import express from "express";
import Cliente from "./models/Cliente.js";
import Administrador from "./models/Administrador.js";
import Membresia from "./models/Membresia.js";
import Pago from "./models/Pago.js";
import Suscripcion from "./models/Suscripcion.js";
import Asistencia from "./models/Asistencia.js";
import db from "./db/db.js";


const app = express();
const port = 3000;

//configuración del puerto
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
  });

  //endpoint prueba
  app.get('/', (req, res) => {
    res.send('Hola Mundo desde mi primera API en Node.js!');
  });
  
  //Creación de las tablas 
  async function main(){
    try{
        await db.sync({force: true});
        console.log("Tablas creadas exitosamente B)")
    }catch(error){
      console.log(error.message);
    }
  }
  
  main();