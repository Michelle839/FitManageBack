import Cliente from "../models/Cliente.js";
import Membresia from "../models/Membresia.js";
import Suscripcion from "../models/Suscripcion.js";
import Pago from "../models/Pago.js";
import {NotFoundError, BadRequestError, InternalServerError} from "../errors/Errores.js";
import SuscripcionService from "./SuscripcionService.js";

    //Registrar un nuevo pago, al hacerlo debo también registrar que el cliente adquirió una nuva suscripción
 async function registrar(cliente_id, membresia_id) {
        //valido los datos
        if(!cliente_id ){
            throw new BadRequestError("Cliente inválido");
        }
        if(!membresia_id){
            throw new BadRequestError("Membresia inválida");
        }
        try {
            const cliente = await Cliente.findByPk(cliente_id);
            if(!cliente){
                throw new NotFoundError("Cliente no encontrado");
            };
            const membresia = await Membresia.findByPk(membresia_id);
            if(!membresia){
                throw new NotFoundError("Membresia no encontrada");
            };
            const pago = await Pago.create({
                fecha_pago: new Date(),
                id_cliente: cliente_id,
                id_membresia: membresia_id
            });
            SuscripcionService.registrar(cliente_id, membresia_id);
            return pago;
        } catch (error) {
            throw error;
        };
        
    };


export default {
    registrar,
};
