import { Request, Response } from 'express'
import { internalServerError, ok } from '../../helpers/http-helper'
import { CoinDeskService } from '../../services/coin-desk/coin-desk.service'

class CoinDeskController {
  async handle (req: Request, res: Response) {
    try {
      const coinDeskService = new CoinDeskService()
      const btcResponse = await coinDeskService.getBtc()
      return ok(res, btcResponse)
    } catch (ServerError) {
      return internalServerError(res, ServerError)
    }
  }
}

export default new CoinDeskController()
