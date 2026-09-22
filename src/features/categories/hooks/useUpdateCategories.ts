import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"

const useUpdateCategories = () => {
    const query = useQueryClient()

    const { data, isPending, mutate } = useMutation({
        mutationKey: ["update-categories"],
        mutationFn: ({ values, id }: { values: unknown; id: string }) =>
            api.patch(`/admin/categories/${id}`, values),
        onSuccess: (_res, { id }) => {
            message.success("Category updated")
            query.invalidateQueries({ queryKey: ["categories"] })
            query.invalidateQueries({ queryKey: ["categories-details", id] })
        },
        onError: () => {
            message.error("Update category error")
        },
    })
    return { data, isPending, mutate }
}

export default useUpdateCategories
