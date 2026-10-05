import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"
import { apiErrorMessage } from "../../../services/apiError"

export type BannerPayload = {
    title: string
    subtitle?: string
    image?: string
    mobileImage?: string
    buttonText?: string
    link?: string
    sortOrder?: number
    isActive?: boolean
    startDate: string
    endDate: string
}

const useCreateBanners = () => {
    const query = useQueryClient()
    const { data, isPending, mutate } = useMutation({
        mutationKey: ["create-banners"],
        mutationFn: (body: BannerPayload) => api.post(`/admin/banners`, body),
        onSuccess: () => {
            message.success("Banner qo'shildi")
            query.invalidateQueries({ queryKey: ["banners"] })
        },
        onError: (err: unknown) => {
            message.error(apiErrorMessage(err, "Banner qo'shishda xatolik"))
        }
    })
    return { data, isPending, mutate }
}
export default useCreateBanners