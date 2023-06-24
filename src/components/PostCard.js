import { NavLink } from "react-router-dom";
import "./PostCard.css"
export default ({ post }) => {
    const createdAt = new Date(post.createdAt);
    return (
        <NavLink to={`/post/${post._id}`} className="post-card">
            <h3 className="post-card-title">{post.title}</h3>
            <p className="post-card-content">{post.content.slice(0, 100)}...</p>
            <div className="username-time-wrapper">
                <i className="author">By- {post.author.username}</i>
                <div>{createdAt.toLocaleString("en-US", { timeZone: 'Asia/Kolkata', dateStyle: "short", timeStyle: "short" })}</div>
            </div>
        </NavLink>
    )
}