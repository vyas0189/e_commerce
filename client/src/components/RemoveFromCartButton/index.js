import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const RemoveFromCartButton = (props) => {

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cart = useStoreState(state => state.products.cart);
    const updateCart = useStoreActions(actions => actions.products.updateCart);
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
        const item = cart.filter((item) => {
            return item.productID._id == props.productid
        });

        console.log('Items: ', item);

        setMessage('Item removed from cart.');
        handleShow();
        updateCart({ productID: props.productid, quantity: 0 });
    }
    return (
        <>
            <Button onClick={handleClick}>
                Remove from cart
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

export default RemoveFromCartButton;