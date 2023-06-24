import "./Protected.css";
import { } from "react-icons/fa"
import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
const ProtectedContent = () => {
  const navigateTo = useNavigate()
  const tabs = [
    {
      name: "Posts",
      redirect_to: "/posts"
    },
    {
      name: "About",
      redirect_to: "/about"
    },
    {
      name: "Contact",
      redirect_to: "/contact"
    },
    {
      name: "Fav Posts",
      redirect_to: "/favourites"
    },
    {
      name: "My Post",
      redirect_to: "/my-posts"
    },
    {
      name: "Create Post",
      redirect_to: "/create-post"
    }
  ];
  return localStorage.getItem("login-token") ? (
    <div className="content-container">
      <nav className="navbar">
        <p className="navbar-brand">BlogPost</p>
        {tabs.map((tab) => {
          return (
            <NavLink className="nav-link" to={tab.redirect_to}>
              {tab.name}
            </NavLink>
          );
        })}
        <button className="logout-button" onClick={() => { localStorage.removeItem("login-token"); navigateTo("/login") }}>
          LogOut
        </button>
      </nav>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
export default ProtectedContent;
