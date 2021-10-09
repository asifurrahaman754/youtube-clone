import { useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { truncate } from "../../Utils";
import "./_style.scss";

export default function VideoMeta() {
  const [showMore, setshowMore] = useState(false);

  const dummyText =
    "Hey guys, welcome back to the channel; we have just hit 400.Hey guys, welcome back to the channel; we have just hit 400.Hey guys, welcome back to the channel; we have just hit 400.Hey guys, welcome back to the channel; we have just hit 400.";

  return (
    <div className="videoMeta_container">
      <h3 className="video_title">video title</h3>
      <div className="video_info">
        <span className="views">27,815 •</span>
        <span className="video_published"> 27 Jan 2021</span>
        <div className="video_impression">
          <span>
            <AiOutlineLike /> 1K
          </span>
          <span>
            <AiOutlineDislike /> 14
          </span>
        </div>
      </div>

      <div className="video_middle_info">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
          alt="channel image"
          className="channel_icon"
        />
        <div className="channel_data">
          <h5 className="channel_title">Fireship</h5>
          <h6 className="channel_sub">2.63K subscribers</h6>

          <p className="video_details">
            {!showMore ? truncate(dummyText, 100) : dummyText}
          </p>

          <span
            onClick={() => setshowMore(!showMore)}
            className="show_more_details"
          >
            show {!showMore ? "more" : "less"}
          </span>
        </div>

        <button className="subscribe_btn">Subscribe</button>
      </div>
    </div>
  );
}
