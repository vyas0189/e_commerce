import React from 'react';
import { ListGroup, ListGroupItem, Row, Col, Container, InputGroup, Form, Button } from 'react-bootstrap';

const styles = {
    container: {
      paddingTop: '120px', 
      paddingBottom: '120px'
    },
    h1: {
      paddingBottom: '20px'
    },
    h2: {
        fontSize: '20px'
    }
  }

const Checkout = () => {
    return (
        <div>
            <Container style={styles.container}>
            <h1 style={styles.h1}>Check out</h1>
            <Row>
            <Col md='8'>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="firstName" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control as="select" value="Choose...">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col> 
            <Col md = '4'>
                <ListGroup>
                    <ListGroupItem><h1 style={styles.h2}>Order Summary</h1></ListGroupItem>
                    <ListGroupItem>
                    {
                        <Row>
                            <Col xs='8'><p>(prod x quantity)</p></Col>
                            <Col xs='4'><p>$</p></Col>
                        </Row>
                    }
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col xs='8'><p>Subtotal</p></Col>
                            <Col xs='4'><p>$</p></Col>
                        </Row>
                        <Row>
                            <Col xs='8'><p>Shipping</p></Col>
                            <Col xs='4'><p>$</p></Col>
                        </Row>
                        <Row>
                            <Col xs='8'><p>Tax</p></Col>
                            <Col xs='4'><p>0$</p></Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col xs='8'><p>Total</p></Col>
                            <Col xs='4'><b style={{fontSize: '25px'}}>$</b></Col>
                        </Row>
                    </ListGroupItem>
                 </ListGroup>
            </Col>
            </Row>
            </Container>
        </div>
    )
}


export default Checkout