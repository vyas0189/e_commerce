import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect } from 'react';
import { Button, Col, Container, Figure, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RemoveFromCartButton from '../../components/RemoveFromCartButton';
 
const Cart = () => {
 
    const cart = useStoreState(state => state.products.cart);
    const loading = useStoreState(state => state.products.loading)
    const getCart = useStoreActions(actions => actions.products.getCart);
 
    const styles = {
        h1: {
            fontSize: '15px',
            color: 'black'
        },
        img: {
            height: '150px',
            width: '150px',
            objectFit: 'cover'
        }
    };
 
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
                <ListGroupItem>
                    <center>
                        <Link to={'/checkout'} ><Button variant="primary" type="submit">
                            Checkout
    </Button>
                        </Link>
                    </center>
                </ListGroupItem>
            </ListGroup>
        );
    }
 
 
    return (
        <div>
            {loading ? <h1>Loading...</h1> :
                <Container>
                    <h1>Shopping Cart</h1><br></br>
                    <h1>{cart.length} items:</h1>
                    <Row>
                        <Col md='8'>
 
                            {cart.map((product) => (
                                <ListGroup key={product._id}>
                                    <Figure>
                                        <ListGroupItem>
                                            <Row>
                                                <Col xs='4'>
                                                    <img src={product.productID.image} style={styles.img} />
                                                </Col>
                                                <Col xs='8'>
                                                    <Figure.Caption float='right'>
                                                        {product.productID.name}<br></br><br></br>
                                                        {product.productID.description}<br></br><br></br>
 
                                                        <b>Price: ${product.productID.price}</b><br></br>
                                                        <b>Quantity: 1</b><br></br>
                                                        <RemoveFromCartButton productid={product.productID} quantity={0} />
                                                    </Figure.Caption>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    </Figure>
                                </ListGroup>
                            ))}
                        </Col>
                        <Col md='4'>
                            {summary()}
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    )
}
 
export default Cart