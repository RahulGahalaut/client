import "./Posts.css";
import Post from "./Post";
import { useState, useEffect } from "react";
export default () => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    fetch(`http://localhost:5000/posts/`, {
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

  }, [])

  const deletePost=(deletedPost)=>{
    const remainingPosts=posts.filter(post=>post._id!==deletedPost._id)
    setPosts(remainingPosts)
  }
  return posts ? (
    <div className="posts-container">
      {posts.map((post) => (
        <Post post={post} deleteFromParent={deletePost}/>
      ))}
    </div>
  ) : (
    <>Loading...</>
  );
};
