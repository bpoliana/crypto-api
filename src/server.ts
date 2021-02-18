import express from 'express'
import cors from 'cors'
import { routes } from './routes'

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

app.listen(3000, () => {
  console.log('Server started on port 3000!')
})
