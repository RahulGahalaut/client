import CommentBox from "./CommentBox";
import { useState } from "react";
import "./Post.css";
export default ({ post, deleteFromParent }) => {
  const [showComment, setShowComment] = useState(false);
  const deletePost = async () => {
    const result= window.confirm("are you sure?")
      
        if (result) {
          fetch(`http://localhost:5000/posts/delete/${post._id}`, {
            method: "DELETE",
            headers: {
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
                deleteFromParent(post)
              }
            })
        }
  }
  return (
    <div className="post-comment-wrapper">
      {post.author._id === localStorage.getItem("user-id") && <div><button onClick={deletePost}>Delete Post</button></div>}
      <div className="post-container">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-content">{post.content}</p>
        <p className="author-container">
          <i className="author">- {post.author.username}</i>
        </p>
      </div>
      <div className="comment-container">
        <button
          className="comment-controller"
          onClick={() => setShowComment(!showComment)}
        >
          {showComment ? "Hide Comment" : "Show Comments"}
        </button>
        {showComment && <CommentBox postId={post._id} />}
      </div>
    </div>
  );
};
