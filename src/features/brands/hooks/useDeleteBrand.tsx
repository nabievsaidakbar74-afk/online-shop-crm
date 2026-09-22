import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"

const useDeleteBrand = () => {

    const query = useQueryClient()

    const { mutate, isPending, variables } = useMutation({
        mutationKey: ["remove-brand"],
        mutationFn: (id: string) => api.delete(`/admin/brands/${id}`),
        onSuccess: () => {
            message.success("Brend o'chirildi")
            query.invalidateQueries({ queryKey: ["brands"] })
        },
        onError: (err: any) => {
            message.error(err?.response?.data?.message ?? "Brendni o'chirishda xatolik")
        }
    })
    return { mutate, isPending, deletingId: variables }
}

export default useDeleteBrand
