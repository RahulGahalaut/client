import { NavLink } from "react-router-dom";
import "./PostCard.css"
export default ({ post }) => {
    const createdAt = new Date(post.createdAt);
    return (
        <div className="post-card">
            <h3 className="post-card-title">{post.title}</h3>
            <div className="username-time-wrapper">
                <i className="author">By- {post.author.username}</i>
                <div>{createdAt.toLocaleString("en-US", { timeZone: 'Asia/Kolkata', dateStyle: "short", timeStyle: "short" })}</div>
            </div>
            <p className="post-card-content">{post.content.slice(0, 100)}...</p>
            <NavLink to={`/post/${post._id}`} className="post-link">Read More</NavLink>
        </div>
    )
}