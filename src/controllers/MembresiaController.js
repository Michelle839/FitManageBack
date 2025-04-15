import {buscarPorId as buscarPId} from "../services/MembresiaService.js";


export async function buscarPorId(req, res) {
    //obtengo el id del path 
    const id = req.params.id_m; //el atributo id debe llamarse igual al que se recibe en routes
    //validar que el id no sea nulo
    if(!id){
        return res.status(400).json({error: "ID vacío o inválido"});
    }
   
    try {
        //busco en la bd
        const membresia = await buscarPId(id); 
        //valido que exista la memebresia
        if(!membresia){
            return res.status(404).json({error: "No se econtró la membresía"});
        }
        //si Sí la encontró
        res.status(200).json({
            error: false, 
            message: "Membresia encontrada",
            membresia
        });
    } catch (error) {
        //console.log(error.message);
        //error por parte del servidor
        res.status(500).json({
            error: true,
            message: error.message
        });
    };
};