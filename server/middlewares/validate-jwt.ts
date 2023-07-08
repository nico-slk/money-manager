import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

export const validateJwt = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers['authorization']

  if (!token) {
    res.status(403).json({
      msg: `There's no token available.`
    })
  }

  if (token && !token.startsWith('Bearer ')) {
    res.status(403).json({
      msg: `Token format is invalid.`
    })
  }

  try {

    jwt.verify(token!.slice(7), process.env.JWT_SECRET as Secret, (error, data) => {
      if (error) {
        res.status(401).json({
          msg: 'Error at token verfication',
          error
        })
      }
    })

  } catch (error) {

    res.status(401).json({
      msg: 'Invalid token',
      error
    })

  }

  next()


}