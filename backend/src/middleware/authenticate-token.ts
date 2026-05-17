import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";

import jwt from "jsonwebtoken"
import client from "#plugins/jwks"

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'No token provided.' })
    }

    try {
        const signingKey = await client.getSigningKey(process.env.SUPABASE_JWT_KID)
        const publicKey = signingKey.getPublicKey()
        const payload = await jwt.verify(token, publicKey)

        req.user = payload as JwtPayload;

        next()
    } catch (error) {
        next(error)
        // return res.status(403).json({ status: 'error', message: `Invalid or Expired token. ${error}` })
    }
}

export default authenticateToken;