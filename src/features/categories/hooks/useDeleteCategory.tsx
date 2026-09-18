import { useMutation , useQueryClient} from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"

const useDeleteCategory = () => {

const query = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationKey: ["remove-category"],
        mutationFn: (id: string) => api.delete(`/admin/categories/${id}`),
        onSuccess: () => {
            message.success("Categoyr deleted")
            query.invalidateQueries({queryKey:["categories"]})
        },
        onError: () => {
            message.error("Error")
        }

    })
    return { mutate, isPending }
}
export default useDeleteCategory