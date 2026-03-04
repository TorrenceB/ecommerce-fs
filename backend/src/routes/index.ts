import { Router } from 'express'
import { AppError } from '#utility'

import auth from '#auth'
import products from '#data-access/products'

const router = Router()

// Home
router.get('/', (req, res) => {
    res.send("Home Page")
})

// Auth routes
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const data = await auth.signIn({ email, password })

        res.status(200).json({ status: "success", message: "User logged in successfully", user: data.user })
    } catch (error: any) {
        res.status(400).send({ status: "error", message: `An error occurred while trying to log user in: ${error.message}` })
    }
})

router.post('/signup', async (req, res) => {
    const { email, password } = req.body

    try {
        const data = await auth.signUp({ email, password })

        res.status(200).json({ status: "success", message: "User created successfully", user: data.user })
    } catch (error: any) {
        res.status(400).send({ status: "error", message: `An error occurred while trying to sign user up: ${error.message}` })
    }
})

// Product routes
router.get('/products', async (req, res) => {
    try {
        const results = await products.getAll()

        res.status(200).send(results)
    } catch (error: any) {
        res.status(400).send({ status: "error", message: `An error occurred while retrieving all products: ${error.message}` })
    }
})

router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            throw new AppError(`product id is required`, 400)
        }

        const results = await products.getOne(id)

        res.status(200).send(results)
    } catch (error: any) {
        res.status(400).send({ status: "error", message: `An error occurred while retrieving all products: ${error.message}` })
    }
})

export default router;