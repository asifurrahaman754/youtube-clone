import "./_style.scss";

export default function CommentItem() {
  return (
    <div className="comment_wrapper">
      <img
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
        alt=""
        className="comment_img"
      />

      <div className="comment_details">
        <h3 className="com_channel_name">
          Asifur Rahman <span className="comment_published">7 months ago</span>
        </h3>
        <p className="comment">
          One of the best build i have seen so far , would you please add
          testing using enzyme , and end to end testing using cypress.
        </p>
      </div>
    </div>
  );
}
