import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"


const useOrderNotesDetail = () => {
    const query = useQueryClient()
    const { mutate: updateOrderNotes, isPending } = useMutation({
        mutationKey: ["update-order-notes"],
        mutationFn: ({ values, id }: { values: string, id?: string }) =>
            api.patch(`/admin/orders/${id}`, { notes: values }),
        onSuccess: () => {
            message.success("order notes update")
            query.invalidateQueries({ queryKey: ["order-detail"] })
        }
    })
    return { updateOrderNotes, isPending }
}
export default useOrderNotesDetail