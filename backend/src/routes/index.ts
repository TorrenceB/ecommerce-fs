import { Router } from 'express'

import auth from '#auth'
import authenticateToken from "#middleware/authenticate-token";
import refreshAccessToken from "#middleware/refresh-access-token";
import createCheckoutSession from '#middleware/create-checkout-session';

const router = Router()

// Home
router.get('/', authenticateToken, (req, res) => {
    res.send("Home Page")
})

// User Account
router.get('/account/:id', authenticateToken, (req, res) => {
    const { id } = req.params

    res.send(`Account Page for user ${id}`)
})

// Auth
router.post('/auth/login', async (req, res, next) => {
    const { email, password } = req.body

    try {
        const data = await auth.signIn({ email, password })

        // Create cookie & add refresh token to it => { cookie: { refresh_token } }
        if (data.session?.refresh_token) {
            const { refresh_token } = data.session

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/auth/refresh'
            })
        }

        const body = {
            status: "success",
            message: "User successfully logged in.",
            token: data.session?.access_token,
            user: data.user
        }

        res.status(200).json(body)
    } catch (error) {
        console.error(error)

        next(`An error occurred while trying to log user in: ${error}`)
    }

})

router.post('/auth/signup', async (req, res, next) => {
    const { email, password } = req.body

    try {
        const data = await auth.signUp({ email, password })

        res.status(200).json({ status: "success", message: "User created successfully", user: data.user })
    } catch (error: any) {
        next(`An error occurred while trying to sign user up: ${error.message}`)
    }
})

router.post('/auth/refresh', refreshAccessToken)

// stripe
router.post('/create-checkout-session', createCheckoutSession)

// test connection
router.get("/test", (req, res) => {
    res.status(200).json({ status: "Connection to API is OK" })
})

export default router;