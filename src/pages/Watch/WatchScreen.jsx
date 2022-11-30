import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./_style.scss";
import VideoMeta from "../../components/VideoMeta";
import Comment from "../../components/Comment";
import VideoHorizantal from "../../components/VidHorizantal";
import request from "../../axios";
import GetVidHorizantal from "../../custom hooks/useGetVidHorizantal";

export default function WatchScreen() {
  const [selectedVideoData, setselectedVideoData] = useState(null);
  const [relatedVideos, setrelatedVideos] = useState([]);
  const [currentPage, setcurrentPage] = useState("");
  const [nextPage, setnextPage] = useState("");
  const [relatedVidLoad, setrelatedVidLoad] = useState(true);
  const [error, seterror] = useState("");
  const { id } = useParams();
  const videoHContainer = useRef(null);

  //get the data of the specific selected video
  useEffect(() => {
    request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        id: id,
      },
    })
      .then((res) => setselectedVideoData(res.data.items[0]))
      .catch((err) => alert(err.message));
  }, [id]);

  //get the related videos
  GetVidHorizantal(
    id,
    setrelatedVideos,
    seterror,
    setnextPage,
    setrelatedVidLoad,
    currentPage,
    relatedVideos
  );

  //load more related videos
  const loadMore = () => {
    setrelatedVidLoad(true);
    setcurrentPage(nextPage);
  };

  return (
    <div id="watchScreen" ref={videoHContainer} className="watchScreen_bg">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{selectedVideoData?.snippet?.title}</title>
      </Helmet>

      <div className="watch_sc_container">
        <div className="video_container">
          <div className="video_wrap">
            <iframe
              allow="fullscreen"
              allowFullScreen="allowFullScreen"
              width="420"
              title="current running video"
              height="315"
              src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            ></iframe>
          </div>

          <VideoMeta data={selectedVideoData} />
          <Comment data={selectedVideoData} />
        </div>

        <div className="suggest_vid_container">
          {!relatedVideos.length ||
            relatedVideos.map((item) => (
              <VideoHorizantal
                data={item}
                key={item.id.videoId}
                setrelatedVideos={setrelatedVideos}
              />
            ))}

          {!relatedVidLoad || (
            <div
              className="spinner-border text-primary d-block m-auto"
              role="status"
            ></div>
          )}

          {!error || <p>{error}</p>}

          {!relatedVideos.length || (
            <button className="loadMore_videos" onClick={loadMore}>
              More videos
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
