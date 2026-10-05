import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import Main from "../components/layouts/Main"
import useMe from "../features/profile/hooks/usMe"
import Spinner from "../components/layouts/Spinner"
import { useUser } from "../features/auth/user"

function clearSession() {
    localStorage.removeItem("crmAccessToken")
    localStorage.removeItem("crmRefreshToken")
}

export default function ProtectedRoute() {
    const token = localStorage.getItem("crmAccessToken")
    const { data, isLoading, isError, isSuccess } = useMe()
    const { setUser } = useUser()

    useEffect(() => {
        if (isSuccess && data?.data) setUser(data.data)
    }, [data, isSuccess, setUser])

    useEffect(() => {
        if (!token || isError) clearSession()
    }, [token, isError])

    if (!token || isError) return <Navigate to="/login" replace />
    if (isLoading || !isSuccess) return <Spinner />
    return <Main />
}
