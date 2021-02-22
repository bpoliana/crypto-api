import { CurrencyDTO } from './CurrencyDTO'
import { Time } from './TimeDTO'

export interface CoinDeskResponseDTO {
  time: Time
  disclaimer: string
  bpi: {USD: CurrencyDTO, BTC: CurrencyDTO}
}
