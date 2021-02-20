import * as jwt from 'jsonwebtoken'
import { IAuthentication } from '../../protocols/authentication'

export class AuthService implements IAuthentication {
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
