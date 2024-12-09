import style from './CostInfo.module.css';

export default function CostInfo() {
  return (
    <div className={style.container}>
      <div className={style.title}>견적 정보</div>
      <div className={style.infoContainer}>
        <div className={style.infoContents}>
          <div className={style.infoTitle}>견적 요청일</div> 날짜
        </div>
        <div className={style.infoContents}>
          <div className={style.infoTitle}>서비스</div> 서비스종류
        </div>
        <div className={style.infoContents}>
          <div className={style.infoTitle}>이용일</div> 날짜
        </div>
        <div className={style.infoContents}>
          <div className={style.infoTitle}>출발지</div> 출발위치
        </div>
        <div className={style.infoContents}>
          <div className={style.infoTitle}>도착지</div> 도착위치
        </div>
        <div className={style.requestContainer}>
          <div className={style.infoTitle}>요청 사항</div>
          <div className={style.request}>
          이사 시 대형 가전제품(냉장고, 세탁기)과 가구(침대, 책상, 옷장 등) 운반이 필요하며, 모든 물품은 파손되지 않도록 꼼꼼히 포장 부탁드립니다. 특히 유리 제품과 전자기기는 별도 포장을 원하며, 출발지는 5층 엘리베이터가 없고 도착지는 10층 엘리베이터 사용 가능합니다. 가구 배치는 도착 후 현장에서 안내할 예정이며, 오전 9시부터 작업 시작을 희망합니다. 혹시 예상보다 작업 시간이 길어질 경우 미리 알려주세요. 감사합니다.
          </div>
        </div>
      </div>
    </div>
  );
}
