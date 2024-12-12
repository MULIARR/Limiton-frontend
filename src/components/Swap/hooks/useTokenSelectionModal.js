import { useQuery } from 'react-query';
import { getJettons, getJetton } from "../../../api/services/jettonsService";
import useTokenSelectionModalStore from '../store/useTokenSelectionModalStore';

export const useJettons = (accountAddress, isEnabled) => {
  const { setSelectionJettons, setIsJettonsLoaded } = useTokenSelectionModalStore();

  return useQuery(
    ['tokens', accountAddress],
    () => getJettons(accountAddress),
    {
      enabled: isEnabled,
      onSuccess: (data) => {
        setSelectionJettons(data);
        setIsJettonsLoaded(true);
      },
      onError: () => {
        setIsJettonsLoaded(false);
      },
    }
  );
};

export const useJetton = (jettonAddress, isEnabled) => {
  const { setSelectionJettons, setIsJettonsLoaded } = useTokenSelectionModalStore();

  return useQuery(
    ['token', jettonAddress],
    () => getJetton(jettonAddress),
    {
      enabled: isEnabled,
      onSuccess: (data) => {
        setSelectionJettons([data]);
        setIsJettonsLoaded(true);
      },
      onError: () => {
        setIsJettonsLoaded(false);
      },
    }
  );
};
