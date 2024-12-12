const API_ENDPOINTS = {
    ACCOUNT: {
        GET_PORTFOLIO: "/account/portfolio",
        GET_ACCOUNT: "/account",
    },
    ORDER: {
        CREATE_ORDER: "order/create",
        DELETE_ORDER: "/order",
        GET_ORDERS: "/order/all",
        GET_ORDER: "/order",
    },
    POOL: {
        GET_POOL: "/pool/is_exist",
        GET_ESTIMATED_SWAP: "/pool/estimate_swap_out"
    },
    JETTON: {
        GET_JETTON: "/jetton",
        GET_JETTONS: "/jetton/all",
        GET_RATES: "/jetton/get_rates"
    }
};

export default API_ENDPOINTS;
