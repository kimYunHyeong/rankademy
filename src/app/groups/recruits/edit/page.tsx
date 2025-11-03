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

type GroupSelect = {
  groupId: string;
  groupName: string;
};

const myGroup: GroupSelect[] = [
  { groupId: "1", groupName: "서울과기대 컴퓨터공학과" },
  { groupId: "2", groupName: "서울대 컴퓨터공학과" },
  { groupId: "3", groupName: "고려대 컴퓨터공학과" },
  { groupId: "4", groupName: "연세대 컴퓨터공학과" },
];

type FormState = {
  groupId: string | null;
  title: string;
  contentHtml: string;
  images: string[];
};

export default function Page() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    groupId: null,
    title: "",
    contentHtml: "",
    images: [],
  });

  // 툴바 토글 상태
  const [bold, setBold] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [italic, setItalic] = useState(false);

  // contentEditable / file input 참조
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 커맨드 실행 공통
  const focusEditor = () => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    // 커서가 없을 때 맨 끝으로 이동
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const exec = (command: string, value?: string) => {
    focusEditor();
    document.execCommand(command, false, value);
    // 내용 동기화 + 상태 갱신
    setTimeout(() => {
      syncContentHtml();
      refreshToolbarStates();
    }, 0);
  };

  const syncContentHtml = () => {
    const html = editorRef.current?.innerHTML ?? "";
    setForm((prev) => ({ ...prev, contentHtml: html }));
  };

  const refreshToolbarStates = () => {
    // 현재 선택 상태를 기준으로 토글 UI 동기화
    try {
      setBold(document.queryCommandState("bold"));
      setUnderline(document.queryCommandState("underline"));
      setItalic(document.queryCommandState("italic"));
    } catch {
      // 일부 브라우저에서 예외가 날 수 있어 안전하게 무시
    }
  };

  useEffect(() => {
    // 선택 영역이 바뀔 때마다 툴바 상태 반영
    const handler = () => refreshToolbarStates();
    document.addEventListener("selectionchange", handler);
    return () => document.removeEventListener("selectionchange", handler);
  }, []);

  // 이미지 삽입
  const onPickImage = () => fileInputRef.current?.click();

  const insertImageAtCursor = (dataUrl: string) => {
    focusEditor();
    document.execCommand(
      "insertHTML",
      false,
      `<img src="${dataUrl}" alt="upload" style="max-width:100%; height:auto; border-radius:12px; margin:8px 0;" />`
    );
    setTimeout(() => {
      syncContentHtml();
    }, 0);
  };

  /*  const onFilesSelected: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    for (const f of files) {
      const dataUrl = await fileToDataURL(f);
      insertImageAtCursor(dataUrl);
      setForm((prev) => ({ ...prev, images: [...prev.images, dataUrl] }));
    }
    e.currentTarget.value = ""; // 같은 파일 재선택 허용
  }; */

  /* const fileToDataURL = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
 */
  const onSubmit = () => {
    if (!form.groupId) {
      alert("그룹을 선택해주세요.");
      return;
    }
    if (!form.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!form.contentHtml.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    // TODO: 실제 API 요청으로 교체
    console.log("POST /api/recruits", form);
    router.push(`/recruits/edit`);
  };

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>모집글 작성</span>
      </div>
      <div className="h-5"></div>
      {/* 바깥 카드: 내부 스크롤 허용을 위해 min-h와 함께 레이아웃을 분리 */}
      <div className="flex flex-col border-[#25242A] border-2 rounded bg-[#25242A33] min-h-[480px] h-[80%] w-full p-6 gap-3">
        {/* 그룹 선택 */}
        <Select
          value={form.groupId ?? "none"}
          onValueChange={(v) =>
            setForm((prev) => ({ ...prev, groupId: v === "none" ? null : v }))
          }
        >
          <SelectTrigger className="w-28 h-11 border-[#323036] bg-[#1D1921] text-[#B1ACC1] rounded">
            <SelectValue placeholder="그룹 선택" />
          </SelectTrigger>
          <SelectContent className="border-[#323036] bg-[#1D1921] text-[#B1ACC1] rounded">
            <SelectItem value="none">그룹 선택</SelectItem>
            {myGroup.map((group) => (
              <SelectItem
                key={group.groupId}
                value={group.groupId}
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

        {/* 에디터 래퍼: grid로 툴바 고정 높이 + 본문 가변(스크롤) */}
        <div className="grid grid-rows-[56px_minmax(0,1fr)] h-[700px] rounded overflow-hidden bg-transparent">
          {/* 툴바 (Toggle 사용) */}
          <div className="bg-[#25242A] flex items-center gap-2 px-4">
            {/* 이미지 업로드 */}
            <Toggle
              pressed={false}
              onPressedChange={(pressed) => {
                if (pressed) onPickImage();
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
            {/* <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={onFilesSelected}
            /> */}

            {/* Bold */}
            <Toggle
              pressed={bold}
              onPressedChange={() => exec("bold")}
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
              onPressedChange={() => exec("underline")}
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
              onPressedChange={() => exec("italic")}
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

          {/* 본문: min-h-0 로 부모 높이 안에서만 커지고, 내부 스크롤(스크롤바 숨김) */}
          <div className="text-xs bg-[#323036] rounded-b px-4 py-3 text-white leading-relaxed min-h-0 overflow-auto editor-scroll">
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={syncContentHtml}
              onKeyUp={refreshToolbarStates}
              onMouseUp={refreshToolbarStates}
              data-placeholder="내용을 입력하거나 이미지를 업로드하세요…"
              className="outline-none"
              style={{ minHeight: "100%" }}
            />
          </div>
        </div>
      </div>
      {/* 하단 액션 */}
      <div className="flex justify-end mt-5">
        <Link
          href={`/groups`}
          className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
        >
          취소
        </Link>
        <button
          onClick={onSubmit}
          className="flex items-center justify-center w-[120px] h-11  text-white rounded bg-[#FF567933] text-center"
        >
          게시하기
        </button>
      </div>
      {/* 에디터 전용 스타일: placeholder + 스크롤바 숨김 */}
      <style jsx>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #b1acc1;
          pointer-events: none;
        }
        /* 스크롤바 숨기기 (크로스 브라우저) */
        .editor-scroll {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }
        .editor-scroll::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }
      `}</style>
    </>
  );
}
