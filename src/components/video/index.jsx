import { useEffect, useState } from "react";
import moment from "moment";
import numeral from "numeral";
import { useSelector } from "react-redux";

import request from "../../axios";
import { truncate } from "../../Utils";
import "./_video.scss";

export default function Video({ item }) {
  const [channelthumbnail, setchannelthumbnail] = useState();
  const [views, setviews] = useState();
  const [duration, setduration] = useState();
  const activeCategory = useSelector(state => state.youtube.activeCategory);

  const {
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = item;

  const videId = activeCategory ? item.id.videoId : item.id;

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  useEffect(() => {
    request("/videos", {
      params: {
        part: "contentDetails,statistics",
        id: videId,
      },
    })
      .then(res => {
        setduration(res.data.items[0].contentDetails.duration);
        setviews(res.data.items[0].statistics.viewCount);
      })
      .catch(err => console.log(err));
  }, [videId]);

  useEffect(() => {
    request("/channels", {
      params: {
        part: "snippet",
        id: channelId,
      },
    })
      .then(res => {
        setchannelthumbnail(res.data.items[0].snippet.thumbnails.default);
      })
      .catch(err => console.log(err));
  }, [channelId]);

  return (
    <div className="video_wrap">
      <div className="video_img_wrap">
        <img src={medium.url} alt="video image" />
        <span>{_duration}</span>
      </div>

      <div className="video_details_wrap">
        <img src={channelthumbnail?.url} alt={channelTitle} />

        <div className="vid_details">
          <h3 className="video_title">{truncate(title, 60)}</h3>
          <h4 className="channel_name">{channelTitle}</h4>
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
