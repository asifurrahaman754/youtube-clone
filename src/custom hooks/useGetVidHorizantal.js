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
  //   const { id } = useParams();

  useEffect(() => {
    request("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        type: "video",
        videoType: "any",
        videoDefinition: "any",
        maxResults: 10,
      },
    })
      .then(res => {
        seterror("");
        setrelatedVidLoad(false);
        setnextPage(res.data.nextPageToken);
        setrelatedVideos(
          currentPage
            ? [...relatedVideos, ...res.data.items].filter(item => item.snippet)
            : res.data.items.filter(item => item.snippet)
        );
      })
      .catch(err => {
        setrelatedVidLoad(false);
        seterror("Failed getting the related videos. " + err.message);
      });
  }, [currentPage, id]);

  return null;
}
