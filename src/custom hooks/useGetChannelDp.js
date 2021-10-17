import { useEffect } from "react";
import request from "../axios";

export default function GetChannelDp(channelId, setchannelthumbnail) {
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

  return null;
}
