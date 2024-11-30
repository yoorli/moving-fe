import React, { useState } from 'react';
import { fetchAddress } from '../../../../lib/api/kakao';

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
}

export default function AddressModal({ setValue, type }: ModalProps) {
  const [addressList, setAddressList] = useState<Address[]>([]);
  const [meta, setMeta] = useState<string[]>([]);
  const [address, setAddress] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const fetchData = async () => {
        const { addressList, meta } = await fetchAddress(address);
        setAddressList(addressList);
        setMeta(meta);
      };
      fetchData();
    }
  };

  const handleClick = (selectedAddress: Address) => {
    setAddress(selectedAddress.road_address.address_name);
  };

  const handleSelectCompletion = (
    type: 'departure' | 'arrival',
    address: string,
  ) => {
    setValue(type, address);
  };

  console.log(addressList, meta);

  return (
    <div>
      <div>출발지를 입력해 주세요</div>
      <input
        name='address'
        placeholder='주소를 입력해 주세요'
        value={address}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {addressList?.map((address, index) => (
        <li key={index} onClick={() => handleClick(address)}>
          <div>
            <div>우편번호: {address.road_address.zone_no}</div>
            <div>
              도로 주소: {address.road_address.address_name}&nbsp;
              {address.road_address.building_name}
            </div>
            <div>
              주소 이름: {address.address.address_name}&nbsp;
              {address.road_address.building_name}
            </div>
          </div>
        </li>
      ))}

      <button
        onClick={() =>
          handleSelectCompletion(
            type === 'departure' ? 'departure' : 'arrival',
            address,
          )
        }
      >
        선택하기
      </button>
    </div>
  );
}
