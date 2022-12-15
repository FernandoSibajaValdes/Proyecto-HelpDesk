const express = require('express') 
const personalRouter = require('./routes/personal')
const clienteRouter = require('./routes/cliente')
const ticketRouter = require('./routes/ticket')
const tipodefallaRouter = require('./routes/tipodefalla')

const cors = require("cors")

class Server{
    constructor(){
      this.app = express()
      this.paths = {
        personal:"/api/v1/personal",
        cliente:"/api/v1/cliente",
        ticket:"/api/v1/ticket",
        tipodefalla:"/api/v1/tipodefalla"
        }
      this.middlewares() 
      this.routes()
  
    }

routes(){
    
  //this.app.get('/', (req, res) => {
    //res.send('Hello World')
    //  }
  this.app.use(this.paths.personal, personalRouter)
  this.app.use(this.paths.cliente, clienteRouter)
  this.app.use(this.paths.ticket, ticketRouter)
  this.app.use(this.paths.tipodefalla, tipodefallaRouter)
}

  middlewares(){
    this.app.use(cors()) //Perimiten solicitudes de origen cruzado//
    this.app.use(express.json()) //Habilita la lectura de contenido en formato JSON//
  }

  listen(){
      this.app.listen(process.env.PORT,() => { //Poner un this aqui xd//
      console.log("Servidor en ejecución en el puerto", process.env.PORT)
      })
  }
}

module.exports = Server