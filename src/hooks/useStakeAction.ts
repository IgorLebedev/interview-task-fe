import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useMutationStakeSui } from '@/hooks/query';

interface StakeParams {
  amount: bigint;
  walletAddress: string;
  validatorAddress: string;
}

export const useStakeAction = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  const { mutateAsync: stakeSui, isPending } = useMutationStakeSui();

  const stake = (params: StakeParams) => {
    toast.promise(stakeSui(params), {
      loading: 'Staking SUI...',
      success: () => {
        onSuccess();
        queryClient.invalidateQueries({ queryKey: ['balance'] });
        return 'Stake success';
      },
      error: (err: Error) => `Stake error: ${err.message}`,
    });
  };

  return { stake, isPending };
};
