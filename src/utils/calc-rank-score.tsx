// utils/calc-rank-score.ts

// 티어별 기본 점수
const RANK_BASE: Record<string, number> = {
  iron: 0,
  bronze: 400,
  silver: 800,
  gold: 1200,
  platinum: 1600,
  emerald: 2000,
  diamond: 2400,
  master: 2800,
  grandmaster: 3200,
  challenger: 3600,
};

// Division 보너스 (I=300, II=200, III=100, IV=0)
// 숫자와 로마표기 모두 지원
const DIVISION_BONUS: Record<string, number> = {
  i: 300,
  ii: 200,
  iii: 100,
  iv: 0,
  "1": 300,
  "2": 200,
  "3": 100,
  "4": 0,
};

function normalizeRank(rank?: unknown): string | undefined {
  if (typeof rank !== "string") return undefined;
  const r = rank.trim().toLowerCase();
  return r || undefined;
}

function normalizeDivision(tier?: unknown): string | undefined {
  if (tier === null || tier === undefined) return undefined;
  // 숫자 or 문자열 모두 문자열로 통일
  const s = String(tier).trim().toLowerCase(); // "1" | "i" | "II" 등 → "1" | "i" | "ii"
  return s || undefined;
}

/**
 * rank + division + lp 점수를 계산
 * @param rank ex) "gold", "platinum", ...
 * @param lp   ex) 0 ~ 999
 * @param tier ex) "I" | "II" | "III" | "IV" | 1 | 2 | 3 | 4 | undefined
 */
export function calcRankScore(
  rank?: unknown,
  lp?: unknown,
  tier?: unknown
): number {
  const rkey = normalizeRank(rank);
  const base = rkey ? RANK_BASE[rkey] ?? 0 : 0;

  const lpSafe = typeof lp === "number" ? lp : Number(lp) || 0;

  const dkey = normalizeDivision(tier);
  const bonus = dkey ? DIVISION_BONUS[dkey] ?? 0 : 0;

  return base + bonus + lpSafe;
}
