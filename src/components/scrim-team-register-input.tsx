"use client";
import { useState, useEffect, useRef } from "react";
import FallBackImage from "./fallback-img";
import { POSITION_IMG_URL, SUMMONER_ICON_URL } from "@/lib/api";
import { fetchFromAPI } from "@/utils/fetcher";
import { Position } from "@/types";
import { Input } from "./ui/input";

export type Data = {
  userId: number;
  summonerName: string;
  summonerTag: string;
  summonerIcon: number;
};

export default function ScrimTeamRegisterInput({
  position,
  onSelect,
}: {
  position: Position;
  onSelect: (userId: number | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState<Data[]>([]);
  const [selected, setSelected] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function fetchDatas(keyword: string) {
    if (!keyword.trim()) {
      setFiltered([]);
      return;
    }

    setLoading(true);
    setErr(null);

    try {
      const url = `/users/search?userNameKey=${encodeURIComponent(
        keyword.trim()
      )}`;
      const data = (await fetchFromAPI(url)).data as Data[];
      setFiltered(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setErr(e?.message ?? "검색 중 오류가 발생했습니다.");
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  }

  // 바깥 클릭 시 자동완성 닫기
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setFiltered([]);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // 항목 선택
  const handlePick = (s: Data) => {
    setSelected(s);
    setInput(`${s.summonerName}#${s.summonerTag}`); // ✅ 입력창에 표시
    setFiltered([]);
    onSelect(s.userId); // ✅ 상위로 반환
  };

  return (
    <div ref={containerRef} className="relative flex items-center gap-2 w-full">
      {/* 포지션 아이콘 */}
      <FallBackImage
        src={`${POSITION_IMG_URL}${position.toLowerCase()}.svg`}
        alt={position.toLowerCase()}
        width={32}
        height={32}
      />

      {/* 입력창 */}
      <div className="relative w-full h-12">
        <Input
          className="h-11 w-full bg-[#323036] border-[#323036] text-white placeholder:text-gray-400 rounded"
          placeholder="소환사#1234"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setSelected(null);
          }}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const next = input.trim();
              setInput(next);
              setSelected(null);
              await fetchDatas(next);
            }
          }}
        />

        {/* 자동완성 리스트 */}
        {input && !selected && (loading || err || filtered.length > 0) && (
          <div className="absolute z-10 mt-1 w-full bg-[#25242A] rounded border border-[#323036] overflow-hidden">
            {loading && (
              <div className="px-3 py-2 text-[#B1ACC1] text-sm">검색 중…</div>
            )}
            {err && <div className="px-3 py-2 text-red-400 text-sm">{err}</div>}
            {!loading && !err && filtered.length === 0 && (
              <div className="px-3 py-2 text-[#B1ACC1] text-sm">
                검색 결과가 없습니다.
              </div>
            )}
            {!loading &&
              !err &&
              filtered.map((s) => (
                <button
                  key={s.userId}
                  onClick={() => handlePick(s)}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const next = input.trim();
                      setInput(next);
                      setSelected(null);
                      await fetchDatas(next);
                    }
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-[#2E223F] w-full text-left h-12"
                >
                  <FallBackImage
                    src={`${SUMMONER_ICON_URL}${s.summonerIcon}.png`}
                    alt={String(s.summonerIcon) ?? "summonerIcon"}
                    width={20}
                    height={20}
                    className="rounded"
                  />
                  <span className="text-[#FF5679]">{s.summonerName}</span>
                  <span className="text-[#B1ACC1] text-xs">
                    #{s.summonerTag}
                  </span>
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
