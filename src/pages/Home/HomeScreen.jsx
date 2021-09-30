import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Categories from "../../components/Categories";
import Video from "../../components/video";
import "../../_app.scss";
import request from "../../axios";
import { setVideos } from "../../redux/youtubeSlice";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const {
    Homevideos: { items },
    activeCategory,
  } = useSelector(state => state.youtube);

  //if user selects any category then get the cat data or get the most popular data
  useEffect(() => {
    activeCategory
      ? request("/search", {
          params: {
            part: "snippet",
            maxResults: 20,
            q: activeCategory,
          },
        })
          .then(res => {
            console.log("searched results ", res.data.items);
            dispatch(
              setVideos({
                items: res.data.items,
                nextPageToken: res.data.nextPageToken,
              })
            );
          })
          .catch(err => alert(err))
      : request("/videos", {
          params: {
            part: "snippet,contentDetails,statistics",
            chart: "mostPopular",
            regionCode: "US",
            maxResults: 20,
            pageToken: "",
          },
        })
          .then(res => {
            console.log("most popular", res.data.items);
            dispatch(
              setVideos({
                items: res.data.items,
                nextPageToken: res.data.nextPageToken,
              })
            );
          })
          .catch(err => alert(err));
  }, [activeCategory]);

  return (
    <div className="home_content_container">
      <Categories />
      <div className="video_container">
        {items?.map(item => (
          <Video key={item.etag} item={item} />
        ))}
      </div>
    </div>
  );
}
