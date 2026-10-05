import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

const useSalesByCountry = () => {
    const { data: countryData, isLoading: countryLoading } = useQuery({
        queryKey: ["sales-by-country"],
        queryFn: () => api.get(`/admin/dashboard/sales-by-country`)
            .then(res => res.data?.data),


    })
    return { countryData, countryLoading }
}

export default useSalesByCountry
