export default function WinRateDonut({
  winCnt = 0,
  lossCnt = 0,
  winRate = 0,
}: {
  winCnt: number;
  lossCnt: number;
  winRate: number;
}) {
  const rate = Number.isFinite(winRate)
    ? Math.max(0, Math.min(100, winRate))
    : 0;
  const deg = (rate / 100) * 360;

  const bg = `conic-gradient(
  from 0deg,
  #110D17 0deg ${360 - deg}deg,
  #FF5679 ${360 - deg}deg 360deg
)`;

  return (
    <div
      className="relative rounded-full"
      style={{
        width: 120,
        height: 120,
        background: bg,
        border: `2px solid #323036`,
      }}
      aria-label={`승률 ${Math.round(rate)}%`}
      role="img"
    >
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          inset: 16,
          background: "#24192F",
          border: `2px solid #323036`,
        }}
      >
        <span className="text-white">{Math.round(rate)}%</span>
      </div>
    </div>
  );
}
