export const formatMistToAmount = (amount: string | number, decimals: number) => {
  const value = typeof amount === 'number' ? Math.trunc(amount).toString() : amount.trim();

  if (!value) {
    return '0';
  }

  const normalizedValue = value.startsWith('+') ? value.slice(1) : value;
  const isNegative = normalizedValue.startsWith('-');
  const digits = isNegative ? normalizedValue.slice(1) : normalizedValue;

  if (!/^\d+$/.test(digits) || decimals < 0) {
    return '0';
  }

  const paddedDigits = digits.padStart(decimals + 1, '0');
  const integerPart = paddedDigits.slice(0, -decimals) || '0';
  const rawFractionPart = decimals > 0 ? paddedDigits.slice(-decimals) : '';
  const fractionPart = rawFractionPart.replace(/0+$/, '');
  const formattedValue = fractionPart ? `${integerPart}.${fractionPart}` : integerPart;

  if (formattedValue === '0') {
    return '0';
  }

  return isNegative ? `-${formattedValue}` : formattedValue;
};
