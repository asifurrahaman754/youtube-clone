import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import request from "../../axios";
import VideoHorizantal from "../VidHorizantal";
import "./_style.scss";

export default function Search() {
  const [searchresults, setsearchresults] = useState([]);
  const [currentPage, setcurrentPage] = useState("");
  const [nextPage, setnextPage] = useState("");
  const [error, seterror] = useState("");
  const [searchLoad, setsearchLoad] = useState(true);

  const videoWrapRef = useRef(null);

  const { query } = useParams();

  useEffect(() => {
    //change the state directly to delete all the existing videos if we change query
    setsearchresults(searchresults.splice(0, searchresults.length));
    //scroll to top
    videoWrapRef?.current.scrollTo(0, 0);
  }, [query]);

  //get the search results
  useEffect(() => {
    setsearchLoad(true);
    request("/search", {
      params: {
        part: "snippet",
        q: query,
        pageToken: currentPage,
      },
    })
      .then(res => {
        setsearchLoad(false);
        setsearchresults(
          currentPage ? [...searchresults, ...res.data.items] : res.data.items
        );
        setnextPage(res.data.nextPageToken);
      })
      .catch(err => {
        console.log(err.message);
        setsearchLoad(false);
        seterror("failed getting the result. " + err.message);
      });
  }, [currentPage, query]);

  //load more search videos
  const loadMore = () => {
    setsearchLoad(true);
    setcurrentPage(nextPage);
  };

  return (
    <div ref={videoWrapRef} className="searchResults_container">
      {!error || <p className="text-center">{error}</p>}

      {!searchLoad || (
        <div
          class="spinner-border text-primary d-block m-auto"
          role="status"
        ></div>
      )}

      {searchresults &&
        searchresults.map(item => (
          <VideoHorizantal searchScrn key={item.id.videoId} data={item} />
        ))}

      {!searchresults.length || (
        <button className="loadMore_videos" onClick={loadMore}>
          More results
        </button>
      )}
    </div>
  );
}
