import { Request, Response, NextFunction} from "express"
import { decodeAccessToken } from "../services/tokens.service";
import { access } from "fs";

const authentication = (req: Request, res: Response, next:NextFunction) => {
    if(req.headers && req.headers["authorization"]) {
        const accessToken = req.headers["authorization"].split(" ")[1]

        decodeAccessToken(accessToken)
            .then(
                (payload:any) => {
                    res.locals._id = payload._id
                    res.locals.nombre = payload.nombre
                    res.locals.rol = payload.rol
                    next()
                }
            )
            .catch(
                (error:any) => {
                    res
                        .status(error.status)
                        .json({
                            status: error.status,
                            message: error.message
                        })
                }
            )
    } else {
        res
        .status(409)
        .json({
            status: 409,
            message: "User not logged"
        })
    }

    
}

export {authentication}