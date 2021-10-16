import { useState, useEffect } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import numeral from "numeral";
import moment from "moment";
import { useHistory } from "react-router";

import "./_style.scss";
import { truncate } from "../../Utils";
import request from "../../axios";

export default function VideoHorizantal({
  setrelatedVideos,
  data: {
    id: { videoId },
    snippet,
  },
}) {
  const [views, setviews] = useState();
  const [duration, setduration] = useState();
  const { publishedAt, channelTitle, title, thumbnails } = snippet;
  const history = useHistory();

  const seconds = moment.duration(duration).asSeconds();
  const ytduration = moment.utc(seconds * 1000).format("mm:ss");

  //get the video views and duration
  useEffect(() => {
    request("/videos", {
      params: {
        part: "contentDetails,statistics",
        id: videoId,
      },
    })
      .then(res => {
        setduration(res.data.items[0].contentDetails.duration);
        setviews(res.data.items[0].statistics.viewCount);
      })
      .catch(err => console.log(err));
  }, [videoId]);

  const handleClick = () => {
    setrelatedVideos([]);
    history.push(`/video/${videoId}`);
  };

  return (
    <a
      href="#watchScreen"
      className="video_horizantal_wrapper"
      onClick={handleClick}
    >
      <div className="video_img_wrap">
        <LazyLoadImage
          src={thumbnails.medium.url}
          effect="blur"
          alt="related video thumbnail"
        />
        <span className="vid_duration">{ytduration}</span>
      </div>

      <div className="horiz_vid_details">
        <h3 className="vid_title">{truncate(title, 45)}</h3>
        <span className="vid_channel_title">{channelTitle}</span>
        <div className="video_stats">
          <span className="views">{numeral(views).format("0.a")} views •</span>
          <span className="time"> {moment(publishedAt).fromNow()}</span>
        </div>
      </div>
    </a>
  );
}
