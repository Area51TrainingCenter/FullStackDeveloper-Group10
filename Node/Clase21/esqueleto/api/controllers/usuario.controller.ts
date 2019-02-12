import { Request, Response, NextFunction } from "express"
import { BaseController } from "./base.controller";
import Usuario from "../models/usuario.model";

export class UsuarioController extends BaseController {
  constructor(){
    super(Usuario)
  }

  /* async listar(req: Request, res: Response, next: NextFunction) {
    const list = await Usuario.find().populate("rol")

    res.json({
      status: 200,
      results: list
    })
  } */
}