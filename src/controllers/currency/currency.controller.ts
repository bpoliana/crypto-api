import { Request, Response } from 'express'
import { internalServerError, ok } from '../../helpers/http-helper'
import { CurrencyService } from '../../services/currency/currency.service'

class CurrencyController {
  async handle (req: Request, res: Response) {
    try {
      const currencyService = new CurrencyService()
      const serviceResponse = await currencyService.getCurrencies()
      return ok(res, serviceResponse)
    } catch (ServerError) {
      return internalServerError(res, ServerError)
    }
  }
}

export default new CurrencyController()
