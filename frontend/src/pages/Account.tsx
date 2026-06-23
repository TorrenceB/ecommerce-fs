import type { Auth } from "../types"

import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getAccount } from "../api/account"

import useAuth from "../contexts/AuthContext"

const Account = () => {
    const { token } = useAuth() as Auth
    const params = useParams()

    const [accountData, setAccountData] = useState()

    useEffect(() => {
        const fetch = async () => {
            if (!params.accountId) {
                console.error("Missing accountId param")

                return;
            }

            console.log({ token })

            const accountData = await getAccount(params.accountId, token ?? "")

            setAccountData(accountData)
        }

        fetch()
    }, [])

    return (
        <div>Account for user: {accountData}</div>
    )
}

export default Account