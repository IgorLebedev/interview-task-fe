import { SuiValidatorSummary, ValidatorsApy } from '@mysten/sui/jsonRpc';
import { ValidatorWithApy } from '@/types/validators';

export const mapValidatorsWithApy = (
  validators: SuiValidatorSummary[],
  { apys }: ValidatorsApy,
): ValidatorWithApy[] => {
  const apyMap = new Map(apys.map(({ address, apy }) => [address, apy]));
  return validators.map((v) => ({ ...v, apy: apyMap.get(v.suiAddress) ?? 0 }));
};
