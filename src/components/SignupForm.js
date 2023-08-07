import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Loader from "./Loader";
import "./SignupForm.css";
const SignupForm = () => {

    const navigateTo = useNavigate()
    const username = useRef();
    const password = useRef();
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/signup`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        })
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                if ("message" in data) {
                    alert(data.message)
                }
                else {
                    localStorage.setItem("login-token", data.token)
                    localStorage.setItem("user-id", data.userId)
                    navigateTo("/")
                }
            })
    };

    return localStorage.getItem("login-token") ? (
        <Navigate to="/" />
    ) : (
        <>
            <div className="signup-form-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input ref={username} type="text" placeholder="@username" minLength="8" />
                    <input ref={password} type="password" placeholder="@password" minLength="8" />
                    <button className="submit-button-signup" type="submit">
                        submit
                    </button>
                </form>
                <div className="link-to-login">
                    <p>already have an account? <NavLink to="/login" className="login-button">LogIn</NavLink></p>
                </div>
            </div>
            {loading && <Loader />}
        </>

    );
};

export default SignupForm;