import React, { useState } from "react";
import { createBlog } from "../reducers/blogReducer";
import { useDispatch,useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

const BlogForm=() => {
  const [title,setTitle]=useState("");
  const [author,setAuthor]=useState("");
  const [url,setUrl]=useState("");
  const dispatch = useDispatch();
  const user=useSelector(state => state.user);
  const callTheFunction=(event) => {
    event.preventDefault();
    dispatch(createBlog({
      title:title,
      author:author,
      url:url
    },user.token));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  <Form onSubmit={callTheFunction}>
    <Form.Group>
      <Form.Label>username:</Form.Label>
      <Form.Control
        type="text"
        name="username"
      />
      <Form.Label>password:</Form.Label>
      <Form.Control
        type="password"
      />
      <Button variant="primary" type="submit">
      login
      </Button>
    </Form.Group>
  </Form>;

  return <div>
    <Form onSubmit={callTheFunction}>
      <Form.Group>
        <div>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            id="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            value={author}
            id="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            value={url}
            id="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button variant="primary" type="submit">create</Button>
      </Form.Group>
    </Form>
  </div>;
};
export default BlogForm;
