import { useEffect } from "react";

import { useParams } from "react-router";
import request from "../axios";

export default function useGetComments(
  setcomments,
  seterror,
  setnextPage,
  setcommentLoad,
  currentPage,
  comments
) {
  const { id } = useParams();

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
  }, [currentPage]);

  return null;
}
