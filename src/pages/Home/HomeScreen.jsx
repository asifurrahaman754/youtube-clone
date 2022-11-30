import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import Categories from "../../components/Categories";
import Video from "../../components/Video";
import VideoSkeleton from "../../components/Video/VideoSkeleton";
import useGetVIdeoData from "../../custom hooks/useGetVIdeoData";
import "./_style.scss";

export default function HomeScreen() {
  const [currentPage, setcurrentPage] = useState("");
  const [nextPage, setnextPage] = useState("");
  const [homevideos, sethomevideos] = useState([]);
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const [freezeCatg, setfreezeCatg] = useState(false);
  const videoContainer = useRef(null);
  const el = videoContainer.current;
  const activeCategory = useSelector((state) => state.youtube.activeCategory);

  useEffect(() => {
    //change the state directly to delete all the existing videos if we change category
    sethomevideos((h) => h.splice(0, h.length));
    //scroll to the top of the page
    el?.scrollTo(0, 0);
  }, [activeCategory, el]);

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
        <div className="home_video_wrap mx-auto">
          {!currentPage && loading
            ? [...Array(10)].map((_, i) => <VideoSkeleton key={i} />)
            : null}

          {homevideos?.map((item) => (
            <Video key={item.etag} item={item} />
          ))}
        </div>

        {error && (
          <h5 className="error_msg text-center fs-5 m-auto mt-5">{error}</h5>
        )}
        {currentPage && loading ? (
          <div
            className="spinner-border spinner text-primary"
            role="status"
          ></div>
        ) : null}

        {!homevideos.length || (
          <button className="loadMore_videos" onClick={loadMore}>
            More videos
          </button>
        )}
      </div>
    </div>
  );
}
