import React from "react";
import { useDispatch } from "react-redux";
import { setU } from "../reducers/userReducer";
import { notificationChange } from "../reducers/notificationReducer";
import loginService from "../services/login";
import { Form, Button } from "react-bootstrap";
const LoginForm=({ username,setUsername,password,setPassword }) => {
  const dispatch=useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user=await loginService.login({ username,password });
      setUsername("");
      setPassword("");
      window.localStorage.setItem("blogToken", JSON.stringify(user));
      dispatch(setU(user));
      dispatch(notificationChange("Logged in successfully",3));
    } catch (e) {
      dispatch(notificationChange("Wrong credentials",3));
    }
  };
  return <div>
    <h2>Log in to application</h2>
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <div>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant="primary" type="submit">login</Button>
      </Form.Group>
    </Form>
  </div>;
};
export default LoginForm;