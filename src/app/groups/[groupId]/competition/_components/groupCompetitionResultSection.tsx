"use client";

import PaginationComponent from "@/components/pagination";
import CompetitionTable from "@/components/competition-table";
import { useState } from "react";
import { GroupCompetitionResult, PaginationData, Query } from "@/types";

/* 목데이터 */
import { mockGroupCompetitionResult } from "@/mock/groupCompetitionResult";

export default function GroupCompetitionResultSection({
  tableData,
  pageData,
  apiurl,
}: {
  tableData: GroupCompetitionResult[];
  pageData: PaginationData;
  apiurl: string;
}) {
  /* 페이지네이션 */
  const [pageState, setPageData] = useState<PaginationData>(pageData);
  const [query, setQuery] = useState<Query>({ page: 0, univNameKey: "" });

  return (
    <>
      <CompetitionTable data={tableData} apiurl={apiurl} query={query} />

      {/* 페이지네이션 */}
      <PaginationComponent
        pageData={pageState}
        onPageChange={(qs) => {
          const p = Number((qs.split("=").pop() || "1").trim());
          if (!Number.isFinite(p) || p < 1) return;
          setQuery((prev) => ({ ...prev, page: p }));
        }}
      />
    </>
  );
}
