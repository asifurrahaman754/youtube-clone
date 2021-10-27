import { memo } from "react";
import moment from "moment";
import "./_style.scss";

function CommentItem({
  data: {
    snippet: { topLevelComment },
  },
}) {
  const {
    snippet: {
      textOriginal,
      authorDisplayName,
      authorProfileImageUrl,
      publishedAt,
    },
  } = topLevelComment;

  return (
    <div className="comment_wrapper">
      <img src={authorProfileImageUrl} alt="" className="comment_img" />

      <div className="comment_details">
        <h3 className="com_channel_name">
          {authorDisplayName}{" "}
          <span className="comment_published">
            {moment(publishedAt).fromNow()}
          </span>
        </h3>
        <p className="comment">{textOriginal}</p>
      </div>
    </div>
  );
}

export default memo(CommentItem);
