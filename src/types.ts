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
  icon: string;
}
