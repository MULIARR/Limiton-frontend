import apiClient from "../client";
import API_ENDPOINTS from "../endpoints";

export const getJetton = async (jettonAddress) => {
    try {
        const response = await apiClient.get(`${API_ENDPOINTS.JETTON.GET_JETTON}/${jettonAddress}`);
        return response;
    } catch (error) {
        console.error("Failed to fetch jetton:", error);
        throw error;
    }
};

export const getJettons = async (accountAddress) => {
    try {
        const response = await apiClient.get(`${API_ENDPOINTS.JETTON.GET_JETTONS}/${accountAddress}`);
        return response;
    } catch (error) {
        console.error("Failed to fetch jettons:", error);
        throw error;
    }
};

export const getSwapRates = async (sendAsset, receiveAsset) => {
    try {
        const params = {
            send_asset_address: sendAsset.address,
            send_asset_amount: sendAsset.amount,
        };

        if (receiveAsset && receiveAsset.address && receiveAsset.amount !== null) {
            params.receive_asset_address = receiveAsset.address;
            params.receive_asset_amount = receiveAsset.amount;
        }

        const response = await apiClient.get(API_ENDPOINTS.JETTON.GET_RATES, { params });
        return response;
    } catch (error) {
        console.error("Failed to fetch rates:", error);
        throw error;
    }
};