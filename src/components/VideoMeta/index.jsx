import { memo } from "react";
import { useHistory } from "react-router";
import numeral from "numeral";
import moment from "moment";
import ShowMore from "react-show-more";

import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import "./_style.scss";
import GetChannelDp from "../../custom hooks/useGetChannelDp";

function VideoMeta({ data }) {
  const history = useHistory();

  //get the current video channel data :- subscribe, channel dp
  const { currentVideoChannel } = GetChannelDp(data?.snippet.channelId);

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
          src={currentVideoChannel?.snippet.thumbnails.medium.url}
          alt="channel"
          className="channel_icon"
          onClick={() => history.push(`/channel/${data?.snippet.channelId}`)}
        />
        <div className="channel_data">
          <h5
            onClick={() => history.push(`/channel/${data?.snippet.channelId}`)}
            className="channel_title"
          >
            {data?.snippet.channelTitle}
          </h5>
          <h6 className="channel_sub">
            {numeral(currentVideoChannel?.statistics.subscriberCount).format(
              "0.a"
            )}{" "}
            subscribers
          </h6>
        </div>

        <button className="subscribe_btn">Subscribe</button>
      </div>

      <pre className="video_details">
        <ShowMore
          lines={3}
          more="Show more"
          less="Show less"
          anchorClass="show_more_details"
        >
          {data?.snippet.description}
        </ShowMore>
      </pre>
    </div>
  );
}

export default memo(VideoMeta);
