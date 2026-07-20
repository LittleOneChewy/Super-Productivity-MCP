import { describe, expect, it } from 'vitest';
import { formatDurationMs, formatTimestampMs } from '../../../src/utils/time-formatters.js';

describe('formatTimestampMs', () => {
  it('returns null for null', () => {
    expect(formatTimestampMs(null)).toBeNull();
  });

  it('returns null for undefined', () => {
    expect(formatTimestampMs(undefined)).toBeNull();
  });

  it('returns null for 0', () => {
    expect(formatTimestampMs(0)).toBeNull();
  });

  it('returns null for negative number', () => {
    expect(formatTimestampMs(-1000)).toBeNull();
  });

  it('returns formatted ISO 8601 string for valid timestamp', () => {
    // 2026-07-18 14:30:00 in some timezone
    const ms = new Date(2026, 6, 18, 14, 30, 0).getTime();
    const result = formatTimestampMs(ms);
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}\[.+\]$/);
    expect(result).toContain('2026-07-18');
    expect(result).toContain('14:30');
  });

  it('returns null for NaN', () => {
    expect(formatTimestampMs(NaN)).toBeNull();
  });
});

describe('formatDurationMs', () => {
  it('returns null for null', () => {
    expect(formatDurationMs(null)).toBeNull();
  });

  it('returns null for undefined', () => {
    expect(formatDurationMs(undefined)).toBeNull();
  });

  it('returns null for 0', () => {
    expect(formatDurationMs(0)).toBeNull();
  });

  it('returns null for negative number', () => {
    expect(formatDurationMs(-1000)).toBeNull();
  });

  it('formats 0 ms as 00:00:00', () => {
    // 0 is falsy so returns null, but let's test a small positive value
    expect(formatDurationMs(1)).toBe('00:00:00');
  });

  it('formats 1 hour 30 minutes 0 seconds', () => {
    const ms = 1 * 3600000 + 30 * 60000;
    expect(formatDurationMs(ms)).toBe('01:30:00');
  });

  it('formats 45 minutes 30 seconds', () => {
    const ms = 45 * 60000 + 30000;
    expect(formatDurationMs(ms)).toBe('00:45:30');
  });

  it('formats 2 hours 5 minutes 7 seconds', () => {
    const ms = 2 * 3600000 + 5 * 60000 + 7000;
    expect(formatDurationMs(ms)).toBe('02:05:07');
  });

  it('formats exactly 1 second', () => {
    expect(formatDurationMs(1000)).toBe('00:00:01');
  });

  it('formats 99 hours', () => {
    const ms = 99 * 3600000;
    expect(formatDurationMs(ms)).toBe('99:00:00');
  });
});
