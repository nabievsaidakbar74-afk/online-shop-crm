import { keepPreviousData, useQuery } from "@tanstack/react-query"
import api from "../../../services/api"

interface OrderParams {
    page?: number
    limit?: number
    status?: string
    search?: string
}

const useOrder = ({ page = 1, limit = 10, status, search }: OrderParams = {}) => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["order", page, limit, status, search],
        queryFn: () => api.get(`/admin/orders`, {
            params: {
                page,
                limit,
                ...(status ? { status } : {}),
                ...(search ? { search } : {}),
            },
        }).then(res => res.data),
        placeholderData: keepPreviousData,
    })
    return { data, isLoading, isFetching }
}
export default useOrder
