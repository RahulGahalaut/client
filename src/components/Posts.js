import "./Posts.css";
import { useState, useEffect } from "react";
import PostCard from "./PostCard";

import CreatePost from "./CreatePost";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
export default () => {
  const [posts, setPosts] = useState();
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [reloadPost, setReloadPost] = useState(false)
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/`, {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("login-token")}`
      }
    })
      .then(response => response.json())
      .then(object => {
        console.log(object.posts)
        setPosts(object.posts)
      })

  }, [reloadPost])

  return posts ? (
    <>
      <div className="create-post-area">
        <button class="create-post-button" onClick={() => setShowCreatePost(!showCreatePost)}>{showCreatePost ? <FaMinusCircle /> : <FaPlusCircle />}</button>
        {showCreatePost && <CreatePost setShowCreatePost={setShowCreatePost} setReloadPost={setReloadPost} reloadPost={reloadPost} />}
      </div>
      <div className="posts-container">
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>

    </>
  ) : (
    <>Loading...</>
  );
};
