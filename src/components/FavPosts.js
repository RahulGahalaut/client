import "./Posts.css";
import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import Loader from "./Loader";
export default () => {
    const [posts, setPosts] = useState();
    let [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/reactions/favs`, {
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
                    console.log(object.posts)
                    setPosts(object.posts)
                }
            })

    }, [])

    return posts ? (
        <div className="posts-container">
            {
                posts.length ? (
                    <>
                        {posts.map((post) => (
                            <PostCard post={post} />
                        ))}
                    </>

                ) : (
                    <h1>You don't have any favourite post!</h1>
                )
            }
        </div>
    ) : (
        <>
            {loading ? <Loader message="Loading your favourites" /> : "No Favourite Posts!"}
        </>
    );
};
