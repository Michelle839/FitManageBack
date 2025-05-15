import { Op, fn, col, literal } from "sequelize";
import Membresia from "../models/Membresia.js";
import Pago from "../models/Pago.js";
import Cliente from "../models/Cliente.js";


export async function obtenerGananciasAnuales() {
    const pagos = await Pago.findAll({
        include: {
            model: Membresia,
            attributes: ['precio'],
            required: true
        },
        attributes: [
            [fn('YEAR', col('fecha_pago')), 'anio']
        ],
        raw: true
    });

    const ganancias = {};
    for (const pago of pagos) {
        const anio = pago.anio;
        const costo = parseFloat(pago['membresium.precio'] ?? 0);

        if (!ganancias[anio]) {
            ganancias[anio] = 0;
        }

        ganancias[anio] += costo;
    }

    return Object.entries(ganancias).map(([anio, total]) => ({
        anio,
        total
    }));
}



export async function obtenerGananciasPorMeses(anio) {
    try {
        const inicioAno = new Date(anio, 0, 1);
        const finAno = new Date(anio, 11, 31, 23, 59, 59);

        const pagos = await Pago.findAll({
            where: {
                fecha_pago: {
                    [Op.between]: [inicioAno, finAno],
                },
            },
            include: {
                model: Membresia,
                attributes: ['precio'],
                required: true
            },
            attributes: [
                [fn("MONTH", col("fecha_pago")), "mes"]
            ],
            raw: true
        });

        const gananciasPorMes = Array(12).fill(0);

        for (const pago of pagos) {
            const mes = parseInt(pago.mes) - 1;
            const precio = parseFloat(pago["membresium.precio"] ?? 0);
            gananciasPorMes[mes] += precio;
        }

        return gananciasPorMes;
    } catch (error) {
        console.error(error);
        throw new Error("Error al obtener las ganancias mensuales.");
    }
}


export async function obtenerGananciasPorRangoFechas(fechaInicio, fechaFin) {
    fechaFin.setDate(fechaFin.getDate() + 1);
    const pagos = await Pago.findAll({
        where: {
            fecha_pago: {
                [Op.between]: [fechaInicio, fechaFin]
            }
        },
        attributes: [
            [fn('DATE', col('fecha_pago')), 'fecha']
        ],
        include: {
            model: Membresia,
            attributes: ['precio'],
            required: true
        },
        order: [[literal('DATE(fecha_pago)'), 'ASC']],
        raw: true
    });

    const gananciasPorFecha = {};

    for (const pago of pagos) {
        const fecha = pago.fecha;
        const precio = parseFloat(pago["membresium.precio"] ?? 0);
        if (!gananciasPorFecha[fecha]) {
            gananciasPorFecha[fecha] = 0;
        }

        gananciasPorFecha[fecha] += precio;
    }

    return Object.entries(gananciasPorFecha).map(([fecha, total]) => ({
        fecha,
        total
    }));
}


export async function obtenerDetalleGananciasPorRangoFechas(fechaInicio, fechaFin) {
    fechaFin.setDate(fechaFin.getDate() + 1); // incluir fecha fin completa

    const resultados = await Pago.findAll({
        where: {
            fecha_pago: {
                [Op.between]: [fechaInicio, fechaFin]
            }
        },
        include: [
            {
                model: Cliente,
                attributes: ['nombre'],
                required: true
            },
            {
                model: Membresia,
                attributes: ['tipo', 'precio'],
                required: true
            }
        ],
        attributes: ['fecha_pago'],
        order: [['fecha_pago', 'ASC']],
        raw: true
    });

    // Procesamos los datos para el frontend
    const datosProcesados = resultados.map(r => ({
        cliente: r["cliente.nombre"],
        tipoMembresia: r["membresium.tipo"],
        fecha: new Date(r.fecha_pago).toISOString().split('T')[0],
        precio: r["membresium.precio"]
    }));

    // Calculamos el total
    const total = datosProcesados.reduce((suma, r) => suma + Number(r.precio), 0).toFixed(2);


    return {
        total,
        resultados: datosProcesados
    };
}
