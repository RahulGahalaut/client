import { useState, useRef } from "react"
import { FaTrash, FaEdit } from 'react-icons/fa';
import Loader from "./Loader";
export default ({ comment, updateCommentSet, deleteFromCommentSet }) => {
    const [edit, setEdit] = useState(false);
    const editedText = useRef();
    let [loading, setLoading] = useState(false)
    let [message, setMessage] = useState(null);
    const deleteThisComment = () => {
        setLoading(true)
        setMessage("Deleting comment")
        fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/comments/${comment._id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("login-token")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                if ("message" in data) {
                    alert(data.message)
                }
                else {
                    console.log(data)
                    deleteFromCommentSet(comment)
                }

            })
    }
    const updateThisComment = () => {
        setLoading(true)
        setMessage("Updating comment")
        fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/comments/${comment._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("login-token")}`
            },
            body: JSON.stringify({
                text: editedText.current.value
            })
        })
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                if ("message" in data) {
                    alert(data.message)
                }
                else {
                    console.log(data)
                    updateCommentSet(data)
                    setEdit(false)
                }

            })
    }

    return (
        <>
            <div className="comment">
                <p>
                    <b>
                        <i>@{comment.user.username}</i>
                    </b>
                    - {edit ? (
                        <>
                            <textarea ref={editedText}>{comment.text}</textarea>
                        </>
                    ) : comment.text}
                    {comment.user._id == localStorage.getItem("user-id") && (
                        <>
                            {
                                edit ? (
                                    <>
                                        <button onClick={updateThisComment}>Update</button>
                                        <button onClick={() => setEdit(false)}>x</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={deleteThisComment}><FaTrash /></button>
                                        <button onClick={() => setEdit(true)}><FaEdit /></button>
                                    </>
                                )
                            }
                        </>
                    )}
                </p>

            </div >
            {loading && <Loader message={message} />}
        </>

    )

}