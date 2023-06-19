import { useState, useRef, useEffect } from "react";
import "./CommentBox.css";
import SingleComment from "./SingleComment";
export default ({ postId }) => {

  const [comments, setComments] = useState();
  useEffect(() => {
    fetch(`http://localhost:5000/comments/${postId}`, {
      "headers": {
        "content-type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("login-token")}`
      }
    })
      .then(response => response.json())
      .then(object => {
        if ("message" in object) {
          alert(object.message)
        }
        else {
          setComments(object.comments.reverse())
        }
      })

  }, [])
  const newComment = useRef();
  const addNewComment = () => {
    console.log(newComment);
    fetch(`http://localhost:5000/comments/${postId}`, {
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
        setComments([comment, ...comments]);
      })

  }
  const updateComments=(newComment)=>{
    const updatedComments=comments.map(comment=>{
      if(comment._id==newComment._id)
      return newComment
      else
      return comment;
    })
    setComments(updatedComments);
  }

  const deleteCommentFromComments=(deletedComment)=>{
    const remainingComments=comments.filter(comment=>comment._id!==deletedComment._id)
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
          Loading...
        </>
      )}
    </div>
  );
};
