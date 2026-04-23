import { useState } from 'react';
import { useQueryGetAfSuiToSuiExchangeRate } from '@/hooks/query/useQueryGetAfSuiToSuiExchangeRate';
import { Skeleton } from '../ui/skeleton';
import { formatNumber } from '@/utils';
import { useQueryCoinBalance } from '@/hooks/query';
import { useCurrentAccount } from '@mysten/dapp-kit-react';
import { formatMistToAmount } from '@/utils/tokens';
import { AF_SUI_COIN_TYPE } from '@/config/constants';
import { SUI_DECIMALS } from '@mysten/sui/utils';

interface StakingInfoProps {
  amount: string;
  validatorApy?: number;
  isLoadingValidators?: boolean;
}

export const StakingInfo = ({
  amount,
  validatorApy,
  isLoadingValidators = false,
}: StakingInfoProps) => {
  const [isInverted, setIsInverted] = useState(false);
  const currentAccount = useCurrentAccount();

  const { data: afSuiBalance, isLoading: isLoadingBalance } = useQueryCoinBalance(
    currentAccount?.address || '',
    AF_SUI_COIN_TYPE,
  );

  const { data: afSuiToSuiExchangeRate, isLoading: isLoadingExchangeRate } =
    useQueryGetAfSuiToSuiExchangeRate();

  const toReceive =
    afSuiToSuiExchangeRate && amount
      ? formatNumber(Number(amount) / Number(afSuiToSuiExchangeRate), { maximumFractionDigits: 4 })
      : '0';

  const formattedAfSuiBalance = afSuiBalance
    ? formatNumber(formatMistToAmount(afSuiBalance?.balance.coinBalance, SUI_DECIMALS))
    : 0;

  return (
    <div className="w-full rounded-xl border border-border/70 gap-1 flex flex-col bg-muted/30 p-3 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">Validator APY:</p>
        {isLoadingValidators ? (
          <Skeleton className="w-14 h-4" />
        ) : (
          <p className="font-medium text-green-600">{formatNumber((validatorApy ?? 0) * 100)} %</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">To receive:</p>
        {isLoadingExchangeRate ? (
          <Skeleton className="w-14 h-4" />
        ) : (
          <p className="font-medium">{toReceive} afSUI</p>
        )}
      </div>
      <div
        className="flex items-center justify-between gap-2 cursor-pointer select-none"
        onClick={() => setIsInverted((v) => !v)}
      >
        <p className="text-muted-foreground">Exchange rate:</p>
        {isLoadingExchangeRate ? (
          <Skeleton className="w-14 h-4" />
        ) : isInverted ? (
          <p className="font-medium hover:underline">
            1 SUI ~ {formatNumber(1 / (afSuiToSuiExchangeRate ?? 1), { maximumFractionDigits: 4 })}{' '}
            afSUI
          </p>
        ) : (
          <p className="font-medium hover:underline">
            {formatNumber(afSuiToSuiExchangeRate ?? 0, { maximumFractionDigits: 4 })} SUI ~ 1 afSUI
          </p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">Your afSUI balance:</p>
        {isLoadingBalance ? (
          <Skeleton className="w-14 h-4" />
        ) : (
          <p className="font-medium">{formattedAfSuiBalance} afSUI</p>
        )}
      </div>
    </div>
  );
};
