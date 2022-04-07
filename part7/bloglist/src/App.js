import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { initBlogs } from "./reducers/blogReducer";
import { setU } from "./reducers/userReducer";


const App = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const handleLogout = async () => {
    setUsername("");
    setPassword("");
    window.localStorage.removeItem("blogToken");
    dispatch(setU(null));
  };
  useEffect(() => {
    const loggedUserJSON=window.localStorage.getItem("blogToken");
    if(loggedUserJSON){
      const user=JSON.parse(loggedUserJSON);
      dispatch(setU(user));
    }
    dispatch(initBlogs());
  }, [dispatch]);
  if (user === null) {
    console.log("user = 0 ");
    return (
      <>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      </>
    );
  }

  return (
    <div className="container">
      <Notification />
      <h2>blogs</h2>
      <div>
        {username} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      <Togglable buttonLabel={"New blog"}>
        <BlogForm />
      </Togglable>
      {blogs.map((blog) => {
        let showButton = false;
        if (blog.user) {
          if (blog.user.username === user.username) {
            showButton = true;
          }
        }
        return (
          <Blog key={blog.id} blog={blog} showButton={showButton} />
        );
      })}


    </div>
  );
};

export default App;
