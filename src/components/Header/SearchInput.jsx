import { useRef, useEffect } from "react";
import { useHistory } from "react-router";

export default function SearchInput({ hideSearch }) {
  const inputRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    hideSearch || inputRef.current.focus();
  }, [hideSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) {
      return;
    }
    history.push(`/search/${inputRef.current.value}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={hideSearch ? "header_form hide_search" : "header_form mx-auto"}
    >
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
