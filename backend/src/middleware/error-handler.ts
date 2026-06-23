import type { ErrorRequestHandler, Request, Response, NextFunction } from "express";

const errorHandler: ErrorRequestHandler = async (err, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)

    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        statusCode,
        status: err.status,
        message: err.message ?? "Internal Server Error"
    })
}

export default errorHandler;