import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, message } from "antd";

// Importing your CSS file for additional styling
import "./LoginForm.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      // Fetch all users
      const response = await axios.post(
        `http://localhost:8080/users/${values.username}`
      );
      const userData = response.data;

      // Check if the entered credentials match any user

      const user = userData.password === values.password;
      if (user) {
        // If match found, navigate to book list
        localStorage.setItem("token", user.token); // Store token if applicable
        console.log(response.data);
        localStorage.setItem("userId", response.data.id); // Save user ID
        navigate(`/booklist/${response.data.id}`);
      } else {
        // If no match, show error message
        message.error("Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed", error);
      message.error("An error occurred while logging in");
    }
  };

  return (
    <div className="login-form-container">
      <Card className="login-form-card" title="Login">
        <Form name="login" onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={() => navigate("/register")}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginForm;
