import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import "./Post.css";
import CommentBox from "./CommentBox";
import { FaTrash, FaHeart, FaRegHeart, FaStar, FaRegStar } from 'react-icons/fa';

export default ({ post }) => {

  const navigateTo = useNavigate()
  let [showComment, setShowComment] = useState(false);
  let [doLike, setDoLike] = useState(true);
  let [isFav, setIsFav] = useState()
  let [likesCount, setLikesCount] = useState();
  const createdAt = new Date(post.createdAt);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/reactions/like/${post._id}`, {
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
          setLikesCount(reactionObject.likes);
          setDoLike(reactionObject.doLike);
          setIsFav(reactionObject.isFav)
        }
      })
  }, [])

  const deletePost = async () => {
    const result = window.confirm("are you sure?")
    if (result) {
      fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/delete/${post._id}`, {
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


  const deleteLikeOnPost = () => {
    fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/reactions/like/${post._id}`, {
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

  const postLikeOnPost = () => {
    fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/reactions/like/${post._id}`, {
      method: "POST",
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
          setLikesCount(++likesCount);
          setDoLike(true)
        }
      })

  }

  const deleteFavMarkOnPost = () => {
    console.log("delete method invoked!")
    fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/reactions/favs/${post._id}`, {
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
          setIsFav(false)
        }
      })
  }
  const markFavOnPost = () => {
    fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/reactions/favs/${post._id}`, {
      method: "POST",
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
          setIsFav(true)
        }
      })

  }

  const clickHandlerForLike = () => {

    doLike ? deleteLikeOnPost() : postLikeOnPost();

  }

  const clickHandlerForFav = () => {

    isFav ? deleteFavMarkOnPost() : markFavOnPost();

  }


  return (
    <div className="post-comment-wrapper">
      {
        isFav ? (
          <div className="fav-container">
            <div className="fav">Favourite <FaStar className="icon" onClick={clickHandlerForFav} /></div>
          </div>
        ) : (
          <div className="fav-container">
            <div className="fav"><FaRegStar className="icon" onClick={clickHandlerForFav} /></div>
          </div>
        )
      }

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

            <div className="icon-count-wrapper">
              {doLike ? <FaHeart className="icon" onClick={clickHandlerForLike} /> : <FaRegHeart className="icon" onClick={clickHandlerForLike} />}
              <div className="likesCount">{likesCount}</div>
              {post.author._id === localStorage.getItem("user-id") && <FaTrash className="icon" onClick={deletePost} />}
            </div>

          </div>
        </div>
        {showComment && <CommentBox postId={post._id} />}
      </div>
    </div>
  );
};
