import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignupPage.scss'
import axios from 'axios';
import {Breadcrumb} from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function validateForm() {
    return email.length > 0 && (password.length > 3 && password.length < 21);
  }

  function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    //faire requete vers le backend
    const signupUrl = `http://localhost:3333/api/auth/signup`;
    try{
      axios.post(signupUrl, { username: email, password: password })
        .then(res => {
          alert('Votre compte a bien été créé');
          navigate("/login")
        });
    } catch (e) {
      console.log(e);
    }
  }

  return(
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="http://localhost:4200">Accueil</Breadcrumb.Item>
        <Breadcrumb.Item href="http://localhost:4200/login">Login</Breadcrumb.Item>
        <Breadcrumb.Item active>Signup</Breadcrumb.Item>
      </Breadcrumb>
      <div className="Signup">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Adresse mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!validateForm()}>
            S'enregistrer
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SignupPage;
