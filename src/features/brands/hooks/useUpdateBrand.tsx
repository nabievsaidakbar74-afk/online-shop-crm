import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";
import { message } from "antd";

const useUpdateBrand = () => {

    const query = useQueryClient()

    const { data, isPending, mutate } = useMutation({
        mutationKey: ["update-brands"],
        mutationFn: ({ id, ...body }: any) => api.patch(`/admin/brands/${id}`, body),
        onSuccess: () => {
            message.success("Brend tahrirlandi")
            query.invalidateQueries({ queryKey: ["brands"] })
        },
        onError: (err: any) => {
            message.error(err?.response?.data?.message ?? "Brendni tahrirlashda xatolik")
        }
    })
    return { data, isPending, mutate }
}

export default useUpdateBrand
