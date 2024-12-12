import { useQuery } from 'react-query';
import { getPool } from '../../../api/services/liquidityPoolService';

export const useFetchPool = (receiveJetton, sendJetton) => {
  return useQuery(
    ['pool', receiveJetton?.address, sendJetton?.address],
    () => getPool(receiveJetton.address, sendJetton.address),
    {
      refetchOnWindowFocus: false,
      enabled: !!receiveJetton && !!sendJetton,
    }
  );
};
