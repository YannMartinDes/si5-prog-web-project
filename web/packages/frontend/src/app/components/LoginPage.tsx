import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.scss'
import axios from "axios";
import {useNavigateNoUpdates} from "../context/RouterUtils";

function LoginPage() {
  const navigate = useNavigateNoUpdates();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: { preventDefault: () => void; }) {
    console.log('Trying to submit login');
    event.preventDefault();
    //faire requete vers le backend
    alert('Login form sent');
    try{
      axios.post(`http://localhost:3333/api/auth/login`, { username: email, password: password })
        .then(res => {
          const token = res.data;
          console.log('User logged successfully: ');
        });
    } catch (e) {
      console.log('Login failed : ', e);
    }
  }

  return(
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        <Button variant="primary" onClick={(e) => navigate(`signup`)}>
          I don't have an account
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
