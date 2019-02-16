import jwt = require("jwt-simple")
import moment = require("moment")
import randToken = require("rand-token")

const palabraSecreta = process.env.KEYWORD_SECRET

const createAccessToken = (_id: string, nombre: string, rol: string): string => {
    const payload = {
        _id,
        nombre,
        rol,
        iat: moment().unix(),
        exp: moment().add(30, "seconds").unix()
    }

    const accessToken = jwt.encode(payload, palabraSecreta)

    return accessToken
}

const createRefreshToken = (): string => {
    const refreshToken = randToken.uid(256)

    return refreshToken
}

const decodeAccessToken = (accessToken: string): Promise<any> => {
    const promesa = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(accessToken, palabraSecreta)
            resolve(payload)
        } catch (error) {
            if(error.message.toLowerCase() == "token expired") {
                reject({
                    status: 401,
                    message: "Token has expired"
                })
            } else {
                reject({
                    status: 500,
                    message: "Token invalid"
                })
            }
        }
    })

    return promesa
}

export {createAccessToken, createRefreshToken, decodeAccessToken}