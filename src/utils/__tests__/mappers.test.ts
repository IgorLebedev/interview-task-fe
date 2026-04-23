import { describe, it, expect } from 'vitest';
import { mapValidatorsWithApy } from '../mappers';
import type { SuiValidatorSummary, ValidatorsApy } from '@mysten/sui/jsonRpc';

const makeValidator = (suiAddress: string): SuiValidatorSummary =>
  ({ suiAddress } as SuiValidatorSummary);

const makeApyData = (entries: { address: string; apy: number }[]): ValidatorsApy =>
  ({ apys: entries } as ValidatorsApy);

describe('mapValidatorsWithApy', () => {
  it('merges apy by address', () => {
    const validators = [makeValidator('0xA'), makeValidator('0xB')];
    const apyData = makeApyData([
      { address: '0xA', apy: 0.05 },
      { address: '0xB', apy: 0.08 },
    ]);

    const result = mapValidatorsWithApy(validators, apyData);

    expect(result[0].apy).toBe(0.05);
    expect(result[1].apy).toBe(0.08);
  });

  it('defaults apy to 0 when address not found', () => {
    const validators = [makeValidator('0xC')];
    const apyData = makeApyData([{ address: '0xA', apy: 0.05 }]);

    const result = mapValidatorsWithApy(validators, apyData);

    expect(result[0].apy).toBe(0);
  });

  it('preserves all original validator fields', () => {
    const validator = { suiAddress: '0xA', name: 'Test Validator' } as SuiValidatorSummary;
    const apyData = makeApyData([{ address: '0xA', apy: 0.1 }]);

    const result = mapValidatorsWithApy([validator], apyData);

    expect(result[0].name).toBe('Test Validator');
    expect(result[0].apy).toBe(0.1);
  });

  it('returns empty array for empty validators list', () => {
    const apyData = makeApyData([{ address: '0xA', apy: 0.05 }]);
    expect(mapValidatorsWithApy([], apyData)).toEqual([]);
  });

  it('handles empty apys list — all default to 0', () => {
    const validators = [makeValidator('0xA'), makeValidator('0xB')];
    const apyData = makeApyData([]);

    const result = mapValidatorsWithApy(validators, apyData);

    expect(result.every((v) => v.apy === 0)).toBe(true);
  });

  it('uses last apy when duplicate addresses appear in apys', () => {
    const validators = [makeValidator('0xA')];
    const apyData = makeApyData([
      { address: '0xA', apy: 0.05 },
      { address: '0xA', apy: 0.99 },
    ]);

    const result = mapValidatorsWithApy(validators, apyData);

    expect(result[0].apy).toBe(0.99);
  });
});
