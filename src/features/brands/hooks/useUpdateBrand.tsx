import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";
import { message } from "antd";
import { apiErrorMessage } from "../../../services/apiError";
import type { BrandPayload } from "./useCreateBrand";

const useUpdateBrand = () => {

    const query = useQueryClient()

    const { data, isPending, mutate } = useMutation({
        mutationKey: ["update-brands"],
        mutationFn: ({ id, ...body }: BrandPayload & { id: string }) => api.patch(`/admin/brands/${id}`, body),
        onSuccess: () => {
            message.success("Brend tahrirlandi")
            query.invalidateQueries({ queryKey: ["brands"] })
        },
        onError: (err: unknown) => {
            message.error(apiErrorMessage(err, "Brendni tahrirlashda xatolik"))
        }
    })
    return { data, isPending, mutate }
}

export default useUpdateBrand
