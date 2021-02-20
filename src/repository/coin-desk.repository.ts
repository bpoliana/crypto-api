import fs from 'fs'

export class CoinDeskRepository {
  save = (btcResponse: object) => {
    fs.writeFileSync('src/db/coin-desk-response.json', JSON.stringify(btcResponse, null, 2))
  }
}
