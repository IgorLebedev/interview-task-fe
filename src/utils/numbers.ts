type FormatNumberOptions = {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
  locale?: string;
};

const normalizeDigits = (value: number | undefined, fallback: number) => {
  if (value === undefined) return fallback;
  return Math.min(20, Math.max(0, value));
};

export const formatNumber = (
  value: number | string,
  options: FormatNumberOptions = {}
) => {
  const numericValue =
    typeof value === 'string' ? Number(value.replace(',', '.')) : value;

  if (!Number.isFinite(numericValue)) {
    return '';
  }

  const minimumFractionDigits = normalizeDigits(
    options.minimumFractionDigits,
    0
  );
  const maximumFractionDigits = normalizeDigits(
    options.maximumFractionDigits,
    2
  );

  return new Intl.NumberFormat(options.locale ?? 'en-US', {
    minimumFractionDigits: Math.min(minimumFractionDigits, maximumFractionDigits),
    maximumFractionDigits: Math.max(minimumFractionDigits, maximumFractionDigits),
    useGrouping: options.useGrouping ?? true,
  }).format(numericValue);
};
