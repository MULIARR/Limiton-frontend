import apiClient from "../client";
import API_ENDPOINTS from "../endpoints";

export const createOrder = async (orderData) => {
    try {
        const response = await apiClient.post(API_ENDPOINTS.ORDER.CREATE_ORDER, orderData);
        return response;
    } catch (error) {
        console.error("Failed to create order:", error);
        throw error;
    }
};

export const getOrder = async (orderId) => {
    try {
        const response = await apiClient.c(`${API_ENDPOINTS.ORDER.GET_ORDER}/${orderId}`);
        return response;
    } catch (error) {
        console.error("Failed to get order:", error);
        throw error;
    }
};

export const getOrders = async (userId) => {
    try {
        const response = await apiClient.get(`${API_ENDPOINTS.ORDER.GET_ORDERS}/${userId}`);
        return response;
    } catch (error) {
        console.error("Failed to get orders:", error);
        throw error;
    }
};

export const deleteOrder = async (orderId) => {
    try {
        const response = await apiClient.delete(`${API_ENDPOINTS.ORDER.DELETE_ORDER}/${orderId}`);
        return response;
    } catch (error) {
        console.error("Failed to delete order:", error);
        throw error;
    }
};
