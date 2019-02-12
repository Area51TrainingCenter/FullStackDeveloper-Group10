import express = require("express")
import {Request, Response, NextFunction} from "express"
import { RolController } from "../api/controllers/rol.controller";
import { IError } from "../interfaces/ierror.interface";
import { handlerErrors } from "../handlers/errores.handler"
const Router = express.Router()

const controlador = new RolController()

Router.get("/", controlador.listar)
Router.get("/:id", controlador.detallar)
Router.post("/", handlerErrors.cacheo(controlador.insertar))
Router.put("/:id", controlador.modificar)
Router.delete("/:id", controlador.eliminar)

export {Router}