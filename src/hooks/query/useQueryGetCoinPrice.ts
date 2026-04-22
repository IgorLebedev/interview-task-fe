import { useQuery } from '@tanstack/react-query';
import { suiClient } from '@/lib';
import { SUI_TYPE_ARG } from '@mysten/sui/utils';

export const useQuerySuiBalance = (address: string) => {
  return useQuery({
    queryKey: ['balance', address],
    queryFn: async () =>
      await suiClient.core.getBalance({ owner: address, coinType: SUI_TYPE_ARG }),
    enabled: !!address,
    staleTime: 1_000 * 60 * 5,
    refetchInterval: 1_000 * 20,
  });
};
