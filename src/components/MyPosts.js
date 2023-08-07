import "./Posts.css";
import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import Loader from "./Loader";
export default () => {
    const [posts, setPosts] = useState();
    let [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/my-posts`, {
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
                setPosts(object.posts)
            })

    }, [])

    return posts ? (
        <>
            {
                posts.length ? (
                    <div className="posts-container">
                        {posts.map((post) => (
                            <PostCard post={post} />
                        ))}
                    </div>

                ) : (
                    <h1>You haven't posted anything yet!</h1>
                )
            }
        </>
    ) : (
        <>
            {loading ? <Loader message="Loading your posts" /> : "You haven't posted anything Yet."}
        </>
    );
};