import style from "./Search.module.css";

interface SearchProps {
  placeholder: string;
}

const Search = ({ placeholder }: SearchProps) => {
  return (
    <div className={style.searchContainer}>
      <img
        alt="Search Icon"
        className={style.searchIcon}
      />
      <input
        type="text"
        placeholder={placeholder}
        className={style.searchInput}
      />
    </div>
  );
};

export default Search;
