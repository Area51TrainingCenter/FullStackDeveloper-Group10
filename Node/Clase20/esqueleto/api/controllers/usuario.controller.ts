import { Request, Response, NextFunction } from "express"
import { BaseController } from "./base.controller";
import Usuario from "../models/usuario.model";

export class UsuarioController extends BaseController {
  constructor(){
    super(Usuario)
  }
}