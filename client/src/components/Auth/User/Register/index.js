import axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";

const Register = () => {
  const register = useStoreActions(actions => actions.user.register);
  const isAuthenticated = useStoreState(state => state.user.isAuthenticated);
  const loading = useStoreState(state => state.user.loading);

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
  let {
    address,
    address2,
    city,
    email,
    firstName,
    lastName,
    password,
    state,
    username,
    zip
  } = formDetails

  const onChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {

    e.preventDefault();
    if (!address2 || address2.length === 0) {
      address2 = ''
    }
    const userRegister = {
      username,
      password,
      email,
      firstName,
      lastName,
      address,
      address2,
      city,
      state,
      zip,
    };


    const userAddress = {
      address,
      address2,
      city,
      state,
      zip,
    }
    try {
      await axios.post('/api/address', userAddress).then(res => {
        if (res.status === 200 && res.data.data.XAVResponse.hasOwnProperty('ValidAddressIndicator')) {
          register(userRegister);
        } else {
          toast.error('Invalid Address')
        }
      })
    } catch (err) {
      toast.error('Invalid Address');
    }
  };

  return (
    loading ? <h1>Loading...</h1> : isAuthenticated ? <Redirect to="/" /> :
      <Container>
        <h1 className="register">Register</h1>
        <br />

        <Form onSubmit={(e) => onSubmit(e)} >
          <Row>
            <Col>
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter First Name" name="firstName" value={firstName} onChange={(e) => onChange(e)} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter Last Name" name="lastName" value={lastName}
                  onChange={(e) => onChange(e)} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control required type="email" placeholder="Enter Email" name="email" value={email} onChange={(e) => onChange(e)} />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control required type="text" placeholder="Enter Username" name="username" value={username}
                  onChange={(e) => onChange(e)} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Enter Password" minLength="6" name="password" value={password}
                  onChange={(e) => onChange(e)} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control required type="text" placeholder="Enter Address" name="address" value={address}
              onChange={(e) => onChange(e)} />
          </Form.Group>

          <Form.Group controlId="formBasicAddress2">
            <Form.Label>Address 2 (optional)</Form.Label>
            <Form.Control type="text" placeholder="Enter Address 2" name="address2" value={address2}
              onChange={(e) => onChange(e)} />
          </Form.Group>

          <Form.Group controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control required type="text" placeholder="Enter City" name="city" value={city}
              onChange={(e) => onChange(e)} />
          </Form.Group>

          <Form.Group controlId="formBasicState">
            <Form.Label>State</Form.Label>
            <Form.Control required as="select" name="state" value={state} onChange={(e) => onChange(e)}>
              <option>Choose a State</option>
              <option value="AL">AL</option>
              <option value="AK">AK</option>
              <option value="AR">AR</option>
              <option value="AZ">AZ</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DC">DC</option>
              <option value="DE">DE</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="IA">IA</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="MA">MA</option>
              <option value="MD">MD</option>
              <option value="ME">ME</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MO">MO</option>
              <option value="MS">MS</option>
              <option value="MT">MT</option>
              <option value="NC">NC</option>
              <option value="NE">NE</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>
              <option value="NV">NV</option>
              <option value="NY">NY</option>
              <option value="ND">ND</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VT">VT</option>
              <option value="VA">VA</option>
              <option value="WA">WA</option>
              <option value="WI">WI</option>
              <option value="WV">WV</option>
              <option value="WY">WY</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicZipcode" value={zip}
            onChange={(e) => onChange(e)}>
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
