import { aftermath } from '@/lib/aftermath';
import { useMutation } from '@tanstack/react-query';
import { useDAppKit } from '@mysten/dapp-kit-react';
import { AFTERMATH_VALIDATOR_ADDRESS } from '@/config/constants';

interface StakeSuiParams {
  amount: bigint;
  walletAddress: string;
  validatorAddress?: string;
  isSponsoredTx?: boolean;
}

interface Options {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useMutationStakeSui = (options?: Options) => {
  const dAppKit = useDAppKit();

  return useMutation({
    mutationFn: async ({
      amount,
      walletAddress,
      validatorAddress = AFTERMATH_VALIDATOR_ADDRESS,
      isSponsoredTx = false,
    }: StakeSuiParams) => {
      const staking = await aftermath.staking();

      const stakeTx = await staking.getStakeTransaction({
        suiStakeAmount: amount,
        walletAddress,
        validatorAddress,
        isSponsoredTx,
      });

      const tx = await dAppKit.signAndExecuteTransaction({
        transaction: stakeTx,
      });

      if (tx.Transaction?.status.error) {
        throw new Error(tx.Transaction.status.error.message);
      }

      return tx;
    },
    ...options,
  });
};
