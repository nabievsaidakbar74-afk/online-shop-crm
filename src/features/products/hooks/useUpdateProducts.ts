import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../../services/api";
import { message } from "antd";


const useUpdateProducts = () => {

    const query = useQueryClient()

    const { data, isPending, mutate } = useMutation({
        mutationKey: ["update-product"],
        mutationFn: ({ values, id }: { values: unknown; id: string }) =>
            api.patch(`/admin/products/${id}`, values),
        onSuccess: (_res, { id }) => {
            message.success("Mahsulot tahrirlandi")
            query.invalidateQueries({ queryKey: ["products"] })
            query.invalidateQueries({ queryKey: ["product-details", id] })
        },
        onError: (err: any) => {
            message.error(err?.response?.data?.message ?? "Mahsulotni tahrirlashda xatolik")
        }
    })
    return { data, isPending, mutate }

}

export default useUpdateProducts