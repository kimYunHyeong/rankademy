// 승률 계산 함수 (win + 전체 경기 수 기반)
export function calcWinRate(winCnt: number, totalCnt: number) {
  if (totalCnt <= 0) return 0; // 분모 0 방지
  const pct = Math.round((winCnt / totalCnt) * 100);
  // 혹시라도 안전빵
  return Math.max(0, Math.min(100, pct));
}
