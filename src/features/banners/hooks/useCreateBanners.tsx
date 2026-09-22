import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"

const useCreateBanners = () => {
    const query = useQueryClient()
    const { data, isPending, mutate } = useMutation({
        mutationKey: ["create-banners"],
        mutationFn: (body: any) => api.post(`/admin/banners`, body),
        onSuccess: () => {
            message.success("Banner qo'shildi")
            query.invalidateQueries({ queryKey: ["banners"] })
        },
        onError: (err: any) => {
            message.error(err?.response?.data?.message ?? "Banner qo'shishda xatolik")
        }
    })
    return { data, isPending, mutate }
}
export default useCreateBanners