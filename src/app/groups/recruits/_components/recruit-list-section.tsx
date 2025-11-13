"use client";

import Link from "next/link";
import FallBackImage from "@/components/fallback-img";
import { useEffect, useState } from "react";
import React from "react";
import { PaginationData } from "@/types";
import PaginationComponent from "@/components/pagination";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { mockPaginationData } from "@/mock/mockPaginationData";
import { fetchFromAPI } from "@/utils/fetcher";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export type recruit = {
  postId: number;
  groupId: number;
  groupName: string;
  groupLogo: string;
  title: string;
  content: string;
  createdAt: string;
};

type APIres = {
  content: recruit[];
  page: PaginationData;
};

/* 목데이터 */
const mockRecruits: APIres = {
  content: [
    {
      postId: 1,
      groupId: 10,
      groupName: "서울과기대 컴공 20학번",
      groupLogo: "string",
      title: "컴퓨터공학과 20학번 모집합니다",
      content:
        "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
      createdAt: "2025-10-28T16:12:39.857Z",
    },
  ],
  page: {
    size: 10,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  },
};

export default function RecruitListSection() {
  /* 페이지네이션 설정 */
  const [pageState, setPageState] = useState<PaginationData>(
    mockPaginationData ?? mockRecruits.page
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rows, setRows] = useState<recruit[]>(mockRecruits.content);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        const res = (await fetchFromAPI("/groups/posts", {
          page: currentPage,
        })) as APIres | { data: APIres };

        // fetchFromAPI 구현 따라 data 래핑 여부 처리
        const apiRes: APIres = "content" in res ? res : (res as any).data;

        if (!alive) return;

        setRows(apiRes.content ?? []);
        setPageState(apiRes.page ?? mockPaginationData);
      } catch (e) {
        console.error("❌ [RecruitListSection] fetch error:", e);
        if (!alive) return;

        // 실패 시 목데이터로 fallback
        setRows(mockRecruits.content);
        setPageState(mockRecruits.page);
      }
    };

    run();

    return () => {
      alive = false;
    };
  }, [currentPage]);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {rows.map((item) => (
          <Link
            key={`${item.postId}-${item.groupId}`}
            href={`recruits/${item.groupId}`}
            className="w-full"
          >
            <div
              className="justify-center 
               border-2 border-[#323036] rounded
               bg-[#25242A33]
               text-[#B1ACC1]
               w-full h-45 hover:bg-[#2E2C33] transition my-2"
            >
              <div className="flex items-center h-full">
                {/* 왼쪽 모집글 정보 */}
                <div className="flex flex-col p-5 flex-1">
                  <span className="text-white text-2xl">{item.title}</span>
                  <span className="my-3 text-s line-clamp-2">
                    {item.content}
                  </span>
                  <span className="text-xs">
                    {item.groupName} | {dayjs(item.createdAt).fromNow()}
                  </span>
                </div>

                {/* 오른쪽 이미지: 있으면 표시 */}
                {item.groupLogo && (
                  <div className="flex items-center justify-center  w-[150px] h-[150px] p-4 shrink-0">
                    <FallBackImage
                      src={item.groupLogo}
                      alt={item.groupLogo}
                      width={150}
                      height={150}
                      className="rounded-l object-contain border border-[#2E2C33]"
                      draggable={false}
                    />
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 페이지네이션 */}
      <PaginationComponent
        pageData={pageState}
        onPageChange={(qs) => {
          const m = qs.match(/page=(\d+)/);
          const p = m ? Number(m[1]) : 0;
          if (!Number.isFinite(p) || p < 0) return;
          setCurrentPage(p);
        }}
      />
    </>
  );
}
