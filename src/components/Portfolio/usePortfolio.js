import { useQuery } from 'react-query';
import { getAccountPortfolio } from '../../api/services/accountsService';
import usePortfolioStore from './usePortfolioStore';
// import { toast } from 'sonner';

const usePortfolio = (accountAadress) => {
  const { setPortfolio } = usePortfolioStore();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['portfolio', accountAadress],
    queryFn: () => getAccountPortfolio(accountAadress),
    retry: 2,
    cacheTime: 0,
    onSuccess: (data) => {
      setPortfolio(data);
    },
    onError: (error) => {
      // toast.error(`An error ocured: ${error.message}`);
    },
  });

  return {
    portfolio: data,
    isLoaded: !isLoading,
    fetchPortfolio: refetch,
  };
};

export default usePortfolio;
