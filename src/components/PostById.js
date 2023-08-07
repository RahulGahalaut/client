import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Post from "./Post";
import "./PostById.css"
export default () => {
    const { postId } = useParams();
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/post/${postId}`, {
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("login-token")}`
            }
        })
            .then(response => response.json())
            .then(post => {
                setLoading(false);
                console.log(post)
                setPost(post)
            })

    }, [])
    return post ? (
        <div className="post-by-id-container">
            <Post post={post} />
        </div>
    ) : (
        <>
            {loading ? <Loader message="Loading this post" /> : "No Post!"}
        </>
    )
}