const {Router} = require("express")
const {getProyecto, getProyectoByID, deleteProyectobyID, addProyecto, updateProyectoByProyecto} = require("../controllers/ticket")
const router = Router()

//http://localhost:4000/api/v1/ticket

//GET
router.get("/", getProyecto)
router.get("/id/:id", getProyectoByID)

//DELETE
router.delete("/", deleteProyectobyID)

//POST
router.post("/", addProyecto)

//PUT
router.put("/", updateProyectoByProyecto)

module.exports = router