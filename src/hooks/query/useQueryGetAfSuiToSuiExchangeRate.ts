import { useQuery } from '@tanstack/react-query';
import { aftermath } from '@/lib/aftermath';

export const useQueryGetAfSuiToSuiExchangeRate = () => {
  return useQuery({
    queryKey: ['aftermath-sui-to-sui-exchange-rate'],
    queryFn: async () => {
      const staking = await aftermath.staking();
      const rate = await staking.getAfSuiToSuiExchangeRate();
      return rate;
    },
    staleTime: 1_000 * 60 * 5,
    refetchInterval: 1_000 * 60 * 5,
  });
};
