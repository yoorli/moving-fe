import { useMediaQuery } from 'react-responsive';

export function useMedia() {
  const pc = useMediaQuery({ query: '(min-width: 1200px)' });
  const tablet = useMediaQuery({
    query: '(min-width: 744px) and (max-width: 1199px)',
  });
  const mobile = useMediaQuery({ query: '(max-width: 743px)' });

  const mobileWithChip = useMediaQuery({
    query: '(min-width: 421px) and (max-width: 540px)',
  });

  const mobileWithChipSecond = useMediaQuery({ query: '(max-width: 420px)' });

  return { pc, tablet, mobile, mobileWithChip, mobileWithChipSecond };
}
