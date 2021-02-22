import { CoinDeskClient } from './coin-desk.client'

describe('CoinDesk Client', () => {
  test('Should return a response to Coin Desk API called successfully', async () => {
    const coinDeskResponse = new CoinDeskClient()
    const response = await coinDeskResponse.getBtc()
    expect(response).toBeDefined()
  })
})
