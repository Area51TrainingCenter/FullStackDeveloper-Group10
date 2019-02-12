import {Request, Response, NextFunction } from "express"

export class BaseController {

  constructor(private modelo: any){
    this.listar = this.listar.bind(this)
    this.detallar = this.detallar.bind(this)
    this.insertar = this.insertar.bind(this)
    this.modificar = this.modificar.bind(this)
    this.eliminar = this.eliminar.bind(this)
  }

  async listar(req: Request, res: Response, next: NextFunction) {
    const list = await this.modelo.find()

    res.json({
      status: 200,
      results: list
    })
  }
  async detallar(req: Request, res: Response, next: NextFunction) {
    const _id = req.params.id
    const element = await this.modelo.findOne({_id})

    res.json({status:200, result: element})
  }
  async insertar(req: Request, res: Response, next: NextFunction) {
    const data = req.body
    const element = new this.modelo(data)
/*     element.nombre = data.nombre
    element.apellido = data.apellido
    element.correo = data.correo
    element.contrasena = data.contrasena */

    await element.save()

    res.json({status: 201, message: "Document created"})
  }
  async modificar(req: Request, res: Response, next: NextFunction) {
    const data = req.body
    const _id = req.params.id

    await this.modelo.findOneAndUpdate({_id}, data)

/*     const usuario = await this.modelo.findOne({_id})

    if(usuario) {
      usuario.nombre = data.nombre
      await usuario.save()
    } */

    res
      .json({status: 201, message: "Document modified"})
  }
  async eliminar(req: Request, res: Response, next: NextFunction) {
    const _id = req.params.id

    await this.modelo.findOneAndRemove({_id})

    res
      .json({status: 201, message: "Document deleted"})
  }
}