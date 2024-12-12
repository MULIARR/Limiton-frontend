import { useQuery } from 'react-query';
import { getEstimatedSwapOut } from '../../../api/services/liquidityPoolService';

export const useEstimateSwap = (sendJetton, sendAmount, receiveJetton) => {
  return useQuery(
    ['estimateSwap', sendJetton?.address, sendAmount, receiveJetton?.address],
    () =>
      getEstimatedSwapOut(
        sendJetton.address,
        sendAmount,
        sendJetton.decimals,
        receiveJetton.address,
        receiveJetton.decimals
      ),
    {
      refetchOnWindowFocus: false,
      enabled: !!sendAmount && !!sendJetton && !!receiveJetton,
    }
  );
};
