// Importaciones
import express = require("express")
import {Request, Response, NextFunction} from "express"
import {Router as routerIndex} from "./routes/index.route"
import {Router as routerUsuario} from "./routes/usuario.route"
import { handlerErrors } from "./handlers/errores.handler";
import mongoose = require("mongoose")
import bodyParser = require("body-parser")

// Conexión a Mongo
mongoose.Promise = global.Promise
mongoose.connect("mongodb://user_area51:123456#@clusterarea51-shard-00-00-hjeyc.mongodb.net:27017,clusterarea51-shard-00-01-hjeyc.mongodb.net:27017,clusterarea51-shard-00-02-hjeyc.mongodb.net:27017/area51?ssl=true&replicaSet=ClusterArea51-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true})
mongoose.connection.on("connected", ()=>console.log("Conectado a Mongo"))
mongoose.connection.on("error", error => console.log(error))

// Modelos
require("./api/models/usuario.model")

// Declaraciones
const app = express()

// Archivos estáticos
//app.use(express.static("./public"))

// Middlewares
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Rutas
app.use("/", routerIndex)
app.use("/usuario", routerUsuario)

// Manejadores de Errores
app.use(handlerErrors.notFound)
app.use(handlerErrors.general)

app.listen(4000, ()=>console.log("Servidor ejecutándose en el puerto 4000"))