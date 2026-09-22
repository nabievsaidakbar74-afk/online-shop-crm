import { useMutation , useQueryClient} from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"

const useDeleteBanners = () => {

const query = useQueryClient()

    const { mutate, isPending, variables } = useMutation({
        mutationKey: ["remove-banners"],
        mutationFn: (id: string) => api.delete(`/admin/banners/${id}`),
        onSuccess: () => {
            message.success("banner deleted")
            query.invalidateQueries({queryKey:["banners"]})
        },
        onError: () => {
            message.error("Error")
        }

    })
    return { mutate, isPending, variables }
}
export default useDeleteBanners