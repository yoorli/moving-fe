import { useState } from 'react';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';
import ModalContainer from '../../../components/modal/ModalContainer';
import WritingReview from './components/WritingReview';
import WritableReviews from './components/WritableReviews';

export default function UserMovingReview() {
  const [currentTab, setCurrentTab] = useState<'first' | 'second'>('first');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMover, setSelectedMover] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setReview('');
    setRating(0);
  };

  const modalBtnClick = () => {
    setIsModalOpen(false);
    setReview('');
    setRating(0);
    // 리뷰 등록 버튼 누르면 review값을 post / 그리고 내가 작성한 리뷰로 리다이렉트??
    console.log('you post your review :) '); // 리뷰 등록 버튼
  };

  return (
    <>
      <Tab
        selectable={true}
        firstText='작성 가능한 리뷰'
        secondText='내가 작성한 리뷰'
        selectedTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
      />
      <div className={style.overlay}>
        <div className={style.container}>
          {currentTab === 'first' ? (
            <WritableReviews
              setIsModalOpen={setIsModalOpen}
              setSelectedMover={setSelectedMover}
            />
          ) : (
            'MyReview 컴포넌트'
          )}
        </div>
        {isModalOpen && (
          <ModalContainer
            title='리뷰 쓰기'
            buttonText='리뷰 등록'
            closeBtnClick={handleModalClose}
            buttonClick={modalBtnClick}
            disabled={review.length < 10 || rating === 0}
          >
            <WritingReview
              setReview={setReview}
              rating={rating}
              setRating={setRating}
              mover={selectedMover}
            />
          </ModalContainer>
        )}
      </div>
    </>
  );
}
