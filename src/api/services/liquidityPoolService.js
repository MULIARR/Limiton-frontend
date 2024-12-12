import apiClient from "../client";
import API_ENDPOINTS from "../endpoints";

export const getPool = async (sendJettonAddress, receiveJettonAddress) => {
    try {
        const response = await apiClient.get(`${API_ENDPOINTS.POOL.GET_POOL}/${sendJettonAddress}/${receiveJettonAddress}`);
        return response;
    } catch (error) {
        console.error("Failed to check pool existance:", error);
        throw error;
    }
};

export const getEstimatedSwapOut = async (sendJettonAddress, sendJettonAmount, sendAssetDecimals, receiveJettonAddress, receiveAssetDecimals) => {
    try {
        const params = {
            send_jetton_address: sendJettonAddress,
            send_jetton_amount: sendJettonAmount,
            send_asset_decimals: sendAssetDecimals,
            receive_jetton_address: receiveJettonAddress,
            receive_asset_decimals: receiveAssetDecimals,
        };

        const response = await apiClient.get(API_ENDPOINTS.POOL.GET_ESTIMATED_SWAP, { params });
        return response;
    } catch (error) {
        console.error("Failed to get estimated swap out:", error);
        throw error;
    }
};
