import { React, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import "./Login.css";

const Login = () => {

  const [formData, setFormData] = useState( {
    username: '',
    password: ''
  });
  const login = useStoreActions(actions => actions.user.login)
  const isAuthenticated = useStoreState(state => state.user.isAuthenticated)
  const loading = useStoreState(state => state.user.loading)
  const { username, password } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})
  const onSubmit = async e => {
    e.preventDefault()
    const userLogin = { username, password}

    login(userLogin)
    setFormData({username: '', password: ''})
  };

  return (
    loading ? <h1>Loading...</h1> : (isAuthenticated ? <h1>Go to home page here</h1> :
    <Container>
      <h1 className="login">Login</h1>
      <br/>

      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control autofocus name="username" required type="text" placeholder="Enter Username" onChange={(e) => onChange(e)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" required type="password" placeholder="Enter Password" minLength="6" onChange={(e) => onChange(e)}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    </Container>
    )
  );

};

export default Login
