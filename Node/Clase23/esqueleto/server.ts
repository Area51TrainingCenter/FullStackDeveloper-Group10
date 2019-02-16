// Importaciones
import express = require("express")
import {Request, Response, NextFunction} from "express"
import {Router as routerIndex} from "./routes/index.route"
import {Router as routerUsuario} from "./routes/usuario.route"
import {Router as routerRol} from "./routes/rol.route"
import { handlerErrors } from "./handlers/errores.handler";
import mongoose = require("mongoose")
import bodyParser = require("body-parser")
import dotenv = require("dotenv")
import cors = require("cors")

//dotenv.config({path: "./variables.env"})

// Conexión a Mongo
mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASW}@cluster0-shard-00-00-nqhul.mongodb.net:27017,cluster0-shard-00-01-nqhul.mongodb.net:27017,cluster0-shard-00-02-nqhul.mongodb.net:27017/${process.env.MONGO_DB}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, { useNewUrlParser: true, useCreateIndex: true})
mongoose.connection.on("connected", ()=>console.log("Conectado a Mongo"))
mongoose.connection.on("error", error => console.log(error))

// Modelos
require("./api/models/usuario.model")
require("./api/models/rol.model")

// Declaraciones
const app = express()
const port = process.env.PORT || 4000

// Archivos estáticos
//app.use(express.static("./public"))

app.use(cors())


// Middlewares
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Rutas
app.use("/", routerIndex)
app.use("/usuario", routerUsuario)
app.use("/rol", routerRol)

// Manejadores de Errores
app.use(handlerErrors.notFound)
app.use(handlerErrors.general)

app.listen(port, ()=>console.log(`Servidor ejecutándose en el puerto ${port}`))