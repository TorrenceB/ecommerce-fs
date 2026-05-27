import type { LoginCredentials } from "../types"

export const login = async ({ email, password }: LoginCredentials) => {
    try {
        const body = {
            email,
            password
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            throw new Error(`Login failed with response code ${response.status}`)
        }

        const data = await response.json()

        return data;
    } catch (error: any) {
        const errorMsg = error instanceof Error ? error.message : "Internal server error"

        console.error(errorMsg)

        throw new Error(errorMsg)
    }
}