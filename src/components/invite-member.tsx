"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SearchBox from "./search-box";
import FallBackImage from "@/components/fallback-img";
import { SUMMONER_ICON_URL } from "@/lib/api";
import { fetchFromAPI } from "@/utils/fetcher";

type Data = {
  userId: number;
  summonerName: string;
  summonerTag: string;
  summonerIcon: number;
};

export default function InviteMember({
  groupId,
  groupInvitationAction,
}: {
  groupId: number;
  groupInvitationAction: (groupId: number, userId: number) => Promise<void>;
}) {
  const router = useRouter();

  // 검색어/리스트/선택/로딩/에러
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState<Data[]>([]);
  const [selected, setSelected] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // 디바운스된 검색어 (100ms)
  const [debounced, setDebounced] = useState(input);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(input), 100);
    return () => clearTimeout(t);
  }, [input]);

  // 진행 중 요청 취소용
  const abortRef = useRef<AbortController | null>(null);

  async function fetchDatas(keyword: string) {
    setLoading(true);
    setErr(null);

    try {
      const url = `/rankings/univ/${encodeURIComponent(
        "서울과학기술대학교"
      )}?page=0&userNameKey=${encodeURIComponent(keyword)}`;
      const query = `page=0&userNameKey=${encodeURIComponent(keyword)}`;

      const res = await fetchFromAPI(url);
      const data = res.content as Data[];

      setFiltered(data);
    } catch (e: any) {
      if (e.name !== "AbortError") {
        setErr(e?.message ?? "검색 중 오류가 발생했습니다.");
        setFiltered([]);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (selected) return;

    const q = debounced.trim();
    if (!q) {
      setFiltered([]);
      setErr(null);
      return;
    }

    // 진행 중 요청 취소
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    fetchDatas(q);

    // 언마운트/재호출 시 현재 요청 취소
    return () => controller.abort();
  }, [debounced, selected]);

  return (
    <div className="relative flex flex-col w-[500px] h-[180px] border border-[#323036] rounded bg-[#25242A] text-white justify-center">
      <div className="h-[85%] flex flex-col p-5">
        <span className="text-white text-2xl mb-3">그룹원 초대</span>
        <span className="text-sm text-[#B1ACC1] mb-4">
          소환사의 이름을 검색하여 그룹원 초대를 보내 보세요
        </span>

        <div className="relative w-full flex justify-end">
          <SearchBox
            placeholder="유저 이름"
            onChange={(v: string) => {
              setInput(v);
              setSelected(null);
            }}
            onSubmit={(value) => {
              setInput(value ?? "");
              setSelected(null);
            }}
            width={480}
          />

          {/* 자동완성 리스트 */}
          {input && !selected && filtered.length > 0 && (
            <div className="absolute right-0 left-0 top-[42px] z-10 mt-1 bg-[#25242A] rounded border border-[#323036] overflow-hidden">
              {filtered.map((s) => (
                <button
                  key={s.userId}
                  onClick={() => {
                    setInput(`${s.summonerName}#${s.summonerTag}`);
                    setSelected(s);
                    setFiltered([]);
                    groupInvitationAction(groupId, s.userId);
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-[#2E223F] w-full text-left h-15"
                >
                  <FallBackImage
                    src={`${SUMMONER_ICON_URL}${s.summonerIcon}.png`}
                    alt={s.summonerIcon.toString()}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <span className="text-[#B1ACC1]">
                    {s.summonerName} #{s.summonerTag}
                  </span>
                </button>
              ))}

              {/* 로딩/에러 표시 (옵션) */}
              {loading && (
                <div className="px-3 py-2 text-xs text-[#B1ACC1]">
                  불러오는 중...
                </div>
              )}
              {err && (
                <div className="px-3 py-2 text-xs text-red-400">{err}</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/*    <button
        onClick={() => router.back()}
        className="h-[10%] text-xs text-[#B1ACC1]"
      >
        닫기
      </button> */}
    </div>
  );
}
