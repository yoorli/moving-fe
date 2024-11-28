import Card from '../../../components/page/card/Card';

import styles from './index.module.css';

import avatarPinkMedium from '../../../assets/images/img_avatar_pink_medium.svg'
import avatarBlueMedium from '../../../assets/images/img_avatar_blue_medium.svg'
import avatarGreenLarge from '../../../assets/images/img_avatar_green_large.svg'

export default function DriverCallPage() {
  const driver1 ={
    label : "소형이사",
    called : true,
    content : "고객님의 물품을 운송해 드립니다.",
    image: avatarPinkMedium,
    name: 'test1',
    rating: 4.0,
    reviews: 20,
    experience: 1,
    confirmedCases: 50,
    likes: 12
  }

  const driver2 = {
    label : "포장이사",
    called : true,
    content : "고객님의 물품을 운송해 드립니다.",
    image: avatarBlueMedium,
    name: 'test2',
    movingDate: '2024.07.01',
    cost: 210000
  }

  const driver3 = {
    label : "대형이사",
    called : true,
    content : "고객님의 물품을 운송해 드립니다.",
    image: avatarGreenLarge,
    name: 'test3',
    movingDate: '2024.07.01',
    cost: 210000
  }

  return (
    <div>
      <div className={styles.card}>
        <Card user={driver1}/>
        <Card user={driver1} size='medium'/>
        <Card user={driver2} type='review'/>
        <Card user={driver2} type='review' size='medium'/>
        <Card user={driver3} type='review' size='large'/>
      </div>
    </div>
  );
}
