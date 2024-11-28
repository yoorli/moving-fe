import { useState } from 'react';
import Calender from './comments/calendar';
import styles from './index.module.css';

export interface FormValues {
  type: null | string;
  date: null | string;
  address: null | string;
  etc?: null | string;
}

export interface SelectionStatus {
  typeSelect: boolean;
  dateSelect: boolean;
  addressSelect: boolean;
  etcSelect?: boolean;
}

export default function UserCostCallPage() {
  const [values, setValues] = useState<FormValues>({
    type: null,
    date: null,
    address: null,
    etc: null,
  });
  const [confirm, setConfirm] = useState<SelectionStatus>({
    typeSelect: false,
    dateSelect: false,
    addressSelect: false,
    etcSelect: true,
  });

  const handleClick = (name: string, option: string) => {
    setValues((prev: FormValues) => ({
      ...prev,
      [name]: option,
    }));
  };

  const selectClick = (name: string, select: boolean) => {
    setConfirm((prev: SelectionStatus) => ({
      ...prev,
      [name]: select,
    }));
  };

  return (
    <div className={styles.layout}>
      <div>
        <div>
          몇 가지 정보만 알려 주시면 최대 5개의 견적을 받을 수 있어요 :)
        </div>
        <div>이사 종류를 선택해 주세요</div>
      </div>
      <div>
        <button onClick={() => handleClick('type', 'option1')}>Option 1</button>
        <button onClick={() => handleClick('type', 'option2')}>Option 2</button>
        <button onClick={() => handleClick('type', 'option3')}>Option 3</button>
        <button onClick={() => selectClick('typeSelect', true)}>
          선택완료
        </button>
      </div>
      {confirm.typeSelect && (
        <div>
          <div>{values.type}</div>
          <button onClick={() => selectClick('typeSelect', false)}>
            수정하기
          </button>
        </div>
      )}
      <div>이사 예정일을 선택해 주세요</div>
      <div>
        <Calender />
      </div>
      {confirm.typeSelect && (
        <div>
          <div>{values.date}</div>
          <button onClick={() => selectClick('dateSelect', false)}>
            수정하기
          </button>
        </div>
      )}
      <div>
        <div>이사 지역을 선택해 주세요</div>
        <div>이사 지역</div>
      </div>
      <div>
        <div>{values.address}</div>
        <div>수정하기</div>
      </div>
      <div>
        <div>요청 사항이 있으면 적어 주세요</div>
        <div>적는칸</div>
        <div>견적 확정하기</div>
      </div>
    </div>
  );
}
