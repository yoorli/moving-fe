import Filter from './components/Filter';
import Dropdown from './components/Dropdown';
import CallList from './components/CallList';

import style from './index.module.css';

export default function DriverCostCallPage() {
  return (
    <div className={style.container}>
      <nav className={style.navigation}>받은 요청</nav>
      <div className={style.mainContainer}>
        <div className={style.filterBox}>
          <Filter />
        </div>
        <div className={style.content}>
          <div className={style.filterBar}>
            <div className={style.searchBar}>searchBar</div>
            <div className={style.sortBar}>
              전체 8건 <Dropdown />
            </div>
          </div>
          <div className={style.mainContent}>
            <CallList />
          </div>
        </div>
      </div>
    </div>
  );
}
