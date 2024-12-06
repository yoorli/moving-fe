import style from './ReceivedCostInfo.module.css';

export default function ReceivedCostInfo() {
  return (
    <>
      <div className={style.container}>
        <div className={style.main}>
          <div className={style.infoContainer}>
            <div className={style.info}>견적 정보</div>
            <div className={style.infoTest}>
              <div className={style.infoMenu}>
                <div
                  className={style.infoMenuOrder}
                  style={{ marginRight: '32px' }}
                >
                  견적 요청일
                </div>
                <div>24.08.26</div>
              </div>
              <div className={style.infoMenu}>
                <div
                  className={style.infoMenuOrder}
                  style={{ marginRight: '64px' }}
                >
                  서비스
                </div>
                <div>사무실이사</div>
              </div>
              <div className={style.infoMenu}>
                <div
                  className={style.infoMenuOrder}
                  style={{ marginRight: '64px' }}
                >
                  이용일
                </div>
                <div>24.08.26(월)</div>
              </div>
              <div className={style.infoMenu}>
                <div
                  className={style.infoMenuOrder}
                  style={{ marginRight: '64px' }}
                >
                  출발지
                </div>
                <div>서울 중구 삼일대로 343</div>
              </div>
              <div className={style.infoMenu}>
                <div
                  className={style.infoMenuOrder}
                  style={{ marginRight: '64px' }}
                >
                  도착지
                </div>
                <div>서울 강남구 선릉로 428</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
