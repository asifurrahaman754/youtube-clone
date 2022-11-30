import { useEffect, useState, memo } from "react";
import moment from "moment";
import numeral from "numeral";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import request from "../../axios";
import { truncate } from "../../Utils";
import "./_video.scss";
import GetChannelDp from "../../custom hooks/useGetChannelDp";

function Video({ item, channelScrn }) {
  const [views, setviews] = useState();
  const [duration, setduration] = useState();
  const history = useHistory();
  const activeCategory = useSelector((state) => state.youtube.activeCategory);
  const {
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = item;

  const seconds = moment.duration(duration).asSeconds();
  const ytduration = moment.utc(seconds * 1000).format("HH:mm:ss");
  let videId = activeCategory ? item.id.videoId : item.id;
  channelScrn && (videId = item.snippet.resourceId.videoId);

  //get the video views and duration
  useEffect(() => {
    request("/videos", {
      params: {
        part: "contentDetails,statistics",
        id: videId,
      },
    })
      .then((res) => {
        setduration(res.data.items[0].contentDetails.duration);
        setviews(res.data.items[0].statistics.viewCount);
      })
      .catch((err) => console.log(err));
  }, [videId]);

  //get the channel dp
  const { currentVideoChannel } = GetChannelDp(channelId);

  const handleVideoClick = () => {
    history.push(`/video/${videId}`);
  };

  const channelClick = () => {
    history.push(`/channel/${channelId}`);
  };

  return (
    <div className="video_wrap">
      <div className="video_img_wrap" onClick={handleVideoClick}>
        <LazyLoadImage src={medium?.url} effect="blur" alt="video image" />
        <span className="vid_duration">{ytduration}</span>
      </div>

      <div className="video_details_wrap">
        {channelScrn || (
          <LazyLoadImage
            src={currentVideoChannel?.snippet.thumbnails.medium.url}
            effect="blur"
            alt={channelTitle}
            onClick={channelClick}
          />
        )}

        <div className="vid_details">
          <h3 onClick={handleVideoClick} className="video_title">
            {truncate(title, 60)}
          </h3>
          {channelScrn || <h4 className="channel_name">{channelTitle}</h4>}
          <div className="video_info">
            <span className="views">
              {numeral(views).format("0.a")} views •
            </span>
            <span className="time"> {moment(publishedAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Video);
