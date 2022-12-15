const {Router} = require("express")
const {getUsers, getUsersByID, deleteUsersbyID, addUsers, updateUserByUsuario} = require("../controllers/personal")
const router = Router()

//http://localhost:4000/api/v1/personal

//GET
router.get("/", getUsers)
router.get("/id/:id", getUsersByID)

//DELETE
router.delete("/", deleteUsersbyID)

//POST
router.post("/", addUsers)

//PUT
router.put("/", updateUserByUsuario)

module.exports = router