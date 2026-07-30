const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Parse editorial calendar dates without shifting them across timezones.
 * Date-only values are anchored to midnight UTC so a published date remains
 * the same calendar day in server-rendered output.
 */
export function parseEditorialDate(dateString: string): Date {
  return DATE_ONLY_PATTERN.test(dateString)
    ? new Date(`${dateString}T00:00:00.000Z`)
    : new Date(dateString);
}

export function formatEditorialDate(
  dateString: string,
  locale = 'en',
  month: 'short' | 'long' = 'short'
): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month,
    day: 'numeric',
    timeZone: 'UTC',
  }).format(parseEditorialDate(dateString));
}
