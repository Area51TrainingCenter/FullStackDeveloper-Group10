import express = require("express")
import {Request, Response, NextFunction} from "express"
import { UsuarioController } from "../api/controllers/usuario.controller";
import { handlerErrors } from "../handlers/errores.handler";

const Router = express.Router()

const controlador = new UsuarioController()

Router.get("/", handlerErrors.cacheo(controlador.listar))
Router.get("/:id", handlerErrors.cacheo(controlador.detallar))
Router.post("/", handlerErrors.cacheo(controlador.insertar))
Router.put("/:id", handlerErrors.cacheo(controlador.modificar))
Router.delete("/:id", handlerErrors.cacheo(controlador.eliminar))
Router.post("/login", handlerErrors.cacheo(controlador.login))

export {Router}