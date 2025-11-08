"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import FallBackImage from "@/components/fallback-img";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GroupSummaryList } from "../page";
import { RecruitDetail } from "../../[groupId]/page";

type FormState = {
  title: string;
  content: string;
  requirements: string;
};

export default function RecruitmentEditFrom({
  groupList,
  submitAction,
  selectedGroupData,
}: {
  groupList: GroupSummaryList[];
  submitAction: (groupId: number, formData: FormData) => Promise<void>;
  selectedGroupData?: RecruitDetail;
}) {
  const router = useRouter();

  /* 폼 상태 */
  const [form, setForm] = useState<FormState>({
    title: selectedGroupData?.title ?? "",
    content: selectedGroupData?.content ?? "",
    requirements: "",
  });

  // contentEditable에서 입력될 때 form.content를 직접 갱신
  const handleInput = () => {
    if (!editorRef.current) return;
    setForm((prev) => ({
      ...prev,
      content: editorRef.current!.innerHTML, // 텍스트만 원하면 innerText
    }));
  };

  // form.content가 바뀌면 editor에 반영 (초기 렌더/서버 값 주입 시)
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== form.content) {
      editorRef.current.innerHTML = form.content || "";
    }
  }, [form.content]);

  /* HTML 에디터 */
  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  /* 그룹 아이디 */
  const [selectedId, setSelectedId] = useState<number>(
    selectedGroupData?.groupId ?? groupList[0].groupId
  );

  /* 기울임 | 이탤릭 | 밑줄 감지 */
  const [bold, setBold] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [italic, setItalic] = useState(false);

  const onSubmit = () => {
    if (!selectedId) {
      alert("그룹을 선택해주세요.");
      return;
    }
    if (!form.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!form.content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title.trim());
    fd.append("content", form.content);
    fd.append("requirements", form.requirements);

    submitAction(selectedId, fd);
    router.replace(`/groups/recruits`);
  };

  return (
    <>
      <div className="h-5"></div>
      {/* 바깥 카드: 내부 스크롤 허용을 위해 min-h와 함께 레이아웃을 분리 */}
      <div className="flex flex-col border-[#25242A] border-2 rounded bg-[#25242A33] min-h-[480px] h-[80%] w-full p-6 gap-3">
        {/* 그룹 선택 */}
        <Select
          value={selectedId !== null ? String(selectedId) : undefined}
          onValueChange={(v) => {
            const id = Number(v);
            setSelectedId(id);
          }}
        >
          <SelectTrigger className="w-28 h-11 border-[#323036] bg-[#1D1921] text-[#B1ACC1] rounded">
            <SelectValue placeholder="그룹 선택" />
          </SelectTrigger>

          <SelectContent className="border-[#323036] bg-[#1D1921] text-[#B1ACC1] rounded">
            {groupList.map((group) => (
              <SelectItem
                key={group.groupId}
                value={String(group.groupId)}
                className="data-[state=checked]:bg-[#FF5679] data-[state=checked]:text-white"
              >
                {group.groupName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 제목 */}
        <div className="flex flex-col">
          <input
            className="bg-[#323036] border border-[#323036] rounded my-2 px-3 py-2 text-white text-xs"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="제목"
          />
        </div>

        {/* 이미지 | 굵기 |  밑줄 | 이태릭 */}
        <div className="grid grid-rows-[56px_minmax(0,1fr)] h-[700px] rounded overflow-hidden bg-transparent">
          {/* 툴바 (Toggle 사용) */}
          <div className="bg-[#25242A] flex items-center gap-2 px-4">
            {/* 이미지 업로드 */}
            <Toggle
              pressed={false}
              onPressedChange={(pressed) => {
                if (pressed) true; /* 토글됨을 알림 */
              }}
              className="rounded data-[state=on]:bg-[#323036] hover:bg-[#323036] border border-transparent hover:border-[#323036] px-2 py-1"
              title="이미지 업로드"
            >
              <FallBackImage
                src="/images/image.png"
                alt="image"
                width={18}
                height={18}
                className="rounded object-contain"
              />
            </Toggle>

            {/* Bold */}
            <Toggle
              pressed={bold}
              onPressedChange={() => true /* 이탤릭으로 바뀌기 */}
              className="rounded data-[state=on]:bg-[#323036] hover:bg-[#323036] border border-transparent hover:border-[#323036] px-2 py-1"
              title="Bold"
            >
              <FallBackImage
                src="/images/bold.png"
                alt="bold"
                width={22}
                height={22}
                className="rounded object-contain"
              />
            </Toggle>

            {/* Underline */}
            <Toggle
              pressed={underline}
              onPressedChange={() => true /* 이탤릭으로 바뀌기 */}
              className="rounded data-[state=on]:bg-[#323036] hover:bg-[#323036] border border-transparent hover:border-[#323036] px-2 py-1"
              title="Underline"
            >
              <FallBackImage
                src="/images/underline.png"
                alt="underline"
                width={22}
                height={22}
                className="rounded object-contain"
              />
            </Toggle>

            {/* Italic */}
            <Toggle
              pressed={italic}
              onPressedChange={() => true /* 이탤릭으로 바뀌기 */}
              className="rounded data-[state=on]:bg-[#323036] hover:bg-[#323036] border border-transparent hover:border-[#323036] px-2 py-1"
              title="Italic"
            >
              <FallBackImage
                src="/images/italic.png"
                alt="italic"
                width={22}
                height={22}
                className="rounded object-contain"
              />
            </Toggle>
          </div>

          {/* 본문 */}
          <div className="text-xs bg-[#323036] rounded-b px-4 py-3 text-white leading-relaxed min-h-0 overflow-auto editor-scroll">
            {/* 실제 편집 영역 */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              data-placeholder="내용을 입력하거나 이미지를 업로드하세요…"
              onInput={handleInput}
              className="outline-none"
              style={{ minHeight: "100%" }}
            />

            {/* hidden input: FormData에 content 포함 */}
            <input type="hidden" name="content" value={form.content ?? ""} />
          </div>
        </div>
      </div>

      {/* 하단 액션 */}
      <div className="flex justify-end mt-5">
        <Link
          href={`/groups`}
          className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2  hover:bg-[#24192F]
                      transition-colors duration-300 ease-in-out"
        >
          취소
        </Link>
        <button
          onClick={onSubmit}
          className="flex items-center justify-center w-[120px] h-11  text-white rounded bg-[#FF567933] text-center hover:bg-[#FF5679] transition-colors duration-300 ease-in-out"
        >
          게시하기
        </button>
      </div>
    </>
  );
}
