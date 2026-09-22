import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";
import { message } from "antd";

const useCreateBrand = () => {

    const query = useQueryClient()

    const { data, isPending, mutate } = useMutation({
        mutationKey: ["create-brands"],
        mutationFn: (data: any) => api.post(`/admin/brands`, data),
        onSuccess: () => {
            message.success("Brend qo'shildi")
            query.invalidateQueries({ queryKey: ["brands"] })
        },
        onError: (err: any) => {
            message.error(err?.response?.data?.message ?? "Brend qo'shishda xatolik")
        }
    })
    return { data, isPending, mutate }

}

export default useCreateBrand
