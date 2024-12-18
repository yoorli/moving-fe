import { useMedia } from '../../lib/function/useMediaQuery';
import style from './Chip.module.css';
import cn from 'classnames';
import icHomeLarge from '../../assets/icons/ic_home_large.svg';
import icHomeMedium from '../../assets/icons/ic_home_medium.svg';
import icBoxLarge from '../../assets/icons/ic_box_large.svg';
import icBoxMedium from '../../assets/icons/ic_box_medium.svg';
import icCompanyLarge from '../../assets/icons/ic_company_large.svg';
import icCompanyMedium from '../../assets/icons/ic_company_medium.svg';
import icDocumentLarge from '../../assets/icons/ic_document_large.svg';
import icDocumentMedium from '../../assets/icons/ic_document_medium.svg';

export interface ChipProps {
  type: 'SMALL' | 'HOUSE' | 'OFFICE' | 'ASSIGN' | 'CONFIRM' | 'WAITING';
  size?: 'favorite' | 'noFavorite';
}

export default function Chip({ type, size = 'noFavorite' }: ChipProps) {
  const { pc } = useMedia();

  const chipImg = (type: string, size: string): string => {
    switch (type) {
      case 'SMALL':
        return size === 'favorite'
          ? icBoxMedium
          : pc
            ? icBoxLarge
            : icBoxMedium;
      case 'HOUSE':
        return size === 'favorite'
          ? icHomeMedium
          : pc
            ? icHomeLarge
            : icHomeMedium;
      case 'OFFICE':
        return size === 'favorite'
          ? icCompanyMedium
          : pc
            ? icCompanyLarge
            : icCompanyMedium;
      case 'ASSIGN':
        return size === 'favorite'
          ? icDocumentMedium
          : pc
            ? icDocumentLarge
            : icDocumentMedium;
      default:
        return '';
    }
  };

  const chipText = (type: string): string => {
    switch (type) {
      case 'SMALL':
        return '소형이사';
      case 'HOUSE':
        return '가정이사';
      case 'OFFICE':
        return '사무실이사';
      case 'ASSIGN':
        return '지정 견적 요청';
      case 'CONFIRM':
        return '확정 견적';
      default:
        return '견적 대기';
    }
  };

  return (
    <div
      className={cn(size === 'favorite' ? style.favoriteLayout : style.layout, {
        [size === 'favorite' ? style.favoriteRedLayout : style.redLayout]:
          type === 'ASSIGN',
        [size === 'favorite' ? style.favoriteBlackLayout : style.blackLayout]:
          type === 'CONFIRM' || type === 'WAITING',
      })}
    >
      <img src={chipImg(type, size)} alt='' />
      <div>{chipText(type)}</div>
    </div>
  );
}
