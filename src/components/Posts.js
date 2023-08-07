import "./Posts.css";
import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import Loader from "./Loader";
import CreatePost from "./CreatePost";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
export default () => {
  const [posts, setPosts] = useState();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [reloadPost, setReloadPost] = useState(false);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/`, {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("login-token")}`
      }
    })
      .then(response => response.json())
      .then(object => {
        setLoading(false)
        if ("message" in object) {
          setPosts([]);
        }
        else {
          setPosts(object.posts)
        }
      })

  }, [reloadPost])

  return posts ? (
    <>
      <div className="create-post-area">
        <button className="create-post-button" onClick={() => setShowCreatePost(!showCreatePost)}>{showCreatePost ? <div><FaMinusCircle />Close</div> : <div><FaPlusCircle />Create Post</div>}</button>
        {showCreatePost && <CreatePost setShowCreatePost={setShowCreatePost} setReloadPost={setReloadPost} reloadPost={reloadPost} />}
      </div>
      <>
        {
          posts.length ? (
            <div className="posts-container">
              {posts.map((post) => (
                <PostCard post={post} />
              ))}
            </div>

          ) : (
            <h1>There is no Post!</h1>
          )
        }
      </>

    </>
  ) : (
    <>
      {loading ? <Loader message="Loading All Posts" /> : "There is no Post!"}
    </>

  );
};
