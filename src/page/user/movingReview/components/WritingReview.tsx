import style from './WritingReview.module.css';

export default function WritingReview() {
  return (
    <div className={style.container}>
      <div>기사님 카드</div>
      <div className={`${style.smallContainer} ${style.rating}`}>
        <div>평점을 선택해 주세요</div>
        <div>별 5개</div>
      </div>
      <div className={style.smallContainer}>
        <div>상세 후기를 작성해주세요</div>
        <textarea placeholder='최소 10자 이상 입력해주세요.' />
      </div>
    </div>
  );
}
