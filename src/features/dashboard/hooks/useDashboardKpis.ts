import { useQuery } from "@tanstack/react-query"
import api from "../../../services/api"

const useDashboardKpis = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["dashboard-kpis"],
        queryFn: () => api.get(`/admin/dashboard/kpis`)
            .then((res) => res.data)
    })
    return { data, isLoading }
}
export default useDashboardKpis