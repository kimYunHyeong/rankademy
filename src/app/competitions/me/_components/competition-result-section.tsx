"use client";

import PaginationComponent from "@/components/pagination";
import CompetitionTable from "@/components/competition-table";
import { useState } from "react";
import { GroupCompetitionResult, PaginationData, Query } from "@/types";

/* 목데이터 */
import { mockGroupCompetitionResult } from "@/mock/groupCompetitionResult";

export default function MyCompetitionResultSection({
  apiurl,
}: {
  apiurl: string;
}) {
  return (
    <>
      <CompetitionTable APIURL={apiurl} isJoined={true} />
    </>
  );
}
