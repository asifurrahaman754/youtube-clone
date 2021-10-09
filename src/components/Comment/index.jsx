import { useState } from "react";
import CommentItem from "./CommentItem";
import "./_style.scss";

export default function Comment() {
  const [inputFocus, setinputFocus] = useState(false);
  const [inputValue, setinputValue] = useState("");

  return (
    <div className="comment_container">
      <span className="total_comment">273 Comments</span>
      <div className="comment_input">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
          alt=""
          className="channel_img"
        />
        <input
          placeholder="Add a public comment..."
          type="text"
          className="comment_input_box"
          value={inputValue}
          onChange={e => setinputValue(e.target.value)}
          onFocus={() => setinputFocus(true)}
        />

        {inputFocus && (
          <button className={`comment_sub ${inputValue && "btn_active"}`}>
            comment
          </button>
        )}
      </div>

      {[...Array(5)].map(item => (
        <CommentItem />
      ))}
    </div>
  );
}
