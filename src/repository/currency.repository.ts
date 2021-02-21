import fs from 'fs'

export class CurrencyRepository {
  getCurrencies = () => {
    const data = fs.readFileSync('src/db/currencies.json')
    const currencies = JSON.parse(data.toString())
    return currencies
  }

  save = (currencies) => {
    fs.writeFileSync('src/db/currencies.json', JSON.stringify(currencies, null, 2))
  }
}
