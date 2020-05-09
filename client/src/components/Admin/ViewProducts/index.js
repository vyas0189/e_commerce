import { useStoreActions, useStoreState } from 'easy-peasy';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React, { useEffect } from 'react';

const ViewProducts = () => {
    const getAllProducts = useStoreActions(actions => actions.products.getAllProducts);
    const loading = useStoreState(state => state.products.loading);
    const products = useStoreState(state => state.products.products);

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        loading ? <h1>Loading...</h1> : (
            <MDBTable bordered >
                <MDBTableHead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Image</th>
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
                            </tr>
                        ))
                    }
                </MDBTableBody>
            </MDBTable>
        )
    )
}

export default ViewProducts
