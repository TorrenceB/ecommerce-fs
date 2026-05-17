import type { ErrorRequestHandler, Request, Response, NextFunction } from "express";

import { AppError } from "#utility";

const errorHandler: ErrorRequestHandler = async (err, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)

    const statusCode = err.statusCode || 500;
    const errorResponse = new AppError(err.message || 'Internal Server Error', statusCode)

    res.status(statusCode).json(errorResponse)
}

export default errorHandler;