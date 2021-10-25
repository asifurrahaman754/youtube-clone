import { useEffect } from "react";

import request from "../axios";

export default function GetVidHorizantal(
  id,
  setrelatedVideos,
  seterror,
  setnextPage,
  setrelatedVidLoad,
  currentPage,
  relatedVideos
) {
  useEffect(() => {
    request("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        type: "video",
        maxResults: 20,
        pageToken: currentPage,
      },
    })
      .then(res => {
        seterror("");
        setrelatedVidLoad(false);
        setrelatedVideos(
          currentPage
            ? [...relatedVideos, ...res.data.items].filter(item => item.snippet)
            : res.data.items.filter(item => item.snippet)
        );
        setnextPage(res.data.nextPageToken);
      })
      .catch(err => {
        setrelatedVidLoad(false);
        seterror("Failed getting the related videos. " + err.message);
      });
  }, [currentPage, id]);

  return null;
}
