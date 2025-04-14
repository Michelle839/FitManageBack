<<<<<<< HEAD

import dotenv from "dotenv";
dotenv.config({
  path: "../.env"
});

import { Sequelize } from "sequelize";

=======
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
>>>>>>> c724196324ee250aa81fcb2962c1dad9f1442ac1

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  define: { timestamps: false },
  });
/*
const sequelize = new Sequelize("klinsmann", "root", "", {
  host: "localhost",
  dialect: "mysql"
});*/

//probando conexión con la base de datos
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(" Conexión a la base de datos exitosa.");
  } catch (error) {
    console.error(" Error al conectar a la base de datos:", error);
  }
}

<<<<<<< HEAD
=======
//testConnection(); 
>>>>>>> c724196324ee250aa81fcb2962c1dad9f1442ac1
export default sequelize;