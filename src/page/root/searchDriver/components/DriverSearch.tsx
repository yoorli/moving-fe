import style from './DriverSearch.module.css';

interface DriverSearchProps {
  placeholder: string;
  className?: string;
}

const DriverSearch = ({ placeholder, className }: DriverSearchProps) => {
  return (
    <div className={`${style.searchContainer} ${className || ''}`}>
      <img alt='Search Icon' className={style.searchIcon} />
      <input
        type='text'
        placeholder={placeholder}
        className={style.searchInput}
      />
    </div>
  );
};

export default DriverSearch;

