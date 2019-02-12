import express = require("express")
import {Request, Response, NextFunction} from "express"
import { RolController } from "../api/controllers/rol.controller";
import { IError } from "../interfaces/ierror.interface";
import { handlerErrors } from "../handlers/errores.handler"
const Router = express.Router()

const controlador = new RolController()

Router.get("/", handlerErrors.cacheo(controlador.listar))
Router.get("/:id", handlerErrors.cacheo(controlador.detallar))
Router.post("/", handlerErrors.cacheo(controlador.insertar))
Router.put("/:id", handlerErrors.cacheo(controlador.modificar))
Router.delete("/:id", handlerErrors.cacheo(controlador.eliminar))

export {Router}