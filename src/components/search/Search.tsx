import style from "./Search.module.css";

interface SearchProps {
  placeholder: string;
  setSearchTerm: (searchTerm: string) => void;
}

const Search = ({ placeholder, setSearchTerm }: SearchProps) => {
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
        onChange={(e) => {setSearchTerm(e.target.value)}}
      />
    </div>
  );
};

export default Search;
