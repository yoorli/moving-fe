const { Kakao } = window;

const shareKakao = (resultUrl: string, nickname: string, type?: string) => {
  if (!resultUrl || !nickname) {
    console.error('resultUrl 또는 nickname이 유효하지 않습니다.');
    return;
  }

  const BASE_URL = `${process.env.REACT_APP_API_URL}`;
  const fullUrl = `${BASE_URL}${resultUrl}`;
  const imageUrl =
    'https://opposite-sun-0c5.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F04cc5962-73e4-4184-add6-c01da0cb645d%2Fa536e773-f067-48a7-a6e2-c489ed9f86ab%2FProperty_1logo-text_Property_2xl.jpg?table=block&id=176d4e9c-7b84-803a-8e0c-f6bc3a55776c&spaceId=04cc5962-73e4-4184-add6-c01da0cb645d&width=2000&userId=&cache=v2';
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
