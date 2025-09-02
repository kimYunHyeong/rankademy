/* ---------------------대학 정보------------------------------- */
export interface UnivData {
  univName: string;
  studentCnt: number;
  competitionCnt: number;
  competitionWinCnt: number;
  ranker: RankerDTO;
}

export interface RankerDTO {
  id: number;
  username: string;
  userTag: string;
  icon: string;
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
