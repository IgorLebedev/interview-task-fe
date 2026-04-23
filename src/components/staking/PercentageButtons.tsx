import { Button } from '../ui/button';
import { parseToMist, SUI_DECIMALS } from '@mysten/sui/utils';
import { formatMistToAmount } from '@/utils/tokens';
import { SAFE_GAS_AMOUNT } from '@/config/constants';

interface PercentageButtonsProps {
  fullAmount?: string;
  onClick: (amount: string) => void;
}

export const PercentageButtons = ({ fullAmount, onClick }: PercentageButtonsProps) => {
  const disabled = !fullAmount;
  const safeGasAmountMist = parseToMist(String(SAFE_GAS_AMOUNT));

  const calculatePercentAmount = (percent: number, amountFrom: bigint) => {
    const amountInMist = (amountFrom * BigInt(percent)) / 100n;
    return formatMistToAmount(amountInMist.toString(), SUI_DECIMALS);
  };

  const calculateMaxPercentAmount = (amountFrom: bigint) => {
    const amountInMist = amountFrom > safeGasAmountMist ? amountFrom - safeGasAmountMist : 0n;
    return formatMistToAmount(amountInMist.toString(), SUI_DECIMALS);
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      <Button
        disabled={disabled}
        size="sm"
        variant="outline"
        className="w-full"
        onClick={() => onClick(calculatePercentAmount(25, BigInt(fullAmount ?? '0')))}
      >
        25%
      </Button>
      <Button
        disabled={disabled}
        size="sm"
        variant="outline"
        className="w-full"
        onClick={() => onClick(calculatePercentAmount(50, BigInt(fullAmount ?? '0')))}
      >
        50%
      </Button>
      <Button
        disabled={disabled}
        size="sm"
        variant="outline"
        className="w-full"
        onClick={() => onClick(calculatePercentAmount(75, BigInt(fullAmount ?? '0')))}
      >
        75%
      </Button>
      <Button
        disabled={disabled}
        size="sm"
        variant="outline"
        className="w-full"
        onClick={() => onClick(calculateMaxPercentAmount(BigInt(fullAmount ?? '0')))}
      >
        100%
      </Button>
    </div>
  );
};
