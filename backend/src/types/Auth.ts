import type { User, Session } from "@supabase/supabase-js";

export interface SignUp {
    email: string;
    password: string
}

export interface SignIn {
    email: string;
    password: string
}

export interface Auth {
    signUp: (credentials: SignUp) => Promise<{ user: User | null, session: Session | null }>,
    signIn: (credentials: SignIn) => Promise<{ user: User | null, session: Session | null }>,
}