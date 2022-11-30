import "./_video.scss";

export default function VideoSkeleton() {
  return (
    <div className="VideoSkeleton">
      <div className="video_thumbnail"></div>
      <div className="video_info">
        <div className="video_channel"></div>
        <div className="video_details">
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  );
}
