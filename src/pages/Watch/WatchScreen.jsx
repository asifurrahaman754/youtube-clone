import { useParams } from "react-router-dom";

import "./_style.scss";
import VideoMeta from "../../components/VideoMeta";
import Comment from "../../components/Comment";
import VideoHorizantal from "../../components/VidHorizantal";

export default function WatchScreen() {
  const { id } = useParams();

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

          <VideoMeta />
          <Comment />
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
