import { useQuery } from 'react-query';
import { getSwapRates } from '../../../api/services/jettonsService';

export const useSwapRates = (sendJetton, sendAmount, receiveJetton, receiveAmount ) => {
  return useQuery(
    ['swapRates', sendJetton?.address, sendAmount, receiveJetton?.address, receiveAmount],
    () =>
      getSwapRates(
        { address: sendJetton.address, amount: sendAmount },
        receiveJetton && receiveAmount !== null
          ? { address: receiveJetton.address, amount: receiveAmount }
          : null
      ),
    {
      enabled: !!(sendAmount && receiveAmount && sendJetton && receiveJetton),
      refetchOnWindowFocus: false,
    }
  );
};
