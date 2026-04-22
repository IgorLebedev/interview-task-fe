import { Input } from '@/components/ui/input';
import { useQuerySuiBalance } from '@/hooks/query/useQuerySuiBalance';
import { useCurrentAccount } from '@mysten/dapp-kit-react';
import { SUI_DECIMALS } from '@mysten/sui/utils';
import { formatNumber } from '@/utils/';
import { Button } from './ui/button';
import { useQueryGetAfSuiToSuiExchangeRate } from '@/hooks/query/useQueryGetAfSuiToSuiExchangeRate';
import { useMutationStakeSui } from '@/hooks/query/useMutationStakeSui';
import { formatMistToAmount } from '@/utils/tokens';
import { toast } from 'sonner';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from './ui/separator';
import { useStakingForm } from '@/hooks/useStakingForm';

export const Staking = () => {
  // sui
  const currentAccount = useCurrentAccount();
  // form
  const {
    amount,
    setAmount,
    isEmptyInput,
    isLessThanOneSui,
    parsedAmountInMist,
    handleAmountChange,
  } = useStakingForm();

  // query
  const {
    data: balance,
    refetch: refetchBalance,
    isLoading: isLoadingBalance,
  } = useQuerySuiBalance(currentAccount?.address || '');

  const { data: afSuiToSuiExchangeRate, isLoading: isLoadingExchangeRate } =
    useQueryGetAfSuiToSuiExchangeRate();

  const { mutate: stakeSui, isPending: isPendingStake } = useMutationStakeSui({
    onError: (mutationError) => toast.error(`Stake error: ${mutationError.message}`),
    onSuccess: () => {
      toast.success('Stake success');
      setAmount('');
      setTimeout(() => refetchBalance(), 1000);
    },
  });

  // utils
  const userBalanceFormatted = formatMistToAmount(balance?.balance.coinBalance ?? 0, SUI_DECIMALS);
  const toRecieve = formatNumber(Number(amount) / Number(afSuiToSuiExchangeRate));
  const isInsufficientBalance = BigInt(balance?.balance.coinBalance ?? 0) < parsedAmountInMist;
  const isDisabledStake =
    !currentAccount?.address || isEmptyInput || isLessThanOneSui || isInsufficientBalance;

  const getErrorText = () => {
    if (amount === '') return;
    if (isInsufficientBalance) {
      return 'Insufficient balance';
    }
    if (isLessThanOneSui) {
      return 'Minimum amount is 1 SUI';
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Stake SUI</CardTitle>
      </CardHeader>
      <CardContent className="gap-4 flex flex-col">
        <Input
          placeholder="Enter amount"
          className="disabled:cursor-not-allowed"
          type="string"
          onChange={handleAmountChange}
          value={amount}
          maxLength={10}
          disabled={!currentAccount?.address}
        />
        <p className="text-red-400 text-xs">{getErrorText()}</p>
        <div className="border text-sm border-mist-900 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <p>Balance:</p>{' '}
            {isLoadingBalance ? (
              <Skeleton className="w-14 h-4" />
            ) : (
              <p>{formatNumber(userBalanceFormatted)} SUI</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p>To receive:</p> <p> {toRecieve} afSUI</p>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <p> Exchange rate:</p>{' '}
            {isLoadingExchangeRate ? (
              <Skeleton className="w-14 h-4" />
            ) : (
              <p>
                {formatNumber(afSuiToSuiExchangeRate ?? 0, { maximumFractionDigits: 4 })} SUI ~ 1
                afSUI
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col">
        <Button
          loading={isPendingStake}
          disabled={isDisabledStake}
          onClick={() => {
            if (!currentAccount?.address) return;
            stakeSui({
              amount: parsedAmountInMist,
              walletAddress: currentAccount.address,
            });
          }}
          className="w-full"
        >
          Stake
        </Button>
      </CardFooter>
    </Card>
  );
};
