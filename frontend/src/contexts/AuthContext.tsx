import { useState, useEffect, createContext, type ReactNode, useContext } from "react";
import { login as authLogin } from "../api/auth";
import type { Auth, User } from "../types";

interface Props {
    children: ReactNode
}

const AuthContext = createContext<Auth | null>(null)

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        console.log(`Token is set: ${token}`)
    }, [token])

    const signup = async () => { }
    const login = async ({ email, password }: { email: string, password: string }) => {
        try {
            const data = await authLogin({ email, password })

            setUser(data.user)
            setToken(data.token)

            return data;
        } catch (error) {
            console.error(error)
        }
    }
    const logout = async () => { }

    const context: Auth = {
        user,
        token,
        isAuthenticated: !!user,
        login,
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default useAuth;