import { useState, useRef, useEffect } from "react";
import "./CommentBox.css";
import Loader from "./Loader";
import SingleComment from "./SingleComment";

export default ({ postId }) => {
  const [comments, setComments] = useState([]);
  const newComment = useRef();
  let [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/comments/${postId}`, {
      "headers": {
        "content-type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("login-token")}`
      }
    })
      .then(response => response.json())
      .then(object => {
        setLoading(false)
        if ("message" in object) {
          alert(object.message)
        }
        else {
          setComments(object.comments.reverse())
        }
      })

  }, [])

  const addNewComment = () => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/comments/${postId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("login-token")}`
      },
      body: JSON.stringify({
        post: postId,
        text: newComment.current.value,
      })
    })
      .then(response => response.json())
      .then(comment => {
        setLoading(false)
        if ("message" in comment) {
          alert(comment.message)
        }
        else {
          console.log(comment)
          setComments([comment, ...comments]);
        }

      })

  }
  const updateComments = (newComment) => {
    const updatedComments = comments.map(comment => {
      if (comment._id == newComment._id)
        return newComment
      else
        return comment;
    })
    setComments(updatedComments);
  }

  const deleteCommentFromComments = (deletedComment) => {
    const remainingComments = comments.filter(comment => comment._id !== deletedComment._id)
    setComments(remainingComments);
  }
  return (
    <div className="comments-container">
      <div className="comment-box">
        <textarea
          ref={newComment}
          type="text"
          placeholder="Wanna say something...?"
          className="new-comment"
          rows="4"
          cols="50"
        />
        <br />
        <button className="add-comment-button" onClick={addNewComment}>
          Add Comment
        </button>
      </div>
      {comments ? (
        <>
          {comments.map((comment) => {
            return (
              <SingleComment comment={comment} updateCommentSet={updateComments} deleteFromCommentSet={deleteCommentFromComments} />
            );
          })}
        </>
      ) : (
        <>
          {loading ? <Loader message="Loading comments" /> : "No Comments"}
        </>
      )}
    </div>
  );
};
