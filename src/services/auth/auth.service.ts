import * as jwt from 'jsonwebtoken'

export class AuthService {
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
