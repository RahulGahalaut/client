import "./CreatePost.css"
import { useRef, useState } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loader from "./Loader";

export default ({ setShowCreatePost, setReloadPost, reloadPost }) => {
    const title = useRef();
    const [content, setContent] = useState('');
    let [loading, setLoading] = useState(false);
    const createNewPost = (e) => {
        setLoading(true)
        e.preventDefault();
        fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/create`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("login-token")}`
            },
            body: JSON.stringify({
                title: title.current.value,
                content: content
            })
        })
            .then(response => response.json())
            .then(post => {
                setLoading(false)
                setShowCreatePost(false)
                setReloadPost(!reloadPost)
            })
    }

    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    return (
        <div className="new-post-container">
            <div className="form-container">
                <input ref={title} className="new-post-title" type="text" placeholder="Enter Title" minLength="10" />
                <div className="new-post-content" >
                    <ReactQuill theme="snow" modules={modules} value={content} onChange={setContent} />
                </div>
                <button onClick={createNewPost}>Create Post</button>

                {loading && <Loader />}
            </div>
        </div>
    )
}