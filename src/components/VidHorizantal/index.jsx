import { useState, useEffect, memo } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import numeral from "numeral";
import moment from "moment";
import { useHistory } from "react-router";

import "./_style.scss";
import { truncate } from "../../Utils";
import request from "../../axios";
import GetChannelDp from "../../custom hooks/useGetChannelDp";

function VideoHorizantal({
  searchScrn,
  setrelatedVideos,
  data: {
    id: { kind, videoId },
    snippet,
  },
}) {
  const [views, setviews] = useState();
  const [duration, setduration] = useState();
  const {
    description,
    channelId,
    publishedAt,
    channelTitle,
    title,
    thumbnails,
  } = snippet;
  const history = useHistory();

  const isChannel = kind === "youtube#channel";
  const seconds = moment.duration(duration).asSeconds();
  const ytduration = moment.utc(seconds * 1000).format("HH:mm:ss");

  //get the video views and duration
  useEffect(() => {
    request("/videos", {
      params: {
        part: "contentDetails,statistics",
        id: videoId,
      },
    })
      .then((res) => {
        setduration(res.data.items[0].contentDetails.duration);
        setviews(res.data.items[0].statistics.viewCount);
      })
      .catch((err) => console.log(err));
  }, [videoId]);

  //get the channel dp
  const { currentVideoChannel } = GetChannelDp(channelId);

  const handleClick = () => {
    if (isChannel) {
      history.push(`/channel/${channelId}`);
    } else {
      setrelatedVideos && setrelatedVideos([]);
      history.push(`/video/${videoId}`);
    }
  };

  return (
    <a
      href="#watchScreen"
      className={`video_horizantal_wrapper ${searchScrn && "wrap_max"}`}
    >
      <div className={`video_img_wrap ${searchScrn && "img_big"}`}>
        <LazyLoadImage
          src={thumbnails.medium.url}
          className={`${isChannel && "thumbRound"}`}
          effect="blur"
          alt="related video thumbnail"
          onClick={handleClick}
        />
        {isChannel || <span className="vid_duration">{ytduration}</span>}
      </div>

      <div className="horiz_vid_details">
        <LazyLoadImage
          src={currentVideoChannel?.snippet.thumbnails.medium.url}
          effect="blur"
          alt=""
          className={`vidH_channel_dp ${isChannel && "hideInMobile"}`}
          onClick={() => history.push(`/channel/${channelId}`)}
        />
        <div className="vid_details">
          <h3
            onClick={handleClick}
            className={`vid_title ${searchScrn && "vid_title_Search"}`}
          >
            {truncate(title, 45)}
          </h3>
          {searchScrn
            ? isChannel || (
                <LazyLoadImage
                  src={currentVideoChannel?.snippet.thumbnails.medium.url}
                  effect="blur"
                  alt=""
                  className="vidH_channel_dp"
                  onClick={() => history.push(`/channel/${channelId}`)}
                />
              )
            : null}

          {!isChannel ? (
            <>
              <span className="vid_channel_title">{channelTitle}</span>
              <div
                className={`video_stats ${searchScrn && "video_stats_search"}`}
              >
                <span className="views">
                  {numeral(views).format("0.a")} views •
                </span>
                <span className="time"> {moment(publishedAt).fromNow()}</span>
              </div>
            </>
          ) : (
            <p className="channel_desc">{description}</p>
          )}
        </div>
      </div>
    </a>
  );
}

export default memo(VideoHorizantal);
