export interface UserData {
  total: number; //리스트 총 갯수
  small: number; //소형이사 갯수
  medium: number; //중형이사 총 갯수
  large: number; //대형이사 총 갯수
  assign: number; //지정 견적 요청 총 갯수
  users: {
    id: number;
    movingType: string[];
    isAssigned: boolean;
    customer: string;
    movingDate: string;
    departure: string;
    arrival: string;
    createAt: string;
  }[];
}