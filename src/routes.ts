import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  return res.status(200).send({
    message: 'Bem vinda a crypto API'
  })
})

export { router }