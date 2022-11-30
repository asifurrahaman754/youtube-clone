import { useEffect, useState } from "react";
import request from "../axios";

export default function GetChannelDp(channelId) {
  const [currentVideoChannel, setcurrentVideoChannel] = useState(null);

  useEffect(() => {
    request("/channels", {
      params: {
        part: "snippet, contentDetails, statistics",
        id: channelId,
      },
    })
      .then(res => {
        setcurrentVideoChannel(res.data.items[0]);
      })
      .catch(err => console.log(err));
  }, [channelId]);

  return { currentVideoChannel };
}
