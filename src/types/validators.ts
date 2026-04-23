import { SuiValidatorSummary } from '@mysten/sui/jsonRpc';

export type ValidatorWithApy = SuiValidatorSummary & { apy: number };
