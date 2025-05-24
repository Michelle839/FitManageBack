import SuscripcionService from "./SuscripcionService.js";
import { Op } from "sequelize";
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  Conflict,
} from "../errors/Errores.js";
import Asistencia from "../models/Asistencia.js";
import { format } from "date-fns";

async function registrarAsistencia(dni) {
  try {
    const ultimaSuscripcion = await SuscripcionService.obtenerUltimaSuscripcion(
      dni
    );
    if (!ultimaSuscripcion) {
      throw new NotFoundError("No se encontró la suscripcion");
    }
    let hoy = new Date();
    let ahora = new Date();
    hoy = format(hoy, "yyyy-MM-dd");
    ahora = format(ahora, "HH:mm");
    const fin = new Date(ultimaSuscripcion.fecha_fin);
    //valido si aún no se ha registrado asistencia
    const yaRegistro = await verSiYaRegistroAsistencia(dni, hoy);
    //si aún le quedan días  creo la asistencia
    if (yaRegistro) {
      throw new Conflict("Ya registró asistencia hoy.");
    }
    if (hoy > fin) {
      throw new Conflict("No cuenta con membresía activa");
    }
    const asistencia = await Asistencia.create({
      fecha: hoy,
      id_cliente: dni,
    });
    if (!asistencia) {
      throw new InternalServerError("No se pudo crear la asistencia");
    }
    return asistencia;
  } catch (error) {
    throw error;
  }
}

async function verSiYaRegistroAsistencia(dni, fecha) {
  const asistencia = await Asistencia.findOne({
    where: {
      id_cliente: dni,
      fecha: fecha,
    },
  });
  return asistencia !== null;
}

async function obtenerAsistenciasPorCliente(dni) {
  console.log("Buscando asistencias para cliente DNI:", dni);
  const asistencias = await Asistencia.findAll({
    where: { id_cliente: dni },
    attributes: ["fecha"],
    order: [["fecha", "ASC"]],
  });

  console.log("Asistencias encontradas:", asistencias);

  return asistencias.map((a) => a.fecha);
}

async function obtenerAsistenciasPorClienteEnRango(dni, fechaInicio, fechaFin) {
  const asistencias = await Asistencia.findAll({
    where: {
      id_cliente: dni,
      fecha: {
        [Op.between]: [fechaInicio, fechaFin],
      },
    },
    attributes: ["fecha"],
    order: [["fecha", "ASC"]],
  });
  return asistencias.map((a) => a.fecha);
}

export default {
  registrarAsistencia,
  verSiYaRegistroAsistencia,
  obtenerAsistenciasPorCliente,
  obtenerAsistenciasPorClienteEnRango,
};
