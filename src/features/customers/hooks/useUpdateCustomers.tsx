import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"
import { apiErrorMessage } from "../../../services/apiError"

type UpdateStatusPayload = {
    id: string
    isActive: boolean
}

const useUpdateCustomers = () => {
    const query = useQueryClient()

    const { data, isPending, mutate } = useMutation({
        mutationKey: ["update-customer"],
        mutationFn: ({ id, isActive }: UpdateStatusPayload) =>
            api.patch(`/admin/customers/${id}/status`, { isActive }),
        onSuccess: () => {
            message.success("customer status updated")
            query.invalidateQueries({ queryKey: ["customers"] })
        },
        onError: (err: unknown) => {
            message.error(apiErrorMessage(err, "Bannerni tahrirlashda xatolik"))
        },
    })
    return { data, isPending, mutate }
}

export default useUpdateCustomers
