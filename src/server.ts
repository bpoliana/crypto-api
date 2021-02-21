import express from 'express'
import cors from 'cors'
import { routes } from './routes'
import { endpointNotFound } from './middlewares/no-endpoint'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.get('/', (req, res, next) => {
  res.status(200).send({
    message: 'Bem vinda a crypto API'
  })
  next()
})

app.use(endpointNotFound)

app.listen(3000, () => {
  console.log('Server started on port 3000!')
})
