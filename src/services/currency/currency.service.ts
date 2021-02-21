import { UpdateCurrencyDTO } from '../../dto/UpdateCurrencyDTO'
import { CoinDeskRepository } from '../../repository/coin-desk.repository'
import { CurrencyRepository } from '../../repository/currency.repository'
import { buildBtcResponseDTO } from '../builders/btcResponseDTO.builder'
import { CoinDeskClient } from '../client/coin-desk/coin-desk.client'

export class CurrencyService {
  async getCurrencies () {
    const coinDeskService = new CoinDeskClient()
    const btcResponse = await coinDeskService.getBtc()

    const coinDeskRepository = new CoinDeskRepository()
    coinDeskRepository.save(btcResponse)

    const currencyRepository = new CurrencyRepository()
    const currencies = currencyRepository.getCurrencies()

    const btcResponseDTO = buildBtcResponseDTO(btcResponse, currencies)

    return btcResponseDTO
  }

  async updateCurrencies (currency: UpdateCurrencyDTO) {
    const currencyRepository = new CurrencyRepository()
    const currencies = await currencyRepository.getCurrencies()
    currencies[currency.currency] = currency.value.toString()
    currencyRepository.save(currencies)
  }
}
