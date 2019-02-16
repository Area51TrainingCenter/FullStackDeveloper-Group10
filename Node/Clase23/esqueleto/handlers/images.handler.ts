import multer = require("multer")
import jimp = require("jimp")
import uuid = require("uuid")

import { IError } from "../interfaces/ierror.interface";
import { Request, Response, NextFunction } from "express";

const handlerImages = {
    upload: () => {
        const opciones = {
            storage: multer.memoryStorage(),
            fileFilter: (req, file, next) => {
                const esFoto: boolean = file.mimetype.startsWith("image/")

                if(esFoto) return next(null, true)

                const error: IError = new Error("The file is not an image")
                error.status = 500
                next(error, false)
            }
        }

        return multer(opciones).single("foto")
    },
    save: () => {
        return async (req: Request, res: Response, next: NextFunction) => {
            if(!req.file) return next()

            const extension = req.file.mimetype.split("/")[1]
            const nombre = uuid.v4()

            req.body.foto = `${nombre}.${extension}`

            const foto = await jimp.read(req.file.buffer)
            await foto.resize(80, jimp.AUTO)
            await foto.write(`./public/uploads/${req.body.foto}`)

            next()
        }
    }
}

export {handlerImages}