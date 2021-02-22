import fs from 'fs'
import { CurrenciesDTO } from '../dto/CurrenciesDTO'

export class CurrencyRepository {
  getCurrencies = (): CurrenciesDTO => {
    const data = fs.readFileSync('src/db/currencies.json')
    const currencies = JSON.parse(data.toString())
    return currencies
  }

  save = (currencies) => {
    fs.writeFileSync('src/db/currencies.json', JSON.stringify(currencies, null, 2))
  }
}
