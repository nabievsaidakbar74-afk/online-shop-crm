import { useQuery } from "@tanstack/react-query"
import api from "../../../services/api"


const useOrderDetail = (id: string | null) => {
    const { data, isLoading } = useQuery({
        queryKey: ["order-detail"],
        queryFn: () => api.get(`/admin/orders/${id}`)
    })
    return { data, isLoading }
}
export default useOrderDetail