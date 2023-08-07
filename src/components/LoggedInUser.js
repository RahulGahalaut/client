import "./LoggedInUser.css"
import { useEffect, useState } from "react";
import Loader from "./Loader";
export default () => {
    const [user, setUser] = useState();
    let [loading, setLoading] = useState(false);
    let [createdAt, setCreatedAt] = useState();
    useEffect(() => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("login-token")}`
            }
        })
            .then(response => response.json())
            .then(userObject => {
                setLoading(false);
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
        <>
            {loading ? <Loader message="Loading User Info" /> : "No Information about user."}
        </>
    )
}