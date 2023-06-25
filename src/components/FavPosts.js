import "./Posts.css";
import { useState, useEffect } from "react";
import PostCard from "./PostCard";
export default () => {
    const [posts, setPosts] = useState();
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/reactions/favs`, {
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

    return posts ? (
        <div className="posts-container">
            {posts.map((post) => (
                <PostCard post={post} />
            ))}
        </div>
    ) : (
        <>Loading...</>
    );
};
