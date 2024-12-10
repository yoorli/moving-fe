// 24시간 이하 - @시간/분 전, 이상 - yyyy. mm. dd 형식 출력
export function getDate(inputDate: string | Date) {
  const now = new Date();
  const date = new Date(inputDate);
  const difference = now.getTime() - date.getTime();
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (difference < 24 * 60 * 60 * 1000) {
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    // return `${seconds}초 전`;
  } else {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `작성일 ${year}. ${month}. ${day}`;
  }
}

export function getNotificationDate(inputDate: string | Date) {
  const now = new Date();
  const date = new Date(inputDate);
  const difference = now.getTime() - date.getTime();
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (difference < 24 * 60 * 60 * 1000) {
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return `${seconds}초 전`;
  } else {
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}. ${month}. ${day}`;
  }
}

// 한국기준 금액 형식 출력
export function formatCurrency(cost: number, onlyNum?: boolean) {
  const price = cost.toLocaleString('ko-KR')

  return onlyNum ? price : price + '원';
}
