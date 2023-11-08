import { useState } from "react";
import loginService from "../services/Login";
import Notificiation from "./notification";
import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      navigate("/");
      setUser(user);
    } catch (e) {
      setNotification("Invalid username or password");

      setTimeout(() => {
        setNotification("");
      }, 4000);
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");

  return (
    <>
      <Notificiation message={notification} />

      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password</Form.Label>

          <Form.Control
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />

          <Button variant="primary" id="submit_login" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default Login;
