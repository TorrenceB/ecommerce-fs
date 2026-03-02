import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.send("Home Page")
})

router.get('/account', (req, res) => {
    res.send("Account Page")
})

export default router;