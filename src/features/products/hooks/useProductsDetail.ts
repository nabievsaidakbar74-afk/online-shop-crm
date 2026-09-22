import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

const useProductsDetail = (id: string | null) => {
    const {  data, isLoading } = useQuery({
        queryKey: ["product-details", id],
        queryFn: () => api.get(`/admin/products/${id}`).then(res => res?.data),
        enabled: !!id
    })
    return { data, isLoading }
}
export default useProductsDetail