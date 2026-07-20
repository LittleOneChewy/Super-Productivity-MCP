import { Temporal } from 'temporal-polyfill';

/**
 * Format a Unix millisecond timestamp into a human-readable ISO 8601 string
 * with local timezone, e.g. "2026-07-18T14:30:00.000+03:00[Europe/Moscow]".
 *
 * Returns null when input is null/undefined or not a valid number.
 */
export function formatTimestampMs(ms: number | null | undefined): string | null {
  if (ms == null || !(ms > 0)) return null;
  return Temporal.Instant.fromEpochMilliseconds(ms).toZonedDateTimeISO(Temporal.Now.timeZoneId()).toString();
}

/**
 * Format a duration in milliseconds into "HH:MM:SS".
 *
 * Returns null when input is null/undefined or not a valid positive number.
 */
export function formatDurationMs(ms: number | null | undefined): string | null {
  if (ms == null || !(ms > 0)) return null;

  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
}
