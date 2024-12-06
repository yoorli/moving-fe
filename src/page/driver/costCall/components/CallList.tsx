import { useState } from 'react';

import UserCard from '../../../../components/card/UserCard';
import ModalContainer from '../../../../components/modal/ModalContainer';
import Chip from '../../../../components/chip/Chip';
import UserProfile from '../../../../components/card/UserProfile';
import ModalInput from './ModalInput';

import { ChipType } from '../../../../components/card/type';

import style from './CallList.module.css';

interface User {
  id: number;
  movingType: ChipType[];
  isAssigned: boolean;
  customer: string;
  movingDate: string;
  departure: string;
  arrival: string;
  createAt: string;
}

interface CallListProps {
  list: User[];
}

export default function CallList({ list }: CallListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달
  const [modalContent, setModalContent] = useState(true); // true : 견적보내기 / false : 반려
  const [userIndex, setUserIndex] = useState<number>(); // 선택된 카드 index

  const sendBtnHandler = (index: number) => {
    setIsModalOpen(!isModalOpen);
    setModalContent(true);
    setUserIndex(index);
  };

  const rejectBtnHandler = (index: number) => {
    setIsModalOpen(!isModalOpen);
    setModalContent(false);
    setUserIndex(index);
  };

  const btnHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.callList}>
      {list.map((user, index) => (
        <UserCard
          key={user.id}
          user={user}
          type='receive'
          sendCostBtn={() => sendBtnHandler(index)}
          rejectCostBtn={() => rejectBtnHandler(index)}
        />
      ))}
      {isModalOpen && userIndex !== undefined && (
        <ModalContainer
          title= {modalContent ? '견적 보내기' : '요청 반려'}
          buttonText= {modalContent ? '견적 보내기' : '반려하기'}
          closeBtnClick={() => setIsModalOpen(!isModalOpen)}
          buttonClick={btnHandler}
        >
          <div className={style.container}>
            <div className={style.chipBar}>
              {list[userIndex].movingType.map((type, idx) => (
                <Chip key={idx} type={type} />
              ))}
              {list[userIndex].isAssigned && <Chip type='ASSIGN' />}
            </div>
            <div>
              <UserProfile user={list[userIndex]} type='modal' />
            </div>
            {modalContent ? (
              <>
                <ModalInput
                  text='견적가를 입력해 주세요'
                  basicText='견적가 입력'
                />
                <ModalInput
                  text='코멘트를 입력해 주세요'
                  basicText='최소 10자 이상 입력해주세요'
                  isTextArea={true}
                />
              </>
            ) : (
              <ModalInput
                text='반려 사유를 입력해 주세요'
                basicText='최소 10자 이상 입력해주세요'
                isTextArea={true}
              />
            )}
          </div>
        </ModalContainer>
      )}
    </div>
  );
}
