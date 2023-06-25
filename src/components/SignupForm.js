import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useRef } from "react";
import "./SignupForm.css";
const SignupForm = () => {

    const navigateTo = useNavigate()
    const username = useRef();
    const password = useRef()

    const handleSubmit = (e) => {
        e.preventDefault();
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
        <div className="signup-form-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <input ref={username} type="text" placeholder="@username" minLength="8" />
                <input ref={password} type="password" placeholder="@password" minLength="8" />
                <button className="submit-button" type="submit">
                    submit
                </button>
            </form>
            <div>
                <p>already have an account? <NavLink to="/login">LogIn</NavLink></p>
            </div>
        </div>
    );
};

export default SignupForm;