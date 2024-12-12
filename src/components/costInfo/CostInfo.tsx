import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import style from './CostInfo.module.css';
import Button from '../btn/Button';

interface CostInfoProps {
  id?: number; // 견적 요청 ID
  name?: string; // 소비자 이름
  isConfirmed?: boolean; //확정된 요청인지 확인
  movingRequest: string; // 견적 요청일
  movingType: string; // 이사 종류
  movingDate: string; // 이사 날짜 (이용일)
  departure: string; // 출발지
  arrival: string; // 도착지
  comment: string; //요구 사항
  hasButton?: boolean; // 버튼 유무
  setIsModalOpen?: (value: boolean) => void; // Modal 열기
}

const infoMovingType = (type: string): string => {
  switch (type) {
    case 'SMALL':
      return '소형이사';
    case 'HOUSE':
      return '가정이사';
    case 'OFFICE':
      return '사무실 이사';
    default:
      return '';
  }
};

export default function CostInfo({
  movingRequest,
  movingType,
  movingDate,
  departure,
  arrival,
  comment,
  hasButton,
  setIsModalOpen,
}: CostInfoProps) {
  const date = new Date(movingDate); // 또는 원하는 날짜 객체

  const formattedDate = format(date, 'yyyy. MM. dd(EEE)', { locale: ko });

  const handleModalOpen = () => {
      setIsModalOpen?.(true);
  };

  return (
    <div className={style.container}>
      <div className={style.title}>견적 정보</div>
      <div className={style.infoContainer}>
        <div className={style.infoContents}>
          <div className={style.infoTitle}>견적 요청일</div> {movingRequest}
        </div>
        <div className={style.infoContents}>
          <div className={style.infoTitle}>서비스</div>{' '}
          {infoMovingType(movingType)}
        </div>
        <div className={style.infoContents}>
          <div className={style.infoTitle}>이용일</div> {formattedDate}
        </div>
        <div className={style.infoContents}>
          <div className={style.infoTitle}>출발지</div> {departure}
        </div>
        <div className={style.infoContents}>
          <div className={style.infoTitle}>도착지</div> {arrival}
        </div>
        <div className={style.requestContainer}>
          <div className={style.infoTitle}>요청 사항</div>
          <div className={style.request}>{comment}</div>
        </div>
        {hasButton && (
          <div className={style.button}>
            <Button
              text='견적 요청 취소하기'
              btnStyle='outlinedRed200'
              onClick={handleModalOpen}
            />
          </div>
        )}
      </div>
    </div>
  );
}
