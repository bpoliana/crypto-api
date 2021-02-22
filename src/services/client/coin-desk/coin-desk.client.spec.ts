/* eslint-disable @typescript-eslint/no-var-requires */

import { CoinDeskClient } from './coin-desk.client'

describe('CoinDesk Client', () => {
  test('Should return 200 when calls Coin Desk API successfully', async () => {
    const coinDeskResponse = new CoinDeskClient()
    const response = await coinDeskResponse.getBtc()
    expect(response).toBeDefined()
  })
})
