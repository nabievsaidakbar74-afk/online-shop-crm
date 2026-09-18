import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";
import { message } from "antd";

const useCreateCategories = () => {

    const query = useQueryClient()

    const { data, isPending, mutate } = useMutation({
        mutationKey: ["create-categories"],
        mutationFn: (data) => api.post(`/admin/categories`, data),
        onSuccess: () => {
            message.success("create categorie")
            query.invalidateQueries({ queryKey: ["categories"] })
        },
        onError: () => {
            message.error("create categorie error")
        }
    })
    return { data, isPending, mutate }

}

export default useCreateCategories