import cliente from "../models/Cliente.js";


import suscripcion from "../models/Suscripcion.js";
import membresia from "../models/Membresia.js";

        

    //listar todos los clientes sin repetir
    export async function listar() {
        const clientes = await cliente.findAll({
          include: [
            {
              model: suscripcion,
              include: [
                {
                  model: membresia,
                },
              ],
              order: [[suscripcion, 'fecha_fin', 'DESC']],
            },
          ],
        });
      
        return clientes.map((cliente) => {
            const suscripciones = cliente.Cliente_Membresia;
            const ultimaSuscripcion = suscripciones?.[0];
      
          let diasRestantes = 0;
          let estado = "inactivo";
          let tipoMembresia = "No tiene";
      
          if (ultimaSuscripcion) {
            diasRestantes = calcularDiasRestantes(ultimaSuscripcion.fecha_fin);
            tipoMembresia = ultimaSuscripcion.membresium.tipo;
      
            if (diasRestantes > 0) {
              estado = "activo";
            } else {
              estado = "inactivo";
              diasRestantes = 0;
            }
            
          }
      
          return {
            DNI: cliente.DNI,
            nombre: cliente.nombre,
            estado,
            tipo_membresia: tipoMembresia,
            dias_restantes: diasRestantes,
          };
        });
      };
      
      // para calcular el la diferencia entre la fecha fin y la fecha actual
      function calcularDiasRestantes(fechaFin) {  
        const hoy = new Date();
        const fin = new Date(fechaFin);
        const diferencia = fin - hoy;
        const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
        return dias > 0 ? dias : 0;
      };

export async function buscarPorCedula(dni) {
    return await cliente.findByPk(dni);
};

export async function registrarCliente(datosCliente) {
    return await cliente.create(datosCliente);
};