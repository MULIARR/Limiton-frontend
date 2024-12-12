import apiClient from "../client";
import API_ENDPOINTS from "../endpoints";

export const getAccountPortfolio = async (accountAddress) => {
    try {
        const response = await apiClient.get(`${API_ENDPOINTS.ACCOUNT.GET_PORTFOLIO}/${accountAddress}`);
        return response;
    } catch (error) {
        console.error("Failed to fetch portfolio:", error);
        throw error;
    }
};

export const getAccount = async (accountAddress) => {
    try {
        const response = await apiClient.get(`${API_ENDPOINTS.ACCOUNT.GET_ACCOUNT}/${accountAddress}`);
        return response;
    } catch (error) {
        console.error("Failed to fetch account:", error);
        throw error;
    }
};
