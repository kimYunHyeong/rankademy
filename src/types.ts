/* ---------------------대학 정보------------------------------- */
export interface UnivData {
  univName: string;
  studentCnt: number;
  competitionCnt: number;
  competitionWinCnt: number;
  ranker: userDTO;
}

export interface userDTO {
  id: number;
  userName: string;
  userTag: string;
  icon: string;
}

/* -------------------------유저 정보----------------------------------- */
export type position = "top" | "jungle" | "middle" | "bottom" | "utility";

export interface tierDTO {
  rank: string;
  tier: number;
  lp: number;
}

export interface recordDTO {
  winCnt: number;
  LoseCnt: number;
}

export interface positionDTO {
  mainPosition: position;
  subPosition: position;
}

export interface userData {
  user: userDTO;
  univName: string;
  position: positionDTO;
  tier: tierDTO;
  record: recordDTO;
}

/* ----------------------------------------------------------- */

/* ---------------------테이블 관리--------------------------- */

/* 테이블에 어떤 내용이 들어갈지 관리, 페이지에서 인자로 넘기는 것 */
export type RankingTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  rowClassName?: (row: T, rowIndex: number) => string; //행 배경/하이라이트 등 커스터마이즈=
  pageSize?: number; // 기본 10
  initialPage?: number; // 기본 1
  showCountText?: boolean; // "1–10 / 246건" 같은 표기
  onPageChange?: (page: number) => void; // (선택) 외부에서 페이지 변화를 알고 싶다면:
};

/* 테이블의 내용과 모양을 관리, 각 페이지.tsx에서 관리 */
export type Column<T> = {
  id: string; //고유 아이디 (랭킹, 학교명 등)
  header: React.ReactNode; //테이블 헤더 텍스트
  widthClassName?: string; //열 전체의 스타일을 일괄적으로 조정하고 싶을 때 사용 (Tailwind, e.g. 'w-24', 'min-w-[120px]')
  headerClassName?: string; //헤더'만'의 스타일 조정
  cellClassName?: string; //특정 셀만 조정하고 싶을 때
  cell?: (row: T, rowIndex: number) => React.ReactNode; //row.icon 등과 같이 셀을 불러올 때 사용
  accessorKey?: keyof T; //단순 키 접근용 (cell이 없을 때 사용)
};

/* ------------------------------------------------------------ */

export type SelectOption<V = string, M = unknown> = {
  value: V; // string/number/boolean 등 자유
  label: React.ReactNode; // 텍스트/아이콘 등
  meta?: M; // { type: "number" } 같은 보조 정보
};

/** 컴포넌트 Props */
export type SelectProps<V = string, M = unknown> = {
  value?: V;
  defaultValue?: V;
  onChange?: (value: V, meta?: M) => void;

  /** readonly 배열을 지원해야 `as const` 옵션 배열을 그대로 넘길 수 있음 */
  options: ReadonlyArray<SelectOption<V, M>>;

  placeholder?: string;

  /** value<->string 변환기 (Shadcn Select는 내부적으로 string 사용) */
  valueToString?: (v: V) => string;
  stringToValue?: (s: string, opt?: SelectOption<V, M>) => V;

  /** 스타일 훅 */
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
};

/* -----------------------테이블 정렬------------------------------------- */

export type OptionValueOf<T extends readonly { value: any }[]> =
  T[number]["value"];
export type OptionMetaOf<T extends readonly { meta?: any }[]> = NonNullable<
  T[number]["meta"]
>;

/* ------------------------------------------------------------ */

/* ------------------------------------------------------------ */
export type PaginationProps<T> = {
  data: T[]; // 현재 페이지 데이터(서버 페이지네이션이면 "현재 페이지분"만)
  pageSize: number; // 15
  current: number; // 1..totalPages
  serverPaginated?: boolean;
  /** serverPaginated=true일 때 필수: 전체 레코드 수(예: 33) */
  totalCount?: number;
};
