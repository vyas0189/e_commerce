import axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, ListGroup, ListGroupItem, Modal, Row } from 'react-bootstrap';
import { toast } from "react-toastify";

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

    const cart = useStoreState(state => state.products.cart);
    const getCart = useStoreActions(actions => actions.products.getCart);
    const cartLoading = useStoreState(state => state.products.loading);

    const checkout = useStoreActions(actions => actions.products.checkout);
    const loading = useStoreState(state => state.user.loading);
    const user = useStoreState(state => state.user.user);
    const [show, setShow] = useState(false);
    const [anotherAddress, setAnotherAddress] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getCart()

    }, []);
    const summary = () => {
        let initialValue = 0
        let sum = cart.reduce((accumulator, currentValue) => { return accumulator + currentValue.productID.price * currentValue.quantity }, initialValue)
        const tax = (sum * 0.0825)
        const totalPrice = sum + tax;

        return (
            <ListGroup>
                <ListGroupItem><h1 style={styles.h2}>Order Summary</h1></ListGroupItem>
                <ListGroupItem>
                    {
                        <Row>
                            <Col xs='8'><p>(prod x quantity)</p></Col>
                            <Col xs='4'><p>${sum.toFixed(2)}</p></Col>
                        </Row>
                    }
                </ListGroupItem>
                <ListGroupItem>
                    <Row>
                        <Col xs='8'><p>Tax</p></Col>
                        <Col xs='4'><p>${tax.toFixed(2)}</p></Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Row>
                        <Col xs='8'><p>Total</p></Col>
                        <Col xs='4'><b style={{ fontSize: '25px' }}>${totalPrice.toFixed(2)}</b></Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        );
    }



    const [formDetails, setFormDetails] = useState({
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        ccNumber: '',
        ccExp: '',
        ccCCV: '',
    });
    let {
        address,
        address2,
        city,
        state,
        zip,
        ccNumber,
        ccExp,
        ccCCV,
    } = formDetails

    const onChange = (e) => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {

        e.preventDefault();
        if (!address2 || address2.length === 0) {
            address2 = 'n/a'
        }

        const userAddress = {
            address: anotherAddress ? address : user.address,
            address2: anotherAddress ? address2 : user.address2,
            city: anotherAddress ? city : user.city,
            state: anotherAddress ? state : user.state,
            zip: anotherAddress ? zip : user.zip,
        }
        try {
            await axios.post('/api/address', userAddress).then(res => {
                if (res.status === 200 && res.data.data.XAVResponse.hasOwnProperty('ValidAddressIndicator')) {
                    checkout();
                } else {
                    toast.error('Invalid Address')
                }
            })
        } catch (err) {
            toast.error('Invalid Address')
        }
    };
    const formInfo = () => {
        const {
            address,
            address2,
            city,
            state,
            zip,
        } = user;

        return (
            <Row>
                <Col md='8'>
                    <Form onSubmit={onSubmit}>
                        <ListGroup>
                            <ListGroup.Item>Address: {anotherAddress ? formDetails.address : address}</ListGroup.Item>
                            {address2 === null || address2 === 'n/a' ? '' :
                                (<ListGroup.Item >Secondary Address: {anotherAddress ? formDetails.address2 : address2}</ListGroup.Item>)}
                            <ListGroup.Item>City: {anotherAddress ? formDetails.city : city} </ListGroup.Item>
                            <ListGroup.Item>State: {anotherAddress ? formDetails.state : state}</ListGroup.Item>
                            <ListGroup.Item>Zip: {anotherAddress ? formDetails.zip : zip}</ListGroup.Item>

                            <Form.Group className="mt-5">
                                <Form.Label>Credit Card Number</Form.Label>
                                <Form.Control required type="number" placeholder="Enter Credit Card Number" name="ccNumber" value={ccNumber}
                                    onChange={(e) => onChange(e)} />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Expiration</Form.Label>
                                    <Form.Control required type="number" name="ccExp" value={ccExp}
                                        onChange={(e) => onChange(e)} placeholder="Example: 521" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control required type="number" value={ccCCV}
                                        onChange={(e) => onChange(e)} placeholder="Enter Security Code" name="ccCCV" />
                                </Form.Group>
                            </Form.Row>
                            <div>
                                <Button variant="primary" onClick={handleShowNewForm}>
                                    Send to another Address
                             </Button>
                                <Button variant="primary" type="submit" disabled={cart.length <= 0}>
                                    Submit
                            </Button>
                            </div>
                        </ListGroup>
                    </Form>

                </Col >
                <Col md='4'>
                    {cartLoading ? <h1>Loading...</h1> : summary()}
                </Col>
            </Row >
        )
    }

    const onSubmitNewFrom = (e) => {
        e.preventDefault();
        setAnotherAddress(true)
        handleClose();
    }
    const newForm = () => {
        return (
            <Form onSubmit={onSubmitNewFrom}>

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

                <Form.Row>
                    <Form.Group as={Col} controlId="formBasicCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control required type="text" placeholder="Enter City" name="city" value={city}
                            onChange={(e) => onChange(e)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
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
                    <Form.Group as={Col} controlId="formBasicZipcode">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control required type="number" placeholder="Enter Zip Code" name="zip" value={zip}
                            onChange={(e) => onChange(e)} />
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit" disabled={cart.length <= 0}>
                    Submit
                </Button>
            </Form>
        )
    }
    const handleShowNewForm = (e) => {
        e.preventDefault();
        handleShow()
    }
    return (
        loading ? <h1>Loading...</h1> : (
            <div>

                <Container style={styles.container}>
                    <h1 style={styles.h1}>Check out</h1>
                    {formInfo()}
                    <>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{newForm()}</Modal.Body>
                        </Modal>
                    </>
                </Container>
            </div>
        )
    )
}


export default Checkout