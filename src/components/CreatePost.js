import "./CreatePost.css"
import { useRef } from "react"
import { useNavigate } from "react-router-dom";
export default () => {
    const navigateTo = useNavigate()
    const title = useRef();
    const content = useRef();
    const createNewPost = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/posts/create`, {
            method:"POST",
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
                navigateTo('/posts');
            })
    }
    return (
        <div className="new-post-container">
            <div class="form-container">
                <input ref={title} className="new-post-title" type="text" placeholder="Enter Title" minLength="10"/>
                <textarea ref={content} className="new-post-content" type="text" placeholder="what you wanna share...?" rows="20" minLength="40"/>
                <button onClick={createNewPost}>Create Post</button>

            </div>
        </div>
    )
}