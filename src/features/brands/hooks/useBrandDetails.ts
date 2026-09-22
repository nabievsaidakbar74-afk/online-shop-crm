import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

const useBrandDetails = (id: string | null) => {
    const { data, isLoading } = useQuery({
        queryKey: ["brands-details", id],
        queryFn: () => api.get(`/admin/brands/${id}`).then(res => res?.data),
        enabled: !!id
    })
    return { data, isLoading }
}
export default useBrandDetails