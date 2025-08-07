export function formatToDayMonthYear(value: string | Date | undefined | null): string | null {
  if (!value) return null;

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-');
    return `${day}/${month}/${year}`;
  }

  let date: Date;

  if (value instanceof Date) {
    date = value;
  } else {
    const parsed = new Date(value);
    if (isNaN(parsed.getTime())) return null;
    date = parsed;
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
