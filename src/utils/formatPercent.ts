export function formatPercent(value: string | number | null): number | null {
  if (value === null || value === undefined) return null;

  const str = String(value).trim();
  if (!str) return null;

  const normalized = str.replace(",", ".");
  let num = Number(normalized);

  if (isNaN(num)) return null;

  num = Math.round(num * 100) / 100;

  if (Number.isInteger(num)) return num;

  return num;
}
