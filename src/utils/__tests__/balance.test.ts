import { describe, it, expect } from 'vitest';
import { checkInsufficientBalance } from '../balance';

// balanceMist: balance in mist (1 SUI = 1_000_000_000 mist)
// amount param: SUI units as a string (parseToMist converts them internally)
// SAFE_GAS_AMOUNT = 1 SUI = 1_000_000_000 mist
const ONE_SUI_MIST = '1000000000';
const TWO_SUI_MIST = '2000000000';
const THREE_SUI_MIST = '3000000000';

describe('checkInsufficientBalance', () => {
  describe('non-SUI token', () => {
    it('returns false when balance exceeds amount', () => {
      expect(checkInsufficientBalance(TWO_SUI_MIST, '1')).toBe(false);
    });

    it('returns false when balance equals amount', () => {
      expect(checkInsufficientBalance(ONE_SUI_MIST, '1')).toBe(false);
    });

    it('returns true when amount exceeds balance', () => {
      expect(checkInsufficientBalance(ONE_SUI_MIST, '2')).toBe(true);
    });

    it('returns false for empty amount string', () => {
      expect(checkInsufficientBalance(ONE_SUI_MIST, '')).toBe(false);
    });

    it('returns false for non-numeric amount', () => {
      expect(checkInsufficientBalance(ONE_SUI_MIST, 'abc')).toBe(false);
    });

    it('strips trailing dot and treats "1." as 1 SUI', () => {
      expect(checkInsufficientBalance(TWO_SUI_MIST, '1.')).toBe(false);
      expect(checkInsufficientBalance(ONE_SUI_MIST, '2.')).toBe(true);
    });

    it('handles fractional SUI amounts', () => {
      expect(checkInsufficientBalance(ONE_SUI_MIST, '0.5')).toBe(false);
      expect(checkInsufficientBalance(ONE_SUI_MIST, '1.5')).toBe(true);
    });
  });

  describe('SUI token (isSui = true, gas reserve = 1 SUI)', () => {
    it('returns true when amount equals balance (no room for gas)', () => {
      // balance = 1 SUI, amount = 1 SUI → balance - gas = 0 < 1
      expect(checkInsufficientBalance(ONE_SUI_MIST, '1', true)).toBe(true);
    });

    it('returns true when amount uses up gas reserve', () => {
      // balance = 2 SUI, amount = 2 SUI → balance - gas = 1 < 2
      expect(checkInsufficientBalance(TWO_SUI_MIST, '2', true)).toBe(true);
    });

    it('returns false when balance covers amount plus gas', () => {
      // balance = 3 SUI, amount = 1 SUI → 3 - 1 = 2 >= 1
      expect(checkInsufficientBalance(THREE_SUI_MIST, '1', true)).toBe(false);
    });

    it('returns false for empty amount', () => {
      expect(checkInsufficientBalance(ONE_SUI_MIST, '', true)).toBe(false);
    });

    it('returns false for fractional amount within remaining balance after gas', () => {
      // balance = 2 SUI, gas = 1 SUI, amount = 0.5 SUI → 2 - 1 = 1 >= 0.5
      expect(checkInsufficientBalance(TWO_SUI_MIST, '0.5', true)).toBe(false);
    });
  });
});
