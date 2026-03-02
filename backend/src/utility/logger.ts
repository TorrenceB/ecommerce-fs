import type { Request, Response, NextFunction } from "express";

import fs from "fs"
import path from "path";

const createLogDirectory = async () => {
    try {
        const directory = path.join(import.meta.dirname, '..', 'logs')

        await fs.promises.mkdir(directory, { recursive: true })

        return directory;
    } catch (error) {
        console.error(`Failed to create log directory`, error)
    }
}

const createLogFile = async (directory: string, content: string) => {
    try {
        const filePath = path.join(directory, 'logs.txt')
        const data = `\n[App Log]:${new Date().toISOString()} - ${content}`

        await fs.promises.appendFile(filePath, data)
    } catch (error) {
        console.error(`Failed to create log file`, error)
    }
}

/* Custom logger middleware */
const createLog = (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", async () => {
        const directory = await createLogDirectory()

        if (directory) {
            await createLogFile(directory, `${req.method} ${req.url}`)
        }
    })

    next()
}

export default createLog;