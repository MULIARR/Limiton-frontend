import { useQuery } from 'react-query';
import { getOrders } from "../../api/services/ordersService";

const useOrders = (userId) => {
    const { data, isLoading, refetch, isSuccess } = useQuery({
        queryFn: () => getOrders(userId),
        queryKey: ['orders'],
        refetchOnWindowFocus: false,
        refetchOnMount: true
    })

    return {
        orders: data, 
        isLoaded: !isLoading,
        fetchOrders: refetch,
        isSuccess: isSuccess
    }
}

export default useOrders;
