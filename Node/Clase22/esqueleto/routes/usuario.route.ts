import express = require("express")
import {Request, Response, NextFunction} from "express"
import { UsuarioController } from "../api/controllers/usuario.controller";
import { handlerErrors } from "../handlers/errores.handler";
import { authentication } from "../api/policies/authentication.policy";
import { authorization } from "../api/policies/authorization.policy";

const Router = express.Router()

const controlador = new UsuarioController()

Router.get("/", authentication, authorization("admin","operador"), handlerErrors.cacheo(controlador.listar))
Router.get("/:id", handlerErrors.cacheo(controlador.detallar))
Router.post("/", handlerErrors.cacheo(controlador.insertar))
Router.put("/:id", handlerErrors.cacheo(controlador.modificar))
Router.delete("/:id", handlerErrors.cacheo(controlador.eliminar))
Router.post("/login", handlerErrors.cacheo(controlador.login))
Router.post("/new-access-token", handlerErrors.cacheo(controlador.newAccessToken))

export {Router}