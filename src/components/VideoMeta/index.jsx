import { useState } from "react";
import numeral from "numeral";
import moment from "moment";

import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { truncate } from "../../Utils";
import "./_style.scss";

export default function VideoMeta({ data }) {
  const [showMore, setshowMore] = useState(false);

  return (
    <div className="videoMeta_container">
      <h3 className="video_title">{data?.snippet.title}</h3>
      <div className="video_info">
        <span className="views">
          {numeral(data?.statistics.viewCount).format("0,0")} views&nbsp;•
        </span>
        <span className="video_published">
          &nbsp;{moment(data?.snippet.publishedAt).format("D MMM YYYY")}
        </span>
        <div className="video_impression">
          <span>
            <AiOutlineLike />
            {numeral(data?.statistics.likeCount).format("0.a")}
          </span>
          <span>
            <AiOutlineDislike />
            {numeral(data?.statistics.dislikeCount).format("0.a")}
          </span>
        </div>
      </div>

      <div className="video_middle_info">
        <img
          src={data?.snippet.thumbnails.medium.url}
          alt="channel image"
          className="channel_icon"
        />
        <div className="channel_data">
          <h5 className="channel_title">{data?.snippet.channelTitle}</h5>
          <h6 className="channel_sub">2.63K subscribers</h6>
        </div>

        <button className="subscribe_btn">Subscribe</button>
      </div>

      <pre className="video_details">
        {data?.snippet.description}
        {/* {!showMore ? truncate(videoDes, 100) : videoDes} */}
      </pre>

      <span
        onClick={() => setshowMore(!showMore)}
        className="show_more_details"
      >
        show {!showMore ? "more" : "less"}
      </span>
    </div>
  );
}
