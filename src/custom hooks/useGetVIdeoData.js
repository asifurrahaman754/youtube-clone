import { useEffect } from "react";
import { useSelector } from "react-redux";

import request from "../axios";

export default function useGetVIdeoData(
  currentPage,
  sethomevideos,
  homevideos,
  setnextPage,
  seterror,
  setloading,
  setfreezeCatg
) {
  const activeCategory = useSelector((state) => state.youtube.activeCategory);

  useEffect(() => {
    setloading(true);
    if (activeCategory) {
      request("/search", {
        params: {
          part: "snippet",
          maxResults: 20,
          q: activeCategory,
          pageToken: currentPage,
        },
      })
        .then((res) => {
          setloading(false);
          seterror("");
          setnextPage(res.data.nextPageToken);
          //check wheather the item is not channel
          sethomevideos(
            currentPage
              ? [
                  ...homevideos,
                  ...res.data.items.filter(
                    (item) => item.id.kind !== "youtube#channel"
                  ),
                ]
              : res.data.items.filter(
                  (item) => item.id.kind !== "youtube#channel"
                )
          );
          setfreezeCatg(false);
        })
        .catch((err) => {
          setfreezeCatg(false);
          sethomevideos(homevideos.splice(0, homevideos.length));
          setloading(false);
          seterror(err.message + ". check the connection and try again later");
        });
    } else {
      request("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          regionCode: "US",
          maxResults: 20,
          pageToken: currentPage,
        },
      })
        .then((res) => {
          setloading(false);
          seterror("");
          setnextPage(res.data.nextPageToken);
          sethomevideos(
            currentPage ? [...homevideos, ...res.data.items] : res.data.items
          );
        })
        .catch((err) => {
          setloading(false);
          seterror(err.message + ". check the connection and try again later");
        });
    }
  }, [activeCategory, currentPage]);
  return null;
}
