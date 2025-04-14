import { DataTypes } from "sequelize";
import db from "../db/db.js";
import Cliente from "./Cliente.js";
import Membresia  from "./Membresia.js";

const Suscripcion = db.define("Cliente_Membresia", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fecha_inicio: {type: DataTypes.DATE, allowNull: false},
    fecha_fin:{type: DataTypes.DATE, allowNull: false},
    estado: {type: DataTypes.STRING(20), allowNull: false}
},{
    timestamps: false,
    freezeTableName: true
});

//Relacion con Cliente
Cliente.hasMany(Suscripcion, {
    foreignKey: "id_cliente"
});

Suscripcion.belongsTo(Cliente, {
    foreignKey: "id_cliente"
});

//Relacion con Membresia

Membresia.hasMany(Suscripcion, {
    foreignKey: "id_membresia"
});
Suscripcion.belongsTo(Membresia, {
    foreignKey: "id_membresia"
});

export default Suscripcion;