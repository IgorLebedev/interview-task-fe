import { useQuery } from '@tanstack/react-query';
import { aftermath } from '@/lib/aftermath';
import { mapValidatorsWithApy } from '@/utils/mappers';

export const useQueryGetActiveValidators = () => {
  return useQuery({
    queryKey: ['active-validators'],
    queryFn: async () => {
      const staking = await aftermath.staking();

      const [apys, activeValidators] = await Promise.all([
        staking.getValidatorApys(),
        staking.getActiveValidators(),
      ]);

      return mapValidatorsWithApy(activeValidators, apys);
    },
    staleTime: 1_000 * 60 * 5,
    refetchInterval: 1_000 * 60 * 60,
  });
};
