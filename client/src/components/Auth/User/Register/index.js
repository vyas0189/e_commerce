import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Register.css";

const Register = () => {
  return (
    <Container>
      <h1 className="register">Register</h1>
      <br/>

      <Form>
        <Row>
          <Col>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter First Name" />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter Last Name" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" placeholder="Enter Email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control required type="text" placeholder="Enter Username" />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Enter Password" minLength="6" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control required type="text" placeholder="Enter Address" />
        </Form.Group>

        <Form.Group controlId="formBasicAddress2">
          <Form.Label>Address 2 (optional)</Form.Label>
          <Form.Control required type="text" placeholder="Enter Address 2" />
        </Form.Group>

        <Form.Group controlId="formBasicCity">
          <Form.Label>City</Form.Label>
          <Form.Control required type="text" placeholder="Enter City" />
        </Form.Group>

        <Form.Group controlId="formBasicState">
          <Form.Label>State</Form.Label>
          <Form.Control required type="text" placeholder="Enter State" />
        </Form.Group>

        <Form.Group controlId="formBasicZipcode">
          <Form.Label>Zipcode</Form.Label>
          <Form.Control required type="text" placeholder="Enter Zipcode" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
