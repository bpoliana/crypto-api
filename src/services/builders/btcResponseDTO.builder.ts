import { BtcResponseDTO } from '../../dto/BtcReponseDTO'
import { CurrencyDTO } from '../../dto/CurrencyDTO'

export const buildBtcResponseDTO = (btcResponse, currencies): BtcResponseDTO => {
  const { BRL, EUR, CAD } = currencies
  const { USD, BTC } = btcResponse.bpi
  const rateBTC = {
    BRL: BRL * USD.rate_float,
    EUR: EUR * USD.rate_float,
    CAD: CAD * USD.rate_float
  }

  const USDCurrency: CurrencyDTO = {
    code: USD.code,
    rate: USD.rate,
    description: USD.description,
    rate_float: USD.rate_float
  }

  const BRLCurrency: CurrencyDTO = {
    code: 'BRL',
    rate: rateBTC.BRL.toLocaleString(),
    description: 'Brazilian Real',
    rate_float: rateBTC.BRL
  }

  const EURCurrency: CurrencyDTO = {
    code: 'EUR',
    rate: rateBTC.EUR.toLocaleString(),
    description: 'Euro',
    rate_float: rateBTC.EUR
  }

  const CADCurrency: CurrencyDTO = {
    code: 'CAD',
    rate: rateBTC.CAD.toLocaleString(),
    description: 'Canadian Dolar',
    rate_float: rateBTC.CAD
  }

  const BTCCurrency: CurrencyDTO = {
    code: BTC.code,
    rate: BTC.rate,
    description: BTC.description,
    rate_float: BTC.rate_float
  }

  const btcResponseDTO: BtcResponseDTO = {
    time: btcResponse.time,
    disclaimer: btcResponse.disclaimer,
    bpi: { USD: USDCurrency, BRL: BRLCurrency, EUR: EURCurrency, CAD: CADCurrency, BTC: BTCCurrency }
  }
  return btcResponseDTO
}
