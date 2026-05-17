import jwksClient from 'jwks-rsa'

const client = jwksClient({
    jwksUri: process.env.SUPABASE_JWKS_URI ?? "",
})

export default client; 