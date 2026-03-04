import { AppError } from "#utility"

const getAll = async () => {
    try {
        const request = new Request(`${process.env.FAKE_STORE_BASE_URL}/products`)
        const response = await fetch(request)

        if (response.ok) {
            const data = await response.json()

            return data;
        } else {
            throw new AppError(`There was an error while retrieving all products`, 400)
        }
    } catch (error: any) {
        throw new AppError(error.message, 400)
    }
}

const getOne = async (id: string = "") => {
    try {
        const request = new Request(`${process.env.FAKE_STORE_BASE_URL}/products/${id}`)
        const response = await fetch(request)

        if (response.ok) {
            const data = await response.json()

            return data;
        } else {
            throw new AppError(`There was an error while retrieving product ${id}`, 400)
        }
    } catch (error: any) {
        throw new AppError(error.message, 400)
    }
}

const products = {
    getAll,
    getOne
}

export default products