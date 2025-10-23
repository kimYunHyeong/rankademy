export type QueryValue = string | number | boolean | undefined | null;
export type Query = Record<string, QueryValue>;

export function buildURL(base: string, endpoint: string, query?: Query) {
  const url = new URL(`${base}${endpoint}`);
  if (query) {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null) continue;
      if (typeof v === "number" && Number.isNaN(v)) continue;
      const val = typeof v === "boolean" ? String(v) : String(v);
      if (val.length === 0) continue;
      sp.set(k, val);
    }
    const qs = sp.toString();
    if (qs) url.search = qs;
  }
  return url.toString();
}
