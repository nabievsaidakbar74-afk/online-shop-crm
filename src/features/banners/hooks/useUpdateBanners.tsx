import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"

const useUpdateBanners = () => {
    const query = useQueryClient()

    const { data, isPending, mutate } = useMutation({
        mutationKey: ["update-banners"],
        mutationFn: ({ values, id }: { values: unknown; id: string }) =>
            api.patch(`/admin/banners/${id}`, values),
        onSuccess: () => {
            message.success("Banner tahrirlandi")
            query.invalidateQueries({ queryKey: ["banners"] })
        },
        onError: (err: any) => {
            message.error(err?.response?.data?.message ?? "Bannerni tahrirlashda xatolik")
        },
    })
    return { data, isPending, mutate }
}

export default useUpdateBanners
