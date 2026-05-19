import { AppError } from "#utility"
import Stripe from "stripe"


const getStripeClient = () => {
    if (!process.env.STRIPE_SECRET_KEY) {
        return new AppError("No stripe secret provided", 401)
    }

    const client = new Stripe(process.env.STRIPE_SECRET_KEY)

    return client;
}

export default getStripeClient;