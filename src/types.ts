/* 포지션 */
export type Position = "TOP" | "JUNGLE" | "MIDDLE" | "BOTTOM" | "UTILITY";

/* 티어 */
export type Tier =
  | "UNRANKED"
  | "IRON"
  | "BRONZE"
  | "SILVER"
  | "GOLD"
  | "PLATINUM"
  | "EMERALD"
  | "DIAMOND"
  | "MASTER"
  | "GRANDMASTER"
  | "CHALLENGER";

/* 페이지네이션 데이터 */
export type PaginationData = {
  size: number;
  number: number; //쿼리로 몇 번째 페이지를 요청했는지
  totalElements: number;
  totalPages: number;
};

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

/* 쿼리값 변경 */
export type QueryValue = string | number | boolean | null | undefined;
export type Query = Record<string, QueryValue>;

/* 대항전 상태 */
export type CompetitionStatus =
  | "SCHEDULED"
  | "COMPLETED"
  | "OPPOSED"
  | "EXPIRED";

/* 그룹 상세 정보 */
export type GroupDetail = {
  groupId: number;
  name: string;
  about: string;
  logoImageUrl: string;
  avgTierInfo: {
    tier: Tier;
    rank: string;
    lp: number;
    mappedTier: number;
  };
  competitionInfo: {
    winCount: number;
    lossCount: number;
    winRate: number;
  };
  capacity: number;
  memberCnt: number;
  leader: {
    id: number;
    summonerName: string;
    summonerTag?: string;
    summonerIcon: number;
  };
  createdAt: string;
  isJoined: boolean;
  isLeader: boolean;
};

/* 최근 대항전 정보 */
export type RecentCompetition = {
  competitionId: number;
  groupId: number;
  groupName: string;
  isWin: boolean;
  status: CompetitionStatus;
};

/* 팀 멤버 */
export type TeamMember = {
  memberId: number;
  position: Position;
  summonerName: string;
  summonerTag: string;
  summonerIcon: number;
  univName: string;
  major: string;
  admissionYear: number;
  tierInfo: {
    tier: string;
    rank: string;
    lp: number;
    mappedTier: number;
  };
};

/* 대항전 기록 */
export type GroupCompetitionResult = {
  competitionId: number;
  otherTeamUnivName: string;
  status: CompetitionStatus;
  myTeam: {
    teamId: number;
    teamName: string;
    groupName: string;
    teamMembers: TeamMember[];
  };
  otherTeam: {
    teamId: number;
    teamName: string;
    groupName: string;
    teamMembers: TeamMember[];
  };
  submittedAt: string;
  isWin: boolean;
  setResults: {
    setNumber: number;
    winnerTeamId: number;
  }[];
};

export type Session = {
  isAuthenticated: boolean;
  summonerIcon?: number | null;
};

/* 이 아래는 다 지우기 */
/* ---------------------대학 정보------------------------------- */
export interface UnivData {
  univName: string;
  studentCnt: number;
  competitionCnt: number;
  competitionWinCnt: number;
  ranker: summonerDTO;
}

export interface summonerDTO {
  id: number;
  userName: string;
  userTag: string;
  icon: string;
}

/* -------------------------유저 정보----------------------------------- */

export interface tierDTO {
  rank: string;
  tier: number;
  lp: number;
}

export interface recordDTO {
  cnt: number;
  win: number;
}

export interface positionDTO {
  main: Position;
  sub: Position;
}

export interface userData {
  univName: string;
  admissionYear: number;
  major: string;
  user: summonerDTO;
  position: positionDTO;
  tier: tierDTO;
  record: recordDTO;
  emblem: string | null;
  description: string | null;
  most: {
    first: string;
    second: string;
    third: string;
  };
  verified: boolean;
}

/* ------------------------교내 유저 랭킹 페이지----------------------------------- */

export interface univUserData {
  puuid: string | number;
  user: summonerDTO;
  univName: string;
  position: positionDTO;
  tier: tierDTO;
  record: recordDTO;
  major: majorDTO;
}

export interface majorDTO {
  admissionYear: string; // ex) 20
  major: string; // ex) 컴퓨터공학과}
}

/* -----------------------교내 그룹 랭킹 페이지------------------------------------ */

export interface univGroupData {
  group: groupDTO;
  memberCnt: number;
  competition: competitionDTO;
  tier: tierDTO;
  groupLeader: summonerDTO;
  description: string;
  createdAt: string;
  latestMatch: matchDTO[];
}

export interface groupDTO {
  id: number;
  name: string;
  icon: string;
}

export interface competitionDTO {
  cnt: number;
  win: number;
}

export interface matchDTO {
  oppose: groupDTO;
  result: result;
}

export type result = "win" | "lose";

export type GroupCardData = {
  group: { id?: string | number; name: string; icon: string };
  createdAt: string;
  description: string;
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
