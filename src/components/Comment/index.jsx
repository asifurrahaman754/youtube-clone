import { useState } from "react";

import { useParams } from "react-router";
import { useSelector } from "react-redux";

import numeral from "numeral";
import CommentItem from "./CommentItem";
import "./_style.scss";
import GetComments from "../../custom hooks/useGetComments";

export default function Comment({ data }) {
  const [inputFocus, setinputFocus] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [currentPage, setcurrentPage] = useState("");
  const [nextPage, setnextPage] = useState("");
  const [error, seterror] = useState("");
  const [comments, setcomments] = useState([]);
  const [commentLoad, setcommentLoad] = useState(true);

  const { id } = useParams();
  const { photo } = useSelector((state) => state.youtube.user);

  //get the comments
  GetComments(
    id,
    setcomments,
    seterror,
    setnextPage,
    setcommentLoad,
    currentPage,
    comments
  );

  //load more comments
  const loadMore = () => {
    setcommentLoad(true);
    setcurrentPage(nextPage);
  };

  return (
    <div className="comment_container">
      <span className="total_comment">
        {numeral(data?.statistics.commentCount).format("0,0")} Comments
      </span>
      <div className="comment_input">
        <img src={photo && photo} alt="" className="channel_img" />
        <input
          placeholder="Add a public comment..."
          type="text"
          className="comment_input_box"
          value={inputValue}
          onChange={(e) => setinputValue(e.target.value)}
          onFocus={() => setinputFocus(true)}
        />

        {inputFocus && (
          <button className={`comment_sub ${inputValue && "btn_active"}`}>
            comment
          </button>
        )}
      </div>

      {!comments.length ||
        comments.map((item) => <CommentItem key={item.id} data={item} />)}

      {error && <p className="text-center">{error}</p>}

      {!commentLoad || (
        <div
          className="spinner-border text-primary d-block m-auto"
          role="status"
        ></div>
      )}

      {!comments.length || (
        <button className="loadMore_comment" onClick={loadMore}>
          More comments
        </button>
      )}
    </div>
  );
}
