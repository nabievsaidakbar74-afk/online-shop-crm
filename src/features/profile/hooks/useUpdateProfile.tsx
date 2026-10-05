import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"
import { apiErrorMessage } from "../../../services/apiError"

type ProfileUpdate = {
    firstName: string
    lastName: string
    phone?: string
    avatar?: string
}

const useUpdateProfile = () => {
    const query = useQueryClient()

    const { isPending, mutate: updateProfile } = useMutation({
        mutationKey: ["update-profile"],
        mutationFn: (data: ProfileUpdate) => api.patch(`/admin/auth/profile`, data),
        onSuccess: () => {
            message.success("Profil yangilandi")
            query.invalidateQueries({ queryKey: ["me"] })
        },
        onError: (err: unknown) => {
            message.error(apiErrorMessage(err, "Profilni yangilashda xatolik"))
        },
    })
    return { isPending, updateProfile }
}
export default useUpdateProfile
