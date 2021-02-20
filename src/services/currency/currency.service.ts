import fs from 'fs'
import { CoinDeskClient } from '../client/coin-desk/coin-desk.client'

export class CurrencyService {
  async getCurrencies () {
    const coinDeskService = new CoinDeskClient()
    const btcResponse = await coinDeskService.getBtc()

    fs.writeFileSync('src/db/coin-desk-response.json', JSON.stringify(btcResponse, null, 2))

    const data = fs.readFileSync('src/db/currencies.json')
    const currencies = JSON.parse(data.toString())

    const { BRL, EUR, CAD } = currencies
    const { USD } = btcResponse.bpi
    const rateBTC = {
      BRL: BRL * USD.rate_float,
      EUR: EUR * USD.rate_float,
      CAD: CAD * USD.rate_float
    }
    const currenciesBTCBased = {
      BRL: {
        code: 'BRL',
        rate: rateBTC.BRL.toLocaleString(),
        description: 'Brazilian Real',
        rate_float: rateBTC.BRL
      },
      EUR: {
        code: 'EUR',
        rate: rateBTC.EUR.toLocaleString(),
        description: 'Euro',
        rate_float: rateBTC.EUR
      },
      CAD: {
        code: 'CAD',
        rate: rateBTC.CAD.toLocaleString(),
        description: 'Canadian Dolar',
        rate_float: rateBTC.CAD
      }
    }
    return ({
      ...btcResponse,
      bpi: { ...btcResponse.bpi, ...currenciesBTCBased }
    })
  }
}
