import { ChangeEvent } from 'react';
import suiLogo from '@/assets/suiLogo.webp';
import { formatMistToAmount } from '@/utils/tokens';
import { formatNumber } from '@/utils';
import { SUI_DECIMALS, SUI_TYPE_ARG } from '@mysten/sui/utils';
import { useQueryGetCoinPrice } from '@/hooks/query/useQueryGetCoinPrice';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import { Field, FieldLabel } from '../ui/field';

interface InputProps {
  disabled?: boolean;
  amount: string;
  handleAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  balance?: string;
  isLoadingBalance?: boolean;
}

export const StakingInput = ({
  handleAmountChange,
  amount,
  disabled = false,
  balance,
  isLoadingBalance = false,
}: InputProps) => {
  const userBalanceFormatted = formatNumber(formatMistToAmount(balance ?? 0, SUI_DECIMALS));
  const { data: coinPrice, isLoading: isLoadingCoinPrice } = useQueryGetCoinPrice(SUI_TYPE_ARG);

  const amountInUsd = formatNumber(Number(amount) * (coinPrice?.price ?? 0));
  return (
    <Field>
      <FieldLabel className="text-xs">Lock SUI to get afSUI</FieldLabel>
      <div className="rounded-2xl border border-border/70 bg-background p-4 shadow-sm">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img src={suiLogo} alt="SUI logo" className="w-5 h-5 rounded-full overflow-clip" />
            <p className="text-sm font-medium">SUI</p>
          </div>
          {isLoadingBalance ? (
            <Skeleton className="w-20 h-4" />
          ) : (
            <p className="text-sm">
              <span className="text-muted-foreground">Balance:</span> {userBalanceFormatted}
            </p>
          )}
        </div>
        <Input
          placeholder="0 SUI"
          className="h-12 rounded-none border-none bg-transparent px-0 text-2xl! font-semibold! ring-0 focus:ring-0 focus-visible:ring-0"
          type="text"
          onChange={handleAmountChange}
          value={amount}
          maxLength={15}
          disabled={disabled}
        />
        {isLoadingCoinPrice ? (
          <Skeleton className="h-4 w-10 bg-gray-300" />
        ) : (
          <p className="text-muted-foreground text-xs">${amountInUsd}</p>
        )}
      </div>
    </Field>
  );
};
