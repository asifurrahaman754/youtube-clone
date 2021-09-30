import { useState } from "react";

import { useDispatch } from "react-redux";
import "./_categories.scss";
import { categories } from "../../data";
import { setactiveCategory } from "../../redux/youtubeSlice";

export default function Categories() {
  const [activeCat, setactiveCat] = useState("All");
  const dispatch = useDispatch();

  const handleCatClick = value => {
    setactiveCat(value);
    dispatch(
      value === "All" ? setactiveCategory("") : setactiveCategory(value)
    );
  };

  return (
    <div className="categories_contaier">
      {categories.map((value, i) => (
        <span
          onClick={() => handleCatClick(value)}
          className={activeCat === value && "active"}
          key={i}
        >
          {value}
        </span>
      ))}
    </div>
  );
}
