import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import Categories from "../../components/Categories";
import Video from "../../components/video";
import "../../_app.scss";
import useGetVIdeoData from "../../custom hooks/useGetVIdeoData";

export default function HomeScreen() {
  const [currentPage, setcurrentPage] = useState("");
  const [homevideos, sethomevideos] = useState([]);
  const [error, seterror] = useState("");
  const [nextPage, setnextPage] = useState("");
  const [loading, setloading] = useState(true);
  const messagesEndRef = useRef(null);

  const activeCategory = useSelector(state => state.youtube.activeCategory);

  //scrool to the top of the page
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo(0, 0);
  };

  useEffect(() => {
    sethomevideos(homevideos.splice(0, homevideos.length));
    scrollToBottom();
  }, [activeCategory]);

  //if user selects any category then get the cat data or get the most popular data
  useGetVIdeoData(
    currentPage,
    sethomevideos,
    homevideos,
    setnextPage,
    seterror,
    setloading
  );

  const loadmore = () => {
    setloading(true);
    setcurrentPage(nextPage);
  };

  return (
    <div className="home_content_container">
      <Categories />
      <div ref={messagesEndRef} className="video_container">
        {error && <h5 className="error_msg">{error}</h5>}

        {homevideos?.map(item => (
          <Video key={item.etag} item={item} />
        ))}

        {loading && (
          <div class="spinner-border text-primary" role="status"></div>
        )}
        {!error && <button onClick={loadmore}>load more</button>}
      </div>
    </div>
  );
}
