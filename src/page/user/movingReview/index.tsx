import { useState } from 'react';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';
import NoContents from '../../../components/nocontents/NoContents';
import ModalContainer from '../../../components/modal/ModalContainer';
import WritingReview from './components/WritingReview';
import WritableReviews from './components/WritableReviews';

export default function UserMovingReview() {
  const [currentTab, setCurrentTab] = useState<'first' | 'second'>('first');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabChange = (tab: 'first' | 'second') => {
    setCurrentTab(tab);
    setIsModalOpen(true); // 임시로 모달 열리는 거 테스트하게끔 설정
  };

  const modalBtnClick = () => {
    setIsModalOpen(false);
    console.log('you post review :) '); // 리뷰 등록 버튼
  };

  // const handleModalOpen = () => {
  //   setIsModalOpen(true); // onClick prop 뚫리면 사용
  // }

  return (
    <>
      <Tab
        selectable={true}
        firstText='작성 가능한 리뷰'
        secondText='내가 작성한 리뷰'
        selectedTab={currentTab}
        onTabChange={handleTabChange}
      />
      <div className={style.overlay}>
        <div className={style.container}>
          {currentTab === 'first' ? (
            <WritableReviews />
          ) : (
            <NoContents image='file' emptyWritableReviews={true} />
          )}
        </div>
        {isModalOpen && (
          <ModalContainer
            title='리뷰 쓰기'
            buttonText='리뷰 등록'
            closeBtnClick={() => setIsModalOpen(!isModalOpen)}
            buttonClick={modalBtnClick}
          >
            <WritingReview />
          </ModalContainer>
        )}
        {/* <NoContents image='file' emptyWritableReviews={true} /> */}
      </div>
    </>
  );
}
