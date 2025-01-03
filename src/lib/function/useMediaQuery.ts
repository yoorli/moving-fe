import { useMediaQuery } from 'react-responsive';

export function useMedia() {
  const pc = useMediaQuery({ query: '(min-width: 1200px)' });
  const tablet = useMediaQuery({
    query: '(min-width: 744px) and (max-width: 1199px)',
  });
  const mobile = useMediaQuery({ query: '(max-width: 743px)' });

  // max 칩 5개까지
  const mobileWithChip = useMediaQuery({
    query: '(min-width: 421px) and (max-width: 540px)',
  });

  // max 칩 5개까지 2
  const mobileWithChipSecond = useMediaQuery({ query: '(max-width: 420px)' });

  // max 칩 4개까지 있는 경우 모바일에서의 칩 나열
  const mobileWithChipMaxFour = useMediaQuery({ query: '(max-width: 466px' });

  return {
    pc,
    tablet,
    mobile,
    mobileWithChip,
    mobileWithChipSecond,
    mobileWithChipMaxFour,
  };
}
