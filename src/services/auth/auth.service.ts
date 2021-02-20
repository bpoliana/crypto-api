import * as jwt from 'jsonwebtoken'
import { Authentication } from '../../protocols/authentication'

export class AuthService implements Authentication {
  private readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  async authenticate (value: string): Promise<string> {
    const accessToken = await jwt.sign(
      { id: value }, this.secret, { expiresIn: '1h' }
    )
    return accessToken
  }
}
