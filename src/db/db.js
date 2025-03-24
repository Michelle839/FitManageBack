import { Sequelize } from "sequelize";


const sequelize = new Sequelize("klinsmann", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

//probando conexión con la base de datos
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(" Conexión a la base de datos exitosa.");
  } catch (error) {
    console.error(" Error al conectar a la base de datos:", error);
  }
}

testConnection(); 
export default sequelize;