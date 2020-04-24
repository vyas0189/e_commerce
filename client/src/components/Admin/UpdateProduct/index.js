import { useStoreActions, useStoreState } from 'easy-peasy';
import { MDBBtn, MDBCol, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import './UpdateProduct.css';
const UpdateProduct = () => {
    const getAllProducts = useStoreActions(actions => actions.products.getAllProducts);
    const loading = useStoreState(state => state.products.loading);
    const products = useStoreState(state => state.products.products);
    const updateProduct = useStoreActions(actions => actions.products.updateProduct);
    const [productDetails, setProductDetails] = useState({
        productID: '',
        name: '',
        productType: '',
        price: '',
        quantity: '',
        description: '',
        image: ''
    });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        name,
        productType,
        price,
        quantity,
        description,
        image
    } = productDetails

    const handleChange = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct(productDetails);
        setProductDetails({
            productID: '',
            name: '',
            productType: '',
            price: '',
            quantity: '',
            description: '',
            image: ''
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
                                    <td><MDBBtn color="green" size="md" onClick={(e) => {
                                        e.preventDefault();
                                        setProductDetails({ ...productDetails, productID: product._id, name: product.name, productType: product.productType, price: product.price, quantity: product.quantity, description: product.description, image: product.image });
                                        handleShow();
                                    }}>Update</MDBBtn></td>
                                </tr>
                            ))
                        }
                    </MDBTableBody>
                </MDBTable>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <MDBRow className="updateProductAdminRow">
                            <MDBCol md="12">
                                <form onSubmit={handleSubmit}>

                                    <label htmlFor="addProduct" className="grey-text">
                                        Name
                    </label>
                                    <input type="text" id="addProduct" className="form-control" required name="name" value={name} onChange={(e) => handleChange(e)} />
                                    <br />

                                    <label htmlFor="productPrice" className="grey-text">
                                        Price
                    </label>
                                    <input type="number" id="productPrice" className="form-control" min="0.01" step="0.01" required name="price" value={price} onChange={(e) => handleChange(e)} />
                                    <br />

                                    <label htmlFor="productQuantity" className="grey-text">
                                        Quantity
                    </label>
                                    <input type="number" id="productQuantity" className="form-control" required name="quantity" value={quantity} onChange={(e) => handleChange(e)} />
                                    <br />
                                    <select className="browser-default custom-select form-control" required name="productType" value={productType} key={productType}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        <option>Type</option>
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                        <option value="teen">Teen</option>
                                        <option value="kid">Kids</option>
                                        <option value="shoes">Shoes</option>
                                    </select>
                                    <br />
                                    <br />
                                    <label htmlFor="productImage" className="grey-text">
                                        Image
                    </label>
                                    <input type="url" id="productImage" className="form-control" required name="image" value={image} onChange={(e) => handleChange(e)} />
                                    <br />
                                    <MDBInput type="textarea" rows="3" label="Description" required name="description" value={description} onChange={(e) => handleChange(e)} />
                                    <br />

                                    <div className="text-center mt-4">
                                        <MDBBtn color="unique" type="submit" disabled={loading ? true : false}>
                                            {loading ? 'Updating...' : "Update Product"}
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

export default UpdateProduct
