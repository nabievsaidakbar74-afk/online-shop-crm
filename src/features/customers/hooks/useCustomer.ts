import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

const useCustomer = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => api.get("/admin/customers").then(res => res?.data)
    })
    return { data, isLoading }
}
export default useCustomer