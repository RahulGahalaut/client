import "./Protected.css";
import { } from "react-icons/fa"
import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import Footer from "./Footer";
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
      name: "Profile",
      redirect_to: "/profile"
    }
  ];
  return localStorage.getItem("login-token") ? (
    <div className="content-container">
      <div className="content-wrapper">
        <nav className="navbar">
          <div className="brand-nav-link-wrapper">
            <p className="navbar-brand">BlogPost</p>
            {tabs.map((tab) => {
              return (
                <NavLink className="nav-link" to={tab.redirect_to}>
                  {tab.name}
                </NavLink>
              );
            })}
          </div>
          <button className="logout-button" onClick={() => { localStorage.removeItem("login-token"); navigateTo("/login") }}>
            LogOut
          </button>
        </nav>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
export default ProtectedContent;
