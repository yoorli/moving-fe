import React, { useState } from 'react';
import cn from 'classnames';
import { fetchAddress } from '../../../lib/api/kakao';
import style from './MovingAddressModal.module.css';
import icSearchLarge from '../../../assets/icons/ic_search_large.svg';
import icXCircleLarge from '../../../assets/icons/ic_x_circle_large.svg';
import icXLarge from '../../../assets/icons/ic_x_large.svg';
import Button from '../../../components/btn/Button';

interface AddressValues {
  road_address: {
    zone_no: string;
    address_name: string;
    building_name: string;
  };
  address: {
    address_name: string;
  };
}

// interface MetaValues {
//   is_end: boolean;
//   pageable_count: number;
//   total_count: number;
// }

interface ModalProps {
  setValue(name: 'arrival' | 'departure', value: string | null): void;
  type: 'arrival' | 'departure';
  onClose: () => void;
}

export default function AddressModal({ setValue, type, onClose }: ModalProps) {
  const [addressList, setAddressList] = useState<AddressValues[]>([]);
  // const [meta, setMeta] = useState<MetaValues>();
  const [address, setAddress] = useState('');
  const [index, setIndex] = useState<null | number>(null);
  // const [currentPage, setCurrentPage] = useState(1);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const fetchData = async () => {
        const { addressList } = await fetchAddress(address);
        setAddressList(addressList);
        // setMeta(meta);
        setIndex(null);
      };
      fetchData();
    }
  };

  const handleClick = (i: number, selectedAddress: AddressValues) => {
    setAddress(selectedAddress.road_address.address_name);
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
    setAddressList([]);
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
          <img src={icXLarge} alt='' width={36} height={36} onClick={onClose} />
        </div>
        <div className={style.searchContainer}>
          <img
            className={style.searchIcon}
            src={icSearchLarge}
            alt=''
            width={36}
            height={36}
          />
          <input
            className={style.searchInputField}
            name='address'
            placeholder='주소를 입력해 주세요'
            value={address}
            onChange={inputChange}
            onKeyDown={inputOnKeyDown}
          />
          <img
            className={style.searchIconCancel}
            src={icXCircleLarge}
            alt=''
            width={36}
            height={36}
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
                <span className={style.addressLabel}>도로명</span> &nbsp;
                {address?.road_address?.address_name}
                &nbsp;
                {address?.road_address?.building_name}
              </div>
              <div className={style.addressDetail}>
                <span
                  className={style.addressLabel}
                  style={{ padding: '2px 14.5px' }}
                >
                  지번
                </span>
                {address.address?.address_name}&nbsp;
                {address?.road_address?.building_name}
              </div>
            </div>
          </li>
        ))}

        <Button
          className={cn(style.submitButton, {
            [style.submitEmptyListButton]: addressList.length === 0,
          })}
          text='선택완료'
          btnStyle='solid640pxBlue300'
          disabled={index === null}
          onClick={() =>
            handleSelectClick(
              type === 'departure' ? 'departure' : 'arrival',
              address,
            )
          }
        />
      </div>
    </div>
  );
}
