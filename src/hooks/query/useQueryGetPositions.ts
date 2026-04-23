import { useQuery } from '@tanstack/react-query';
import { aftermath } from '@/lib/aftermath';

export const useQueryGetPositions = (walletAddress: string) => {
  return useQuery({
    queryKey: ['staking-positions', walletAddress],
    queryFn: async () => {
      const staking = await aftermath.staking();
      const positions = await staking.getStakingPositions({ walletAddress });
      return positions;
    },
    enabled: !!walletAddress,
    staleTime: 1_000 * 60 * 5,
    refetchInterval: 1_000 * 60,
  });
};
