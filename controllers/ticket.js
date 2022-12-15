const {request, response} = require("express");
const pool=require("../db/connection");
const {modeloProyecto, updateProyecto} = require("../models/ticket");

//Recibir datos de todos los Ticket
const getProyecto = async(req=request,res=response)=>{
    
    let conn;

    try{
        conn = await pool.getConnection()
        const users = await conn.query(modeloProyecto.queryGetProyecto,(error)=>{throw new error})
        if(!users){
            res.status(404).json({msg:"No se encontraron registros"})
            return
        }
        res.json({users})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

//Obtener datos de un Ticket por el ID
const getProyectoByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn;
    try{ 
        conn = await pool.getConnection()
        const [user] = await conn.query(modeloProyecto.queryProyectoByID,[id],(error)=>{throw new error})
        if (!user){
            res.status(404).json({msg: `No se encontró registro con el ID ${id}`})
            return
        }
        res.json({user})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}

//Desactivar un Ticket por su ID
const deleteProyectobyID = async (req = request, res = response) =>{
    const {id} = req.query
    let conn;
    try{ 
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(modeloProyecto.queryDeleteProyectoByID,[id],(error)=>{throw new error})
        
        if (affectedrows === 0){
            res.status(404).json({msg: `No se pudo eliminar el registro con el ID ${id}`})
            return
        }
        res.json({msg: `Se elimino satisfactoriamente el registro con el ID ${id}`})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}

//Añadir un nuevo Ticket
const addProyecto = async (req = request, res = response) =>{
    const {
        Fecha,
        Especificaciones,
        PersonalAsignado,
        TipodeFalla,
        Responsable,
        Activo
    } = req.body
    if (
        !Fecha||
        !Especificaciones||
        !PersonalAsignado||
        !TipodeFalla||
        !Responsable||
        !Activo
    ){ res.status(400).json({msg:"Falta información del ticket"})}
    
    let conn;
    try{ 
        conn = await pool.getConnection()
        //No exista el ticket antes de insertar
        const [user]=await conn.query(modeloProyecto.queryProyectoExists,[TipodeFalla])
        if (user){
            res.status(403).json({msg:`El ticket ${TipodeFalla} ya se encuentra registrado`})
            return
        }

        const {affectedRows} = await conn.query(modeloProyecto.queryAddProyecto,[
            Fecha,
            Especificaciones,
            PersonalAsignado,
            TipodeFalla,
            Responsable,
            Activo
        ],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro del ticket ${TipodeFalla}`})
            return
        }
        res.json({msg:`Se agrego satisfactoriamente el registro con el ticket ${TipodeFalla}`})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}

//Actualizar información del Ticket
const updateProyectoByProyecto = async (req = request, res = response) =>{
    const {
        Fecha,
        Especificaciones,
        PersonalAsignado,
        TipodeFalla,
        Responsable
     
    } = req.body

    if (
        !Fecha||
        !Especificaciones||
        !PersonalAsignado||
        !TipodeFalla||
        !Responsable
   
    ){
        res.status(400).json({msg:"Falta información del ticket"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()
        const [user]=await conn.query(modeloProyecto.queryGetProyectoInfo,[Responsable])
        if (!user){
            res.status(403).json({msg: `El ticket ${Responsable} no se encuentra registrado`})
        }
        const {affectedRows} = await conn.query(updateProyecto(
            Fecha,
            Especificaciones,
            PersonalAsignado,
            TipodeFalla,
            Responsable
        ),(error)=>{throw new error})
        if (affectedRows === 0) {
            res.status(404).json({msg:`No se pudo actualizar el registro del ticket ${Responsable}`})
            return
        }
        res.json({msg: `El ticket ${Responsable} se actualizo correctamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {getProyecto, getProyectoByID, deleteProyectobyID, addProyecto, updateProyectoByProyecto}