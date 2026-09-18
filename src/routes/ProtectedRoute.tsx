import Main from "../components/layouts/Main";
import useMe from "../features/profile/hooks/usMe";
import Spinner from "../components/layouts/Spinner";
import { useUser } from "../features/auth/contexts/UserContext";
import { useEffect } from "react";

export default function ProtectedRoute() {
    const { data, isLoading } = useMe()
    const { setUser } = useUser()

    useEffect(() => {
        if(data){
            setUser(data?.data)
        }
    }, [data])
    return (
        <>
            {
                isLoading ? <Spinner /> : <Main />
            }
        </>
    )
} 
