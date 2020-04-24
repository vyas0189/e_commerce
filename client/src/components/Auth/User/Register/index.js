import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Register.css";


const Register = () => {

  const [formDetails, setFormDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  });
  
  return (
    <Container>
      <h1 className="register">Register</h1>
      <br />

      <Form>
        <Row>
          <Col>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter First Name" name="firstName" />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter Last Name" name="lastName" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" placeholder="Enter Email" name="email" />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control required type="text" placeholder="Enter Username" name="username" />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Enter Password" minLength="6" name="password" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control required type="text" placeholder="Enter Address" name="address" />
        </Form.Group>

        <Form.Group controlId="formBasicAddress2">
          <Form.Label>Address 2 (optional)</Form.Label>
          <Form.Control required type="text" placeholder="Enter Address 2" name="address2" />
        </Form.Group>

        <Form.Group controlId="formBasicCity">
          <Form.Label>City</Form.Label>
          <Form.Control required type="text" placeholder="Enter City" name="city" />
        </Form.Group>

        <Form.Group controlId="formBasicState">
          <Form.Label>State</Form.Label>
          <Form.Control required type="text" placeholder="Enter State" name="state" />
        </Form.Group>

        <Form.Group controlId="formBasicZipcode">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control required type="number" placeholder="Enter Zip Code" name="zip" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
