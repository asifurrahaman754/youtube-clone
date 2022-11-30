import { useEffect, useState } from "react";
import { useParams } from "react-router";
import numeral from "numeral";
import { Helmet } from "react-helmet";

import request from "../../axios";
import Video from "../../components/Video";
import GetChannelDp from "../../custom hooks/useGetChannelDp";
import "./_style.scss";

export default function Channel() {
  const [currentPage, setcurrentPage] = useState("");
  const [nextPage, setnextPage] = useState("");
  const [error, seterror] = useState("");
  const [channelVideos, setchannelVideos] = useState([]);
  const [totalChannelVideos, settotalChannelVideos] = useState(0);
  const [channelVideoLoad, setchannelVideoLoad] = useState(true);
  const { channelid } = useParams();

  //get channel playlist id
  const { currentVideoChannel } = GetChannelDp(channelid);
  let playListId = currentVideoChannel?.contentDetails.relatedPlaylists.uploads;

  //get the channel videos
  useEffect(() => {
    playListId &&
      request("/playlistItems", {
        params: {
          part: "snippet,contentDetails",
          playlistId: playListId,
          maxResults: 25,
          pageToken: currentPage,
        },
      })
        .then((res) => {
          seterror("");
          setchannelVideoLoad(false);
          settotalChannelVideos(res.data.pageInfo.totalResults);
          setchannelVideos(
            currentPage ? [...channelVideos, ...res.data.items] : res.data.items
          );
          setnextPage(res.data.nextPageToken);
        })
        .catch((err) => {
          setchannelVideoLoad(false);
          seterror("Failed getting the video. " + err.message);
        });
  }, [playListId, currentPage, channelVideos]);

  //load more videos
  const loadMore = () => {
    setchannelVideoLoad(true);
    setcurrentPage(nextPage);
  };

  return (
    <div className="channel_container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{currentVideoChannel?.snippet.title}</title>
      </Helmet>
      <div className="channel_header">
        <img
          src={currentVideoChannel?.snippet.thumbnails.high.url}
          alt="channel dp"
          className="channel_thumb"
        />

        <div className="channel_details">
          <h3 className="channel_title">
            {currentVideoChannel?.snippet.title}
          </h3>
          <span className="channel_sub">
            {numeral(currentVideoChannel?.statistics.subscriberCount).format(
              "0.a"
            )}{" "}
            subscribers
          </span>
        </div>
      </div>

      {!channelVideoLoad || (
        <div
          class="spinner-border text-primary d-block m-auto"
          role="status"
        ></div>
      )}

      <div className="channel_video_wraper">
        {!error || <p>{error}</p>}
        {!channelVideos.length ||
          channelVideos.map((item) => (
            <Video channelScrn key={item.id} item={item} />
          ))}
      </div>

      {channelVideos.length
        ? totalChannelVideos === channelVideos.length || (
            <button className="loadMore_videos" onClick={loadMore}>
              More videos
            </button>
          )
        : null}
    </div>
  );
}
