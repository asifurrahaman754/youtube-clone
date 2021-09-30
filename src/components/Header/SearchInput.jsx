import { useRef, useEffect } from "react";

export default function SearchInput({ hideSearch }) {
  const inputRef = useRef(null);

  useEffect(() => {
    hideSearch || inputRef.current.focus();
  }, []);

  return (
    <form className={hideSearch ? "header_form hide_search" : "header_form"}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        className="search_input"
      />
      <button type="submit" className="searchIcon">
        <img src="/assets/searchIcon.svg" alt="search icon" />
      </button>
    </form>
  );
}
