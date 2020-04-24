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
    const role = useStoreState(state => state.user.user)
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        console.log(props, role);

        if (!isAuthenticated) {
            return history.push('/login');
        }
        if (role.role !== "user") {
            return;
        }
        if (props.productquantity <= 0) {
            setMessage('Item sold out.')
            return handleShow()
        }
        const item = cart.filter((item) => {
            return item.productID._id == props.productid
        });

        console.log('Items: ', item);

        if (item.length > 0) {
            setMessage('Item already in cart.')
            return handleShow()
        }

        setMessage('Item added to cart.');
        handleShow();
        addToCart({ productID: props.productid, quantity: props.quantity });
    }
    return (
        <>
            <Button onClick={handleClick}>
                Add to Cart
            </Button>

            <Modal show={show} onHide={handleClose}>

                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddToCartButton;
