import PagoService from "../services/PagoService.js";
import SuscripcionService from "../services/SuscripcionService.js";

export async function registrar(req, res){
    try {
        const pago = await PagoService.registrar(req.body.id_cliente, req.body.id_membresia);
        res.status(200).json(pago);
    } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
    }
};

export default {
    registrar,
};