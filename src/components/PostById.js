import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Post from "./Post";
export default () => {
    const { postId } = useParams();
    const [post, setPost] = useState();
    useEffect(() => {
        fetch(`http://localhost:5000/posts/post/${postId}`, {
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("login-token")}`
            }
        })
            .then(response => response.json())
            .then(post => {
                console.log(post)
                setPost(post)
            })

    }, [])
    return post ? (
        <div className="post-container">
            <Post post={post} />
        </div>
    ) : (
        <>Loading...</>
    )
}