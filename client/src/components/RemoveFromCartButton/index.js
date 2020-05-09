import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const RemoveFromCartButton = (props) => {

    const cart = useStoreState(state => state.products.cart);
    const updateCart = useStoreActions(actions => actions.products.updateCart);
    const isAuthenticated = useStoreState(state => state.user.isAuthenticated);
    const role = useStoreState(state => state.user.user)
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            return history.push('/login');
        }
        if (role.role !== "user") {
            return;
        }
        const item = cart.filter((item) => {
            return item.productID._id === props.productid
        });
        updateCart({ productID: props.productid, quantity: 0 });
    }
    return (
        <>
            <Button variant="danger" onClick={handleClick}>
                Remove from cart
            </Button>
        </>
    )
}

export default RemoveFromCartButton;