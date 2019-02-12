import express = require("express")
import { Request, Response, NextFunction} from "express"

const Router = express.Router()

Router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res
    .type("text/html")
    .send("<h1>Home</h1>")
})

export {Router}