import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const AddToCartButton = (props) => {

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cart = useStoreState(state => state.products.cart);
    const addToCart = useStoreActions(actions => actions.products.addToCart);
    const isAuthenticated = useStoreState(state => state.user.isAuthenticated);
    const role = useStoreState(state => state.user.role)
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            return history.push('/login');
        }
        if (role !== "user") {
            return;
        }
        if (props.productQuantity >= 0) {
            setMessage('Item sold out.')
            return handleShow()
        }
        const item = cart.filter((item) => {
            return item._id = props.productID
        });

        if (item.length > 0) {
            setMessage('Item already in cart.')
            return handleShow()
        }

        setMessage('Item added to cart.');
        handleShow();
        addToCart({ productID: props.productID, quantity: props.quantity });
    }
    return (
        <>
            <Button onClick={handleClick}>
                Add to Cart
            </Button>

            <Modal show={show} onHide={handleClose}>

                <Modal.Body>Item already in cart!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {message}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddToCartButton;
