import { describe, it, expect } from 'vitest';
import { formatNumber } from '../numbers';

describe('formatNumber', () => {
  it('formats integers', () => {
    expect(formatNumber(1000)).toBe('1,000');
  });

  it('formats decimals with default 2 max fraction digits', () => {
    expect(formatNumber(1.5)).toBe('1.5');
    expect(formatNumber(1.555)).toBe('1.56');
  });

  it('formats string input with comma decimal separator', () => {
    expect(formatNumber('1,5')).toBe('1.5');
  });

  it('returns empty string for non-finite values', () => {
    expect(formatNumber(NaN)).toBe('');
    expect(formatNumber(Infinity)).toBe('');
    expect(formatNumber(-Infinity)).toBe('');
    expect(formatNumber('abc')).toBe('');
  });

  it('respects minimumFractionDigits and maximumFractionDigits', () => {
    expect(formatNumber(1, { minimumFractionDigits: 2, maximumFractionDigits: 4 })).toBe('1.00');
    expect(formatNumber(1.12345, { maximumFractionDigits: 4 })).toBe('1.1235');
  });

  it('clamps digit options to [0, 20]', () => {
    expect(formatNumber(1, { minimumFractionDigits: -5 })).toBe('1');
    expect(formatNumber(1, { maximumFractionDigits: 100 })).toBe('1');
  });

  it('handles minimumFractionDigits > maximumFractionDigits gracefully', () => {
    // should not throw; min is clamped to max internally
    expect(() => formatNumber(1, { minimumFractionDigits: 5, maximumFractionDigits: 2 })).not.toThrow();
  });

  it('disables grouping when useGrouping is false', () => {
    expect(formatNumber(1000000, { useGrouping: false })).toBe('1000000');
  });

  it('formats zero', () => {
    expect(formatNumber(0)).toBe('0');
  });

  it('formats negative numbers', () => {
    expect(formatNumber(-1234.5)).toBe('-1,234.5');
  });
});
