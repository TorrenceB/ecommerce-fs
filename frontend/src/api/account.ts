export const getAccount = async (userId: string, token: string) => {
    try {
        if (!token) {
            throw new Error("Token required")
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/account/:${userId}`, {
            method: "GET",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
        })

        if (!response.ok) {
            const error = await response.json()

            throw new Error(error.message)
        }

        const data = await response.json()

        return data;
    } catch (error: any) {
        const errorMsg = error instanceof Error ? error.message : "Internal server error"

        console.error(errorMsg)

        throw new Error(errorMsg)
    }
}