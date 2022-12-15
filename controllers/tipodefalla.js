const {request, response} = require("express");
const pool=require("../db/connection");
const {modeloProyecto, updateProyecto} = require("../models/tipodefalla");

//Recibir datos de todos los Tipos de Falla
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

//Obtener datos de un Tipo de Falla por el ID
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

//Desactivar un Tipo de Falla por su ID
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

//Añadir un nuevo Tipo de Falla
const addProyecto = async (req = request, res = response) =>{
    const {
        NombredeFalla,
        DescripciondeFalla,
        PrioridaddeFalla,
        Activo
    } = req.body
    if (
        !NombredeFalla||
        !DescripciondeFalla||
        !PrioridaddeFalla||
        !Activo
    ){ res.status(400).json({msg:"Falta información del tipo de falla"})}
    
    let conn;
    try{ 
        conn = await pool.getConnection()
        //No exista el tipo de falla antes de insertar
        const [user]=await conn.query(modeloProyecto.queryProyectoExists,[NombredeFalla])
        if (user){
            res.status(403).json({msg:`El tipo de falla ${NombredeFalla} ya se encuentra registrado`})
            return
        }

        const {affectedRows} = await conn.query(modeloProyecto.queryAddProyecto,[
            NombredeFalla,
            DescripciondeFalla,
            PrioridaddeFalla,
            Activo
        ],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro del tipo de falla ${NombredeFalla}`})
            return
        }
        res.json({msg:`Se agrego satisfactoriamente el registro con el tipo de falla ${NombredeFalla}`})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}

//Actualizar información de la Falla
const updateProyectoByProyecto = async (req = request, res = response) =>{
    const {
        DescripciondeFalla,
        PrioridaddeFalla,
        NombredeFalla

    } = req.body

    if (
        !DescripciondeFalla||
        !PrioridaddeFalla||
        !NombredeFalla
   
    ){
        res.status(400).json({msg:"Falta información del tipo de falla"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()
        const [user]=await conn.query(modeloProyecto.queryGetProyectoInfo,[NombredeFalla])
        if (!user){
            res.status(403).json({msg: `El tipo de falla ${NombredeFalla} no se encuentra registrado`})
        }
        const {affectedRows} = await conn.query(updateProyecto(
            DescripciondeFalla,
            PrioridaddeFalla,
            NombredeFalla
        ),(error)=>{throw new error})
        if (affectedRows === 0) {
            res.status(404).json({msg:`No se pudo actualizar el registro del tipo de falla ${NombredeFalla}`})
            return
        }
        res.json({msg: `El tipo de falla ${NombredeFalla} se actualizo correctamente`})
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