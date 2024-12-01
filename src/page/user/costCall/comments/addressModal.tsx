import React, { useState } from 'react';
import { fetchAddress } from '../../../../lib/api/kakao';
import style from './addressModal.module.css';
import icSearchLarge from '../../../../assets/icons/ic_search_large.svg';
import icXCircleLarge from '../../../../assets/icons/ic_x_circle_large.svg';
import icXLarge from '../../../../assets/icons/ic_x_large.svg';
import Button from '../../../../components/btn/Button';

interface Address {
  road_address: {
    zone_no: string;
    address_name: string;
    building_name: string;
  };
  address: {
    address_name: string;
  };
}

interface ModalProps {
  setValue(name: 'arrival' | 'departure', value: string | null): void;
  type: 'arrival' | 'departure';
  onClose: () => void;
}

export default function AddressModal({ setValue, type, onClose }: ModalProps) {
  const [addressList, setAddressList] = useState<Address[]>([]);
  const [meta, setMeta] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [index, setIndex] = useState<null | number>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const fetchData = async () => {
        const { addressList, meta } = await fetchAddress(address);
        setAddressList(addressList);
        setMeta(meta);
        setIndex(null);
      };
      fetchData();
    }
  };

  const handleClick = (i: number, selectedAddress: Address) => {
    setAddress(selectedAddress.road_address.address_name);
    setIndex(i);
  };

  const handleSelectCompletion = (
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

  console.log(meta);

  return (
    <div className={style.layout}>
      <div className={style.modal}>
        <div className={style.modalTop}>
          <div className={style.modalText}>출발지를 입력해 주세요</div>
          <img src={icXLarge} alt='' width={36} height={36} onClick={onClose} />
        </div>
        <div className={style.searchBar}>
          <img
            className={style.searchIcon}
            src={icSearchLarge}
            alt=''
            width={36}
            height={36}
          />
          <input
            className={style.searchInput}
            name='address'
            placeholder='주소를 입력해 주세요'
            value={address}
            onChange={onChange}
            onKeyDown={onKeyDown}
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
              className={
                index === i ? style.addressSelectLayout : style.addressLayout
              }
            >
              <div className={style.addressZoneNo}>
                {address?.road_address?.zone_no}
              </div>
              <div className={style.addressRoad}>
                <span className={style.addressName}>도로명</span> &nbsp;
                {address?.road_address?.address_name}
                &nbsp;
                {address?.road_address?.building_name}
              </div>
              <div className={style.addressRoad}>
                <span
                  className={style.addressName}
                  style={{ padding: '2px 14.5px' }}
                >
                  지번
                </span>{' '}
                {address.address?.address_name}&nbsp;
                {address?.road_address?.building_name}
              </div>
            </div>
          </li>
        ))}

        <Button
          className={style.btn}
          text='선택완료'
          style='solid640pxBlue300'
          disabled={index === null}
          onClick={() =>
            handleSelectCompletion(
              type === 'departure' ? 'departure' : 'arrival',
              address,
            )
          }
        />
      </div>
    </div>
  );
}
