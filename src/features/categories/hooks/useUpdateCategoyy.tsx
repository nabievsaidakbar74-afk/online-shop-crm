import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";
import { message } from "antd";

const useUpdateCategories = () => {

    const query = useQueryClient()

    const { data, isPending, mutate } = useMutation({
        mutationKey: ["create-categories"],
        mutationFn: ({values, id}:any) => api.patch(`/admin/categories/${id}`, values),
        onSuccess: () => {
            message.success("update categorie")
            query.invalidateQueries({ queryKey: ["categories"] })
        },
        onError: () => {
            message.error("update categorie error")
        }
    })
    return { data, isPending, mutate }

}

export default useUpdateCategories