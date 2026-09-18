import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

const useMe = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["me"],
        queryFn: () => api.get("/admin/auth/me").then(res => res?.data)
    })
    return { data, isLoading }
}
export default useMe