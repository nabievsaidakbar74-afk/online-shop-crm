import { useQuery } from "@tanstack/react-query"
import api from "../../../services/api"

const useBestSellers = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["best-sellers"],
        queryFn: () => api.get(`/admin/dashboard/best-sellers`)
        .then(res => res.data)
    })
    return { data , isLoading}
}
export default useBestSellers