import "./LoggedInUser.css"
import { useEffect, useState } from "react"
export default () => {
    const [user, setUser] = useState();
    let [createdAt, setCreatedAt] = useState();
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("login-token")}`
            }
        })
            .then(response => response.json())
            .then(userObject => {
                if ("message" in userObject) {
                    alert(userObject.message)
                }
                else {

                    console.log(userObject.user)
                    setCreatedAt(new Date(userObject.user.createdAt))
                    setUser(userObject.user)

                }
            })
    }, [])
    return user ? (
        <div className="loggedInUser-info">
            <p>{user.username}</p>
            <p>Account Created - {createdAt.toLocaleString("en-US", { timeZone: 'Asia/Kolkata', dateStyle: "medium", timeStyle: "short" })}</p>
        </div>
    ) : (
        <>Loading user...</>
    )
}