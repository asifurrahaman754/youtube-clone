import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import Categories from "../../components/Categories";
import Video from "../../components/video";
import "./_style.scss";
import useGetVIdeoData from "../../custom hooks/useGetVIdeoData";

export default function HomeScreen() {
  const [currentPage, setcurrentPage] = useState("");
  const [nextPage, setnextPage] = useState("");
  const [homevideos, sethomevideos] = useState([]);
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(true);
  const [freezeCatg, setfreezeCatg] = useState(false);
  const videoContainer = useRef(null);
  const el = videoContainer.current;
  const activeCategory = useSelector(state => state.youtube.activeCategory);

  useEffect(() => {
    //change the state directly to delete all the existing videos if we change category
    sethomevideos(homevideos.splice(0, homevideos.length));
    //scroll to the top of the page
    el?.scrollTo(0, 0);
  }, [activeCategory]);

  //if user selects any category then get the cat data or get the most popular data
  useGetVIdeoData(
    currentPage,
    sethomevideos,
    homevideos,
    setnextPage,
    seterror,
    setloading,
    setfreezeCatg
  );

  const loadMore = () => {
    setloading(true);
    setcurrentPage(nextPage);
  };

  //if user scrolls to the bottom then load more video
  // useEffect(() => {
  //   const scrollEvent = el?.addEventListener("scroll", function () {
  //     if (el.scrollHeight - el.clientHeight === el.scrollTop) {
  //       setloading(true);
  //       loadmore();
  //     }
  //   });

  //   return () => el?.removeEventListener("scroll", scrollEvent);
  // }, [loading]);

  return (
    <div className="home_content_container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>YouTube Clone</title>
      </Helmet>

      <Categories setfreezeCatg={setfreezeCatg} freezeCatg={freezeCatg} />
      <div ref={videoContainer} className="video_container">
        <div className="home_video_wrap">
          {error && <h5 className="error_msg">{error}</h5>}
          {homevideos?.map(item => (
            <Video key={item.id} item={item} />
          ))}
        </div>

        {loading && (
          <div class="spinner-border spinner text-primary" role="status"></div>
        )}

        {!homevideos.length || (
          <button className="loadMore_videos" onClick={loadMore}>
            More videos
          </button>
        )}
      </div>
    </div>
  );
}
