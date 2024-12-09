import style from './ReceivedCostInfo.module.css';
import { infoProps } from '../mockData';

export default function ReceivedCostInfo({ info }: infoProps) {
  const infoType = (type: string): string => {
    switch (type) {
      case 'SMALL':
        return '소형이사';
      case 'HOME':
        return '가정이사';
      case 'COMPANY':
        return '사무실 이사';
      default:
        return '';
    }
  };

  return (
    <>
      <div className={style.infoContainer}>
        <div className={style.infoTitle}>견적 정보</div>
        <div className={style.infoMain}>
          <div className={style.infoMenu}>
            <div
              className={style.infoMenuOrder}
              style={{ marginRight: '32px' }}
            >
              견적 요청일
            </div>
            <div>{info.movingRequest}</div>
          </div>
          <div className={style.infoMenu}>
            <div
              className={style.infoMenuOrder}
              style={{ marginRight: '70px' }}
            >
              서비스
            </div>
            <div className={style.infoMenuItem}>
              {infoType(info.movingType)}
            </div>
          </div>
          <div className={style.infoMenu}>
            <div
              className={style.infoMenuOrder}
              style={{ marginRight: '70px' }}
            >
              이용일
            </div>
            <div>{info.movingDate}</div>
          </div>

          <div className={style.infoMenu}>
            <div
              className={style.infoMenuOrder}
              style={{ marginRight: '70px' }}
            >
              이용일
            </div>
            <div className={style.infoMenuItem}>{info.movingDate}</div>
          </div>
          <div className={style.infoMenu}>
            <div
              className={style.infoMenuOrder}
              style={{ marginRight: '70px' }}
            >
              출발지
            </div>
            <div className={style.infoMenuItem}>{info.departure}</div>
          </div>
          <div className={style.infoMenu}>
            <div
              className={style.infoMenuOrder}
              style={{ marginRight: '70px' }}
            >
              도착지
            </div>
            <div className={style.infoMenuItem}>{info.arrival}</div>
          </div>
          <div className={style.infoMenu}>
            <div
              className={style.infoMenuOrder}
              style={{ marginRight: '55px' }}
            >
              요청사항
            </div>
            <div className={style.infoMenuItem}>{info.comment}</div>
          </div>
        </div>
      </div>
    </>
  );
}
