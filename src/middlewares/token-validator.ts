
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { jwtSecret } from '../config'
import { UnauthorizedError } from '../errors/unauthorized-error'
import { unauthorized } from '../helpers/http-helper'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization
  let jwtPayload
  try {
    jwtPayload = jwt.verify(token.toString(), jwtSecret)
    res.locals.jwtPayload = jwtPayload
  } catch (err) {
    const error = new UnauthorizedError('Token inválido')
    return unauthorized(res, error)
  }

  const { id } = jwtPayload
  const newToken = jwt.sign({ id }, jwtSecret, {
    expiresIn: '1h'
  })
  res.setHeader('token', newToken)
  next()
}
