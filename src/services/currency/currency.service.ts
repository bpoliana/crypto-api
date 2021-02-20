import fs from 'fs'
import { CoinDeskClient } from '../client/coin-desk/coin-desk.client'

export class CurrencyService {
  async getCurrencies () {
    const coinDeskService = new CoinDeskClient()
    const btcResponse = await coinDeskService.getBtc()
    await fs.writeFile('src/db/coin-desk-response.json', JSON.stringify(btcResponse, null, 2), 'utf8', () => {})
    return btcResponse
  }
}
