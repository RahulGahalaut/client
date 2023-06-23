import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import "./Post.css";
import CommentBox from "./CommentBox";
import { FaTrash, FaHeart, FaRegHeart } from 'react-icons/fa';

export default ({ post }) => {

  const navigateTo = useNavigate()
  let [showComment, setShowComment] = useState(false);
  let [doLike, setDoLike] = useState(true);
  let [likesCount, setLikesCount] = useState();
  const createdAt = new Date(post.createdAt);

  useEffect(() => {
    fetch(`http://localhost:5000/reactions/${post._id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("login-token")}`
      }
    })
      .then(response => response.json())
      .then(reactionObject => {
        if ("message" in reactionObject) {
          alert(reactionObject.message)
        }
        else {
          console.log(reactionObject.doLike)
          setLikesCount(reactionObject.reactions);
          setDoLike(reactionObject.doLike)
        }
      })
  }, [])

  const deletePost = async () => {
    const result = window.confirm("are you sure?")
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
            navigateTo('/posts')
          }
        })
    }
  }

  const deleteReaction = () => {
    fetch(`http://localhost:5000/reactions/${post._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("login-token")}`
      }
    })
      .then(response => response.json())
      .then(reactionObject => {
        if ("message" in reactionObject) {
          alert(reactionObject.message)
        }
        else {
          setLikesCount(--likesCount);
          setDoLike(false)
        }
      })
  }

  const postReaction = () => {
    fetch(`http://localhost:5000/reactions/${post._id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("login-token")}`
      },
      body: JSON.stringify({
        "like": true
      })
    })
      .then(response => response.json())
      .then(reactionObject => {
        if ("message" in reactionObject) {
          alert(reactionObject.message)
        }
        else {
          setLikesCount(++likesCount);
          setDoLike(true)
        }
      })

  }

  const clickHandler = () => {

    doLike ? deleteReaction() : postReaction();

  }


  return (
    <div className="post-comment-wrapper">
      <div className="post-container">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-content">{post.content}</p>
        <p className="author-container">
          <div>{createdAt.toLocaleString("en-US", { timeZone: 'Asia/Kolkata', dateStyle: "medium", timeStyle: "short" })}</div>
          <i className="author">- {post.author.username}</i>
        </p>
      </div>
      <div className="comment-container">
        <div className="post-buttons-wrapper">
          <button
            className="comment-controller"
            onClick={() => setShowComment(!showComment)}
          >
            {showComment ? "Hide Comment" : "Show Comments"}
          </button>
          <div className="action-wrapper">
            {doLike ?
              <div className="icon-count-wrapper"><FaHeart className="icon" onClick={clickHandler} /><div className="likesCount">{likesCount}</div></div> :
              <div className="icon-count-wrapper"><FaRegHeart className="icon" onClick={clickHandler} /><div className="likesCount">{likesCount}</div></div>}
            {post.author._id === localStorage.getItem("user-id") && <div><FaTrash className="icon" onClick={deletePost} /></div>}
          </div>
        </div>
        {showComment && <CommentBox postId={post._id} />}
      </div>
    </div>
  );
};
