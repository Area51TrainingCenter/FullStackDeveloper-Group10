import { Request, Response, NextFunction } from "express"
import { IError } from "../interfaces/ierror.interface";

const handlerErrors = {
  notFound(req: Request, res: Response, next: NextFunction) {
    const error: IError = new Error("Path not found")
    error.status = 404

    next(error)
  },
  cacheo(ftn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return (rq: Request, rs: Response, nx: NextFunction) => {
    return ftn(rq, rs, nx).catch(
      (error: IError) => {
        error.status = 500
        nx(error)
      }
    )
  }
},
general(error: IError, req: Request, res: Response, next: NextFunction) {
  res
    .status(error.status)
    .json({
      status: error.status,
      message: error.message,
      stack: error.stack
    })
}
}

export { handlerErrors }