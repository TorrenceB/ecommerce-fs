import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";

import jwt from "jsonwebtoken"
import jwksClient from 'jwks-rsa'

const client = jwksClient({
    jwksUri: process.env.SUPABASE_JWKS_URI ?? "",
})

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'No token provided.' })
    }

    try {
        const signingKey = await client.getSigningKey(process.env.SUPABASE_JWT_KID)
        const publicKey = signingKey.getPublicKey()
        const payload = await jwt.verify(token, publicKey) as JwtPayload

        req.user = payload;

        next()
    } catch (error) {
        return res.status(403).json({ status: 'error', message: `Invalid or Expired token. ${error}` })
    }
}

export default authenticateToken;