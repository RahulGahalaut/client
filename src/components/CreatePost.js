import "./CreatePost.css"
import { useRef } from "react"
export default ({ setShowCreatePost, setReloadPost, reloadPost }) => {
    const title = useRef();
    const content = useRef();
    const createNewPost = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/create`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("login-token")}`
            },
            body: JSON.stringify({
                title: title.current.value,
                content: content.current.value
            })
        })
            .then(response => response.json())
            .then(post => {
                console.log(post);
                setShowCreatePost(false)
                setReloadPost(!reloadPost)
            })
    }
    return (
        <div className="new-post-container">
            <div class="form-container">
                <input ref={title} className="new-post-title" type="text" placeholder="Enter Title" minLength="10" />
                <textarea ref={content} className="new-post-content" type="text" placeholder="what you wanna share...?" rows="20" minLength="40" />
                <button onClick={createNewPost}>Create Post</button>
            </div>
        </div>
    )
}