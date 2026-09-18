import { useMutation } from "@tanstack/react-query";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const useLogin = () => {
    const navigate = useNavigate()
    const { isPending, mutate } = useMutation({
        mutationKey: ["login"],
        mutationFn: (data: any) => api.post("/admin/auth/login", data).then(res => res.data),
        onSuccess: (data) => {
            localStorage.setItem("crmAccessToken", data?.data?.accessToken)
            localStorage.setItem("crmRefreshToken", data?.data?.refreshToken)
            navigate("/dashboard")
            message.success("succes")
        },
        onError: () => {
            message.error("error")
        }
    })
    return { isPending, mutate }
}

export default useLogin