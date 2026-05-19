import type { Request, Response, NextFunction } from "express"
import getStripeClient from "#plugins/stripe"

const createCheckoutSession = async (req: Request, res: Response, next: NextFunction) => {
    const stripe = getStripeClient()

    if (stripe && "checkout" in stripe) {
        const session = await stripe.checkout.sessions.create({})

        res.send({ clientSecret: session.client_secret })
    }
}

export default createCheckoutSession;