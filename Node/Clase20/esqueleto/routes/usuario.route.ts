import express = require("express")
import {Request, Response, NextFunction} from "express"
import { UsuarioController } from "../api/controllers/usuario.controller";

const Router = express.Router()

const controlador = new UsuarioController()

Router.get("/", controlador.listar)
Router.get("/:id", controlador.detallar)
Router.post("/", controlador.insertar)
Router.put("/:id", controlador.modificar)
Router.delete("/:id", controlador.eliminar)

export {Router}