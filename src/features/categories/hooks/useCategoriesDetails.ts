import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

const useCategoriesDetails = (id: string | null) => {
    const { data, isLoading } = useQuery({
        queryKey: ["categories-details", id],
        queryFn: () => api.get(`/admin/categories/${id}`).then(res => res?.data),
        enabled: !!id
    })
    return { data, isLoading }
}
export default useCategoriesDetails