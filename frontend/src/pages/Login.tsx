import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import type { Auth } from "../types";

const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuth() as Auth

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    return (
        <div className="flex flex-col items-center gap-6 m-auto bg-gray-50 rounded-md p-8">
            <h1 className="text-4xl">Welcome Back</h1>
            <p className="text-sm">Please enter your Email and Password</p>
            <form onSubmit={async (event) => {
                setIsLoading(true)

                event.preventDefault()

                try {
                    const data = await login({ email: credentials.email, password: credentials.password })

                    if (data.status === "success") {
                        setIsLoading(false)
                        navigate("/")
                    }
                } catch (error: any) {
                    setIsLoading(false)
                    setError(error.message)
                }
            }} className="flex flex-col items-center gap-6 m-auto w-fit">
                <input
                    value={credentials.email}
                    onChange={(event) =>
                        setCredentials({ ...credentials, email: event.target.value })
                    }
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="border border-gray-500 p-2 rounded w-60"
                    required
                />
                <input
                    value={credentials.password}
                    onChange={(event) =>
                        setCredentials({ ...credentials, password: event.target.value })
                    }
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="border border-gray-500 p-2 rounded w-60"
                    required
                />
                <button className="cursor-pointer w-60 border border-gray-500 p-2 rounded" disabled={isLoading} >{isLoading ? "Logging in..." : "Login"}</button>
                {error && <p className="text-sm font-bold text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
