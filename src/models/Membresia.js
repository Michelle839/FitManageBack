import { DataTypes } from "sequelize";
import db from "../db/db.js";

const Membresia = db.define("membresia", {
    id_membresia: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tipo: {type: DataTypes.STRING(50), allowNull: false},
    duracion: {type: DataTypes.STRING(50), allowNull: false},
    precio: {type: DataTypes.DECIMAL(10, 2), allowNull: false}
}, {
    timestamps: false, 
    freezeTableName: true
});

export default Membresia;