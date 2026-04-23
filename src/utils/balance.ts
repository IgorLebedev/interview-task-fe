import { SAFE_GAS_AMOUNT } from '@/config/constants';
import { parseToMist } from '@mysten/sui/utils';

export const checkInsufficientBalance = (
  balanceMist: string,
  amountMist: string,
  isSui?: boolean,
) => {
  const normalized = amountMist.replace(/\.$/, '');

  if (!normalized || isNaN(Number(normalized))) {
    return false;
  }

  const parsedAmountMist = parseToMist(normalized);

  if (isSui) {
    return BigInt(balanceMist) - parseToMist(String(SAFE_GAS_AMOUNT)) < parsedAmountMist;
  }

  return BigInt(balanceMist) < parsedAmountMist;
};
