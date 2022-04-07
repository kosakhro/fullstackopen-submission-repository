import React, { useState } from "react";
import { delBlog, upBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import { useSelector,useDispatch } from "react-redux";
import { notificationChange } from "../reducers/notificationReducer";
const Blog = ({ blog,showButton }) => {
  const [showInfo, setShow] = useState(false);
  const user= useSelector(state => state.user);
  const dispatch=useDispatch();
  const deleteHandler = async () => {
    if (window.confirm(`Dor you want to delete ${blog.title}?`)) {
      try {
        await blogService.deleteBlog(blog.id, user.token);
        dispatch(delBlog(blog));
        dispatch(notificationChange(` ${blog.title} deleted`,3));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  if (showInfo) {
    return (
      <div className='blog' style={blogStyle}>
        {blog.title}
        <button
          onClick={() => {
            setShow(!showInfo);
          }}
        >
          hide
        </button>
        <br />
        {blog.url}
        <br />
        {blog.likes}{" "}
        <button
          onClick={() => {
            const upLikes=blog;
            upLikes.likes=blog.likes+1;
            dispatch(upBlog(upLikes,user.token));
          }}
        >
          like
        </button>
        <br />
        {blog.author}
        <br />
        {showButton ? (
          <button onClick={deleteHandler}>remove</button>
        ) : (
          <></>
        )}
      </div>
    );
  } else {
    return (
      <div className='blog' style={blogStyle}>
        {blog.title} {blog.author}{" "}
        <button
          onClick={() => {
            setShow(!showInfo);
          }}
        >
          view
        </button>
      </div>
    );
  }
};
export default Blog;