import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

const useProducts = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: () => api.get("/admin/products").then(res => res?.data)
    })
    return { data, isLoading }
}
export default useProducts