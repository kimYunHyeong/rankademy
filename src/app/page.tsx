"use client";

import { useMemo, useState } from "react";
import { RankingTable } from "@/components/ranking-table";
import type { UnivData, Column, OptionMetaOf, OptionValueOf } from "@/types";
import SubHeaderMain from "@/components/sub-header-main";
import SearchAndFilter from "@/components/search-and-filter";
import Image from "next/image";
import univRanking from "@/mock/univRankingData.json";
import Link from "next/link";
import { fetchFromAPI } from "@/utils/fetcher";
import { CHAMPION_IMG_URL } from "@/lib/api";

type univRanking = {
  univName: string;
  totalUserCnt: number;
  competitionTotalCnt: number;
  competitionWinCnt: number;
  rankerDto: {
    id: number;
    summonerName: string;
    summonerTag: string;
    summonerIcon: number;
  };
};

export default async function Home() {
  const data = (await fetchFromAPI("/rankings/univ")) as univRanking[];

  const mock: univRanking[] = univRanking;

  // const sortOptions = [
  //   {
  //     value: "competitionWinCnt",
  //     label: "대항전 승리순",
  //     meta: { type: "number" },
  //   },
  //   {
  //     value: "competitionCnt",
  //     label: "대항전 횟수순",
  //     meta: { type: "number" },
  //   },
  //   { value: "studentCnt", label: "학생순", meta: { type: "number" } },
  // ] as const;

  // type SortValue = OptionValueOf<typeof sortOptions>;
  // type SortMeta = OptionMetaOf<typeof sortOptions>;

  // const [sortKey, setSortKey] = useState<SortValue>("competitionCnt");
  // const [query, setQuery] = useState("");

  // // ✅ 원본 리스트 (memoize)
  // const baseData = useMemo<UnivData[]>(
  //   () => (Array.isArray(univRanking) ? (univRanking as UnivData[]) : []),
  //   []
  // );

  // // ✅ 검색 필터 (학교명 기준 — 필요하면 다른 필드 추가)
  // const filteredData = useMemo<UnivData[]>(() => {
  //   if (!query) return baseData;
  //   const q = query.toLowerCase();
  //   return baseData.filter((row) =>
  //     (row.univName ?? "").toLowerCase().includes(q)
  //   );
  // }, [baseData, query]);

  // // ✅ 정렬된 데이터 (filteredData에 대해 정렬)
  // const sortedData = useMemo<UnivData[]>(() => {
  //   const num = (x: unknown) => (typeof x === "number" ? x : 0);

  //   const out = [...filteredData].sort((a, b) => {
  //     const diff = num((b as any)[sortKey]) - num((a as any)[sortKey]); // 내림차순
  //     if (diff !== 0) return diff;
  //     return (a.univName ?? "").localeCompare(b.univName ?? "");
  //   });

  //   return out;
  // }, [filteredData, sortKey]);

  const columns: Column<univRanking>[] = [
    {
      id: "univ",
      header: "학교명",
      headerClassName: "w-[18%]",
      cell: (row) => (
        <Link
          href={`/rankings/univ/${encodeURIComponent(row.univName)}/groups`}
          className="flex items-center gap-2"
        >
          <Image
            src={`/univ-emblem/${row.univName}.png`}
            alt={row.univName}
            width={30}
            height={30}
            className="rounded-full"
          />
          <span>{row.univName}</span>
        </Link>
      ),
    },
    {
      id: "students",
      header: "학생 수",
      headerClassName: "w-[10%]",
      accessorKey: "totalUserCnt",
    },
    {
      id: "compCount",
      header: "대항전 진행",
      headerClassName: "w-[10%]",
      accessorKey: "competitionTotalCnt",
    },
    {
      id: "compWin",
      header: "대항전 승리",
      headerClassName: "w-[10%]",
      accessorKey: "competitionWinCnt",
    },
    {
      id: "ranker",
      header: "랭커",
      headerClassName: "w-[20%]",
      cell: (row) => (
        <Link href={`/user/${row.rankerDto.id}`}>
          <div className="flex items-center gap-2">
            <Image
              src={`${CHAMPION_IMG_URL}/${row.rankerDto.summonerIcon}.png`}
              alt={row.rankerDto.summonerIcon.toString()}
              width={30}
              height={30}
            />
            <span>{row.rankerDto.summonerName}</span>
            <span>#{row.rankerDto.summonerTag}</span>
          </div>
        </Link>
      ),
    },
  ];

  return (
    <>
      <SubHeaderMain
        items={[
          { label: "학교 랭킹", href: "/" },
          { label: "유저 랭킹", href: "/rankings" },
        ]}
      />
      <div className="h-20"></div>
      {/* <SearchAndFilter<SortValue, SortMeta>
        onSearch={setQuery}
        filterProps={{
          value: sortKey,
          onChange: (v) => setSortKey(v),
          options: sortOptions,
          placeholder: "정렬 기준",
        }}
        className="mb-4"
      /> */}
      <RankingTable data={univRanking} columns={columns} />
    </>
  );
}
