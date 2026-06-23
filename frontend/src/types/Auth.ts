import type { User } from "./"

export default interface Auth {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (credentials: { email: string, password: string }) => Promise<{
        status: string,
        message: string,
        token: string,
        user: User,
    }>
}