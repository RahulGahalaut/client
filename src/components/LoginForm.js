import { Navigate, useNavigate, NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import Loader from "./Loader";
import "./LoginForm.css";
const LoginForm = () => {

  const navigateTo = useNavigate()
  const username = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/login`, {
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
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input ref={username} type="text" placeholder="@username" />
        <input ref={password} type="password" placeholder="@password" minLength="8" />
        <button className="submit-button-login" type="submit">
          submit
        </button>
      </form>
      <div className="link-to-signup">
        <p>Don't have an account yet? <NavLink to="/signup" className="signup-button">Create Now</NavLink></p>
      </div>
      {loading && <Loader message="Wait a moment" />}
    </div>

  );
};

export default LoginForm;
