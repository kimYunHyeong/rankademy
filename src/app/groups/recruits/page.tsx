"use client";

import Link from "next/link";
import SubHeaderMain from "@/components/sub-header-main";
import Image from "next/image";
import { recruit } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

const mock = [
  {
    title: "컴퓨터공학과 20학번 모집합니다",
    content:
      "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
    groupId: "10",
    groupName: "서울과기대 컴공 20학번",
    uploadedAt: "24",
    contentImg: "Ezreal",
  },
  {
    title: "컴퓨터공학과 20학번 모집합니다",
    content:
      "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
    groupId: "10",
    groupName: "서울과기대 컴공 20학번",
    uploadedAt: "24",
    contentImg: "LeeSin",
  },
  {
    title: "컴퓨터공학과 20학번 모집합니다",
    content:
      "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
    groupId: "10",
    groupName: "서울과기대 컴공 20학번",
    uploadedAt: "24",
  },
  {
    title: "컴퓨터공학과 20학번 모집합니다",
    content:
      "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
    groupId: "10",
    groupName: "서울과기대 컴공 20학번",
    uploadedAt: "24",
    contentImg: "Ezreal",
  },
  {
    title: "컴퓨터공학과 20학번 모집합니다",
    content:
      "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
    groupId: "10",
    groupName: "서울과기대 컴공 20학번",
    uploadedAt: "24",
  },
  {
    title: "컴퓨터공학과 20학번 모집합니다",
    content:
      "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
    groupId: "10",
    groupName: "서울과기대 컴공 20학번",
    uploadedAt: "24",
    contentImg: "Ezreal",
  },
  {
    title: "컴퓨터공학과 20학번 모집합니다",
    content:
      "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
    groupId: "10",
    groupName: "서울과기대 컴공 20학번",
    uploadedAt: "24",
  },
  {
    title: "컴퓨터공학과 20학번 모집합니다",
    content:
      "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
    groupId: "10",
    groupName: "서울과기대 컴공 20학번",
    uploadedAt: "24",
    contentImg: "Ezreal",
  },
  {
    title: "컴퓨터공학과 20학번 모집합니다",
    content:
      "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
    groupId: "10",
    groupName: "서울과기대 컴공 20학번",
    uploadedAt: "24",
    contentImg: "Ezreal",
  },
  {
    title: "컴퓨터공학과 20학번 모집합니다",
    content:
      "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
    groupId: "10",
    groupName: "서울과기대 컴공 20학번",
    uploadedAt: "24",
    contentImg: "Ezreal",
  },
  {
    title: "컴퓨터공학과 20학번 모집합니다",
    content:
      "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
    groupId: "10",
    groupName: "서울과기대 컴공 20학번",
    uploadedAt: "24",
    contentImg: "Ezreal",
  },
  {
    title: "컴퓨터공학과 20학번 모집합니다",
    content:
      "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
    groupId: "10",
    groupName: "서울과기대 컴공 20학번",
    uploadedAt: "24",
    contentImg: "Ezreal",
  },
  {
    title: "컴퓨터공학과 20학번 모집합니다",
    content:
      "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
    groupId: "10",
    groupName: "서울과기대 컴공 20학번",
    uploadedAt: "24",
    contentImg: "Ezreal",
  },
  {
    title: "컴퓨터공학과 20학번 모집합니다",
    content:
      "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
    groupId: "10",
    groupName: "서울과기대 컴공 20학번",
    uploadedAt: "24",
    contentImg: "Ezreal",
  },
  {
    title: "컴퓨터공학과 20학번 모집합니다",
    content:
      "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
    groupId: "10",
    groupName: "서울과기대 컴공 20학번",
    uploadedAt: "24",
    contentImg: "Yunara",
  },
  {
    title: "컴퓨터공학과 20학번 모집합니다",
    content:
      "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
    groupId: "10",
    groupName: "서울과기대 컴공 20학번",
    uploadedAt: "24",
    contentImg: "Kaisa",
  },
] as recruit[];

export default function Page() {
  const data = mock;

  // ✅ 페이지네이션 상태
  const pageSize = 15; // 한 페이지에 보여줄 행 수
  const [page, setPage] = React.useState(1);

  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageData = data.slice(start, end);

  return (
    <>
      <SubHeaderMain
        items={[
          { label: "내 그룹", href: "/groups" },
          { label: "모집 게시판", href: "/groups/board" },
        ]}
        className="my-3"
      />

      <div className="h-8"></div>
      <div className="flex items-center justify-end my-5">
        <Link
          href="edit"
          className="flex items-center justify-center 
      border border-[#323036] 
      w-[120px] h-[44px] 
      text-[#B1ACC1] rounded 
      bg-[#25242A33] text-center mt-10 mr-2"
        >
          그룹 생성
        </Link>

        <Link
          href={`recruits/edit`}
          className="flex items-center justify-center 
      border border-[#323036] 
      w-[120px] h-[44px] 
      text-[#B1ACC1] rounded 
      bg-[#25242A33] text-center mt-10"
        >
          모집글 작성
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center">
        {pageData.map((data) => (
          <Link
            key={`${data.groupId}-${data.title}`}
            href={`recruits/${data.groupId}`}
          >
            <div
              className="justify-center 
               border-2 border-[#323036] rounded
               bg-[#25242A33]
               text-[#B1ACC1]
               w-full h-45 hover:bg-[#2E2C33] transition my-2"
            >
              <div className="flex">
                {/* 왼쪽 모집글 정보 */}
                <div className="flex flex-col px-5 py-5 flex-1">
                  <span className="text-white text-2xl">{data.title}</span>
                  <span className="my-3 text-s line-clamp-2">
                    {data.content}
                  </span>
                  <span className="text-xs">
                    {data.groupName} | {data.uploadedAt}분 전
                  </span>
                </div>

                {/* 오른쪽 이미지: 있으면 표시 */}
                {data.contentImg && (
                  <div className="relative w-[150px] h-[150px] flex items-center justify-center py-3 pr-3 shrink-0">
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${data.contentImg}.png`}
                      alt={data.contentImg}
                      width={150}
                      height={150}
                      className="rounded-xl object-contain"
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
      <div className="w-full mt-4">
        <Pagination className="w-full">
          <PaginationContent className="flex w-full justify-between items-center">
            {/* 왼쪽: 이전 버튼 */}
            <div>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={`rounded-sm w-[28px] h-[28px] px-3 py-1 text-sm font-medium transition-colors
                    border border-[#323036] text-[#B1ACC1]
                    hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none
                    ${page === 1 ? "pointer-events-none opacity-50" : ""}`}
                />
              </PaginationItem>
            </div>

            {/* 가운데: 페이지 숫자 */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`w-[28px] h-[28px] rounded-sm px-3 py-1 text-sm font-medium transition-colors
                      ${
                        page === i + 1
                          ? "bg-[#FF5679] text-[#110D17] border-none"
                          : "border border-[#323036] text-[#B1ACC1] hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none"
                      }`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </div>

            {/* 오른쪽: 다음 버튼 */}
            <div>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={`rounded-sm w-[28px] h-[28px] px-3 py-1 text-sm font-medium transition-colors
                    border border-[#323036] text-[#B1ACC1]
                    hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none
                    ${
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                />
              </PaginationItem>
            </div>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
