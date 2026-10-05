import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";
import { message } from "antd";
import { apiErrorMessage } from "../../../services/apiError";

export type BrandPayload = {
    name: string
    slug: string
    description?: string
    logo?: string
    isActive?: boolean
}

const useCreateBrand = () => {

    const query = useQueryClient()

    const { data, isPending, mutate } = useMutation({
        mutationKey: ["create-brands"],
        mutationFn: (data: BrandPayload) => api.post(`/admin/brands`, data),
        onSuccess: () => {
            message.success("Brend qo'shildi")
            query.invalidateQueries({ queryKey: ["brands"] })
        },
        onError: (err: unknown) => {
            message.error(apiErrorMessage(err, "Brend qo'shishda xatolik"))
        }
    })
    return { data, isPending, mutate }

}

export default useCreateBrand
