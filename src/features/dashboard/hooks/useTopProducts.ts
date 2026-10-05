import { useQuery } from "@tanstack/react-query"
import api from "../../../services/api"

const useTopProducts = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["top-product"],
        queryFn: () => api.get(`/admin/dashboard/top-products`)
            .then(res => res.data?.data)
    })
    return { data, isLoading }
}

export default useTopProducts