import fs from 'fs'

export class CurrencyRepository {
  getCurrencies = () => {
    const data = fs.readFileSync('src/db/currencies.json')
    const currencies = JSON.parse(data.toString())
    return currencies
  }
}
