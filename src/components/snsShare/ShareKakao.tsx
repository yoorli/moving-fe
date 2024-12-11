const { Kakao } = window;

const shareKakao = (resultUrl: string, nickname: string) => {
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '이사를 준비하시나요?',
      description: `${nickname} 기사님을 추천합니다! 무빙에서 확인해 보세요!`,
      imageUrl:
        'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
      link: {
        webUrl: `http://localhost:3004${resultUrl}`,
      },
    },
    buttons: [
      {
        title: '무빙에서 확인하기',
        link: {
          webUrl: `http://localhost:3004${resultUrl}`,
        },
      },
    ],
  });
};

export default shareKakao;
