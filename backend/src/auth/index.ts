import type { SignIn, SignUp, Auth } from "#/types/Auth";

import { AppError } from "#utility";

import supabase from "#database";

const signUp = async (credentials: SignUp) => {
    const { email, password } = credentials

    if (!email || !password) {
        throw new AppError(`"email" and "password" are required`, 400)
    }

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
        throw new AppError(error.message, 400)
    }

    return data;
}

const signIn = async (credentials: SignIn) => {
    const { email, password } = credentials

    if (!email || !password) {
        throw new AppError(`"email" and "password" are required`, 400)
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
        throw new AppError(error.message, 400)
    }

    return data
}

const auth: Auth = {
    signUp,
    signIn
}

export default auth;