const { Kakao } = window;
import logoTextLarge from '../../assets/images/img_logo_text_large.svg';

const shareKakao = (resultUrl: string, nickname: string, type?: string) => {
  if (!resultUrl || !nickname) {
    console.error('resultUrl 또는 nickname이 유효하지 않습니다.');
    return;
  }

  const BASE_URL = 'https://moving-fe-teal.vercel.app';
  const fullUrl = `${BASE_URL}${resultUrl}`;
  const imageUrl = logoTextLarge;
  const text = type
    ? `${nickname} 고객님의 견적서가 도착했습니다! 무빙에서 확인해 보세요!`
    : `${nickname} 기사님을 추천합니다! 무빙에서 확인해 보세요!`;

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '이사를 준비하시나요?',
      description: text,
      imageUrl: imageUrl,
      link: {
        mobileWebUrl: fullUrl,
        webUrl: fullUrl,
      },
    },
    buttons: [
      {
        title: '무빙에서 확인하기',
        link: {
          mobileWebUrl: fullUrl,
          webUrl: fullUrl,
        },
      },
    ],
  });
};

export default shareKakao;
