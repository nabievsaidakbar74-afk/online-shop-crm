import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

const useMe = () => {
    const hasToken = Boolean(localStorage.getItem("crmAccessToken"))
    const query = useQuery({
        queryKey: ["me"],
        enabled: hasToken,
        retry: false,
        queryFn: () => api.get("/admin/auth/me").then(res => res?.data)
    })
    return query
}
export default useMe