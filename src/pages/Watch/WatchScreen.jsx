import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./_style.scss";
import VideoMeta from "../../components/VideoMeta";
import Comment from "../../components/Comment";
import VideoHorizantal from "../../components/VidHorizantal";
import request from "../../axios";

export default function WatchScreen() {
  const [selectedVideoData, setselectedVideoData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        id: id,
      },
    })
      .then(res => setselectedVideoData(res.data.items[0]))
      .catch(err => alert(err.message));
  }, [id]);

  const props = {};
  if (selectedVideoData) {
    props.data = selectedVideoData;
  }

  return (
    <div className="watchScreen_bg">
      <div className="watch_sc_container">
        <div className="video_container">
          <div className="video_wrap">
            <iframe
              width="420"
              height="315"
              src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            ></iframe>
          </div>

          <VideoMeta {...props} />
          <Comment {...props} />
        </div>

        <div className="suggest_vid_container">
          {[...Array(10)].map(item => (
            <VideoHorizantal />
          ))}
        </div>
      </div>
    </div>
  );
}
