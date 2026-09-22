import { useMutation } from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"

const useUpdatePassword = () => {
    const { isPending, mutate: updatePassword } = useMutation({
        mutationKey: ["update-password"],
        mutationFn: (data: any) => api.patch(`/admin/auth/change-password`, data),
        onSuccess: () => {
            message.success("Parol yangilandi")
        },
        onError: (err: any) => {
            message.error(err?.response?.data?.message ?? "Parolni yangilashda xatolik")
        },
    })
    return { isPending, updatePassword }
}
export default useUpdatePassword
