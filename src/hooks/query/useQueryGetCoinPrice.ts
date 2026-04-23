import { useQuery } from '@tanstack/react-query';
import { aftermath } from '@/lib/aftermath';

export const useQueryGetCoinPrice = (coinType: string) => {
  return useQuery({
    queryKey: ['coin-price', coinType],
    queryFn: async () => {
      const coin = await aftermath.coin();
      const coinPrice = await coin.getPrice(coinType);
      return coinPrice;
    },
    enabled: !!coinType,
    staleTime: 1_000 * 60 * 5,
    refetchInterval: 1_000 * 60,
  });
};
