export interface Notification {
  id: number; // 알림 아이디
  contents: string; // 알림 텍스트
  userName?: string;
  moverNickname?: string;
  userConfirmId?: number; // 확정된 견적 아이디 - (유저)견적 확정, 이사일 알림
  estimateId?: number; // 견적 도착 아이디 - (유저)대기중인 견적 상세페이지
  moverConfirmId?: number; // 확정된 견적 아이디 - (기사님)견적 확정, 이사일 알림
  assignedEstimateRequestId?: number; // 지정 견적 도착 - (기사님) 받은 요청 페이지
  createdAt: string; // 도척알
  isRead: boolean; // 읽음 여부
}

export interface NotificationProps {
  list: Notification[];
  notReadCount: number;
}

// export const mockData: NotificationProps = {
//   notReadCount: 6,
//   list: [
//     // (유저) 견적 도착
//     // 김코드 기사님의 견적이 도착했습니다 -> 김코드 기사님의 견적상세(견적서id)

//     {
//       id: 1,
//       content: ' 소형이사',
//       moverNickname: '김코드',
//       estimateId: 2,
//       createAt: '2024-12-09T14:30:45',
//       isRead: false,
//     },
//     // (유저) 견적 확정
//     // 김코드 기사님의 견적이 확정되었어요 -> 견적 id
//     {
//       id: 2,
//       content: '견적이 확정됐습니다',
//       moverNickname: '김코드',
//       userConfirmId: 11,
//       createAt: '2024-12-08T16:32:45',
//       isRead: false,
//     },
//     // (유저) 이사일 알림
//     // 오늘은 경기(양산) -> 서울(영등포) 이사 예정일이에요 -> 견적 id
//     {
//       id: 3,
//       content: '경기도 양산 -> 서울 송파 이사 예정일',
//       userConfirmId: 22,
//       createAt: '2024-11-22T19:30:45',
//       isRead: false,
//     },
//     // (기사님) 견적 도착
//     // 김가나 고객님의 소형이사 지정 견적이 도착했습니다 -> 프론트에서 처리
//     {
//       id: 4,
//       content: '소형이사',
//       userName: '김가나',
//       assignedEstimateRequestId: 2,
//       createAt: '2024-11-20T19:30:45',
//       isRead: false,
//     },
//     // (기사님) 견적 확정
//     // 김기나 고객님의 소형이사 견적이 확정되었습니다 -> 견적 Id
//     {
//       id: 5,
//       content: '소형이사',
//       userName: '김가나',
//       moverConfirmId: 2,
//       createAt: '2024-11-19T19:30:45',
//       isRead: false,
//     },
//     // (기사님) 이사일 알림 -> 견적 id
//     {
//       id: 6,
//       content: '경기도 양산 -> 서울 송파 이사 예정일',
//       moverConfirmId: 2,
//       createAt: '2024-11-12T19:30:45',
//       isRead: false,
//     },
//   ],
// };
