import Notificacion from "../models/Notificacion.js";
import { NotFoundError,
  BadRequestError,
  InternalServerError, } from "../errors/Errores.js";
import TipoNotificacion from "../models/TipoNotificacion.js";
import Cliente from "../models/Cliente.js";
import NotificacionUsuarioService from "./NotificacionUsuarioService.js";

async function crearNotificacionGeneral(titulo, mensaje, tipoNoti) {
    if(!titulo || !mensaje || !tipoNoti){
        throw new BadRequestError("Campos vacios")
    };
    try{
       const tipoNotifi = await TipoNotificacion.findByPk(tipoNoti);
       if(!tipoNotifi){
        throw new NotFoundError("No se enctnró el tipo de notificacion")
       }
       const notificacion = await Notificacion.create({
        titulo: titulo,
        mensaje: mensaje,
        fecha_envio: new Date(),
        id_tipo_notificacion: tipoNoti
       });
       if(!notificacion){
        throw new InternalServerError("error al crear la notificación")
       }
       return notificacion;
    }catch(error){
        throw error;
    }
}

async function crearNoficacionEvento(titulo, mensaje) {
    if(!titulo || !mensaje){
        throw new BadRequestError("Campos vacios")
    };
    try{
       const notificacion = await Notificacion.create({
        titulo: titulo,
        mensaje: mensaje,
        fecha_envio: new Date(),
        id_tipo_notificacion: 1
       });
       if(!notificacion){
        throw new InternalServerError("error al crear la notificación")
       }
       const clientes = await Cliente.findAll();
       for (const cliente of clientes){
            const notiUsuario = await NotificacionUsuarioService.crearNotiUsuario(notificacion.id_notificacion, cliente.DNI);
            if (!notiUsuario) {
                throw new InternalServerError("no se pudo crear Notificacion Usuario correctamente");
            }
       }
       return notificacion;
    }catch(error){
        throw error;
    }
};

export default {crearNotificacionGeneral, crearNoficacionEvento} ;