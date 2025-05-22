import SuscripcionService from "./SuscripcionService.js";
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  Conflict,
} from "../errors/Errores.js";
import Asistencia from "../models/Asistencia.js";
import { format } from 'date-fns';

async function registrarAsistencia(dni) {
    try {
        const ultimaSuscripcion = await SuscripcionService.obtenerUltimaSuscripcion(dni);
        if(!ultimaSuscripcion){
            throw new NotFoundError("No se encontró la suscripcion");
        }
        let hoy = new Date();
        let ahora = new Date();
        hoy = format(hoy, 'yyyy-MM-dd');
        ahora = format(ahora, 'HH:mm');
        const fin = new Date(ultimaSuscripcion.fecha_fin);
        //valido si aún no se ha registrado asistencia 
        const yaRegistro = await verSiYaRegistroAsistencia(dni, hoy);
        //si aún le quedan días  creo la asistencia
        let asistencia = null;
        if(yaRegistro){
            throw new Conflict("Ya registró asistencia hoy.");
        }
        if( hoy <= fin){
            //creo la asistencia
             asistencia= await Asistencia.create({
                fecha: hoy,
                id_cliente: dni
            })
            if(!asistencia){
                throw new InternalServerError("No se pudo crear la asistencia")
            }
        }
        return asistencia;
    } catch (error) {
          throw error;  
    }
};

async function verSiYaRegistroAsistencia(dni, fecha) {

    const asistencia = await Asistencia.findOne({
        where: {
            id_cliente: dni,
            fecha: fecha
        }
    });
    return asistencia !== null;
};

export default {registrarAsistencia, verSiYaRegistroAsistencia};