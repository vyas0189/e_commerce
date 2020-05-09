import { useStoreActions, useStoreState } from 'easy-peasy';
import { MDBBtn, MDBCol, MDBInput, MDBRow } from 'mdbreact';
import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {

    const addProduct = useStoreActions(actions => actions.products.addProduct);
    const loading = useStoreState(state => state.products.loading);

    const [productDetails, setProductDetails] = useState({
        name: '',
        productType: '',
        price: '',
        quantity: '',
        description: '',
        image: ''
    })

    const {
        name,
        productType,
        price,
        quantity,
        description,
        image
    } = productDetails;

    const handleChange = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(productDetails)
        setProductDetails({
            name: '',
            productType: '',
            price: '',
            quantity: '',
            description: '',
            image: ''
        });
    }
    return (
        <MDBRow className="addProductAdminRow">
            <MDBCol md="6">
                <form onSubmit={handleSubmit}>
                    <p className="h4 text-center mb-4">Add Product</p>

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
                    <MDBInput type="textarea" rows="2" label="Description" required name="description" value={description} onChange={(e) => handleChange(e)} />
                    <br />

                    <div className="text-center mt-4">
                        <MDBBtn color="unique" type="submit" disabled={loading ? true : false}>
                            {loading ? 'Adding...' : "Add Product"}
                        </MDBBtn>
                    </div>
                </form>
            </MDBCol>
        </MDBRow>
    )
}

export default AddProduct
