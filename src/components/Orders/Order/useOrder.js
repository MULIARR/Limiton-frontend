import { useMutation } from 'react-query';
import { deleteOrder } from "../../../api/services/ordersService";

const useOrder = () => {
    const { mutate: deleteOrderById, isSuccess } = useMutation({
        mutationFn: (orderId) => deleteOrder(orderId),
    });

    return {
        deleteOrder: deleteOrderById,
        isSuccess
    }
}

export default useOrder;
