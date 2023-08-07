import { NavLink } from "react-router-dom";
import ReactQuill from "react-quill";
import "./PostCard.css"
export default ({ post }) => {

    return (

        <>{post && <NavLink to={`/post/${post._id}`} className="post-card">
            <p className="post-card-content">
                <ReactQuill
                    className="post-content"
                    value={post.content}
                    readOnly={true}
                    theme={"bubble"}
                />
            </p>
            <h3 className="post-card-title">{post.title}</h3>
            <div className="username-time-wrapper">
                <i className="author">By- {post.author.username}</i>
                <div>{new Date(post.createdAt).toLocaleString("en-US", { timeZone: 'Asia/Kolkata', dateStyle: "short", timeStyle: "short" })}</div>
            </div>
        </NavLink>}</>
    )
}