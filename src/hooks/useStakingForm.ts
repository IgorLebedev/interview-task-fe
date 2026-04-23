import { ChangeEvent, useEffect, useState } from 'react';
import { parseToMist } from '@mysten/sui/utils';
import { formatInputNumber } from '@/utils/';
import { useCurrentAccount, useWalletConnection } from '@mysten/dapp-kit-react';
import { checkInsufficientBalance } from '@/utils/balance';

export const useStakingForm = ({ balance }: { balance?: string }) => {
  const currentAccount = useCurrentAccount();
  const connectedWallet = useWalletConnection();

  const [amount, setAmount] = useState<string>('');

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(formatInputNumber(e.target.value));
  };

  const isEmptyAmount = amount === '';
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

  const isInsufficientBalance = checkInsufficientBalance(balance ?? '0', amount, true);

  const errorText = (() => {
    if (!currentAccount?.address || amount === '') return null;
    if (isInsufficientBalance) return 'Insufficient balance';
    if (isLessThanOneSui) return 'Minimum amount is 1 SUI';
  })();

  useEffect(() => {
    if (!connectedWallet.isConnected) {
      setAmount('');
    }
  }, [connectedWallet.isConnected]);

  return {
    amount,
    setAmount,
    handleAmountChange,
    isEmptyAmount,
    isLessThanOneSui,
    parsedAmountInMist,
    isInsufficientBalance,
    errorText,
  };
};
