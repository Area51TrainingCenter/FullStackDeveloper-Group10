import { Request, Response, NextFunction } from "express"
import { BaseController } from "./base.controller";
import Usuario from "../models/usuario.model";
import { createRefreshToken, createAccessToken } from "../services/tokens.service";

export class UsuarioController extends BaseController {
  constructor(){
    super(Usuario)
  }

  async insertar(req: Request, res: Response, next: NextFunction) {
    const data = req.body
    data.refreshToken = createRefreshToken()
    const element = new Usuario(data)

    await element.save()

    res.json({status: 201, message: "Document created"})
  }

  async login(req: Request, res: Response, next:NextFunction) {
    const correo = req.body.correo.toLowerCase().trim()
    const contrasena = req.body.contrasena.trim()

    const usuario = await Usuario.findOne({correo, contrasena})

    if(usuario) {
      const accessToken = createAccessToken(usuario._id, usuario.nombre, usuario.rol.nombre)
      const refreshToken = usuario.refreshToken
      return res.json({accessToken, refreshToken})
    }

    return res
            .status(404)
            .json({
              status: 404,
              message: "User not found"
            })
  }

  async newAccessToken(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.body.refreshToken

    const usuario = await Usuario.findOne({refreshToken})

    if(usuario) {
      const accessToken = createAccessToken(usuario._id, usuario.nombre, usuario.rol.nombre)

      res.json({accessToken})
    } else {
      res
        .status(404)
        .json({
          status: 404,
          message: "User not logged"
        })
    }
  }
}