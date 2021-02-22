import axios from 'axios'
import { CoinDeskResponseDTO } from '../../../dto/CoinDeskResponseDTO'

export class CoinDeskClient {
  async getBtc (): Promise<CoinDeskResponseDTO> {
    const coinDeskResponse = await axios
      .get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
      .then((response) => {
        return response.data
      })
    return coinDeskResponse
  }
}
