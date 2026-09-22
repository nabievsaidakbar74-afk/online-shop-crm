import { useQuery } from "@tanstack/react-query"
import api from "../../../services/api"



const useChart1Dashboard = (week: "this" | "last" = "this") => {
    const { data, isLoading } = useQuery({
        queryKey: ["get-dashboard-chart-1", week],
        queryFn: () => api.get(`/admin/dashboard/weekly-report`, { params: { week } })
            .then((res) => res.data)
    })
    return { data, isLoading }
}
export default useChart1Dashboard