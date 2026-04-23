import { useQuery } from '@tanstack/react-query';
import { suiClient } from '@/lib';

export const useQueryCoinBalance = (address: string, coinType: string) => {
  return useQuery({
    queryKey: ['balance', address, coinType],
    queryFn: async () => await suiClient.core.getBalance({ owner: address, coinType: coinType }),
    enabled: !!address,
    staleTime: 1_000 * 60 * 5,
    refetchInterval: 1_000 * 20,
  });
};
