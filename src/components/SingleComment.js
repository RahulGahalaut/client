import { useState, useRef } from "react"
export default ({ comment,updateCommentSet,deleteFromCommentSet }) => {
    console.log(comment);
    const [edit, setEdit] = useState(false);
    const editedText = useRef()
    const deleteThisComment = () => {
        fetch(`http://localhost:5000/comments/${comment._id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("login-token")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if ("message" in data) {
                    alert(data.message)
                }
                else{
                    console.log(data)
                    deleteFromCommentSet(comment)
                }

            })
    }
    const updateThisComment = () => {
        fetch(`http://localhost:5000/comments/${comment._id}`, {
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
                if ("message" in data) {
                    alert(data.message)
                }
                else{
                    console.log(data)
                    updateCommentSet(data)
                    setEdit(false)
                }

            })
    }

    return  (
        <div className="comment">
            <p>
                <b>
                    <i>@{comment.user.username}</i>
                </b>
                -{edit ? (
                    <>
                        <textarea ref={editedText}>{comment.text}</textarea>
                    </>
                ) : comment.text}
                {comment.user._id == localStorage.getItem("user-id") && (
                    <>
                        {
                            edit ? (
                                <>
                                    <button onClick={updateThisComment}>update</button>
                                    <button onClick={() => setEdit(false)}>X</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={deleteThisComment}>delete</button>
                                    <button onClick={() => setEdit(true)}>edit</button>
                                </>
                            )
                        }
                    </>
                )}
            </p>

        </div >
    ) 
    
}