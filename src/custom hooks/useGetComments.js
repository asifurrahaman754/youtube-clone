import { useEffect } from "react";

import request from "../axios";

export default function GetComments(
  id,
  setcomments,
  seterror,
  setnextPage,
  setcommentLoad,
  currentPage,
  comments
) {
  useEffect(() => {
    request("/commentThreads", {
      params: {
        part: "snippet",
        videoId: id,
        maxResults: 5,
        pageToken: currentPage,
      },
    })
      .then(res => {
        seterror("");
        setcommentLoad(false);
        setnextPage(res.data.nextPageToken);
        setcomments(
          currentPage ? [...comments, ...res.data.items] : res.data.items
        );
      })
      .catch(err => {
        setcommentLoad(false);
        seterror("Failed getting the comments. " + err.message);
      });
  }, [currentPage, id]);

  return null;
}
