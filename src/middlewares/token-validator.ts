
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { jwtSecret } from '../config'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization
  let jwtPayload
  try {
    jwtPayload = jwt.verify(token.toString(), jwtSecret)
    res.locals.jwtPayload = jwtPayload
  } catch (error) {
    res.status(401).send({ message: 'Token inválido' })
    return
  }

  const { id } = jwtPayload
  console.log(jwtPayload)
  const newToken = jwt.sign({ id }, jwtSecret, {
    expiresIn: '1h'
  })
  res.setHeader('accessToken', newToken)
  next()
}
