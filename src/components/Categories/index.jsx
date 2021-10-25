import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import "./_categories.scss";
import { setactiveCategory } from "../../redux/youtubeSlice";
import request from "../../axios";

export default function Categories() {
  const [activeCat, setactiveCat] = useState("All");
  const [categories, setcategories] = useState([]);
  const [categoriesError, setcategoriesError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    request("/videoCategories", {
      params: {
        part: "snippet",
        regionCode: "US",
      },
    })
      .then(res => {
        const Allobj = { id: "all", title: "All" };
        const newArr = res.data.items.map(item => ({
          id: item.id,
          title: item.snippet.title,
        }));

        setcategories([Allobj, ...newArr]);
      })
      .catch(err =>
        setcategoriesError("Failed to get categories. " + err.message)
      );
  }, []);

  const handleCatClick = value => {
    setactiveCat(value);
    dispatch(
      value === "All" ? setactiveCategory("") : setactiveCategory(value)
    );
  };

  return (
    <div className="categories_contaier">
      {!categoriesError || <p>{categoriesError}</p>}
      {!categories.length ||
        categories.map(item => (
          <span
            onClick={() => handleCatClick(item?.title)}
            className={activeCat === item?.title && "active"}
            key={item?.id}
          >
            {item?.title}
          </span>
        ))}
    </div>
  );
}
