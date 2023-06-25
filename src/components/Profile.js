import "./Profile.css"
import { } from "react-icons/fa"

import { NavLink, Outlet } from "react-router-dom";
export default () => {
    const tabs = [
        {
            name: "Fav Posts",
            redirect_to: "/profile/favourites"
        },
        {
            name: "My Post",
            redirect_to: "/profile/my-posts"
        }
    ];
    return (
        <>
            <nav className="personal-navbar">
                {tabs.map((tab) => {
                    return (
                        <NavLink className="personal-nav-link" to={tab.redirect_to}>
                            {tab.name}
                        </NavLink>
                    );
                })}
            </nav>
            <Outlet />
        </>

    )
};
