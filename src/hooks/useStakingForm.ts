import { ChangeEvent, useState } from 'react';
import { parseToMist } from '@mysten/sui/utils';
import { formatInputNumber } from '@/utils/';

export const useStakingForm = () => {
  const [amount, setAmount] = useState<string>('');

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(formatInputNumber(e.target.value));
  };

  const isEmptyInput = amount === '';
  const isLessThanOneSui = Number(amount) < 1;

  const normalizedAmount = amount.endsWith('.') ? `${amount}0` : amount;

  const parsedAmountInMist = (() => {
    if (normalizedAmount === '') return 0n;

    try {
      return parseToMist(normalizedAmount);
    } catch {
      return 0n;
    }
  })();

  return {
    amount,
    setAmount,
    handleAmountChange,
    isEmptyInput,
    isLessThanOneSui,
    parsedAmountInMist,
  };
};
