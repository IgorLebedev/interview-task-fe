import { describe, it, expect } from 'vitest';
import { formatInputNumber } from '../input';

describe('formatInputNumber', () => {
  it('passes through a plain integer', () => {
    expect(formatInputNumber('42')).toBe('42');
  });

  it('replaces comma with dot', () => {
    expect(formatInputNumber('1,5')).toBe('1.5');
  });

  it('strips non-numeric non-dot characters', () => {
    expect(formatInputNumber('1a2b3')).toBe('123');
    expect(formatInputNumber('$10.00')).toBe('10.00');
  });

  it('collapses multiple dots', () => {
    expect(formatInputNumber('1.2.3')).toBe('1.23');
  });

  it('limits decimal places to 9 (SUI precision)', () => {
    expect(formatInputNumber('0.1234567891')).toBe('0.123456789');
  });

  it('adds leading zero when input starts with dot', () => {
    expect(formatInputNumber('.5')).toBe('0.5');
  });

  it('removes one leading zero per call (single-pass strip)', () => {
    // The function strips only the immediate first zero per invocation
    expect(formatInputNumber('07')).toBe('7');
    expect(formatInputNumber('007')).toBe('07'); // only one zero stripped per call
  });

  it('preserves a single leading zero followed by dot', () => {
    expect(formatInputNumber('0.5')).toBe('0.5');
  });

  it('handles empty string', () => {
    expect(formatInputNumber('')).toBe('');
  });

  it('handles a bare dot', () => {
    expect(formatInputNumber('.')).toBe('0.');
  });

  it('handles large numbers', () => {
    expect(formatInputNumber('1000000.999999999')).toBe('1000000.999999999');
  });
});
