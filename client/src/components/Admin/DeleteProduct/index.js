import { useStoreActions, useStoreState } from 'easy-peasy';
import { MDBBtn, MDBCol, MDBRow, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import './DeleteProduct.css';

const DeleteProduct = () => {
    const getAllProducts = useStoreActions(actions => actions.products.getAllProducts);
    const loading = useStoreState(state => state.products.loading);
    const products = useStoreState(state => state.products.products);
    const deleteProduct = useStoreActions(actions => actions.products.deleteProduct);
    const [productDetails, setProductDetails] = useState({
        productID: '',
        name: '',
    });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        name,
        productID,
    } = productDetails

    const handleSubmit = (e) => {
        e.preventDefault();
        deleteProduct(productID)
        setProductDetails({
            productID: '',
            name: '',
        });
        handleClose();
    }
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        loading ? <h1>Loading...</h1> : (
            <>
                <MDBTable bordered className="updateProductAdmin">
                    <MDBTableHead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Image</th>
                            <th>Update</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                            products.map((product, i) => (
                                <tr key={product._id}>
                                    <td>{i + 1}</td>
                                    <td>{product.name}</td>
                                    <td>$ {product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <img src={product.image} alt="thumbnail" className="img-thumbnail" style={{ height: '125px' }} />
                                    </td>
                                    <td><MDBBtn color="red" size="md" onClick={(e) => {
                                        e.preventDefault();
                                        setProductDetails({ ...productDetails, productID: product._id, name: product.name, });
                                        handleShow();
                                    }}>Delete</MDBBtn></td>
                                </tr>
                            ))
                        }
                    </MDBTableBody>
                </MDBTable>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <MDBRow className="updateProductAdminRow">
                            <MDBCol md="12">
                                <form className="text-center" onSubmit={handleSubmit}>
                                    <h2>Are you sure you want to delete {name}?</h2>
                                    <div className="text-center mt-4">
                                        <MDBBtn color="red" type="submit" disabled={loading ? true : false}>
                                            {loading ? 'Deleting...' : "Delete Product"}
                                        </MDBBtn>
                                    </div>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </Modal.Body>
                </Modal>
            </>
        )
    )
}

export default DeleteProduct;
