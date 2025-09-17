export function capitalize(input: string | null | undefined): string {
  if (!input) return "";
  const s = String(input);
  return s.charAt(0).toUpperCase() + s.slice(1);
}
