import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { UpdateCurrencyDTO } from '../../dto/UpdateCurrencyDTO'
import { internalServerError, ok } from '../../helpers/http-helper'
import { CurrencyService } from '../../services/currency/currency.service'
class CurrencyController {
  async getCurrencies (req: Request, res: Response) {
    try {
      const currencyService = new CurrencyService()
      const serviceResponse = await currencyService.getCurrencies()
      return ok(res, serviceResponse)
    } catch (err) {
      return internalServerError(res, err)
    }
  }

  async updateCurrencies (req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        let errorMessage = ''
        if (errors.array()[0].param === 'currency') {
          errorMessage = 'Moeda invalida'
        } else {
          errorMessage = 'Valor invalido'
        }
        return res.status(400).send({ message: errorMessage })
      }
      const currencyService = new CurrencyService()
      const currencies: UpdateCurrencyDTO = req.body
      await currencyService.updateCurrencies(currencies)
      return ok(res, 'Valor alterado com sucesso!')
    } catch (err) {
      return internalServerError(res, err)
    }
  }
}

export default new CurrencyController()
