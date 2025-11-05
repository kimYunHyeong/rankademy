"use client";

import Link from "next/link";
import SubHeaderMain from "@/components/sub-header-main";
import FallBackImage from "@/components/fallback-img";
import Image from "next/image";
import { useState } from "react";
import React from "react";
import { PaginationData } from "@/types";
import { Query } from "@/types";
import { recruit } from "../page";
import { CHAMPION_IMG_URL } from "@/lib/api";
import PaginationComponent from "@/components/pagination";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function RecruitListSection({
  data,
  pageData,
}: {
  data: recruit[];
  pageData: PaginationData;
}) {
  const [pageState, setPageData] = useState<PaginationData>(pageData);

  const [query, setQuery] = useState<Query>({ page: 0, univNameKey: "" });
  return (
    <>
      <SubHeaderMain
        items={[
          { label: "내 그룹", href: "/groups" },
          { label: "모집 게시판", href: "/groups/recruits" },
        ]}
        className="my-3"
      />

      <div className="h-8"></div>
      <div className="flex items-center justify-end my-5">
        <Link
          href="edit"
          className="flex items-center justify-center 
      border border-[#323036] 
      w-[120px] h-11 
      text-[#B1ACC1] rounded 
      bg-[#25242A33] text-center mt-10 mr-2"
        >
          그룹 생성
        </Link>

        <Link
          href={`recruits/edit`}
          className="flex items-center justify-center 
      border border-[#323036] 
      w-[120px] h-11 
      text-[#B1ACC1] rounded 
      bg-[#25242A33] text-center mt-10"
        >
          모집글 작성
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center">
        {data.map((data) => (
          <Link
            key={`${data.groupId}-${data.title}`}
            href={`recruits/${data.groupId}`}
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
                  <span className="text-white text-2xl">{data.title}</span>
                  <span className="my-3 text-s line-clamp-2">
                    {data.content}
                  </span>
                  <span className="text-xs">
                    {data.groupName} | {dayjs(data.createdAt).fromNow()}
                  </span>
                </div>

                {/* 오른쪽 이미지: 있으면 표시 */}
                {data.groupLogo && (
                  <div className="flex items-center justify-center  w-[150px] h-[150px] p-4 shrink-0">
                    <FallBackImage
                      src={`${CHAMPION_IMG_URL}${data.groupLogo}.png`}
                      alt={data.groupLogo}
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
          const p = Number((qs.split("=").pop() || "1").trim());
          if (!Number.isFinite(p) || p < 1) return;
          setQuery((prev) => ({ ...prev, page: p }));
        }}
      />
    </>
  );
}
