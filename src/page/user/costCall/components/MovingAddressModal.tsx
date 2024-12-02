import React, { useState } from 'react';
import cn from 'classnames';
import { useMovingAddressList } from '../../../../lib/api/kakao';
import style from './MovingAddressModal.module.css';
import icSearchLarge from '../../../../assets/icons/ic_search_large.svg';
import icSearchMedium from '../../../../assets/icons/ic_search_medium.svg';
import icXCircleLarge from '../../../../assets/icons/ic_x_circle_large.svg';
import icXCircleMedium from '../../../../assets/icons/ic_x_circle_medium.svg';
import icXLarge from '../../../../assets/icons/ic_x_large.svg';
import icXLargeMedium from '../../../../assets/icons/ic_x_medium.svg';
import Button from '../../../../components/btn/Button';
import Pagination from '../../../../components/common/Pagination';
import { useMedia } from '../../../../lib/function/useMediaQuery';

export interface AddressValues {
  road_address: {
    zone_no: string;
    address_name: string;
    building_name: string;
  };
  address: {
    address_name: string;
  };
}

export interface MetaValues {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
}

interface ModalProps {
  setValue(name: 'arrival' | 'departure', value: string | null): void;
  type: 'arrival' | 'departure';
  onClose: () => void;
}

export default function AddressModal({ setValue, type, onClose }: ModalProps) {
  const { pc } = useMedia();
  const [address, setAddress] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [index, setIndex] = useState<null | number>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAddress, setSelectAddress] = useState('');

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const size = pc ? 5 : 3;

  const { addressList, meta, isLoading, error } = useMovingAddressList(
    address,
    currentPage,
    size,
  );

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setCurrentPage(1);
      setIndex(null);
      setAddress(inputValue);
    }
  };

  const handleClick = (i: number, selectedAddress: AddressValues) => {
    setSelectAddress(selectedAddress.road_address.address_name);
    setIndex(i);
  };

  const handleSelectClick = (
    type: 'departure' | 'arrival',
    address: string,
  ) => {
    setValue(type, address);
    onClose();
  };

  const handleInputCancel = () => {
    setAddress('');
    setIndex(null);
  };

  return (
    <div className={style.modalWrapper}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <div className={style.modalTitle}>
            {type === 'departure'
              ? '출발지를 선택해 주세요'
              : '도착지를 선택해 주세요'}
          </div>
          <img
            className={style.modalTitleCancel}
            src={pc ? icXLarge : icXLargeMedium}
            alt=''
            onClick={onClose}
          />
        </div>
        <div className={style.searchContainer}>
          <img
            className={style.searchIcon}
            src={pc ? icSearchLarge : icSearchMedium}
            alt=''
          />
          <input
            className={style.searchInputField}
            name='address'
            placeholder='주소를 입력해 주세요'
            value={inputValue}
            onChange={inputChange}
            onKeyDown={inputOnKeyDown}
          />
          <img
            className={style.searchIconCancel}
            src={pc ? icXCircleLarge : icXCircleMedium}
            alt=''
            onClick={() => handleInputCancel()}
          />
        </div>

        {addressList?.map((address, i) => (
          <li key={i} onClick={() => handleClick(i, address)}>
            <div
              className={cn(style.addressItem, {
                [style.addressSelectLayout]: index === i,
              })}
            >
              <div className={style.addressPostalCode}>
                {address?.road_address?.zone_no}
              </div>

              <div className={style.addressDetail}>
                <div className={style.addressLabel}>도로명</div>
                <div className={style.addressItemLabel}>
                  {address?.road_address?.address_name}
                  &nbsp;
                  {address?.road_address?.building_name}
                </div>
              </div>

              <div className={style.addressDetail}>
                <div
                  className={style.addressLabel}
                  style={
                    pc ? { padding: '6px 14.5px' } : { padding: '6px 13.5px' }
                  }
                >
                  지번
                </div>
                <div className={style.addressItemLabel}>
                  {address.address?.address_name}&nbsp;
                  {address?.road_address?.building_name}
                </div>
              </div>
            </div>
          </li>
        ))}
        {(meta?.total_count ?? 0) > 1 && (
          <div className={style.pagination}>
            <Pagination
              onPageChange={setCurrentPage}
              currentPage={currentPage}
              itemsTotalCount={meta?.total_count}
              itemsPerPage={4}
              maxPagesToShow={pc ? 5 : 3}
            />
          </div>
        )}
        {isLoading && <div>로딩 중입니다</div>}
        {error && (
          <div>
            {error instanceof Error
              ? error.message
              : '예기치 못한 오류가 발생했습니다.'}
          </div>
        )}

        <Button
          className={cn(style.submitButton, {
            [style.submitEmptyListButton]: addressList?.length === 0,
          })}
          text='선택완료'
          btnStyle='solid640pxBlue300'
          disabled={index === null}
          onClick={() =>
            handleSelectClick(
              type === 'departure' ? 'departure' : 'arrival',
              selectAddress,
            )
          }
        />
      </div>
    </div>
  );
}
