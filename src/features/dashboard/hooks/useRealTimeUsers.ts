import { useQuery } from "@tanstack/react-query"
import api from "../../../services/api"


const useRealtimeUsers = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["real-time"],
        queryFn: () => api.get(`/admin/dashboard/realtime-users`)
            .then(res => res.data)
    })
    return { data, isLoading }
}
export default useRealtimeUsers