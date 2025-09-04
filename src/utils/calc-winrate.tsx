//승률 계산해주는 함수
export function calcWinRate(winCnt: number, LoseCnt: number) {
  const total = winCnt + LoseCnt;
  if (total <= 0) return 0;
  const pct = Math.round((winCnt / total) * 100);
  // 혹시라도 안전빵
  return Math.max(0, Math.min(100, pct));
}
