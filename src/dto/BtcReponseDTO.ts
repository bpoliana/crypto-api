import { CurrencyDTO } from './CurrencyDTO'
import { Time } from './TimeDTO'

export interface BtcResponseDTO {
  time: Time
  disclaimer: string
  bpi: {USD: CurrencyDTO, BRL: CurrencyDTO, EUR: CurrencyDTO, CAD: CurrencyDTO, BTC: CurrencyDTO}
}
