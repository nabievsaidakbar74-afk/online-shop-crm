import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"



const useCreateProducts = () => {
    const query = useQueryClient()
    const { data, isPending, mutate } = useMutation({
        mutationKey: ["create-product"],
        mutationFn: (data) => api.post(`/admin/products`, data),
        onSuccess: () => {
            message.success("create product")
            query.invalidateQueries({ queryKey: ["products"] })
        },
        onError: () => {
            message.error("create product error")
        }
    })
    return { data, isPending, mutate } 
}
export default useCreateProducts