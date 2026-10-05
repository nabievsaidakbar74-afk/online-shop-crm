import { useMutation } from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"
import { apiErrorMessage } from "../../../services/apiError"

const useUpdatePassword = () => {
    const { isPending, mutate: updatePassword } = useMutation({
        mutationKey: ["update-password"],
        mutationFn: (data: { currentPassword: string; newPassword: string }) => api.patch(`/admin/auth/change-password`, data),
        onSuccess: () => {
            message.success("Parol yangilandi")
        },
        onError: (err: unknown) => {
            message.error(apiErrorMessage(err, "Parolni yangilashda xatolik"))
        },
    })
    return { isPending, updatePassword }
}
export default useUpdatePassword
