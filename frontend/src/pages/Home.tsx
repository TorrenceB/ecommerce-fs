import { useAuth } from "../contexts/AuthContext"
import type { Auth } from "../types"

const Home = () => {
    const { user } = useAuth() as Auth

    return (
        <div>User logged in: {user?.id}</div>
    )
}

export default Home