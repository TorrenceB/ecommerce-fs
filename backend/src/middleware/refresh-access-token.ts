import type { Request, Response, NextFunction } from "express";

import supabase from "#database";

const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
        return res.status(401).json({ status: 'error', message: 'No refresh token provided.' })
    }

    const { data, error } = await supabase.auth.refreshSession({ refresh_token })

    if (error) {
        next(error)
    }

    return res.status(200).json({ accessToken: data.session?.access_token });
}

export default refreshAccessToken;