import { UpdateCurrencyDTO } from '../../dto/UpdateCurrencyDTO'
import { CurrencyRepository } from '../../repository/currency.repository'
import { buildBtcResponseDTO } from '../builders/btcResponseDTO.builder'
import { CoinDeskClient } from '../client/coin-desk/coin-desk.client'

export class CurrencyService {
  private readonly coinDeskClient: CoinDeskClient
  private readonly currencyRepository: CurrencyRepository

  constructor (coinDeskClient?: CoinDeskClient, currencyRepository?: CurrencyRepository) {
    this.coinDeskClient = coinDeskClient || new CoinDeskClient()
    this.currencyRepository = currencyRepository || new CurrencyRepository()
  }

  async getCurrencies () {
    const btcResponse = await this.coinDeskClient.getBtc()
    if (!btcResponse) {
      throw new TypeError('Invalid btc return')
    }

    const currencies = this.currencyRepository.getCurrencies()
    if (!currencies) {
      throw new TypeError('Invalid CurrencyRepository return')
    }

    const btcResponseDTO = buildBtcResponseDTO(btcResponse, currencies)

    return btcResponseDTO
  }

  async updateCurrencies (currency: UpdateCurrencyDTO) {
    const currencies = await this.currencyRepository.getCurrencies()
    currencies[currency.currency] = currency.value.toString()
    this.currencyRepository.save(currencies)
  }
}
