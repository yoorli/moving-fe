import Button from '../btn/Button';
import style from './ModalContainer.module.css';
import closeButton from '../../assets/icons/ic_x_large.svg';
import { ReactNode } from 'react';
import classNames from 'classnames';

interface modalProps {
  title: string;
  isText?: boolean; // 모달 안에 넣을 것이 컴포넌트인지 단순 텍스트인지 확인
  text?: string;
  isFilter?: boolean; // 예외적으로 filter 모달은 스타일이 달라서 추가
  secondTitle?: string;
  selectedTab?: 'modalFirstTab' | 'modalSecondTab';
  onTabChange?: (selectedTab: 'modalFirstTab' | 'modalSecondTab') => void;
  children?: ReactNode;
  btnColorRed?: boolean; // 버튼 색 빨강
  buttonText: string;
  disabled?: boolean;
  closeBtnClick: () => void;
  buttonClick: () => void;
}

export default function ModalContainer({
  title,
  isText = false,
  text,
  isFilter = false,
  secondTitle,
  selectedTab,
  onTabChange,
  children,
  btnColorRed = false,
  buttonText,
  disabled,
  closeBtnClick,
  buttonClick,
}: modalProps) {
  const containerStyle = classNames({
    [style.container]: !isText && !isFilter,
    [style.textContainer]: isText,
    [style.filterContainer]: isFilter,
  });

  const titleStyle = classNames({
    [style.title]: !isFilter,
    [style.filterTitle]: isFilter,
  });

  const handleTabClick = (modalTab: 'modalFirstTab' | 'modalSecondTab') => {
    onTabChange?.(modalTab);
  };

  const activeModalTab = (
    modalTab: 'modalFirstTab' | 'modalSecondTab',
    text: string | undefined,
  ) => (
    <div
      className={classNames(style.filterContent, {
        [style.active]: selectedTab === modalTab,
      })}
      onClick={() => handleTabClick(modalTab)}
    >
      {text}
    </div>
  );

  return (
    <div className={style.overlay}>
      <div className={containerStyle}>
        <div className={style.header}>
          {isFilter ? (
            <div className={style.filterTitle}>
              {activeModalTab('modalFirstTab', title)}
              {activeModalTab('modalSecondTab', secondTitle)}
            </div>
          ) : (
            <div className={titleStyle}>{title}</div>
          )}

          <img
            className={style.close}
            src={closeButton}
            alt='close'
            onClick={closeBtnClick}
          ></img>
        </div>
        {isText ? <div className={style.content}>{text}</div> : children}
        <Button
          text={buttonText}
          disabled={disabled}
          btnStyle={btnColorRed ? 'outlinedRed200' : 'solid560pxBlue300'}
          onClick={buttonClick}
        />
      </div>
    </div>
  );
}
