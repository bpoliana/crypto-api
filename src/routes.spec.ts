import request from 'supertest'
import express from 'express'
import { routes } from './routes'
import { endpointNotFound } from './middlewares/no-endpoint'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use('/api', routes, endpointNotFound)
app.get('/', (req, res, next) => {
  res.status(200).send({
    message: 'Bem vinda a crypto API'
  })
  next()
}, endpointNotFound)

describe('Router Controller', () => {
  test('Should return unauthorized on GET from /api/crypto/btc with auth', async (done) => {
    request(app)
      .get('/api/crypto/btc')
      .expect(401, done)
  })

  test('Should return 200 on GET from /api/login', async (done) => {
    request(app)
      .get('/')
      .expect(200, done)
  })
})
