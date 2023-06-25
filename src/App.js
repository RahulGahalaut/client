import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProtectedContent from "./components/Protected";
import Contact from "./components/Contact";
import About from "./components/About";
import Posts from "./components/Posts";
import Home from "./components/Home";
import SignupForm from "./components/SignupForm";
import PostById from "./components/PostById";
import FavPosts from "./components/FavPosts";
import MyPosts from "./components/MyPosts";
import Profile from "./components/Profile";
import LoggedInUser from "./components/LoggedInUser";

export default function App() {

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedContent />}>
            <Route index element={<Home />} />
            <Route path="posts" element={<Posts />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile />}>
              <Route index element={<LoggedInUser />} />
              <Route path="favourites" element={<FavPosts />} />
              <Route path="my-posts" element={<MyPosts />} />
            </Route>
            <Route path="post/:postId" element={<PostById />} />
            <Route path="*" element={<h1>Route Not Defined!</h1>} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}