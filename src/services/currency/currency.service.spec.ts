import { CoinDeskResponseDTO } from '../../dto/CoinDeskResponseDTO'
import { CurrenciesDTO } from '../../dto/CurrenciesDTO'
import { CurrencyRepository } from '../../repository/currency.repository'
import { CoinDeskClient } from '../client/coin-desk/coin-desk.client'
import { CurrencyService } from './currency.service'

const makeCoinDeskesponse = (): CoinDeskResponseDTO => ({
  time: {
    updated: 'Feb 21, 2021 03:57:00 UTC',
    updatedISO: '2021-02-21T03:57:00+00:00',
    updateduk: 'Feb 21, 2021 at 03:57 GMT'
  },
  disclaimer: 'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
  bpi: {
    USD: {
      code: 'USD',
      rate: '10',
      description: 'United States Dollar',
      rate_float: 10
    },
    BTC: {
      code: 'BTC',
      rate: '1.0000',
      description: 'Bitcoin',
      rate_float: 1
    }
  }
})

const makeCurrencies = (): CurrenciesDTO => ({
  BRL: '5.400',
  EUR: '0.920',
  CAD: '1.440'
})
interface factoryTypes {
  coinDeskClientStub: CoinDeskClient
  currencyService: CurrencyService
  currencyRepositoryStub: CurrencyRepository
}

const makeCurrencyService = (): factoryTypes => {
  const coinDeskClientStub = new CoinDeskClient()
  const currencyRepositoryStub = new CurrencyRepository()

  const currencyService = new CurrencyService(coinDeskClientStub, currencyRepositoryStub)
  return {
    coinDeskClientStub,
    currencyService,
    currencyRepositoryStub
  }
}

describe('Currency Service', () => {
  test('Should return correct btcResponseDTO when builder is called correctly', async () => {
    const { coinDeskClientStub, currencyService, currencyRepositoryStub } = makeCurrencyService()
    jest.spyOn(coinDeskClientStub, 'getBtc').mockReturnValueOnce(new Promise(resolve => resolve(makeCoinDeskesponse())))
    jest.spyOn(currencyRepositoryStub, 'getCurrencies').mockReturnValueOnce(makeCurrencies())
    const response = await currencyService.getCurrencies()
    expect(response).toStrictEqual(
      {
        time: {
          updated: 'Feb 21, 2021 03:57:00 UTC',
          updatedISO: '2021-02-21T03:57:00+00:00',
          updateduk: 'Feb 21, 2021 at 03:57 GMT'
        },
        disclaimer: 'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
        bpi: {
          USD: {
            code: 'USD',
            rate: '10',
            description: 'United States Dollar',
            rate_float: 10
          },
          BRL: {
            code: 'BRL',
            rate: '54',
            description: 'Brazilian Real',
            rate_float: 54
          },
          EUR: {
            code: 'EUR',
            rate: '9.2',
            description: 'Euro',
            rate_float: 9.200000000000001
          },
          CAD: {
            code: 'CAD',
            rate: '14.4',
            description: 'Canadian Dolar',
            rate_float: 14.399999999999999
          },
          BTC: {
            code: 'BTC',
            rate: '1.0000',
            description: 'Bitcoin',
            rate_float: 1
          }
        }
      }
    )
  })

  test('Should return TypeError if CoinDesk Client returns invalid response', async () => {
    try {
      const { coinDeskClientStub, currencyService, currencyRepositoryStub } = makeCurrencyService()
      jest.spyOn(coinDeskClientStub, 'getBtc').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))
      jest.spyOn(currencyRepositoryStub, 'getCurrencies').mockReturnValueOnce(makeCurrencies())
      await currencyService.getCurrencies()
    } catch (err) {
      expect(err).toStrictEqual(new TypeError('Invalid btc return'))
    }
  })
  test('Should return TypeError if Currency Repository returns invalid response', async () => {
    try {
      const { coinDeskClientStub, currencyService, currencyRepositoryStub } = makeCurrencyService()
      jest.spyOn(coinDeskClientStub, 'getBtc').mockReturnValueOnce(new Promise(resolve => resolve(makeCoinDeskesponse())))
      jest.spyOn(currencyRepositoryStub, 'getCurrencies').mockReturnValueOnce(undefined)
      await currencyService.getCurrencies()
    } catch (err) {
      expect(err).toStrictEqual(new TypeError('Invalid CurrencyRepository return'))
    }
  })
})
