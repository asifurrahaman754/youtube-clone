import { LazyLoadImage } from "react-lazy-load-image-component";
import "./_style.scss";

export default function VideoHorizantal() {
  return (
    <div className="video_horizantal_wrapper">
      <div className="video_img_wrap">
        <LazyLoadImage
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDmHyprMjJWYeYeuhUvIW-88nQrixJOj9QQ&usqp=CAU"
          effect="blur"
          alt="video image"
        />
        <span className="vid_duration">13:10</span>
      </div>

      <div className="horiz_vid_details">
        <h3 className="vid_title">Redux for begginers, new season</h3>
        <span className="vid_channel_title">Dev Ed</span>
        <div className="video_stats">
          <span className="views">810K views •</span>
          <span className="time"> 2 years ago</span>
        </div>
      </div>
    </div>
  );
}
