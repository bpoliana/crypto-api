import axios from 'axios'

export class CoinDeskClient {
  async getBtc () {
    const coinDeskResponse = await axios
      .get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
      .then((response) => {
        return response.data
      })
    return coinDeskResponse
  }
}
