import { useMutation , useQueryClient} from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"

const useDeleteProducts = () => {

const query = useQueryClient()

    const { mutate, isPending, variables } = useMutation({
        mutationKey: ["remove-product"],
        mutationFn: (id: string) => api.delete(`/admin/products/${id}`),
        onSuccess: () => {
            message.success("Product-deleted")
            query.invalidateQueries({queryKey:["products"]})
        },
        onError: () => {
            message.error("Error")
        }

    })
    return { mutate, isPending, variables }
}
export default useDeleteProducts