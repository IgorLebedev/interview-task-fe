import { useCurrentAccount } from '@mysten/dapp-kit-react';
import { Button } from '../ui/button';
import { useQueryCoinBalance } from '@/hooks/query';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '../ui/separator';
import { useStakingForm } from '@/hooks/useStakingForm';
import { SUI_TYPE_ARG } from '@mysten/sui/utils';
import { StakingInput } from './StakingInput';
import { StakingInfo } from './StakingInfo';
import { PercentageButtons } from './PercentageButtons';
import { ValidatorsSelector } from './ValidatorsSelector';
import { useValidators } from '@/hooks/useValidators';
import { ErrorMessage } from '../ui/error-message';
import { ConnectButton } from '@mysten/dapp-kit-react/ui';
import { useStakeAction } from '@/hooks/useStakeAction';

export const Staking = () => {
  const currentAccount = useCurrentAccount();

  const { data: balanceData, isLoading: isLoadingBalance } = useQueryCoinBalance(
    currentAccount?.address || '',
    SUI_TYPE_ARG,
  );

  const coinBalance = balanceData?.balance.coinBalance;

  const {
    amount,
    setAmount,
    isEmptyAmount,
    isLessThanOneSui,
    parsedAmountInMist,
    handleAmountChange,
    isInsufficientBalance,
    errorText,
  } = useStakingForm({ balance: coinBalance });

  const {
    isLoadingValidators,
    selectedValidator,
    setSelectedValidatorAddress,
    selectedValidatorAddress,
    validators,
  } = useValidators();

  const { stake, isPending: isPendingStake } = useStakeAction({ onSuccess: () => setAmount('') });

  const isLoading = isLoadingBalance || isLoadingValidators;
  const isDisabled =
    !currentAccount?.address ||
    isEmptyAmount ||
    isLessThanOneSui ||
    isInsufficientBalance ||
    isLoading ||
    isPendingStake;

  const handleStakeSui = () => {
    if (!currentAccount?.address) return;
    stake({
      amount: parsedAmountInMist,
      walletAddress: currentAccount.address,
      validatorAddress: selectedValidatorAddress,
    });
  };

  return (
    <Card className="w-full max-w-md border-border/60 bg-card/95 shadow-lg backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl tracking-tight">Stake SUI</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ValidatorsSelector
          validators={validators}
          selectedValidatorAddress={selectedValidatorAddress}
          onSelectValidatorAddress={setSelectedValidatorAddress}
          isLoading={isLoadingValidators}
        />
        <StakingInput
          amount={amount}
          handleAmountChange={handleAmountChange}
          disabled={!currentAccount?.address}
          balance={coinBalance}
          isLoadingBalance={isLoadingBalance}
        />
        <PercentageButtons fullAmount={coinBalance} onClick={setAmount} />
        {errorText && !isLoading ? <ErrorMessage text={errorText} /> : null}
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col gap-3">
        {!currentAccount?.address ? (
          <ConnectButton />
        ) : (
          <Button
            size="lg"
            loading={isPendingStake}
            disabled={isDisabled}
            onClick={handleStakeSui}
            className="w-full text-lg"
          >
            Stake SUI
          </Button>
        )}
        <StakingInfo
          amount={amount}
          validatorApy={selectedValidator?.apy}
          isLoadingValidators={isLoadingValidators}
        />
      </CardFooter>
    </Card>
  );
};
