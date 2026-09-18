import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

const useCategories = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => api.get("/admin/categories").then(res => res?.data)
    })
    return { data, isLoading }
}
export default useCategories