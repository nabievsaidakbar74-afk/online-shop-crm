import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"

const useUpdateProfile = () => {
    const query = useQueryClient()

    const { isPending, mutate: updateProfile } = useMutation({
        mutationKey: ["update-profile"],
        mutationFn: (data: any) => api.patch(`/admin/auth/profile`, data),
        onSuccess: () => {
            message.success("Profil yangilandi")
            query.invalidateQueries({ queryKey: ["me"] })
        },
        onError: (err: any) => {
            message.error(err?.response?.data?.message ?? "Profilni yangilashda xatolik")
        },
    })
    return { isPending, updateProfile }
}
export default useUpdateProfile
