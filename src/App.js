import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProtectedContent from "./components/Protected";
import Contact from "./components/Contact";
import About from "./components/About";
import Posts from "./components/Posts";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import SignupForm from "./components/SignupForm"
// import PostById from "./components/postById";

export default function App() {
  
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedContent />
            }
          >
            {/* <Route path="posts/:postId" element={<PostById posts={posts} />} /> */}
            <Route index element={<Home />} />
            <Route path="create-post" element={<CreatePost/>}/>
            <Route path="posts" element={<Posts />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<h1>Route Not Defined!</h1>} />
          </Route>
          <Route
            path="/login"
            element={
              <LoginForm/>
            }
          />
          <Route
            path="/signup"
            element={
              <SignupForm/>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}